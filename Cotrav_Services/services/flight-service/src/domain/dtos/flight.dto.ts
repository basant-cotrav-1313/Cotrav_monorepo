import { AppError } from "@cotrav/errors";
import { RowDataPacket } from "mysql2";

// ─── Request DTO ─────────────────────────────────────────────────────────────

export class FlightByIdRequest {
  readonly id: number;

  private constructor(id: number) {
    this.id = id;
  }

  static validate(raw: unknown): FlightByIdRequest {
    const id = Number(raw);
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid flight ID", "APP_ERROR", 400);
    }
    return new FlightByIdRequest(id);
  }
}

// ─── Response DTO ─────────────────────────────────────────────────────────────

export interface FlightResponse {
  id: number;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
}

export function toFlightResponse(row: RowDataPacket): FlightResponse {
  return {
    id: row.id,
    flight_number: row.flight_number,
    origin: row.origin,
    destination: row.destination,
    departure_time: row.departure_time,
    arrival_time: row.arrival_time,
  };
}
