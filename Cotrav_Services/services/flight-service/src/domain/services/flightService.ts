import { AppError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import * as flightRepository from "../../infrastructure/db/repositories/flightRepository";
import { FlightByIdRequest, FlightResponse, toFlightResponse } from "../dtos/flight.dto";

export async function getAllFlights(): Promise<FlightResponse[]> {
  logger.info({ layer: "service", fn: "getAllFlights" }, "Fetching all flights");
  const rows = await flightRepository.getAllFlights();
  return rows.map(toFlightResponse);
}

export async function getFlightById(rawId: unknown): Promise<FlightResponse> {
  logger.info({ layer: "service", fn: "getFlightById", rawId }, "Fetching flight by ID");

  const dto = FlightByIdRequest.validate(rawId);  // DTO handles validation + AppError(400)

  const flight = await flightRepository.getFlightById(dto.id);
  if (!flight) {
    throw new AppError("Flight not found", "APP_ERROR", 404);
  }

  return toFlightResponse(flight);
}
