import { AppError } from "./AppError";
export class BusinessError extends AppError {
  constructor(message: string, code = "BUSINESS_ERROR", status = 409) {
    super(message, status, code);
  }
}