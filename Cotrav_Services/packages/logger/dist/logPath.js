"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLogDir = ensureLogDir;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Ensures log directory exists (mkdir -p)
 */
function ensureLogDir(serviceName) {
    const baseDir = process.env.LOG_BASE_DIR ?? process.env.LOG_DIR ?? "./logs";
    const resolvedBaseDir = path_1.default.resolve(baseDir);
    const serviceDir = path_1.default.join(resolvedBaseDir, serviceName);
    fs_1.default.mkdirSync(serviceDir, { recursive: true });
    return serviceDir;
}
