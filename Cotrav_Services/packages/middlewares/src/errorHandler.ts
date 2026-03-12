import { BaseError, InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Narrow unknown → BaseError
  const correlationId = req.correlationId;

  if (err instanceof BaseError) {
    if (err instanceof InfraError) {
      logger.error({ err, correlationId }, "Infrastructure error");
    } else {
      logger.error({ err, correlationId }, "Application/Business error");
    }
    logger.flush();

    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message,
      correlationId
    });
  }

  // Narrow unknown → Error
  logger.error({ err, correlationId }, err instanceof Error ? "Unhandled Error" : "Unknown throwable");
  logger.flush();

  return res.status(500).json({
    errorCode: "INTERNAL_ERROR",
    message: "Something went wrong",
    correlationId: req.correlationId
  });
}

export default errorHandler;