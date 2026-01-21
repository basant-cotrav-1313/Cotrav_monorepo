import { Request, Response } from "express";
import logger from "@cotrav/logger";
import { AuthService } from "../../domain/services/authService";

const authService = new AuthService();


export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (err: any) {
    logger.logger.error(err.message);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    res.json(token);
  } catch (err: any) {
    logger.logger.error(err.message);
    res.status(401).json({ error: err.message });
  }
};
