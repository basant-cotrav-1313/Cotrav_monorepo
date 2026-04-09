const TodaysFocus = () => (
  <div className="col-span-12 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3 lg:row-span-2">
    <div>
      <p className="text-sm font-bold text-slate-900">Today's Focus</p>
      <p className="text-xs text-slate-500">
        Pick the most impactful next step based on your current pipeline.
      </p>
    </div>
    <div className="mt-4 flex flex-col items-start gap-2">
      <button
        type="button"
        className="h-8 rounded-md bg-amber-500 px-3 text-xs font-semibold text-white"
      >
        Approve pending (86)
      </button>
      <button
        type="button"
        className="h-8 rounded-md bg-red-600 px-3 text-xs font-semibold text-white"
      >
        Pay overdue (&gt;30 days)
      </button>
      <button
        type="button"
        className="h-8 rounded-md border border-blue-300 px-3 text-xs font-semibold text-blue-700"
      >
        Run payment batch
      </button>
    </div>
  </div>
);

export default TodaysFocus;