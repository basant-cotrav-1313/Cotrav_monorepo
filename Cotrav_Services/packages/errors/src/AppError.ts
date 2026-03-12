import { BaseError } from "./BaseError";

export class AppError extends BaseError {
  constructor(
    message: string, 
    errorCode = "APP_ERROR",
    statusCode = 400
  ) {
    super(message, statusCode, errorCode, true);
  }
}
