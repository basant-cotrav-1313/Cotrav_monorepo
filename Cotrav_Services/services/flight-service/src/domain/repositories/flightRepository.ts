import pool from "../../infrastructure/db/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function getAllFlights(): Promise<RowDataPacket[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM flights");
  return rows;
}

export async function getFlightById(id: number): Promise<RowDataPacket | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM flights WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
}
