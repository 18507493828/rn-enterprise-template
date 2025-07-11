import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { requestConfig } from '../config/Config';
let cancelTokenSource = axios.CancelToken.source();
class HttpClient {
    private static instance: AxiosInstance | null = null; // 允许清除实例

    private constructor() {
        // 私有构造函数，禁止直接实例化
    }

    /**
     * 获取 Axios 实例（单例模式）
     */
    public static getInstance(): AxiosInstance {
        if (!HttpClient.instance) {
            HttpClient.instance = axios.create({
                baseURL: requestConfig.baseURL, // 使用配置中的 baseURL
                timeout: requestConfig.timeout || 30000, // 使用配置中的 timeout
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            // 将全局 CancelToken 应用到所有请求
            HttpClient.instance.interceptors.request.use(config => {
                config.cancelToken = cancelTokenSource.token;
                return config;
            });
        }

        return HttpClient.instance;
    }

    /**
     * 手动重置 Axios 实例（适用于动态修改 baseURL）
     */
    public static resetInstance() {
        HttpClient.instance = null;
    }

    /**
     * 发送请求
     * 支持单次请求的自定义配置和取消请求功能
     */
    public static async request<T>(
        config: AxiosRequestConfig,
        signal?: AbortSignal, // 可选的取消信号
    ): Promise<AxiosResponse<T>> {
        const instance = HttpClient.getInstance();

        // 如果传入取消信号，将其添加到请求配置
        if (signal) {
            config.signal = signal;
        }

        return instance.request<T>(config);
    }

    /**
     * 添加请求拦截器
     */
    public static addRequestInterceptor(
        onFulfilled: (
            config: InternalAxiosRequestConfig,
        ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
        onRejected?: (error: any) => any,
    ): number {
        return HttpClient.getInstance().interceptors.request.use(onFulfilled, onRejected);
    }

    /**
     * 添加响应拦截器
     */
    public static addResponseInterceptor(
        onFulfilled: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
        onRejected?: (error: any) => any,
    ): number {
        return HttpClient.getInstance().interceptors.response.use(onFulfilled, onRejected);
    }

    /**
     * 移除请求拦截器
     */
    public static ejectRequestInterceptor(id: number) {
        HttpClient.getInstance().interceptors.request.eject(id);
    }

    /**
     * 移除响应拦截器
     */
    public static ejectResponseInterceptor(id: number) {
        HttpClient.getInstance().interceptors.response.eject(id);
    }
    /**
     * 移除所有网络请求
     */
    public static cancelAllRequests = () => {
        cancelTokenSource.cancel('所有请求已被取消');
        // 重置取消令牌，以便后续请求继续使用
        cancelTokenSource = axios.CancelToken.source();
    };
}

export default HttpClient;
