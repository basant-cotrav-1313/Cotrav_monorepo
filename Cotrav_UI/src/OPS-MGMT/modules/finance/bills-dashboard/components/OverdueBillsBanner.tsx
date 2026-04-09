const OverdueBillsBanner = () => (
  <div className="col-span-12 lg:col-span-9">
    <a href="/taxivaxi/all-bill/2" className="block h-full">
      <div className="h-full rounded-xl border border-red-300 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-sm font-black text-red-600">
              Payments Pending &gt; 30 Days
            </p>
            <p className="text-xs text-slate-500">
              Overdue bills that need immediate escalation
            </p>
          </div>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-700">
            Escalate
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-6">
          <div>
            <p className="text-3xl font-black text-slate-900">556</p>
            <p className="text-sm font-extrabold text-red-700">₹ 154,118,862.54</p>
          </div>
          <div className="min-w-[260px] flex-1">
            <p className="text-xs text-slate-500">Suggested actions:</p>
            <ul className="mt-1 list-disc pl-4 text-xs text-slate-700">
              <li>Send reminder to vendors / operators</li>
              <li>Escalate to SPOC for blocked approvals</li>
              <li>Prioritize oldest invoices in payment run</li>
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="h-8 rounded-md bg-red-600 px-3 text-xs font-semibold text-white"
              >
                Start Follow-up Drive
              </button>
              <button
                type="button"
                className="h-8 rounded-md border border-red-300 px-3 text-xs font-semibold text-red-700"
              >
                View Overdue List
              </button>
              <button
                type="button"
                className="h-8 rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700"
              >
                Download Overdue CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
);

export default OverdueBillsBanner;