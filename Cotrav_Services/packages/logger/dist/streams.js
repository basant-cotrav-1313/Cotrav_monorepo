"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streams = void 0;
// src/infrastructure/logger/streams.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LEVEL_NUMBERS = {
    trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60
};
const serviceName = process.env.SERVICE_NAME || "auth-service";
const baseLogDir = process.env.LOG_DIR || path_1.default.join(process.cwd(), "logs");
const logPaths = {};
["debug", "info", "warn", "error"].forEach((level) => {
    const logDir = path_1.default.join(baseLogDir, serviceName, level);
    fs_1.default.mkdirSync(logDir, { recursive: true });
    logPaths[level] = path_1.default.join(logDir, `${new Date().toISOString().slice(0, 10)}.log`);
});
const routerStream = {
    write(msg) {
        try {
            const log = JSON.parse(msg);
            const levelName = Object.keys(LEVEL_NUMBERS).find((k) => LEVEL_NUMBERS[k] === log.level);
            if (levelName && logPaths[levelName]) {
                fs_1.default.appendFileSync(logPaths[levelName], msg);
            }
        }
        catch (e) {
            console.log("[streams] parse error:", e);
        }
    }
};
exports.streams = [
    { level: "trace", stream: routerStream }
];
