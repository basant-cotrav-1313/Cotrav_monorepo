import "dotenv/config";
import logger from "@cotrav/logger";
import express, { Request, Response } from "express";
import * as middlewares from "@cotrav/middlewares";
import swaggerUi from "swagger-ui-express";
import { testConnection } from "./infrastructure/db/connection";
import { swaggerSpec } from "./infrastructure/http/swagger";
import flightRoutes from "./api/routes/flightRoutes";
import companyRoutes from "./api/routes/companyRoutes";
import airportRoutes from "./api/routes/airportRoutes";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-correlation-id");


  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());
app.use(middlewares.correlationId);

app.use("/flights", flightRoutes);
app.use("/companies", companyRoutes);
app.use("/airports", airportRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

const PORT = process.env.PORT || 4002;

testConnection()
  .then(() => {
    logger.info("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Flight service running on port ${PORT}`);
      logger.info({ port: PORT, service: "flight-service" }, "Flight service listening");
    });
  })
  .catch((err) => {
    logger.error({ err }, "Database connection failed");
    logger.flush();
    process.exit(1);
  });

export default app;
