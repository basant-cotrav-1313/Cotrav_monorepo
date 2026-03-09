import React from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

type SummaryTile = {
  title: string;
  value: string;
  tone?: "default" | "success";
};

type EscalationTile = {
  title: string;
  count: string;
  note: string;
  cardClass: string;
  titleClass: string;
  countClass: string;
  noteClass: string;
};

type QuickAction = {
  label: string;
  href: string;
  className: string;
};

type QueueCard = {
  title: string;
  subtitle: string;
  tag: string;
  count: string;
  amount: string;
  description: string;
  href: string;
  borderClass: string;
  tagClass: string;
  subtitleClass: string;
};

const SUMMARY_TILES: SummaryTile[] = [
  { title: "Bill Amount", value: "INR 513,871.47" },
  { title: "Adjustment / Deduction", value: "INR 4,352.67" },
  { title: "TDS", value: "INR 0.00" },
  { title: "GST", value: "INR 7,971.84" },
  { title: "Net Amount", value: "INR 517,290.64", tone: "success" }
];

const ESCALATION_TILES: EscalationTile[] = [
  {
    title: "Overdue Verification",
    count: "3",
    note: "Beyond SLA",
    cardClass: "bg-amber-50 border-amber-200",
    titleClass: "text-amber-800",
    countClass: "text-amber-800",
    noteClass: "text-amber-700"
  },
  {
    title: "Urgent Pending Approval",
    count: "2",
    note: "Priority approvals",
    cardClass: "bg-red-50 border-red-200",
    titleClass: "text-red-800",
    countClass: "text-red-800",
    noteClass: "text-red-700"
  },
  {
    title: "Correction Pending",
    count: "6",
    note: "Returned but not fixed",
    cardClass: "bg-rose-50 border-rose-200",
    titleClass: "text-rose-800",
    countClass: "text-rose-800",
    noteClass: "text-rose-700"
  },
  {
    title: "Payment Hold",
    count: "1",
    note: "Blocked release",
    cardClass: "bg-slate-50 border-slate-300",
    titleClass: "text-slate-700",
    countClass: "text-slate-700",
    noteClass: "text-slate-600"
  }
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "View Urgent Vouchers",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/5",
    className: "bg-red-50 border-red-200 text-red-800"
  },
  {
    label: "Process Verification Queue",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/1",
    className: "bg-amber-50 border-amber-200 text-amber-800"
  },
  {
    label: "Review Payment Approvals",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/12",
    className: "bg-orange-50 border-orange-200 text-orange-800"
  },
  {
    label: "Release Pending Payments",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/123",
    className: "bg-blue-50 border-blue-200 text-blue-700"
  }
];

