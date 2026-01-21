"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraError = void 0;
const AppError_1 = require("./AppError");
class InfraError extends AppError_1.AppError {
    constructor(message, code = "INFRA_ERROR") {
        super(message, 500, code, false);
    }
}
exports.InfraError = InfraError;
