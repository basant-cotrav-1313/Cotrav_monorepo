
import dotenv from "dotenv";
dotenv.config();


import  {logger } from "@cotrav/logger";

import express, { Request, Response, NextFunction } from "express";
const app = express();
import authRoutes from "./api/routes/authRoutes";
import * as middlewares  from "@cotrav/middlewares";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./infrastructure/http/swagger";
import testRoutes from "./api/routes/testRoutes";

//var logger = logger.logger;
//const mylog = logger;


console.log("ENV:", process.env.LOG_DIR);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/test", testRoutes);

logger.info("INFO::Inside app.ts - before /health route");
logger.error("ERR: Indise app.ts - before / health route" );
logger.warn("Wrn: Indise app.ts - before / health route" );

/*app.get("/health", (_req, res) => {
  logger.info("Health check hit");
  res.send("OK");
}); */

// Wrap route handler
app.get(
  "/health",
  middlewares.asyncHandler(async (_req: Request, res: Response) => {
    res.send("OK");
  })
);
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info("Auth Service started successfully");
  logger.info({ port: PORT, service: "auth-service" }, "Service listening");
  logger.info(`Auth service running on port ${PORT}`);

  console.log("Auth Service started successfully");
  console.log({ port: PORT, service: "auth-service" }, "Service listening");
  console.log(`Auth service running on port ${PORT}`);
  console.log(`Documentation available at /docs`);
});


export default app;