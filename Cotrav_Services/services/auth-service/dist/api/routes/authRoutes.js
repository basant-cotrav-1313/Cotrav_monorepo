"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const middlewares_1 = require("@cotrav/middlewares");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Placeholder endpoint. User registration via Keycloak is not implemented in this service yet.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       501:
 *         description: Register endpoint not implemented yet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", (0, middlewares_1.asyncHandler)(authController_1.register));
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login with Keycloak password grant and optional OTP
 *     description: Returns Keycloak OIDC token payload. Provide `realm` and either `username` or `email` with `password`.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             username_password:
 *               value:
 *                 realm: cotrav
 *                 username: demo.user
 *                 password: demoPassword123
 *             email_password_otp:
 *               value:
 *                 realm: cotrav
 *                 email: demo.user@cotrav.com
 *                 password: demoPassword123
 *                 otp: "123456"
 *     responses:
 *       200:
 *         description: Keycloak token response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KeycloakTokenResponse'
 *       400:
 *         description: Invalid request payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid credentials or OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Keycloak connectivity or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", (0, middlewares_1.asyncHandler)(authController_1.login));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map