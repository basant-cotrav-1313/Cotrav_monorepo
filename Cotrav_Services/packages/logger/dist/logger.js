"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/logger/logger.ts
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const streams_1 = require("./streams");
const isDev = process.env.NODE_ENV === "development";
const logLevel = (process.env.LOG_LEVEL || "info");
const allStreams = isDev
    ? [
        ...streams_1.streams,
        {
            level: logLevel,
            stream: (0, pino_pretty_1.default)({ colorize: true, sync: true })
        }
    ]
    : streams_1.streams;
const logger = (0, pino_1.default)({
    level: logLevel,
    base: {
        service: process.env.SERVICE_NAME || "auth-service",
        env: process.env.NODE_ENV || "development"
    },
    timestamp: pino_1.default.stdTimeFunctions.isoTime
}, pino_1.default.multistream(allStreams));
exports.default = logger;
