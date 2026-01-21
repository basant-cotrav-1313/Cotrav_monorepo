import { AppError } from "./AppError";
export declare class InfraError extends AppError {
    constructor(message: string, code?: string);
}
