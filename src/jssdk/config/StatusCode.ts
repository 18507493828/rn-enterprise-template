export default {
    // 客户端错误 (4xx)
    CLIENT_BAD_REQUEST: 400, // 请求参数错误
    CLIENT_UNAUTHORIZED: 401, // 未授权
    CLIENT_FORBIDDEN: 403, // 禁止访问
    CLIENT_NOT_FOUND: 404, // 资源未找到
    CLIENT_METHOD_NOT_ALLOWED: 405, // 方法不被允许
    CLIENT_REQUEST_TIMEOUT: 408, // 请求超时
    CLIENT_TOO_MANY_REQUESTS: 429, // 请求过于频繁

    // 服务器错误 (5xx)
    SERVER_INTERNAL_ERROR: 500, // 服务器内部错误
    SERVER_BAD_GATEWAY: 502, // 网关错误
    SERVER_UNAVAILABLE: 503, // 服务不可用
    SERVER_GATEWAY_TIMEOUT: 504, // 网关超时
};