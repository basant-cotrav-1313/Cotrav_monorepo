import { QUICK_ACTIONS } from "../constants/voucherDashboard.constants";

const QuickActionsPanel = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
    <p className="mt-1 text-xs text-gray-500">
      Fast access to the most used voucher queues
    </p>
    <div className="mt-4 flex flex-col gap-2">
      {QUICK_ACTIONS.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className={`rounded-lg border px-3 py-3 text-sm font-bold ${action.className}`}
        >
          {action.label}
        </a>
      ))}
    </div>
  </div>
);

export default QuickActionsPanel;