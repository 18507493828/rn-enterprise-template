import { BaseError } from './BaseError';

export class ApiError extends BaseError {
    constructor(code: number, message: string, data?: unknown) {
        super('ApiError', message, code, data);
    }
}
