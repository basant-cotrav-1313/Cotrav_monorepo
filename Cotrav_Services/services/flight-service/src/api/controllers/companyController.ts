import { Request, Response } from "express";
import * as companyRepository from "../../infrastructure/db/repositories/companyRepository";

export async function getCompanies(_req: Request, res: Response): Promise<void> {
  const companies = await companyRepository.getCompanies();
  res.json(companies);
}
