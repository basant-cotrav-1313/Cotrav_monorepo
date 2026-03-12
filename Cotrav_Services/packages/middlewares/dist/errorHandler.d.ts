import { Request, Response, NextFunction } from "express";
declare function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): Response<any, Record<string, any>>;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map