// src/infrastructure/logger/streams.ts
import fs from "fs";
import path from "path";
import { Level, type StreamEntry } from "pino";

const LEVEL_NUMBERS: Record<string, number> = {
  trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60
};

const serviceName = process.env.SERVICE_NAME || "auth-service";
const baseLogDir = path.resolve(process.env.LOG_DIR || path.join(process.cwd(), "logs"));

process.stderr.write(`[streams] log dir: ${baseLogDir}\n`);

const logPaths: Record<string, string> = {};

(["debug", "info", "warn", "error"] as Level[]).forEach((level) => {
  const logDir = path.join(baseLogDir, serviceName, level);
  fs.mkdirSync(logDir, { recursive: true });
  logPaths[level] = path.join(logDir, `${new Date().toISOString().slice(0, 10)}.log`);
});

const routerStream = {
  write(msg: string) {
    try {
      const log = JSON.parse(msg);
      const levelName = Object.keys(LEVEL_NUMBERS).find(
        (k) => LEVEL_NUMBERS[k] === log.level
      );
      if (levelName && logPaths[levelName]) {
        fs.appendFileSync(logPaths[levelName], msg);
      }
    } catch (e) {
      process.stderr.write(`[streams] write error: ${e}\n`);
    }
  }
};

export const streams: StreamEntry[] = [
  { level: "trace", stream: routerStream }
];