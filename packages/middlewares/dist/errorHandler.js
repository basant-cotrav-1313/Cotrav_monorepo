"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
function errorHandler(err, _req, res, _next) {
    // Narrow unknown → BaseError
    if (err instanceof errors_1.BaseError) {
        if (err instanceof errors_1.InfraError) {
            logger_1.default.fatal({ err }, "Infrastructure error");
        }
        else {
            logger_1.default.error({ err }, "Application/Business error");
        }
        return res.status(err.statusCode).json({
            errorCode: err.errorCode,
            message: err.message
        });
    }
    // Narrow unknown → Error
    if (err instanceof Error) {
        logger_1.default.fatal({ err }, "Unhandled Error");
    }
    else {
        logger_1.default.fatal({ err }, "Unknown throwable");
    }
    return res.status(500).json({
        errorCode: "INTERNAL_ERROR",
        message: "Something went wrong"
    });
}
exports.default = errorHandler;
