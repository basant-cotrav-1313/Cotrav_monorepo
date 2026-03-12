import { Request, Response } from "express";
import * as cityRepository from "../../infrastructure/db/repositories/cityRepository";

export async function getCities(req: Request, res: Response): Promise<void> {
  const cities = await cityRepository.getCities();
  res.json({ correlationId: req.correlationId, data: cities });
}
