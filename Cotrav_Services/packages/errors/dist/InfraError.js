"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraError = void 0;
const BaseError_1 = require("./BaseError");
class InfraError extends BaseError_1.BaseError {
    constructor(message, errorCode = "INFRA_ERROR", statusCode = 500) {
        super(message, statusCode, errorCode, false);
    }
}
exports.InfraError = InfraError;
