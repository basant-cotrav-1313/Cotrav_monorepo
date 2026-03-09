import { BaseError } from "./BaseError";

export class InfraError extends BaseError {
  constructor(
    message: string,
    errorCode = "INFRA_ERROR",
    statusCode = 500
  ) {
    super(message, statusCode, errorCode, false);
  }
}
