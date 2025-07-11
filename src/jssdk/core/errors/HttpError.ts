import { BaseError } from './BaseError';

export class HttpError extends BaseError {
    constructor(statusCode: number, message: string, responseData?: unknown) {
        super('HttpError', message, statusCode, responseData);
    }
}
