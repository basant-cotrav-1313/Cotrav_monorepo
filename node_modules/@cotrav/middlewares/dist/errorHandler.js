"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@cotrav/errors");
const logger_1 = require("@cotrav/logger");
const errorHandler = (err, req, res, _next) => {
    if (err instanceof errors_1.AppError) {
        logger_1.logger.warn({ err }, "Handled application error");
        return res.status(err.statusCode).json({
            success: false,
            errorCode: err.errorCode,
            message: err.message
        });
    }
    logger_1.logger.error({ err }, "Unhandled system error");
    res.status(500).json({
        success: false,
        errorCode: "INTERNAL_ERROR",
        message: "Something went wrong"
    });
};
exports.default = errorHandler;
