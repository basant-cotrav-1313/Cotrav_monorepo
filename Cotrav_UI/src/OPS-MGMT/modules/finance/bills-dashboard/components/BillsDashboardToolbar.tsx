
const BillsDashboardToolbar = () => (
  <div className="flex flex-wrap items-center justify-between gap-2">
    <div>
      <h1 className="text-xl font-black tracking-tight text-slate-900">
        Bills - Action Dashboard
      </h1>
      <p className="text-xs text-slate-500">
        Quick actions to approve, track payments, and chase overdue bills.
      </p>
    </div>

    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="flex h-8 items-center rounded-md border border-slate-300 bg-white text-xs">
        <span className="border-r border-slate-300 px-2 text-slate-500">Search</span>
        <input
          type="text"
          placeholder="Bill / Vendor / Company"
          className="h-full w-56 rounded-r-md px-2 text-xs text-slate-700 outline-none"
        />
      </div>
      <select className="h-8 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700">
        <option>Time Range: This Month</option>
        <option>Today</option>
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>Custom...</option>
      </select>
      <button
        type="button"
        className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold"
      >
        Export
      </button>
      <button
        type="button"
        className="h-8 rounded-md bg-[#003F74] px-3 text-xs font-semibold text-white"
      >
        Create Bill
      </button>
    </div>
  </div>
);

export default BillsDashboardToolbar;