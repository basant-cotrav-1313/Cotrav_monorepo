export type UserActionTone = "neutral" | "warn" | "ok";

export type UserAction = {
  label: string;
  href: string;
  tone?: UserActionTone;
};