import { Request, Response } from "express";
import * as companyRepository from "../../domain/repositories/companyRepository";

export async function getCompanies(_req: Request, res: Response): Promise<void> {
  const companies = await companyRepository.getCompanies();
  res.json(companies);
}
