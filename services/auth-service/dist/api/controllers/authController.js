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
    try {
        const user = await authService.register(req.body);
        res.json(user);
    }
    catch (err) {
        logger_1.default.error(err.message);
        res.status(400).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json(token);
    }
    catch (err) {
        logger_1.default.error(err.message);
        res.status(401).json({ error: err.message });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map