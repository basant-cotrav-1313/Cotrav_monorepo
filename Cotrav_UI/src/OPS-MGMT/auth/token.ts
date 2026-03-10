type KeycloakResourceAccess = {
  roles?: string[];
};

type KeycloakJwtPayload = {
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  name?: string;
  sub?: string;
  resource_access?: Record<string, KeycloakResourceAccess>;
  realm_access?: {
    roles?: string[];
  };
  exp?: number;
  [key: string]: unknown;
};

export type OpsUserProfile = {
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  userId: string;
  roles: string[];
};

const ACCESS_TOKEN_KEY = "access_token";
const OPS_ROLES_KEY = "ops_roles";

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

export function decodeAccessToken(token: string): KeycloakJwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) {
      return null;
    }
    const payload = decodeBase64Url(parts[1]);
    return JSON.parse(payload) as KeycloakJwtPayload;
  } catch {
    return null;
  }
}

export function extractClientRoles(token: string, clientId = "cotrav-OPS-app"): string[] {
  const payload = decodeAccessToken(token);
  if (!payload?.resource_access) {
    return [];
  }

  const clientRoles = payload.resource_access[clientId]?.roles;
  return Array.isArray(clientRoles) ? clientRoles : [];
}

export function saveOpsAuthSession(accessToken: string, clientId = "cotrav-OPS-app"): string[] {
  const roles = extractClientRoles(accessToken, clientId);
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(OPS_ROLES_KEY, JSON.stringify(roles));
  return roles;
}

export function getOpsAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getOpsRoles(): string[] {
  const raw = sessionStorage.getItem(OPS_ROLES_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((role): role is string => typeof role === "string") : [];
  } catch {
    return [];
  }
}

export function getOpsUserProfile(clientId = "cotrav-OPS-app"): OpsUserProfile | null {
  const token = getOpsAccessToken();
  if (!token) {
    return null;
  }

  const payload = decodeAccessToken(token);
  if (!payload) {
    return null;
  }

  const firstName = typeof payload.given_name === "string" ? payload.given_name : "";
  const lastName = typeof payload.family_name === "string" ? payload.family_name : "";
  const payloadFullName = typeof payload.name === "string" ? payload.name : "";

  return {
    username: typeof payload.preferred_username === "string" ? payload.preferred_username : "",
    firstName,
    lastName,
    fullName: payloadFullName || [firstName, lastName].filter(Boolean).join(" "),
    email: typeof payload.email === "string" ? payload.email : "",
    userId: typeof payload.sub === "string" ? payload.sub : "",
    roles: extractClientRoles(token, clientId)
  };
}

export function hasOpsRole(role: string): boolean {
  return getOpsRoles().includes(role);
}

export function clearOpsAuthSession(): void {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(OPS_ROLES_KEY);
}

export function isOpsTokenExpired(token: string | null): boolean {
  if (!token) {
    return true;
  }

  const payload = decodeAccessToken(token);
  if (!payload || typeof payload.exp !== "number") {
    return true;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
}

export function hasValidOpsSession(): boolean {
  return !isOpsTokenExpired(getOpsAccessToken());
}
