"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const BaseError_1 = require("./BaseError");
class AppError extends BaseError_1.BaseError {
    constructor(message, errorCode, statusCode = 400) {
        super(message, statusCode, errorCode, true);
    }
}
exports.AppError = AppError;
