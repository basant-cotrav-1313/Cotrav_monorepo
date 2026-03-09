import { AppError, InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";

type RegisterInput = {
  username?: string;
  email?: string;
  password?: string;
};

type LoginInput = {
  username?: string;
  email?: string;
  password?: string;
  realm?: string;
  clientId?: string;
  otp?: string;
  opt?: string;
  mobileOtp?: string;
  mobile_otp?: string;
  emailOtp?: string;
  email_otp?: string;
  otpChannel?: "totp" | "mobile" | "email";
  scope?: string;
};

type KeycloakTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token?: string;
  session_state?: string;
  scope?: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new InfraError(`Missing required env var: ${name}`);
  }
  return value;
}

export class AuthService {
  async register(user: RegisterInput) {
    logger.warn({ user: { username: user.username, email: user.email } }, "Register endpoint is not wired to Keycloak yet");
    throw new AppError("Register is not implemented", "APP_ERROR", 501);
  }

  async login(input: LoginInput) {
    const username = input.username ?? input.email;
    const password = input.password;
    const totpOtp = input.otp ?? input.opt;
    const mobileOtp = input.mobileOtp ?? input.mobile_otp;
    const emailOtp = input.emailOtp ?? input.email_otp;
    const otpChannel = input.otpChannel;

    if (!username || !password) {
      throw new AppError("username/email and password are required", "APP_ERROR", 400);
    }

    const otpValues = [totpOtp, mobileOtp, emailOtp].filter(Boolean);
    if (otpValues.length > 1 && !otpChannel) {
      throw new AppError(
        "Provide only one OTP value or set otpChannel",
        "APP_ERROR",
        400
      );
    }

    const baseUrl = process.env.KEYCLOAK_BASE_URL || "http://localhost:8080";
    const realm = input.realm ?? process.env.KEYCLOAK_REALM;
    if (!realm) {
      throw new InfraError("Missing required realm. Provide `realm` in request or set KEYCLOAK_REALM");
    }
    const clientId = input.clientId ?? process.env.KEYCLOAK_CLIENT_ID;
    if (!clientId) {
      throw new InfraError("Missing required clientId. Provide `clientId` in request or set KEYCLOAK_CLIENT_ID");
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
    } else if (otpChannel === "email" && emailOtp) {
      params.set("email_otp", emailOtp);
    } else if (otpChannel === "totp" && totpOtp) {
      params.set("totp", totpOtp);
    } else if (mobileOtp) {
      params.set("mobile_otp", mobileOtp);
    } else if (emailOtp) {
      params.set("email_otp", emailOtp);
    } else if (totpOtp) {
      params.set("totp", totpOtp);
    }

    if (input.scope) {
      params.set("scope", input.scope);
    }

    logger.info(
      {
        username,
        realm,
        tokenEndpoint,
        otpProvided: otpValues.length > 0,
        otpChannel: otpChannel ?? (mobileOtp ? "mobile" : emailOtp ? "email" : totpOtp ? "totp" : undefined)
      },
      "Authenticating user via Keycloak"
    );

    let response: Response;
    try {
      response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
      });
    } catch (error) {
      logger.error({ error }, "Failed to reach Keycloak");
      throw new InfraError("Unable to connect to Keycloak");
    }

    if (!response.ok) {
      const errorBody = await response.text();
      logger.warn(
        {
          status: response.status,
          username,
          errorBody
        },
        "Keycloak rejected login request"
      );

      if (response.status === 400 || response.status === 401) {
        throw new AppError("Invalid credentials or OTP", "APP_ERROR", 401);
      }

      throw new InfraError(`Keycloak token request failed with status ${response.status}`);
    }

    const token = (await response.json()) as KeycloakTokenResponse;

    logger.info(
      {
        username,
        tokenType: token.token_type,
        expiresIn: token.expires_in
      },
      "Keycloak authentication successful"
    );

    return token;
  }
}
