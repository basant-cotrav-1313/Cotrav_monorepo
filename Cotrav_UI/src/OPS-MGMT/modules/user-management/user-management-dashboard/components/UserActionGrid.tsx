import { USER_ACTIONS, TONE_CLASS } from "../constants/userManagementDashboard.constants";

const UserActionGrid = () => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {USER_ACTIONS.map((action) => (
      <a
        key={action.label}
        href={action.href}
        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#0A7CC5] hover:bg-blue-50"
      >
        <span>{action.label}</span>
        <span className={`text-xs ${TONE_CLASS[action.tone ?? "neutral"]}`}>Open</span>
      </a>
    ))}
  </div>
);

export default UserActionGrid;