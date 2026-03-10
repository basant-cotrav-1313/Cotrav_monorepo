import { Request, Response } from "express";
import * as flightRepository from "../../domain/repositories/flightRepository";

export async function getFlights(_req: Request, res: Response): Promise<void> {
  const flights = await flightRepository.getAllFlights();
  res.json(flights);
}

export async function getFlightById(req: Request, res: Response): Promise<void> {
  const flight = await flightRepository.getFlightById(Number(req.params.id));
  if (!flight) {
    res.status(404).json({ message: "Flight not found" });
    return;
  }
  res.json(flight);
}
