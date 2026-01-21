import { AppError } from "./AppError";
export declare class BusinessError extends AppError {
    constructor(message: string, code?: string, status?: number);
}
