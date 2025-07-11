import axios from 'axios';
import { LOGE } from '../lib/Logger';
import HttpClient from '../lib/HttpClient';
import StatusCode from '../config/StatusCode';
import ResultCode from '../config/ResultCode';
import { ApiError, HttpError } from './errors';
import { getEventModule } from '../lib/EventModule';
import { EVENT_NAMES } from '../config/EventNames';
import { LOGOUT_TYPE } from '../config/LogoutConstants';

const TAG = 'ErrorManager';

/**
 * 错误管理
 * 统一处理 SDK 中的错误，包括错误日志记录、错误展示、重试机制等。
 */
class ErrorManager {
    /**
     * 错误类型检查
     * @param obj
     * @returns
     */
    public static isError(obj: unknown): obj is Error {
        if (obj === null || obj === undefined) {
            return false;
        }
        if (typeof obj === 'object') {
            return obj instanceof Error;
        }
        return false;
    }

    /**
     * 处理业务错误
     * @param responseData
     * @throws 抛出 ApiError
     */
    public static handleBusinessError(responseData: any): void {
        if (responseData && responseData.code !== ResultCode.OK) {
            throw new ApiError(
                responseData.code || 500,
                responseData.message || 'Business Error',
                responseData.data,
            );
        }
    }

    /**
     * 处理 HTTP 和 API 错误
     * @param error
     * @throws 抛出处理后的错误
     */
    public static handleError(error: any, customHandler?: (err: Error) => void): never {
        // 处理 Axios 错误
        if (axios.isAxiosError(error)) {
            const httpError = this.handleHttpError(error);
            customHandler?.(httpError);
            throw httpError;
        }

        // 处理 API 错误
        if (error instanceof ApiError) {
            const apiError = this.handleApiError(error);
            customHandler?.(apiError);
            throw apiError;
        }

        // 处理其他未知错误
        LOGE('ErrorManager', 'unknown error:', error);
        const unknownError = new Error('Unknown error');
        customHandler?.(unknownError);
        throw unknownError;
    }

    /**
     * 处理 HTTP 错误
     * @param error
     * @throws 抛出 HttpError
     */
    private static handleHttpError(error: any): never {
        LOGE(TAG, error);
        const { response } = error;

        // Token 失效处理
        if (response?.status === StatusCode.CLIENT_UNAUTHORIZED) {
            HttpClient.cancelAllRequests();

            // 触发注销事件
            getEventModule().dispatch(EVENT_NAMES.LOGOUT, {
                code: LOGOUT_TYPE.AUTHENTICATION_FAILED,
            });

            throw new HttpError(
                StatusCode.CLIENT_UNAUTHORIZED,
                'Unauthorized. Please login again.',
                response.data,
            );
        }

        // 根据状态码抛出对应错误
        if (response) {
            throw new HttpError(
                response.status,
                response.data.message || 'Request failed',
                response.data,
            );
        }

        // 处理网络错误, error 为无效参数不显示
        throw new HttpError(
            StatusCode.SERVER_INTERNAL_ERROR,
            'Network error or timeout, please check your internet connection',
            null,
        );
    }

    /**
     * 处理 API 错误
     * @param error
     * @throws 抛出 ApiError
     */
    private static handleApiError(error: ApiError): never {
        LOGE(TAG, error);
        throw error;
    }

    /**
     * 重试机制
     * @param fn
     * @param retries
     * @param delay
     * @returns
     */
    public static async retry<T>(
        fn: () => Promise<T>,
        retries: number = 3,
        delay: number = 1000,
    ): Promise<T> {
        try {
            return await fn();
        } catch (error) {
            if (retries <= 0) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.retry(fn, retries - 1, delay);
        }
    }
}

export default ErrorManager;
