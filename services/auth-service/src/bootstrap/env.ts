// src/bootstrap/env.ts
import path from "path";
import dotenv from "dotenv";

export function loadEnv() {
  const repoRoot = path.resolve(__dirname, "../../../..");
  const serviceRoot = process.cwd();

  dotenv.config({
    path: path.join(repoRoot, ".env"),
  });

  dotenv.config({
    path: path.join(serviceRoot, ".env"),
    override: true,
  });

  dotenv.config({
    path: path.join(serviceRoot, ".env.local"),
    override: true,
  });

  if (process.env.NODE_ENV) {
    dotenv.config({
      path: path.join(serviceRoot, `.env.${process.env.NODE_ENV}`),
      override: true,
    });
  }
}
