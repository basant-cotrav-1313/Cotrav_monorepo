import { Request, Response } from "express";
import * as flightService from "../../domain/services/flightService";

export async function getFlights(_req: Request, res: Response): Promise<void> {
  const flights = await flightService.getAllFlights();
  res.json(flights);
}

export async function getFlightById(req: Request, res: Response): Promise<void> {
  const flight = await flightService.getFlightById(req.params.id);
  res.json(flight);
}

