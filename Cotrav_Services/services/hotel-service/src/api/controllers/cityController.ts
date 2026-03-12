import { Request, Response } from "express";
import * as cityRepository from "../../infrastructure/db/repositories/cityRepository";

export async function getCities(_req: Request, res: Response): Promise<void> {
  const cities = await cityRepository.getCities();
  res.json(cities);
}
