import { Request, Response, NextFunction } from "express";

// Extend Express Request to carry correlationId
declare global {
  namespace Express {
    interface Request {
      correlationId: string;
    }
  }
}

export function correlationId(req: Request, res: Response, next: NextFunction): void {
  const id =
    (req.headers["x-correlation-id"] as string) ||
    crypto.randomUUID();

  req.correlationId = id;
  res.setHeader("x-correlation-id", id);
  next();
}