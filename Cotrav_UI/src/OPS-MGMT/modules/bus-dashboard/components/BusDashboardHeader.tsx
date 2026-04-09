type Props = {
  onNavigate: (path: string) => void;
};

const BusDashboardHeader = ({ onNavigate }: Props) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
    <div className="min-w-0">
      <h1 className="text-xl font-black tracking-tight text-slate-900">Bus Dashboard</h1>
      <p className="truncate text-xs text-slate-500">
        Action tiles only (details are in left navigation)
      </p>
    </div>
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
      >
        Refresh
      </button>
      <button
        type="button"
        onClick={() => onNavigate("bus/add-booking")}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
      >
        Add Bus Booking
      </button>
      <button
        type="button"
        onClick={() => onNavigate("bus/active-unassigned")}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
      >
        Assign Queue
      </button>
      <button
        type="button"
        onClick={() => onNavigate("bus/exceptions")}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
      >
        Exceptions
      </button>
      <button
        type="button"
        onClick={() => onNavigate("bus/invoices/billing-queue")}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
      >
        Billing Queue
      </button>
    </div>
  </div>
);

export default BusDashboardHeader;