// src/bootstrap/env.ts
import path from "path";
import dotenv from "dotenv";

export function loadEnv() {
  const repoRoot = path.resolve(__dirname, "../../../..");
  const serviceRoot = process.cwd();

  // 1. Root-level shared env
  dotenv.config({
    path: path.join(repoRoot, ".env"),
  });

  // 2. Service-level env
  dotenv.config({
    path: path.join(serviceRoot, ".env"),
    override: true,
  });

  // 3. Local overrides (never commit)
  dotenv.config({
    path: path.join(serviceRoot, ".env.local"),
    override: true,
  });

  // 4. Environment-specific overrides
  if (process.env.NODE_ENV) {
    dotenv.config({
      path: path.join(serviceRoot, `.env.${process.env.NODE_ENV}`),
      override: true,
    });
  }
}
