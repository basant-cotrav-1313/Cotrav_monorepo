import { BaseError, InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import { Request, Response, NextFunction } from "express";

 function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Narrow unknown → BaseError
  if (err instanceof BaseError) {
    if (err instanceof InfraError) {
      logger.fatal({ err }, "Infrastructure error");
    } else {
      logger.error({ err }, "Application/Business error");
    }

    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message
    });
  }

  // Narrow unknown → Error
  if (err instanceof Error) {
    logger.fatal({ err }, "Unhandled Error");
  } else {
    logger.fatal({ err }, "Unknown throwable");
  }

  return res.status(500).json({
    errorCode: "INTERNAL_ERROR",
    message: "Something went wrong"
  });
}

export default errorHandler;