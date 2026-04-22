// src/config/db.ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  uri: process.env.DB_URL,
  connectionLimit: 10,
});