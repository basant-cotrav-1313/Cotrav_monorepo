import { InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import pool from "../connection";
import { RowDataPacket } from "mysql2";

export interface City extends RowDataPacket {
  id: number;
  name: string;
  state_id: number;
  state_name: string;
  country_code: string;
  country_name: string;
}

const CITIES_QUERY = `
  SELECT c.*, s.name AS state_name, ct.country_code, ct.country_name
  FROM cities c
  INNER JOIN states s ON c.state_id = s.id
  INNER JOIN countries ct ON s.country_id = ct.id
`;

export async function getCities(): Promise<City[]> {
  logger.debug({ layer: "repository", fn: "getCities" }, "Querying all cities");
  try {
    const [rows] = await pool.query<City[]>(CITIES_QUERY);
    logger.info({ layer: "repository", fn: "getCities", count: rows.length }, "Cities fetched successfully");
    return rows;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getCities", err }, "DB query failed for getCities");
    throw new InfraError("Failed to fetch cities from database");
  }
}
