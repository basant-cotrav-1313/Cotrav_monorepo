"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streams = void 0;
// src/infrastructure/logger/streams.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pino_1 = __importDefault(require("pino"));
const serviceName = process.env.SERVICE_NAME || "auth-service";
const baseLogDir = process.env.LOG_DIR || path_1.default.join(process.cwd(), "logs");
function createStream(level) {
    const logDir = path_1.default.join(baseLogDir, serviceName, level);
    fs_1.default.mkdirSync(logDir, { recursive: true });
    const filePath = path_1.default.join(logDir, `${new Date().toISOString().slice(0, 10)}.log`);
    return {
        level,
        stream: pino_1.default.destination({
            dest: filePath,
            sync: false
        })
    };
}
exports.streams = [
    createStream("info"),
    createStream("error"),
    createStream("debug"),
    createStream("warn")
];
