import { ESCALATION_TILES } from "../constants/voucherDashboard.constants";

const EscalationPanel = () => (
  <div className="rounded-xl border border-gray-200 border-l-4 border-l-amber-500 bg-white p-4 shadow-sm lg:col-span-2">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Escalations</h2>
        <p className="mt-1 text-xs text-gray-500">
          Monitor ageing, blocked and priority vouchers that need intervention
        </p>
      </div>
      <span className="rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-800">
        Needs Attention
      </span>
    </div>
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {ESCALATION_TILES.map((tile) => (
        <div key={tile.title} className={`rounded-lg border p-3 ${tile.cardClass}`}>
          <p className={`text-xs ${tile.titleClass}`}>{tile.title}</p>
          <p className={`mt-1 text-3xl font-bold ${tile.countClass}`}>{tile.count}</p>
          <p className={`mt-1 text-xs ${tile.noteClass}`}>{tile.note}</p>
        </div>
      ))}
    </div>
  </div>
);

export default EscalationPanel;