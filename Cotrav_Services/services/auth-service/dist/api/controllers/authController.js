"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const logger_1 = __importDefault(require("@cotrav/logger"));
const authService_1 = require("../../domain/services/authService");
const authService = new authService_1.AuthService();
const register = async (req, res) => {
    logger_1.default.info({ path: req.path }, "Register request received");
    const user = await authService.register(req.body);
    res.json(user);
};
exports.register = register;
const login = async (req, res) => {
    logger_1.default.info({ path: req.path, username: req.body?.username ?? req.body?.email }, "Login request received");
    const token = await authService.login(req.body);
    res.json(token);
};
exports.login = login;
//# sourceMappingURL=authController.js.map