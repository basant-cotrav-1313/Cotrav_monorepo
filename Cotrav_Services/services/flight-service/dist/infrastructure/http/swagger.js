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
    apis: [
        path_1.default.join(__dirname, "../../api/routes/*.ts"),
        path_1.default.join(__dirname, "../../api/routes/*.js"),
    ],
};
const spec = (0, swagger_jsdoc_1.default)(options);
// Manually inject /airports path — ensures it always appears in Swagger
spec.paths = spec.paths || {};
spec.paths["/airports"] = {
    get: {
        summary: "Get all airports",
        description: "Returns a list of all airports available for flight search.",
        tags: ["Airports"],
        responses: {
            200: {
                description: "List of airports",
                content: {
                    "application/json": {
                        schema: { type: "array", items: { type: "object" } },
                    },
                },
            },
            500: { description: "Internal server error" },
        },
    },
};
exports.swaggerSpec = spec;
//# sourceMappingURL=swagger.js.map