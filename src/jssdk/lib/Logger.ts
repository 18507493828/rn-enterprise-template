import SDK from '../index';
import { PlatformType } from './Types';

type LogType = 'debug' | 'info' | 'warn' | 'error'; // 日志类型

export interface LogOptions {
    type: LogType; // 日志类型
    message: string; // 日志消息
}

export interface LoggerConfig {
    platformType?: PlatformType; // 环境（Mobile 或 Web）
    writeToFile?: boolean; // 是否写入文件（仅适用于 Mobile - React Native）
    logLevel?: LogType; // 日志等级控制（默认为 debug）
}

let loggerConfig: LoggerConfig = {
    platformType: 'Web', // 默认环境为 Web
    writeToFile: false,
    logLevel: 'debug', // 默认日志等级为 debug
};

// 设置 Logger 配置
export const setLoggerConfig = (config: LoggerConfig): void => {
    loggerConfig = { ...loggerConfig, ...config };
};

// 日志方法
export const LOGD = (...args: unknown[]): void => log({ type: 'debug', args });
export const LOGI = (...args: unknown[]): void => log({ type: 'info', args });
export const LOGW = (...args: unknown[]): void => log({ type: 'warn', args });
export const LOGE = (...args: unknown[]): void => log({ type: 'error', args });

const log = ({ type, args }: { type: LogType; args: unknown[] }): void => {
    // 过滤掉低于当前 logLevel 的日志
    if (!shouldLog(type)) return;

    // 默认第一个参数作为 TAG，后续作为消息
    const tag = args.length > 0 ? `[${String(args[0])}]` : ''; // 如果第一个参数存在，则当作 TAG
    const message = concatMessage(args.slice(1)); // 从第二个参数开始拼接消息

    // mobile 环境写入文件逻辑
    if (loggerConfig.platformType === 'Mobile' && loggerConfig.writeToFile) {
        writeToFile(`${tag} [${type.toUpperCase()}] ${message}`);
        return;
    }

    printLog({ type, message: `${tag} ${message}` });
};

// 判断日志类型是否应该被打印
const shouldLog = (type: LogType): boolean => {
    const logLevels: Record<LogType, number> = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    };

    const currentLevel = logLevels[loggerConfig.logLevel || 'debug'];
    const messageLevel = logLevels[type];

    // 如果当前日志等级低于或等于设置的日志等级，则打印
    return messageLevel >= currentLevel;
};

const concatMessage = (args: unknown[]): string => args.map(arg => String(arg)).join(' ');

// 打印日志
const printLog = ({ type, message }: LogOptions): void => {
    const { isDebugMode } = SDK.getBaseConfig();
    if (process.env.NODE_ENV === 'production') {
        return; // 生产环境不输出日志
    }

    switch (type) {
        case 'debug':
            isDebugMode && console.debug(message);
            break;
        case 'info':
            console.info(message);
            break;
        case 'warn':
            console.warn(message);
            break;
        case 'error':
            console.error(message);
            break;
        default:
            break;
    }
};

// 模拟写入文件（React Native 环境）
const writeToFile = (message: string): void => {
    // 写入文件逻辑
    console.log(`写入文件: ${message}`);
};
