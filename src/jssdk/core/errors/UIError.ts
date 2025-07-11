import { BaseError } from './BaseError';

export class UIError extends BaseError {
    constructor(message: string, details?: unknown) {
        super('UIError', message);
    }
}
