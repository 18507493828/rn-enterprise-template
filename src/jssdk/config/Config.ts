import HttpClient from '@jssdk/lib/HttpClient';
import { Environment } from '../lib/Types';

// 定义环境变量配置
interface Config {
    baseURL: string;
    timeout?: number;
}

// 根据环境生成配置
const config: Record<Environment, Config> = {
    development: {
        baseURL: 'http://192.168.5.90:3000/api/', // 开发
        timeout: 30000, // 请求超时时间
    },
    production: {
        baseURL: 'http://192.168.5.90:3000/api/', // 生产
        timeout: 30000,
    },
    test: {
        baseURL: 'http://192.168.5.90:3000/api/', // 测试
        timeout: 30000,
    },
};

// 获取当前环境变量
const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

// 获取对应的请求配置
let requestConfig = config[environment];

// 设置 config 配置
export const setDefaultConfig = (config: Config): void => {
    if (config?.baseURL) {
        requestConfig = { ...requestConfig, ...config };
        HttpClient.resetInstance();
    }
};

export { requestConfig };
