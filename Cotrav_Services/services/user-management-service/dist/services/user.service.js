"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// src/services/user.service.ts
const db_1 = require("../config/db");
const keycloak_service_1 = require("./keycloak.service");
const keycloak = new keycloak_service_1.KeycloakService();
class UserService {
    async createUser(input, token) {
        const { email, username, firstName, lastName } = input;
        const userData = {
            username,
            email,
            enabled: true,
            emailVerified: true,
            firstName,
            lastName,
        };
        // 1. Create in Keycloak
        const created = await keycloak.createUser(token, userData);
        if (!created) {
            throw new Error("Keycloak user creation failed");
        }
        // 2. Fetch user ID
        const kcUser = await keycloak.getUserByEmail(token, email);
        if (!kcUser?.id) {
            throw new Error("User created but ID not found");
        }
        // 3. Save in DB
        await db_1.db.execute(`INSERT INTO keycloak_users 
      (email, username, keycloak_user_id) VALUES (?, ?, ?)`, [email, username, kcUser.id]);
        return {
            id: kcUser.id,
            email,
        };
    }
    //  async getAllUsers(token: string) {  // ← add this
    //   const users = await keycloak.getAllUsers(token);
    //   return {
    //     total_users: users.length,
    //     total_imported: 0,
    //     total_duplicate: 0,
    //     total_failed: 0,
    //     users,
    //   };
    // }
    async getAllUsers() {
        console.log("userService getAllUsers called");
        const users = await keycloak.getAllUsers(); // ← no token
        return {
            total_users: users.length,
            total_imported: 0,
            total_duplicate: 0,
            total_failed: 0,
            users,
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map