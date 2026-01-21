import { Request, Response, NextFunction } from "express";
declare const errorHandler: (err: Error, req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default errorHandler;
