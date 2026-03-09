import fs from "fs";
import path from "path";

/**
 * Ensures log directory exists (mkdir -p)
 */
export function ensureLogDir(serviceName: string): string {
  const baseDir: string = process.env.LOG_DIR ?? "./logs";
  const resolvedBaseDir: string = path.resolve(baseDir);
  const serviceDir: string = path.join(resolvedBaseDir, serviceName);

  fs.mkdirSync(serviceDir, { recursive: true });

  return serviceDir;
}
