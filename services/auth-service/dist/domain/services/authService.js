"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async register(user) {
        user.password = await bcryptjs_1.default.hash(user.password, 10);
        return user;
    }
    async login({ email, password }) {
        const fakeUser = {
            id: 1,
            email: "admin@test.com",
            password: await bcryptjs_1.default.hash("admin123", 10),
            roles: ["admin"]
        };
        const valid = await bcryptjs_1.default.compare(password, fakeUser.password);
        if (!valid)
            throw new Error("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ id: fakeUser.id, roles: fakeUser.roles }, process.env.JWT_SECRET || "secret", { expiresIn: "15m" });
        return { token };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map