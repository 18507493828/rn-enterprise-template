import { DeviceEventEmitter } from 'react-native';
import { Hud } from '@components/index';
import { handleError, wrapError } from '@utils/ErrorUtil';
import { ApiError, HttpError } from '@jssdk/core/errors';
import { getStorageModule } from '@jssdk/lib/Storage';
import { LOGI, LOGE } from '@jssdk/lib/Logger';
import { filterSensitiveData } from '@utils/DataSanitizationUtil';
import { isNoProxyMethod } from '@lib/decorators/NoProxy';

export default class BaseController {
    protected static TAG: string = 'BaseController';

    // 允许 `methodName` 存在于代理的 this 上
    protected static methodName?: string;

    /**
     * 为继承 BaseController 的类创建静态方法代理，自动注入日志和错误包装。
     */
    public static createStaticProxy<T extends typeof BaseController>(this: T): T {
        return new Proxy(this, {
            get(target, prop, receiver) {
                const original = Reflect.get(target, prop, receiver);
                const methodName = prop.toString();

                // 非函数 或 标记为不需要代理的方法 则直接返回
                if (typeof original !== 'function' || isNoProxyMethod(target, methodName)) {
                    return original;
                }

                return function (this: any, ...args: any[]) {
                    const startTime = Date.now();
                    target.methodName = methodName;

                    LOGI(
                        target.TAG,
                        `[${methodName}] START - Params:`,
                        JSON.stringify(filterSensitiveData(args)),
                    );

                    // 执行函数并监听结果
                    const result = Reflect.apply(original, target, args);

                    // 使用 Promise 监听成功与否
                    return Promise.resolve(result)
                        .then(res => {
                            const duration = Date.now() - startTime;
                            LOGI(target.TAG, `[${methodName}] SUCCESS - Duration: ${duration}ms`);
                            return res;
                        })
                        .catch(wrapError => {
                            const duration = Date.now() - startTime;
                            LOGE(target.TAG, `[${methodName}] ERROR - Duration: ${duration}ms`);
                            return wrapError?.extraData ?? false;
                        });
                };
            },
        });
    }

    /**
     * 统一错误处理
     * @param param0
     */
    protected static handleError({
        error,
        showPrompt = true,
        data = null,
    }: {
        error: any;
        showPrompt?: boolean;
        data?: any;
    }) {
        if (error instanceof HttpError) {
            this.emit(this.methodName, error);
        }
        handleError({ TAG: this.TAG, methodName: this.methodName, error, showPrompt });

        //
        throw wrapError(error, { extraData: data });
    }

    /**
     * 获取 Token（可从存储中获取或动态刷新）
     * @returns
     */
    static async getToken(): Promise<string | null> {
        const storage = getStorageModule();
        return storage.getItem('accessToken');
    }

    /**
     * 校验 Token 是否有效
     * @returns
     */
    static async checkTokenValidity(): Promise<boolean> {
        const token = await this.getToken();
        if (!token) {
            return false;
        }

        // 可以在此加入更复杂的 Token 校验逻辑（如检查过期时间）
        return true;
    }

    /**
     * 通知
     * @param methodName
     * @param params
     */
    static emit = (methodName = '', params = {}) => {
        DeviceEventEmitter.emit(methodName, params);
    };

    /**
     * 显示
     * @param {*} options
     */
    static showHud = (options = {}) => {
        Hud.show(options);
    };

    /**
     * 隐藏
     */
    static hideHud = () => {
        Hud.hide();
    };
}
