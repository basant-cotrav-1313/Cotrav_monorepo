"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Flight Service API",
            version: "1.0.0",
            description: "API documentation for the Flight microservice",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 4002}`,
                description: "Local server",
            },
        ],
    },
    apis: [path_1.default.join(__dirname, "../../api/routes/*.{ts,js}")],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map