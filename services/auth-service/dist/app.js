"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./bootstrap/env");
//import dotenv from "dotenv";
//dotenv.config();
const logger_1 = __importDefault(require("@cotrav/logger"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const authRoutes_1 = __importDefault(require("./api/routes/authRoutes"));
const middlewares = __importStar(require("@cotrav/middlewares"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./infrastructure/http/swagger");
const testRoutes_1 = __importDefault(require("./api/routes/testRoutes"));
//var logger = logger.logger;
//const mylog = logger;
console.log("ENV:", process.env.LOG_DIR);
app.use(express_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use("/test", testRoutes_1.default);
logger_1.default.info("INFO::Inside app.ts - before /health route");
logger_1.default.error("ERR: Indise app.ts - before / health route");
logger_1.default.warn("Wrn: Indise app.ts - before / health route");
/*app.get("/health", (_req, res) => {
  logger.info("Health check hit");
  res.send("OK");
}); */
// Wrap route handler
app.get("/health", middlewares.asyncHandler(async (_req, res) => {
    res.send("OK");
}));
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    logger_1.default.info("Auth Service started successfully");
    logger_1.default.info({ port: PORT, service: "auth-service" }, "Service listening");
    logger_1.default.info(`Auth service running on port ${PORT}`);
    console.log("Auth Service started successfully");
    console.log({ port: PORT, service: "auth-service" }, "Service listening");
    console.log(`Auth service running on port ${PORT}`);
    console.log(`Documentation available at /docs`);
});
exports.default = app;
//# sourceMappingURL=app.js.map