export declare abstract class BaseError extends Error {
    readonly statusCode: number;
    readonly errorCode: string;
    readonly isOperational: boolean;
    protected constructor(message: string, statusCode: number, errorCode: string, isOperational?: boolean);
}
//# sourceMappingURL=BaseError.d.ts.map