"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakService = void 0;
// src/services/keycloak.service.ts
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
class KeycloakService {
    constructor() {
        this.baseUrl = env_1.ENV.KEYCLOAK_URL;
        // async getAllUsers(token: string) {  // ← add this
        //   const res = await axios.get(
        //     `${this.baseUrl}/admin/realms/${ENV.REALM}/users`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   );
        //   return res.data;
        // }
    }
    async getAdminToken() {
        try {
            const res = await axios_1.default.post(`${this.baseUrl}/realms/${env_1.ENV.REALM}/protocol/openid-connect/token`, // ← fix realm
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: env_1.ENV.CLIENT_ID,
                client_secret: env_1.ENV.CLIENT_SECRET,
            }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
            return res.data.access_token;
        }
        catch (err) {
            console.log("getAdminToken error:", err.response?.data);
            throw err;
        }
    }
    // ← add this
    async getAllUsers() {
        console.log("getAllUsers called"); // ← add this
        const token = await this.getAdminToken();
        console.log("token:", token); // ← add this
        const res = await axios_1.default.get(`${this.baseUrl}/admin/realms/${env_1.ENV.REALM}/users`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
    }
    async createUser(token, userData) {
        const res = await axios_1.default.post(`${this.baseUrl}/admin/realms/${env_1.ENV.REALM}/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.status === 201;
    }
    async getUserByEmail(token, email) {
        const res = await axios_1.default.get(`${this.baseUrl}/admin/realms/${env_1.ENV.REALM}/users?email=${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data?.[0];
    }
    async resetPassword(token, userId, password) {
        await axios_1.default.put(`${this.baseUrl}/admin/realms/${env_1.ENV.REALM}/users/${userId}/reset-password`, {
            type: "password",
            value: password,
            temporary: false,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
exports.KeycloakService = KeycloakService;
//# sourceMappingURL=keycloak.service.js.map