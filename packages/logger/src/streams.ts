// src/infrastructure/logger/streams.ts
import fs from "fs";
import path from "path";
import pino, { Level, type StreamEntry } from "pino";

const serviceName = process.env.SERVICE_NAME || "auth-service";
const baseLogDir = process.env.LOG_DIR || path.join(process.cwd(), "logs");

function createStream(level: Level): StreamEntry {
  const logDir = path.join(baseLogDir, serviceName, level);
  fs.mkdirSync(logDir, { recursive: true });

  const filePath = path.join(
    logDir,
    `${new Date().toISOString().slice(0, 10)}.log`
  );

  return {
    level,
    stream: pino.destination({
      dest: filePath,
      sync: false
    })
  };
}

export const streams: StreamEntry[] = [
  createStream("info"),
  createStream("error"),
  createStream("debug"),
  createStream("warn")
];
