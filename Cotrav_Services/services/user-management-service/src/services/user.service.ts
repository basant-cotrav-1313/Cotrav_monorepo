// src/services/user.service.ts
import { db } from "../config/db";
import { KeycloakService } from "./keycloak.service";

const keycloak = new KeycloakService();

export class UserService {
  async createUser(input: any, token: string) {
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
    await db.execute(
      `INSERT INTO keycloak_users 
      (email, username, keycloak_user_id) VALUES (?, ?, ?)`,
      [email, username, kcUser.id]
    );

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

async getAllKeycloakRoles() {
  const roles = await keycloak.getAllKeycloakRoles();
  return roles;
}
}