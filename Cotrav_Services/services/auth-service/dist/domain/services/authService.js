"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new errors_1.InfraError(`Missing required env var: ${name}`);
    }
    return value;
}
class AuthService {
    async register(user) {
        logger_1.default.warn({ user: { username: user.username, email: user.email } }, "Register endpoint is not wired to Keycloak yet");
        throw new errors_1.AppError("Register is not implemented", "APP_ERROR", 501);
    }
    async login(input) {
        const username = input.username ?? input.email;
        const password = input.password;
        const totpOtp = input.otp ?? input.opt;
        const mobileOtp = input.mobileOtp ?? input.mobile_otp;
        const emailOtp = input.emailOtp ?? input.email_otp;
        const otpChannel = input.otpChannel;
        if (!username || !password) {
            throw new errors_1.AppError("username/email and password are required", "APP_ERROR", 400);
        }
        const otpValues = [totpOtp, mobileOtp, emailOtp].filter(Boolean);
        if (otpValues.length > 1 && !otpChannel) {
            throw new errors_1.AppError("Provide only one OTP value or set otpChannel", "APP_ERROR", 400);
        }
        const baseUrl = process.env.KEYCLOAK_BASE_URL || "http://localhost:8080";
        const realm = input.realm ?? process.env.KEYCLOAK_REALM;
        if (!realm) {
            throw new errors_1.InfraError("Missing required realm. Provide `realm` in request or set KEYCLOAK_REALM");
        }
        const clientId = input.clientId ?? process.env.KEYCLOAK_CLIENT_ID;
        if (!clientId) {
            throw new errors_1.InfraError("Missing required clientId. Provide `clientId` in request or set KEYCLOAK_CLIENT_ID");
        }
        const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
        const tokenEndpoint = `${baseUrl.replace(/\/$/, "")}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/token`;
        const params = new URLSearchParams({
            grant_type: "password",
            client_id: clientId,
            username,
            password
        });
        if (clientSecret) {
            params.set("client_secret", clientSecret);
        }
        if (otpChannel === "mobile" && mobileOtp) {
            params.set("mobile_otp", mobileOtp);
        }
        else if (otpChannel === "email" && emailOtp) {
            params.set("email_otp", emailOtp);
        }
        else if (otpChannel === "totp" && totpOtp) {
            params.set("totp", totpOtp);
        }
        else if (mobileOtp) {
            params.set("mobile_otp", mobileOtp);
        }
        else if (emailOtp) {
            params.set("email_otp", emailOtp);
        }
        else if (totpOtp) {
            params.set("totp", totpOtp);
        }
        if (input.scope) {
            params.set("scope", input.scope);
        }
        logger_1.default.info({
            username,
            realm,
            tokenEndpoint,
            otpProvided: otpValues.length > 0,
            otpChannel: otpChannel ?? (mobileOtp ? "mobile" : emailOtp ? "email" : totpOtp ? "totp" : undefined)
        }, "Authenticating user via Keycloak");
        console.log("tokenEndpoint:", tokenEndpoint); // ← add this
        console.log("params:", params.toString()); // ← add this
        let response;
        try {
            response = await fetch(tokenEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            console.log("RESPONSE : ", response);
        }
        catch (error) {
            logger_1.default.error({ error }, "Failed to reach Keycloak");
            throw new errors_1.InfraError("Unable to connect to Keycloak");
        }
        if (!response.ok) {
            const errorBody = await response.text();
            logger_1.default.warn({
                status: response.status,
                username,
                errorBody
            }, "Keycloak rejected login request");
            console.log("RESPONSE : ", response);
            if (response.status === 400 || response.status === 401) {
                throw new errors_1.AppError("Invalid credentials or OTP", "APP_ERROR", 401);
            }
            throw new errors_1.InfraError(`Keycloak token request failed with status ${response.status}`);
        }
        const token = (await response.json());
        logger_1.default.info({
            username,
            tokenType: token.token_type,
            expiresIn: token.expires_in
        }, "Keycloak authentication successful");
        return token;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map