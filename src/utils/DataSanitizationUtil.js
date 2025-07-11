const SENSITIVE_KEYS = ['password', 'token'];

/**
 * 数据脱敏
 * @param args
 * @returns
 */
export function filterSensitiveData(args) {
    if (!args || typeof args !== 'object') return args; // 只处理对象和数组

    if (Array.isArray(args)) {
        return args.map(filterSensitiveData); // 递归处理数组
    }

    return Object.keys(args).reduce((acc, key) => {
        acc[key] = SENSITIVE_KEYS.includes(key) ? '***' : filterSensitiveData(args[key]);
        return acc;
    }, {});
}
