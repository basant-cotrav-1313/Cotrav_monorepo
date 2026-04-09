import type { QueueCard } from "../types/voucherDashboard.types";
import { QUEUE_CARDS } from "../constants/voucherDashboard.constants";

const QueueCardItem = ({ card }: { card: QueueCard }) => (
  <a
    href={card.href}
    className={`rounded-xl border border-t-4 bg-white p-4 text-slate-800 shadow-sm ${card.borderClass}`}
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
        <p className={`mt-1 text-xs ${card.subtitleClass}`}>{card.subtitle}</p>
      </div>
      <span className={`rounded-full border px-2 py-1 text-xs font-bold ${card.tagClass}`}>
        {card.tag}
      </span>
    </div>
    <div className="mt-4 flex items-end justify-between gap-3">
      <div>
        <p className="text-xs text-slate-500">Count</p>
        <p className="text-3xl font-bold text-slate-900">{card.count}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-slate-500">Amount</p>
        <p className="text-2xl font-bold text-slate-900">{card.amount}</p>
      </div>
    </div>
    <p className="mt-2 text-xs text-slate-600">{card.description}</p>
  </a>
);

const QueueCardGrid = () => (
  <>
    <div className="mb-3">
      <h2 className="text-xl font-bold text-gray-900">Voucher Status Queues</h2>
      <p className="mt-1 text-xs text-gray-500">
        Workflow is reflected inside each queue tile: Raised - Verified - Approved - Payment - Paid
      </p>
    </div>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {QUEUE_CARDS.map((card) => (
        <QueueCardItem key={card.title} card={card} />
      ))}
    </div>
  </>
);

export default QueueCardGrid;