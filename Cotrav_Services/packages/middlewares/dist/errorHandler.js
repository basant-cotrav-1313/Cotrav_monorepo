"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
function errorHandler(err, req, res, _next) {
    // Narrow unknown → BaseError
    if (err instanceof errors_1.BaseError) {
        if (err instanceof errors_1.InfraError) {
            logger_1.default.error({ err }, "Infrastructure error");
        }
        else if (err.statusCode >= 500) {
            logger_1.default.error({ err }, "Application/Business error");
        }
        else {
            logger_1.default.warn({ err }, "Application/Business error");
        }
        logger_1.default.flush();
        return res.status(err.statusCode).json({
            errorCode: err.errorCode,
            message: err.message,
            correlationId: req.correlationId
        });
    }
    // Narrow unknown → Error
    if (err instanceof Error) {
        logger_1.default.error({ err }, "Unhandled Error");
    }
    else {
        logger_1.default.warn({ err }, "Unknown throwable");
    }
    logger_1.default.flush();
    return res.status(500).json({
        errorCode: "INTERNAL_ERROR",
        message: "Something went wrong",
        correlationId: req.correlationId
    });
}
exports.default = errorHandler;
