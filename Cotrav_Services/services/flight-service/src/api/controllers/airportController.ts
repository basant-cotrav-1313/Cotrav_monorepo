import { Request, Response } from "express";
import * as airportRepository from "../../infrastructure/db/repositories/airportRepository";

export async function getAirports(_req: Request, res: Response): Promise<void> {
  const airports = await airportRepository.getAirports();
  res.json(airports);
}
