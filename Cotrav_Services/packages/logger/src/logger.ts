// src/infrastructure/logger/logger.ts
import pino, { Logger } from "pino";
import { streams } from "./streams";

const isDev = process.env.NODE_ENV === "production";

const logger: Logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    base: {
      service: process.env.SERVICE_NAME || "auth-service",
      env: process.env.NODE_ENV || "development"
    },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  isDev
    ? pino.transport({
        target: "pino-pretty",
        options: { colorize: true }
      })
    : pino.multistream(streams)
);

export default logger;
