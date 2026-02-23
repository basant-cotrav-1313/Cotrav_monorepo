"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = loadEnv;
// src/bootstrap/env.ts
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
function loadEnv() {
    const repoRoot = path_1.default.resolve(__dirname, "../../../..");
    const serviceRoot = process.cwd();
    // 1. Root-level shared env
    dotenv_1.default.config({
        path: path_1.default.join(repoRoot, ".env"),
    });
    // 2. Service-level env
    dotenv_1.default.config({
        path: path_1.default.join(serviceRoot, ".env"),
        override: true,
    });
    // 3. Local overrides (never commit)
    dotenv_1.default.config({
        path: path_1.default.join(serviceRoot, ".env.local"),
        override: true,
    });
    // 4. Environment-specific overrides
    if (process.env.NODE_ENV) {
        dotenv_1.default.config({
            path: path_1.default.join(serviceRoot, `.env.${process.env.NODE_ENV}`),
            override: true,
        });
    }
}
//# sourceMappingURL=env.js.map