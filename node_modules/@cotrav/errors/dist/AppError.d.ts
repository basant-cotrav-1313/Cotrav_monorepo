export declare abstract class AppError extends Error {
    message: string;
    statusCode: number;
    errorCode: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number, errorCode: string, isOperational?: boolean);
}
