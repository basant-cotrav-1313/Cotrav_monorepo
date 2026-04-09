import type { UserAction, UserActionTone } from "../types/userManagementDashboard.types";

export const USER_ACTIONS: UserAction[] = [
  { label: "Add New User",       href: "/taxivaxi/add-corporate-user",              tone: "ok"      },
  { label: "Pending Approvals",  href: "/taxivaxi/corporate-users?status=pending",  tone: "warn"    },
  { label: "Active Users",       href: "/taxivaxi/corporate-users?status=active",   tone: "ok"      },
  { label: "Inactive Users",     href: "/taxivaxi/corporate-users?status=inactive", tone: "neutral" },
  { label: "Role Mapping",       href: "/taxivaxi/corporate-user-roles",            tone: "neutral" },
  { label: "Department Mapping", href: "/taxivaxi/corporate-user-departments",      tone: "neutral" },
  { label: "Legacy Import",      href: "/ops-mgmt/user-import",                    tone: "ok"      },
];

export const TONE_CLASS: Record<UserActionTone, string> = {
  neutral: "text-slate-700",
  warn:    "text-amber-600",
  ok:      "text-emerald-600",
};