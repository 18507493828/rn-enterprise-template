import { LOGE, LOGW } from '@jssdk/lib/Logger';
import { Hud, Toast, Alert } from '@components/index';
import { ErrorDescription } from '@business/config/ErrorDescription';
import * as Sentry from '@sentry/react-native';
import UserStorage from '@business/storage/UserStorage';
import { t } from 'i18next';

/**
 * 处理错误的通用方法
 * @param {Object} options - 处理错误的选项
 * @param {any} options.error - 错误对象
 * @param {string} [options.TAG=''] - 日志标记
 * @param {string} [options.methodName=''] - 引用的方法名称
 * @param {boolean} [options.useErrorMessage=false] - 是否直接使用 message
 * @param {boolean} [options.showToast=true] - 是否显示 Toast
 * @param {boolean} [options.showPrompt=true] - 是否显示 Alert
 * @param {Function} [options.callback] - 额外回调函数
 * @param {'api' | 'ui' | 'global'} [options.type='api'] - 错误类型（API 请求、UI 交互、全局）
 * @param {boolean} [useAlertCallback=false] - 将回调作用与 Alert的 onConfirm
 */
export const handleError = options => {
    Hud.hide();
    Toast.hide();

    const {
        error,
        TAG = '',
        methodName = '',
        useErrorMessage = false,
        showToast = true,
        showPrompt = true,
        callback,
        type = 'api',
        useAlertCallback = false,
    } = options;

    let title = error?.message || t('error_unknown_tip');
    let logMessage = title; // 用于日志打印
    let logMethod = LOGE;

    if (error instanceof Error || useErrorMessage) {
        // 直接使用 error.message，而不去查找错误码映射
        title = error.message || title;
        logMessage = title; // 日志与 UI 保持一致
    } else if (type === 'api' && error?.code) {
        // 处理 API 错误
        title = t(ErrorDescription[error.code]) || error.message;
        logMessage = `${title} (${error.code})`; // 日志额外拼接 code
        logMethod = ErrorDescription[error.code] ? LOGW : LOGE;
    }

    // 记录日志
    logMethod(TAG, methodName ? `[${methodName}]` : '', logMessage);
    reportErrorToSentry(TAG, methodName, logMessage, type, error);

    // 处理 UI 展示
    if (showPrompt) {
        const onConfirm = useAlertCallback && typeof callback === 'function' ? callback : () => {};
        showToast ? Toast.warning(title) : Alert.show({ title, onConfirm });
    }

    // 额外回调
    if (typeof callback === 'function') {
        callback();
    }
};

/**
 * 上报日志到Sentry服务
 * @param {*} tag
 * @param {*} methodName
 * @param {*} message
 * @param {*} type
 * @param {*} error
 */
const reportErrorToSentry = async (tag, methodName, message, type, error) => {
    const userInfo = await UserStorage.getInfo();
    const config = error?.config || {};

    const errorObj = {
        type,
        message,
        tag: `[${tag}]${methodName ? ` [${methodName}]` : ''}`,
        url: `${config.baseURL || ''}${config.url || ''}`,
        method: config.method,
        timeout: config.timeout,
        userId: userInfo?.id,
    };

    //日志上报
    Sentry.captureException(new Error(`${type} error`), {
        extra: {
            errorObj: JSON.parse(JSON.stringify(errorObj)),
        },
    });
};

/**
 * 包装错误对象，统一结构，并保留原始错误和额外信息
 * @param {any} error - 原始错误，可能是 Error、字符串或任意对象
 * @param {Object} extra - 附加信息，例如 code、data、tips 等
 * @returns {Error} - 包装后的标准 Error 对象
 */
export const wrapError = (error, extra = {}) => {
    if (error instanceof Error) {
        // 原生 Error 对象，直接扩展属性
        Object.assign(error, extra);
        return error;
    }

    // 非标准错误（如字符串或对象），封装成标准 Error 并添加额外字段
    const wrappedError = new Error(typeof error === 'string' ? error : 'Unknown error');
    wrappedError.originalError = error;
    Object.assign(wrappedError, extra);
    return wrappedError;
};
