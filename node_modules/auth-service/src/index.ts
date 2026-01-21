// src/index.ts
import { loadEnv } from "./bootstrap/env";

loadEnv(); // MUST be first

import "./app"; // app.ts runs AFTER env is ready
