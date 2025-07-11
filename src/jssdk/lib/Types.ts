import { AxiosRequestConfig } from 'axios';

// /**
//  * 请求方法类型
//  */
// export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

// 运行环境
export type Environment = 'development' | 'production' | 'test';

// 定义支持的平台类型
export type PlatformType = 'Web' | 'Mobile' | 'other'; // 未来可能扩展到其他环境

/**
 * 请求方法类型（枚举）
 */
export enum RequestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

/**
 * 请求配置接口
 */
export interface RequestConfig<T = any> extends AxiosRequestConfig {
    data?: T; // 请求体数据
    params?: Record<string, any>; // URL 参数
}
