const SearchResultsPanel = () => (
  <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="text-sm font-black uppercase tracking-wide text-slate-600">
      Search Results
    </h2>
    <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <p className="text-sm font-semibold text-slate-700">No results yet</p>
      <p className="mt-1 text-xs text-slate-500">
        Search using filters above to view matching OPS-MGMT records.
      </p>
    </div>
  </section>
);

export default SearchResultsPanel;