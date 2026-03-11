import { InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import pool from "../connection";
import { RowDataPacket } from "mysql2";

export async function getAllFlights(): Promise<RowDataPacket[]> {
  logger.debug({ layer: "repository", fn: "getAllFlights" }, "Querying all flights");
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM flight_bookings");
    logger.info({ layer: "repository", fn: "getAllFlights", count: rows.length }, "Flights fetched successfully");
    return rows;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getAllFlights", err }, "DB query failed for getAllFlights");
    throw new InfraError("Failed to fetch flights from database");
  }
}

export async function getFlightById(id: number): Promise<RowDataPacket | null> {
  logger.debug({ layer: "repository", fn: "getFlightById", flightId: id }, "Querying flight by ID");
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM flight_bookings WHERE id = ?",
      [id]
    );
    const flight = rows[0] ?? null;
    if (flight) {
      logger.info({ layer: "repository", fn: "getFlightById", flightId: id }, "Flight fetched successfully");
    } else {
      logger.debug({ layer: "repository", fn: "getFlightById", flightId: id }, "No flight found for given ID");
    }
    return flight;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getFlightById", flightId: id, err }, "DB query failed for getFlightById");
    throw new InfraError("Failed to fetch flight bookings from database");
  }
}
