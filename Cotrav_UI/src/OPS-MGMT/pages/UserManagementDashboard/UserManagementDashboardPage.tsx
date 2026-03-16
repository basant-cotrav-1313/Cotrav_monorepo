import React from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

type UserAction = {
  label: string;
  href: string;
  tone?: "neutral" | "warn" | "ok";
};

const USER_ACTIONS: UserAction[] = [
  { label: "Add New User", href: "/taxivaxi/add-corporate-user", tone: "ok" },
  { label: "Pending Approvals", href: "/taxivaxi/corporate-users?status=pending", tone: "warn" },
  { label: "Active Users", href: "/taxivaxi/corporate-users?status=active", tone: "ok" },
  { label: "Inactive Users", href: "/taxivaxi/corporate-users?status=inactive", tone: "neutral" },
  { label: "Role Mapping", href: "/taxivaxi/corporate-user-roles", tone: "neutral" },
  { label: "Department Mapping", href: "/taxivaxi/corporate-user-departments", tone: "neutral" },
  { label: "Legacy Import", href: "/ops-mgmt/user-import", tone: "ok" }
];

const toneClass: Record<NonNullable<UserAction["tone"]>, string> = {
  neutral: "text-slate-700",
  warn: "text-amber-600",
  ok: "text-emerald-600"
};

const UserManagementDashboardPage: React.FC = () => {
  return (
    <OpsMainLayout pageTitle="User Management" pageSubtitle="Manage users, approvals and access">
      <div className="px-6 py-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">User Management Dashboard</h1>
              <p className="text-xs text-slate-500">Quick actions for user lifecycle and access setup</p>
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
            >
              Refresh
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {USER_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#0A7CC5] hover:bg-blue-50"
              >
                <span>{action.label}</span>
                <span className={`text-xs ${toneClass[action.tone ?? "neutral"]}`}>Open</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default UserManagementDashboardPage;


