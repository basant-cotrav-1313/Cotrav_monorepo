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
      logger.error({ err }, "Infrastructure error");
    } else {
      logger.error({ err }, "Application/Business error");
    }
    logger.flush();

    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message
    });
  }

  // Narrow unknown → Error
  if (err instanceof Error) {
    logger.error({ err }, "Unhandled Error");
  } else {
    logger.error({ err }, "Unknown throwable");
  }
  logger.flush();

  return res.status(500).json({
    errorCode: "INTERNAL_ERROR",
    message: "Something went wrong"
  });
}

export default errorHandler;