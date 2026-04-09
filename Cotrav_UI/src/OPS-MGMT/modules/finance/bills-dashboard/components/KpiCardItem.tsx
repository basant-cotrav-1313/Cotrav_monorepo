import type { KpiCard } from "../types/billsDashboard.types";

type Props = {
  card: KpiCard;
};

const KpiCardItem = ({ card }: Props) => {
  const body = (
    <div
      className={`h-full rounded-xl border bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        card.borderClass ?? "border-slate-200"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className={`text-sm font-bold ${card.titleClass ?? "text-slate-700"}`}>
          {card.title}
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
            card.tagClass ?? "bg-slate-100 text-slate-700"
          }`}
        >
          {card.tag}
        </span>
      </div>
      <p className="text-2xl font-black text-slate-900">{card.count}</p>
      <p className={`text-sm font-extrabold ${card.amountClass ?? "text-slate-700"}`}>
        {card.amount}
      </p>
      {card.actionText && (
        <p className="mt-2 text-xs text-slate-500">
          Action:{" "}
          <span className="font-semibold text-slate-700">{card.actionText}</span>
        </p>
      )}
    </div>
  );

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      {card.href ? (
        <a href={card.href} className="block h-full">
          {body}
        </a>
      ) : (
        body
      )}
    </div>
  );
};

export default KpiCardItem;