// src/infrastructure/logger/logger.ts
import pino, { Logger, Level } from "pino";
import pretty from "pino-pretty";
import { streams } from "./streams";

const isDev = process.env.NODE_ENV === "development";
const logLevel = (process.env.LOG_LEVEL || "info") as Level;

const allStreams = isDev
  ? [
      ...streams,
      {
        level: logLevel,
        stream: pretty({ colorize: true, sync: true })
      }
    ]
  : streams;

const logger: Logger = pino(
  {
    level: logLevel,
    base: {
      service: process.env.SERVICE_NAME || "auth-service",
      env: process.env.NODE_ENV || "development"
    },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  pino.multistream(allStreams)
);

export default logger;
