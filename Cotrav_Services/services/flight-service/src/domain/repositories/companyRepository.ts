import pool from "../../infrastructure/db/connection";
import { RowDataPacket } from "mysql2";

export interface Company extends RowDataPacket {
  id: number;
  corporate_name: string;
}

export async function getCompanies(): Promise<Company[]> {
  const [rows] = await pool.query<Company[]>(
    "SELECT id, corporate_name FROM admins"
  );
  return rows;
}
