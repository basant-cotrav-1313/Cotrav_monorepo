import { InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import pool from "../connection";
import { RowDataPacket } from "mysql2";

export interface Company extends RowDataPacket {
  id: number;
  corporate_name: string;
}

export async function getCompanies(): Promise<Company[]> {
  logger.debug({ layer: "repository", fn: "getCompanies" }, "Querying all companies");
  try {
    const [rows] = await pool.query<Company[]>(
      "SELECT id, corporate_name FROM admins"
    );
    logger.info({ layer: "repository", fn: "getCompanies", count: rows.length }, "Companies fetched successfully");
    return rows;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getCompanies", err }, "DB query failed for getCompanies");
    throw new InfraError("Failed to fetch companies from database");
  }
}
