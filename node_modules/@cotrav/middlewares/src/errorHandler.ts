import { Request, Response, NextFunction } from "express";
import { AppError } from "@cotrav/errors";
import { logger } from "@cotrav/logger";

 const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn({ err }, "Handled application error");
    return res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message
    });
  }

  logger.error({ err }, "Unhandled system error");
  res.status(500).json({
    success: false,
    errorCode: "INTERNAL_ERROR",
    message: "Something went wrong"
  });
};

export default errorHandler;