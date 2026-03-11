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
require("dotenv/config");
const logger_1 = __importDefault(require("@cotrav/logger"));
const express_1 = __importDefault(require("express"));
const middlewares = __importStar(require("@cotrav/middlewares"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const connection_1 = require("./infrastructure/db/connection");
const swagger_1 = require("./infrastructure/http/swagger");
const flightRoutes_1 = __importDefault(require("./api/routes/flightRoutes"));
const companyRoutes_1 = __importDefault(require("./api/routes/companyRoutes"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(204);
        return;
    }
    next();
});
app.use(express_1.default.json());
app.use("/flights", flightRoutes_1.default);
app.use("/companies", companyRoutes_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns service liveness status.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
app.get("/health", middlewares.asyncHandler(async (_req, res) => {
    res.send("OK");
}));
app.use(middlewares.errorHandler);
const PORT = process.env.PORT || 4002;
(0, connection_1.testConnection)()
    .then(() => {
    logger_1.default.info("Database connection successful");
    app.listen(PORT, () => {
        console.log(`Flight service running on port ${PORT}`);
        logger_1.default.info({ port: PORT, service: "flight-service" }, "Flight service listening");
    });
})
    .catch((err) => {
    logger_1.default.error({ err }, "Database connection failed");
    logger_1.default.flush();
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=app.js.map