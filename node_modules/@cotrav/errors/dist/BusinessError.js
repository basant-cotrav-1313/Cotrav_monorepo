"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessError = void 0;
const AppError_1 = require("./AppError");
class BusinessError extends AppError_1.AppError {
    constructor(message, code = "BUSINESS_ERROR", status = 409) {
        super(message, status, code);
    }
}
exports.BusinessError = BusinessError;
