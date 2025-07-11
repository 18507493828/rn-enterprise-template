export class BaseError extends Error {
    constructor(
        public name: string,
        public message: string,
        public code?: number,
        public data?: unknown,
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            data: this.data ?? null, // 确保 `data` 为空时返回 `null` 而不是 `undefined`
        };
    }

    toString(): string {
        return `${this.name} (Code: ${this.code}): ${this.message}${
            this.data !== undefined ? ` | Data: ${JSON.stringify(this.data)}` : ''
        }`;
    }
}
