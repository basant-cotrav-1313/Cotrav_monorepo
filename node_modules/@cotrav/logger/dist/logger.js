"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// src/infrastructure/logger/logger.ts
const pino_1 = __importDefault(require("pino"));
const streams_1 = require("./streams");
console.log("LOG_DIR in logger.ts:", process.env.LOG_DIR);
console.log("NODE_ENV in logger.ts:", process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === "production";
console.log("isDev in logger.ts:", isDev);
const logger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || "info",
    base: {
        service: process.env.SERVICE_NAME || "auth-service",
        env: process.env.NODE_ENV || "development"
    },
    timestamp: pino_1.default.stdTimeFunctions.isoTime
}, isDev
    ? pino_1.default.transport({
        target: "pino-pretty",
        options: { colorize: true }
    })
    : pino_1.default.multistream(streams_1.streams));
exports.logger = logger;
