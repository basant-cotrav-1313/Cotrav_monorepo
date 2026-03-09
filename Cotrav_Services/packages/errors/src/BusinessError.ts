import { BaseError } from "./BaseError";

export class BusinessError extends BaseError {
  constructor(
    message: string, 
    errorCode: "BUSINESS_ERROR",
    statusCode = 409
  ) {
    super(message, statusCode, errorCode, true);
  }
}
