import { AppError } from "./AppError";
export class InfraError extends AppError {
  constructor(message: string, code = "INFRA_ERROR") {
    super(message, 500, code, false);
  }
}