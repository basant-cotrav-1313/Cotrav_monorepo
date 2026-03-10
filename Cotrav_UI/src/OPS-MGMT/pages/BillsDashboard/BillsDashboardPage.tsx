import React from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

type KpiCard = {
  title: string;
  count: string;
  amount: string;
  tag: string;
  href?: string;
  borderClass?: string;
  titleClass?: string;
  amountClass?: string;
  tagClass?: string;
  actionText?: string;
};

const KPI_CARDS: KpiCard[] = [
  {
    title: "Total Bills",
    count: "815",
    amount: "â‚¹ 154,118,862.54",
    tag: "Overview",
    titleClass: "text-slate-500",
    amountClass: "text-slate-500",
    tagClass: "bg-slate-100 text-slate-600"
  },
  {
    title: "Approval Pending",
    count: "86",
    amount: "â‚¹ 5,275,087.03",
    tag: "Act Now",
    href: "/taxivaxi/all-bill/0",
    borderClass: "border-amber-300",
    titleClass: "text-amber-600",
    amountClass: "text-amber-700",
    tagClass: "bg-amber-100 text-amber-700",
    actionText: "Review & approve pending bills."
  },
  {
    title: "Approved Bills",
    count: "15",
    amount: "â‚¹ 1,900,357.58",
    tag: "Ready",
    href: "/taxivaxi/all-bill/1",
    borderClass: "border-sky-300",
    titleClass: "text-sky-600",
    amountClass: "text-sky-700",
    tagClass: "bg-sky-100 text-sky-700",
    actionText: "Move to payment queue."
  },
  {
    title: "Pending Payments",
    count: "602",
    amount: "â‚¹ 105,022,161.49",
    tag: "High",
    href: "/taxivaxi/all-bill/2",
    borderClass: "border-red-300",
    titleClass: "text-red-600",
    amountClass: "text-red-700",
    tagClass: "bg-red-100 text-red-700",
    actionText: "Prioritize payouts & resolve holds."
  },
  {
    title: "Partial Payments",
    count: "3",
    amount: "â‚¹ 4,312.00",
    tag: "Follow-up",
    href: "/taxivaxi/all-bill/3",
    titleClass: "text-slate-500",
    amountClass: "text-slate-500",
    tagClass: "bg-slate-100 text-slate-600",
    actionText: "Close balance & update receipts."
  },
  {
    title: "Paid",
    count: "34",
    amount: "â‚¹ 8,541,343.71",
    tag: "Completed",
    href: "/taxivaxi/all-bill/4",
    borderClass: "border-emerald-300",
    titleClass: "text-emerald-600",
    amountClass: "text-emerald-700",
    tagClass: "bg-emerald-100 text-emerald-700",
    actionText: "Download receipts & audit."
  }
];

const BillsDashboardPage: React.FC = () => {
  return (
    <OpsMainLayout pageTitle="Bills Dashboard" pageSubtitle="Finance - Bills action dashboard">
      <div className="mx-auto w-full max-w-[1200px] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">Bills - Action Dashboard</h1>
            <p className="text-xs text-slate-500">Quick actions to approve, track payments, and chase overdue bills.</p>
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
            <button type="button" className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold">
              Export
            </button>
            <button type="button" className="h-8 rounded-md bg-[#003F74] px-3 text-xs font-semibold text-white">
              Create Bill
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-12 gap-3">
          <div className="col-span-12 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3 lg:row-span-2">
            <div>
              <p className="text-sm font-bold text-slate-900">Today's Focus</p>
              <p className="text-xs text-slate-500">Pick the most impactful next step based on your current pipeline.</p>
            </div>
            <div className="mt-4 flex flex-col items-start gap-2">
              <button type="button" className="h-8 rounded-md bg-amber-500 px-3 text-xs font-semibold text-white">
                Approve pending (86)
              </button>
              <button type="button" className="h-8 rounded-md bg-red-600 px-3 text-xs font-semibold text-white">
                Pay overdue (&gt;30 days)
              </button>
              <button type="button" className="h-8 rounded-md border border-blue-300 px-3 text-xs font-semibold text-blue-700">
                Run payment batch
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-12 gap-3">
              {KPI_CARDS.map((card) => {
                const body = (
                  <div
                    className={`h-full rounded-xl border bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      card.borderClass ?? "border-slate-200"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className={`text-sm font-bold ${card.titleClass ?? "text-slate-700"}`}>{card.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${card.tagClass ?? "bg-slate-100 text-slate-700"}`}>
                        {card.tag}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">{card.count}</p>
                    <p className={`text-sm font-extrabold ${card.amountClass ?? "text-slate-700"}`}>{card.amount}</p>
                    {card.actionText ? (
                      <p className="mt-2 text-xs text-slate-500">
                        Action: <span className="font-semibold text-slate-700">{card.actionText}</span>
                      </p>
                    ) : null}
                  </div>
                );

                return (
                  <div key={card.title} className="col-span-12 md:col-span-6 lg:col-span-4">
                    {card.href ? (
                      <a href={card.href} className="block h-full">
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <a href="/taxivaxi/all-bill/2" className="block h-full">
              <div className="h-full rounded-xl border border-red-300 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-black text-red-600">Payments Pending &gt; 30 Days</p>
                    <p className="text-xs text-slate-500">Overdue bills that need immediate escalation</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-700">Escalate</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-6">
                  <div>
                    <p className="text-3xl font-black text-slate-900">556</p>
                    <p className="text-sm font-extrabold text-red-700">â‚¹ 154,118,862.54</p>
                  </div>
                  <div className="min-w-[260px] flex-1">
                    <p className="text-xs text-slate-500">Suggested actions:</p>
                    <ul className="mt-1 list-disc pl-4 text-xs text-slate-700">
                      <li>Send reminder to vendors / operators</li>
                      <li>Escalate to SPOC for blocked approvals</li>
                      <li>Prioritize oldest invoices in payment run</li>
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button type="button" className="h-8 rounded-md bg-red-600 px-3 text-xs font-semibold text-white">
                        Start Follow-up Drive
                      </button>
                      <button type="button" className="h-8 rounded-md border border-red-300 px-3 text-xs font-semibold text-red-700">
                        View Overdue List
                      </button>
                      <button type="button" className="h-8 rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700">
                        Download Overdue CSV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default BillsDashboardPage;