const QUEUE_CARDS: QueueCard[] = [
  {
    title: "Raised",
    subtitle: "Step 1 of 5 - Creation stage",
    tag: "Open Queue",
    count: "18",
    amount: "INR 2,45,000",
    description: "New vouchers raised and awaiting verification",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/0",
    borderClass: "border-sky-200 border-t-sky-400",
    tagClass: "bg-sky-50 border-sky-200 text-sky-700",
    subtitleClass: "text-sky-700"
  },
  {
    title: "Pending Accounts Verification",
    subtitle: "Step 2 of 5 - Verification stage",
    tag: "Verify",
    count: "11",
    amount: "INR 1,35,200",
    description: "Waiting for accounts verification before approval",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/1",
    borderClass: "border-amber-200 border-t-amber-500",
    tagClass: "bg-amber-50 border-amber-200 text-amber-800",
    subtitleClass: "text-amber-700"
  },
  {
    title: "Pending Payment Approval",
    subtitle: "Step 3 of 5 - Approval stage",
    tag: "Approve",
    count: "7",
    amount: "INR 98,300",
    description: "Ready for approval before payment release",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/12",
    borderClass: "border-orange-200 border-t-orange-500",
    tagClass: "bg-orange-50 border-orange-200 text-orange-800",
    subtitleClass: "text-orange-700"
  },
  {
    title: "Pending for Payment",
    subtitle: "Step 4 of 5 - Payment stage",
    tag: "Pay Now",
    count: "22",
    amount: "INR 3,42,800",
    description: "Approved vouchers awaiting payment processing",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/123",
    borderClass: "border-blue-200 border-t-blue-500",
    tagClass: "bg-blue-50 border-blue-200 text-blue-700",
    subtitleClass: "text-blue-700"
  },
  {
    title: "Paid",
    subtitle: "Step 5 of 5 - Completed stage",
    tag: "View Paid",
    count: "65",
    amount: "INR 8,75,400",
    description: "Completed voucher payments",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/2",
    borderClass: "border-emerald-200 border-t-emerald-500",
    tagClass: "bg-emerald-50 border-emerald-200 text-emerald-700",
    subtitleClass: "text-emerald-700"
  },
  {
    title: "Urgent",
    subtitle: "Priority queue - Cross-stage",
    tag: "Act Now",
    count: "5",
    amount: "INR 86,500",
    description: "Priority vouchers requiring immediate action",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/5",
    borderClass: "border-red-200 border-t-red-500",
    tagClass: "bg-red-50 border-red-200 text-red-700",
    subtitleClass: "text-red-700"
  },
  {
    title: "Partial Payment",
    subtitle: "Exception queue - Settlement follow-up",
    tag: "Review",
    count: "4",
    amount: "INR 42,000",
    description: "Partially settled vouchers needing closure",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/6",
    borderClass: "border-slate-300 border-t-slate-500",
    tagClass: "bg-slate-50 border-slate-300 text-slate-600",
    subtitleClass: "text-slate-600"
  },
  {
    title: "Raised for Correction",
    subtitle: "Exception queue - Rework required",
    tag: "Correct",
    count: "6",
    amount: "INR 54,700",
    description: "Returned vouchers needing correction before restart",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/3",
    borderClass: "border-rose-200 border-t-rose-600",
    tagClass: "bg-rose-50 border-rose-200 text-rose-700",
    subtitleClass: "text-rose-700"
  },
  {
    title: "Deleted",
    subtitle: "Closed queue - Audit reference",
    tag: "Audit",
    count: "3",
    amount: "INR 21,000",
    description: "Removed vouchers retained for audit trail",
    href: "/businesstaxivaxi/accounts/outflow/taxis/show-all-vouchers/4",
    borderClass: "border-gray-300 border-t-gray-400",
    tagClass: "bg-gray-50 border-gray-200 text-gray-600",
    subtitleClass: "text-gray-600"
  }
];

const VoucherDashboardPage: React.FC = () => {
  return (
    <OpsMainLayout pageTitle="Voucher Dashboard" pageSubtitle="Finance - Voucher workflow and payment tracking">
      <div className="w-full bg-slate-50 p-4 text-slate-800">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900">Voucher Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Finance - Voucher workflow, payment tracking and escalation control</p>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SUMMARY_TILES.map((tile) => (
              <div
                key={tile.title}
                className={`rounded-xl border p-4 shadow-sm ${
                  tile.tone === "success"
                    ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className={`text-xs ${tile.tone === "success" ? "text-emerald-700" : "text-gray-500"}`}>{tile.title}</p>
                <p className={`mt-1 font-bold ${tile.tone === "success" ? "text-2xl text-emerald-800" : "text-3xl text-gray-900"}`}>
                  {tile.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 border-l-4 border-l-amber-500 bg-white p-4 shadow-sm lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Escalations</h2>
                  <p className="mt-1 text-xs text-gray-500">Monitor ageing, blocked and priority vouchers that need intervention</p>
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

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <p className="mt-1 text-xs text-gray-500">Fast access to the most used voucher queues</p>
              <div className="mt-4 flex flex-col gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <a key={action.label} href={action.href} className={`rounded-lg border px-3 py-3 text-sm font-bold ${action.className}`}>
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-900">Voucher Status Queues</h2>
            <p className="mt-1 text-xs text-gray-500">
              Workflow is reflected inside each queue tile: Raised - Verified - Approved - Payment - Paid
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {QUEUE_CARDS.map((card) => (
              <a key={card.title} href={card.href} className={`rounded-xl border border-t-4 bg-white p-4 text-slate-800 shadow-sm ${card.borderClass}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                    <p className={`mt-1 text-xs ${card.subtitleClass}`}>{card.subtitle}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-xs font-bold ${card.tagClass}`}>{card.tag}</span>
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
            ))}
          </div>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default VoucherDashboardPage;
