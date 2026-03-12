import { Request, Response } from "express";
import * as flightService from "../../domain/services/flightService";
import * as bookingService from "../../domain/services/bookingService";

export async function getFlights(_req: Request, res: Response): Promise<void> {
  const flights = await flightService.getAllFlights();
  res.json(flights);
}

export async function getFlightById(req: Request, res: Response): Promise<void> {
  const flight = await flightService.getFlightById(req.params.id);
  res.json(flight);
}

export async function assignBooking(req: Request, res: Response): Promise<void> {
  const authId = Number((req as unknown as Record<string, unknown>)["authId"] ?? 0);
  const result = await bookingService.assignFlightBooking(req.body, authId);
  res.status(200).json(result);
}

