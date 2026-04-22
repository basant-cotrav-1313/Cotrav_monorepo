"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// src/config/db.ts
const promise_1 = __importDefault(require("mysql2/promise"));
exports.db = promise_1.default.createPool({
    uri: process.env.DB_URL,
    connectionLimit: 10,
});
//# sourceMappingURL=db.js.map