import SDK from '@jssdk/index';
import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getStorageModule } from '../../lib/Storage';
import { RequestMethod, RequestConfig } from '../../lib/Types';
import HttpClient from '../../lib/HttpClient';
import { LOGD } from '../../lib/Logger';
import { ENSURE } from '../../lib/Assert';
import { Encryption } from '../../lib/Encryption';
import ErrorManager from '../../core/ErrorManager';

const TAG = 'SDK-BaseService';

export interface ApiResponse<T = any> {
    code: number; // 状态码
    data: T; // 泛型，表示数据类型
    message: string; // 返回的消息
}

abstract class BaseService {
    /**
     * 获取 Token（可从存储中获取或动态刷新）
     * @returns
     */
    protected static async getToken(): Promise<string | null> {
        const storage = getStorageModule();
        return storage.getItem('accessToken');
    }

    /**
     * 校验 Token 是否有效
     * @returns
     */
    public static async checkTokenValidity(): Promise<boolean> {
        const token = await this.getToken();
        if (!token) {
            return false;
        }

        // 可以在此加入更复杂的 Token 校验逻辑（如检查过期时间）
        return true;
    }

    /**
     * 公共请求方法
     * 支持：
     * - 自定义超时时间
     * - 动态请求/响应拦截器
     * - 强制终止请求
     * @param method
     * @param url
     * @param config
     * @param signal
     * @returns
     */
    public static async request<T>(
        method: RequestMethod,
        url: string,
        config: RequestConfig = {},
        signal?: AbortSignal, // 可选的取消信号
    ): Promise<T> {
        const token = await BaseService.getToken();
        const headers: Record<string, string> = token ? { Authorization: token } : {};
        const { isDebugMode, enableBusinessErrorHandling } = SDK.getBaseConfig();

        // 加密请求的参数
        let aesKey = '';
        if (!isDebugMode && !Boolean((config.headers || {})['Content-Type'])) {
            const encryptResult = await this.encryptRequestData(config.data); // 加密数据
            headers['x-meta-signature'] = encryptResult?.encryptAesKey;
            headers['Content-Type'] = 'text/plain';
            headers['Accept'] = 'text/plain';
            aesKey = encryptResult?.aesKey;

            // post请求数据进行加密
            encryptResult.data && (config.data = encryptResult.data);
        }

        const finalConfig: AxiosRequestConfig = {
            ...config,
            method,
            url,
            headers: { ...headers, ...config.headers },
            signal, // 注入取消信号
        };

        LOGD(TAG, '[request]', JSON.stringify(finalConfig));
        try {
            const { data } = await HttpClient.getInstance().request<T>(finalConfig);
            const responseData = isDebugMode ? data : this.decryptResponseData(data, aesKey);

            // 处理业务错误
            if (enableBusinessErrorHandling) {
                ErrorManager.handleBusinessError(responseData);
            }
            return responseData;
        } catch (error) {
            return ErrorManager.handleError(error);
        }
    }

    /**
     * 添加请求拦截器
     * @param onFulfilled
     * @param onRejected
     * @returns
     */
    protected static addRequestInterceptor(
        onFulfilled: (
            config: InternalAxiosRequestConfig, // 修改为 InternalAxiosRequestConfig
        ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
        onRejected?: (error: any) => any,
    ): number {
        return HttpClient.addRequestInterceptor(onFulfilled, onRejected);
    }

    /**
     * 添加响应拦截器
     * @param onFulfilled
     * @param onRejected
     * @returns
     */
    protected static addResponseInterceptor(
        onFulfilled: (response: any) => any | Promise<any>,
        onRejected?: (error: any) => any,
    ): number {
        return HttpClient.addResponseInterceptor(onFulfilled, onRejected);
    }

    /**
     * 移除请求拦截器
     * @param id
     */
    protected static ejectRequestInterceptor(id: number) {
        HttpClient.ejectRequestInterceptor(id);
    }

    /**
     * 移除响应拦截器
     * @param id
     */
    protected static ejectResponseInterceptor(id: number) {
        HttpClient.ejectResponseInterceptor(id);
    }

    /**
     * 校验必填字段是否存在
     * @param {Array<string | { key: string; name?: string }>} fields - 需要校验的字段数组
     * @param {Object} data - 待校验的数据对象
     * @param {string} [tag] - 日志标记
     * @throws 如果字段不存在，抛出错误
     */
    public static validateRequiredFields(
        tag: string,
        fields: (string | { key: string; name?: string })[],
        data: Record<string, any>,
    ) {
        // 将字符串形式转换为对象形式，统一处理
        const normalizedFields = fields.map(field =>
            typeof field === 'string' ? { key: field, name: field } : field,
        );

        // 遍历字段并使用 ENSURE 校验, 判断字段是否存在
        normalizedFields.forEach(field => {
            const fieldValue = data[field.key];

            ENSURE(fieldValue !== null && fieldValue !== undefined) // 排除 null 和 undefined
                .condition(fieldValue !== null && fieldValue !== undefined)
                .msg(tag, `[Validation Error] Missing required field: ${field.name || field.key}`);
        });
    }

    /**
     * 加密请求参数
     * @param data
     * @returns
     */
    private static async encryptRequestData(data: any): Promise<any> {
        // 进行加密处理
        const { aesKey, encryptAesKey, encryptData } = await Encryption.encryptDataWithAES(data);
        return {
            aesKey,
            encryptAesKey,
            data: encryptData,
        };
    }

    /**
     * 解密响应数据
     * @param data
     * @returns
     */
    private static decryptResponseData(data: any, key: string): any {
        if (data && typeof data === 'string' && key) {
            const decrypted = Encryption.decryptDataWithAES(data, key); // 解密处理
            data = JSON.parse(decrypted); // 将解密后的字符串转换为对象
        }
        return data;
    }
}

export default BaseService;
