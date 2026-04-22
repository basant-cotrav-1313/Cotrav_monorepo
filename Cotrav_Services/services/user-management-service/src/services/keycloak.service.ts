// src/services/keycloak.service.ts
import axios from "axios";
import { ENV } from "../config/env";

export class KeycloakService {
  private baseUrl = ENV.KEYCLOAK_URL;


  private async getAdminToken(): Promise<string> {
  try {
    const res = await axios.post(
      `${this.baseUrl}/realms/${ENV.REALM}/protocol/openid-connect/token`, // ← fix realm
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: ENV.CLIENT_ID,
        client_secret: ENV.CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return res.data.access_token;
  } catch (err: any) {
    console.log("getAdminToken error:", err.response?.data);
    throw err;
  }
}

  // ← add this
  async getAllUsers() {
  console.log("getAllUsers called"); // ← add this
  const token = await this.getAdminToken();
  console.log("token:", token); // ← add this
  const res = await axios.get(
    `${this.baseUrl}/admin/realms/${ENV.REALM}/users`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

  async createUser(token: string, userData: any) {
    const res = await axios.post(
      `${this.baseUrl}/admin/realms/${ENV.REALM}/users`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status === 201;
  }

  async getUserByEmail(token: string, email: string) {
    const res = await axios.get(
      `${this.baseUrl}/admin/realms/${ENV.REALM}/users?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.[0];
  }

  async resetPassword(token: string, userId: string, password: string) {
    await axios.put(
      `${this.baseUrl}/admin/realms/${ENV.REALM}/users/${userId}/reset-password`,
      {
        type: "password",
        value: password,
        temporary: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }


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

  async getAllKeycloakRoles() {
  const token = await this.getAdminToken();
  const clientUuid = await this.getClientUuid(token);
  const res = await axios.get(
    `${this.baseUrl}/admin/realms/${ENV.REALM}/clients/${clientUuid}/roles`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

private async getClientUuid(token: string): Promise<string> {
  const res = await axios.get(
    `${this.baseUrl}/admin/realms/${ENV.REALM}/clients?clientId=${ENV.CLIENT_ID}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data[0].id;
}
}