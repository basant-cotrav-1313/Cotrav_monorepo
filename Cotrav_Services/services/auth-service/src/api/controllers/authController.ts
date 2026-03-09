import { Request, Response } from "express";
import logger from "@cotrav/logger";
import { AuthService } from "../../domain/services/authService";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  logger.info({ path: req.path }, "Register request received");
  const user = await authService.register(req.body);
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  logger.info({ path: req.path, username: req.body?.username ?? req.body?.email }, "Login request received");
  const token = await authService.login(req.body);
  res.json(token);
};
