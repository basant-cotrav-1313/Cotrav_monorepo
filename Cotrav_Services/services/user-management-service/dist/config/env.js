"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    PORT: process.env.PORT || 5002,
    DB_URL: process.env.DB_URL,
    KEYCLOAK_URL: process.env.KEYCLOAK_URL,
    REALM: process.env.KEYCLOAK_REALM,
    CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET, // ← add this
};
//# sourceMappingURL=env.js.map