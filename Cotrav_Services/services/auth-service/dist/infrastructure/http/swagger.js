"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth Service API",
            version: "1.0.0",
            description: "Authentication microservice for Cotrav platform"
        },
        servers: [
            {
                url: "http://localhost:4001",
                description: "Local auth-service"
            }
        ],
        tags: [
            { name: "Auth", description: "Authentication endpoints" },
            { name: "System", description: "System health endpoints" },
            { name: "Diagnostics", description: "Service diagnostics endpoints" }
        ],
        components: {
            schemas: {
                RegisterRequest: {
                    type: "object",
                    properties: {
                        username: { type: "string", example: "demo.user" },
                        email: { type: "string", format: "email", example: "demo.user@cotrav.com" },
                        password: { type: "string", format: "password", example: "demoPassword123" }
                    }
                },
                LoginRequest: {
                    type: "object",
                    required: ["password"],
                    properties: {
                        realm: {
                            type: "string",
                            description: "Keycloak realm to authenticate against. Falls back to KEYCLOAK_REALM when omitted.",
                            example: "cotrav"
                        },
                        clientId: {
                            type: "string",
                            description: "Keycloak client id. Falls back to KEYCLOAK_CLIENT_ID when omitted.",
                            example: "cotrav-OPS-app"
                        },
                        username: { type: "string", example: "demo.user" },
                        email: { type: "string", format: "email", example: "demo.user@cotrav.com" },
                        password: { type: "string", format: "password", example: "demoPassword123" },
                        otp: {
                            type: "string",
                            description: "TOTP code from authenticator app",
                            example: "123456"
                        },
                        scope: { type: "string", example: "openid profile email" }
                    },
                    description: "Provide realm and either username or email, along with password."
                },
                KeycloakTokenResponse: {
                    type: "object",
                    properties: {
                        access_token: { type: "string" },
                        expires_in: { type: "integer", example: 300 },
                        refresh_expires_in: { type: "integer", example: 1800 },
                        refresh_token: { type: "string" },
                        token_type: { type: "string", example: "Bearer" },
                        id_token: { type: "string" },
                        session_state: { type: "string" },
                        scope: { type: "string", example: "openid profile email" }
                    },
                    required: ["access_token", "expires_in", "refresh_expires_in", "refresh_token", "token_type"]
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        errorCode: { type: "string", example: "APP_ERROR" },
                        message: { type: "string", example: "Invalid credentials or OTP" }
                    },
                    required: ["errorCode", "message"]
                }
            }
        }
    },
    apis: ["./src/api/routes/*.ts", "./src/app.ts"]
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map