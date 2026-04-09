export type FailError = {
  field: string;
  errorMessage: string;
  params: string[];
  humanMessage: string;
};

export const ERROR_MESSAGE_MAP: Record<string, string> = {
  "error-invalid-email": "Invalid email address",
  "error-username-invalid-character": "Username contains invalid characters",
  "error-user-already-exists": "User already exists",
  "error-invalid-password": "Invalid password",
  "error-username-missing": "Username is missing",
  "error-email-missing": "Email is missing",
};

export const parseFailReason = (raw: string | null): string => {
  if (!raw) return "—";
  try {
    const parsed = JSON.parse(raw) as { errors: FailError[] };
    if (!parsed.errors?.length) return "Unknown error";
    return parsed.errors
      .map((e) => ERROR_MESSAGE_MAP[e.errorMessage] ?? e.errorMessage)
      .join(", ");
  } catch {
    return raw;
  }
};

export const getRawErrors = (raw: string | null): FailError[] => {
  try {
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { errors: Array<Omit<FailError, "humanMessage">> };
    return (parsed.errors ?? []).map((e) => ({
      ...e,
      humanMessage: ERROR_MESSAGE_MAP[e.errorMessage] ?? e.errorMessage,
    }));
  } catch {
    return [];
  }
};