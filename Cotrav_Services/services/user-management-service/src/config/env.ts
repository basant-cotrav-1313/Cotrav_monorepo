// src/config/env.ts
import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5002,
  DB_URL: process.env.DB_URL!,
  KEYCLOAK_URL: process.env.KEYCLOAK_URL!,
  REALM: process.env.KEYCLOAK_REALM!,
  CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID!,
  CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET!, // ← add this
};