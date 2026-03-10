"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessError = void 0;
const BaseError_1 = require("./BaseError");
class BusinessError extends BaseError_1.BaseError {
    constructor(message, errorCode, statusCode = 409) {
        super(message, statusCode, errorCode, true);
    }
}
exports.BusinessError = BusinessError;
