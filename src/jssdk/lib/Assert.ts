import { LOGE } from './Logger';

class Assert {
    private _condition: boolean;

    constructor() {
        this._condition = true;
    }

    /**
     * 设置断言条件
     * @param c 条件 (boolean)
     * @returns 当前实例，支持链式调用
     */
    condition(c: boolean): this {
        this._condition = c;
        return this;
    }

    /**
     * 验证条件是否为真，不为真则抛出错误信息
     * @param message 错误信息
     * @param tag 日志标记，用于定位错误
     */
    msg(tag: string, message: string): void {
        if (!this._condition) {
            // 打印错误日志
            LOGE(tag, message);
            throw new Error(message);
        }
    }
}

// 创建 ENSURE 函数，支持链式调用
export const ENSURE = (condition: boolean) => new Assert().condition(condition);
