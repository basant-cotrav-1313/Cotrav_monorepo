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
            title: "Hotel Service API",
            version: "1.0.0",
            description: "API documentation for the Hotel microservice",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 4003}`,
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
// Manually inject /getAllCities path — ensures it always appears in Swagger
spec.paths = spec.paths || {};
spec.paths["/getAllCities"] = {
    post: {
        summary: "Get all hotel cities",
        description: "Returns a list of all cities available for hotel search.",
        tags: ["Cities"],
        responses: {
            200: {
                description: "List of cities",
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