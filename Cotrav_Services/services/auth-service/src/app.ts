import logger from "@cotrav/logger";
import express, { Request, Response } from "express";
import * as middlewares from "@cotrav/middlewares";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./api/routes/authRoutes";
import testRoutes from "./api/routes/testRoutes";
import { swaggerSpec } from "./infrastructure/http/swagger";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/test", testRoutes);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns service liveness status.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
app.get(
  "/health",
  middlewares.asyncHandler(async (_req: Request, res: Response) => {
    res.send("OK");
  })
);

app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info({ port: PORT, service: "auth-service" }, "Auth service listening");
});

export default app;
