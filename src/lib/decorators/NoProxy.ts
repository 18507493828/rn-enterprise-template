const NO_PROXY_MARK = Symbol('NO_PROXY');

/**
 * 装饰器：用于标记不需要代理的方法
 * @param target
 * @param propertyKey
 */
export function NoProxy(
    value: (this: unknown, ...args: any[]) => unknown,
    context: ClassMethodDecoratorContext,
) {
    // TypeScript 标准装饰器提案中 context.metadata 是可写字段
    if (context.metadata) {
        context.metadata.noProxy = true;
    }

    // 同时给函数本身挂一个标记（兼容非 metadata 环境）
    Reflect.defineProperty(value, NO_PROXY_MARK, {
        value: true,
        configurable: false,
        enumerable: false,
        writable: false,
    });
}

/**
 * 判断方法是否被标记为不代理
 * @param method
 * @returns
 */
export function isNoProxyMethod(target: any, methodName: string): boolean {
    const descriptor = Object.getOwnPropertyDescriptor(target, methodName);
    const fn = descriptor?.value;
    return !!(fn && (fn as any)[NO_PROXY_MARK]);
}
