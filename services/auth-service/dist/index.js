"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const env_1 = require("./bootstrap/env");
(0, env_1.loadEnv)(); // MUST be first
require("./app"); // app.ts runs AFTER env is ready
//# sourceMappingURL=index.js.map