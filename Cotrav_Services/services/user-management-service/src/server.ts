// src/server.ts
import app from "./app";
import { ENV } from "./config/env";

app.listen(ENV.PORT, () => {
  console.log(`User service running on ${ENV.PORT}`);
});