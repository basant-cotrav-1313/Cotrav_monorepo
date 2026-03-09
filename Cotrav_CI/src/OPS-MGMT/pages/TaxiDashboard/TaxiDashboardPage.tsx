import React, { useMemo, useState } from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";
import { TaxiNavigationMenu } from "@/OPS-MGMT/components/layout/Navigation";

type CountKey =
  | "todaysBooking"
  | "runningTrips"
  | "activeUnassigned"
  | "activeRadioUnassigned"
  | "activeAssigned"
  | "archivedUnassigned"
  | "archivedAssigned"
  | "cancelledRejected"
  | "operatorIssues"
  | "invUnbilled"
  | "invClearedBySpoc"
  | "invClearedForBilling"
  | "invCorrections"
  | "invTentative"
  | "invProforma"
  | "invUnpaid"
  | "invPaid"
  | "taxiDutySlips"
  | "dutySlips"
  | "misc"
  | "sms";

type Tone = "danger" | "warn" | "ok" | "info" | "neutral";

type NavItem = {
  label: string;
  path: string;
  countKey: CountKey;
  tone?: Tone;
};

type NavGroup = {
  id: "taxi" | "invoices" | "duty";
  title: string;
  items: NavItem[];
};

type Tile = {
  title: string;
  subtitle: string;
  path: string;
  countKey: CountKey;
  tone: Tone;
  span: "col-4" | "col-6";
};

const COUNTS: Record<CountKey, number> = {
  todaysBooking: 56,
  runningTrips: 28,
  activeUnassigned: 12,
  activeRadioUnassigned: 5,
  activeAssigned: 34,
  archivedUnassigned: 8,
  archivedAssigned: 19,
  cancelledRejected: 7,
  operatorIssues: 4,
  invUnbilled: 14,
  invClearedBySpoc: 21,
  invClearedForBilling: 37,
  invCorrections: 9,
  invTentative: 16,
  invProforma: 11,
  invUnpaid: 6,
  invPaid: 25,
  taxiDutySlips: 45,
  dutySlips: 32,
  misc: 18,
  sms: 10
};

const routeMap: Record<string, string> = {
  "taxi/add-booking": "/taxivaxi/add-taxi-booking",
  "taxi/todays-booking": "/taxivaxi/taxi-bookings/0",
  "taxi/running-trips": "/taxivaxi/taxi-running-trips",
  "taxi/active-unassigned": "/taxivaxi/taxi-bookings/1",
  "taxi/active-radio-unassigned": "/taxivaxi/taxi-bookings/12",
  "taxi/active-assigned": "/taxivaxi/taxi-bookings/2",
  "taxi/archived-unassigned": "/taxivaxi/taxi-bookings/5",
  "taxi/archived-assigned": "/taxivaxi/taxi-bookings/3",
  "taxi/cancelled-rejected": "/taxivaxi/taxi-bookings/4",
  "taxi/operator-issues": "/taxivaxi/taxi-bookings/6",
  "taxi/unassigned": "/taxivaxi/taxi-bookings/1",
  "taxi/exceptions": "/taxivaxi/taxi-bookings/6",
  "invoices/unbilled": "/taxivaxi/invoice-list/0",
  "invoices/cleared-by-spoc": "/taxivaxi/invoice-list/1",
  "invoices/cleared-for-billing": "/taxivaxi/invoice-list/2",
  "invoices/corrections": "/taxivaxi/invoice-list/3",
  "invoices/tentative": "/taxivaxi/invoice-list/4",
  "invoices/proforma": "/taxivaxi/invoice-list/5",
  "invoices/unpaid": "/taxivaxi/invoice-list/6",
  "invoices/paid": "/taxivaxi/invoice-list/7",
  "invoices/billing-queue": "/taxivaxi/invoice-list/2",
  "duty/taxi-duty-slips-status": "/taxivaxi/taxi-duty-slips-status",
  "duty/duty-slips-status": "/taxivaxi/duty-slip-status",
  "duty/misc": "/taxivaxi/misc",
  "duty/send-sms": "/taxivaxi/send-sms"
};

const navGroups: NavGroup[] = [
  {
    id: "taxi",
    title: "Taxi",
    items: [
      { label: "Today's Booking", path: "taxi/todays-booking", countKey: "todaysBooking", tone: "info" },
      { label: "Running Trips", path: "taxi/running-trips", countKey: "runningTrips" },
      {
        label: "Active Bookings (Unassigned)",
        path: "taxi/active-unassigned",
        countKey: "activeUnassigned",
        tone: "warn"
      },
      {
        label: "Active Radio Bookings (Unassigned)",
        path: "taxi/active-radio-unassigned",
        countKey: "activeRadioUnassigned",
        tone: "warn"
      },
      {
        label: "Active Bookings (Assigned)",
        path: "taxi/active-assigned",
        countKey: "activeAssigned",
        tone: "ok"
      },
      {
        label: "Archived Bookings (Unassigned)",
        path: "taxi/archived-unassigned",
        countKey: "archivedUnassigned"
      },
      {
        label: "Archived Bookings (Assigned)",
        path: "taxi/archived-assigned",
        countKey: "archivedAssigned"
      },
      {
        label: "Cancelled/Rejected Bookings",
        path: "taxi/cancelled-rejected",
        countKey: "cancelledRejected",
        tone: "danger"
      },
      { label: "Operator Issues", path: "taxi/operator-issues", countKey: "operatorIssues", tone: "danger" }
    ]
  },
  {
    id: "invoices",
    title: "Unapproved Usages",
    items: [
      { label: "New Invoices: Unbilled", path: "invoices/unbilled", countKey: "invUnbilled", tone: "info" },
      {
        label: "Invoices: Cleared by Spoc",
        path: "invoices/cleared-by-spoc",
        countKey: "invClearedBySpoc",
        tone: "ok"
      },
      {
        label: "Invoices: Cleared for Billing",
        path: "invoices/cleared-for-billing",
        countKey: "invClearedForBilling",
        tone: "ok"
      },
      {
        label: "Invoices: Correction/comments from Client",
        path: "invoices/corrections",
        countKey: "invCorrections",
        tone: "warn"
      },
      {
        label: "Invoices: Tentative Bill Generated",
        path: "invoices/tentative",
        countKey: "invTentative",
        tone: "info"
      },
      {
        label: "Invoices: Proforma Invoice Generated",
        path: "invoices/proforma",
        countKey: "invProforma",
        tone: "info"
      },
      { label: "Billed Invoices: Unpaid", path: "invoices/unpaid", countKey: "invUnpaid", tone: "danger" },
      { label: "Paid Invoices", path: "invoices/paid", countKey: "invPaid", tone: "ok" }
    ]
  },
  {
    id: "duty",
    title: "Duty Slips",
    items: [
      { label: "Taxi Duty Slips Status", path: "duty/taxi-duty-slips-status", countKey: "taxiDutySlips" },
      { label: "Duty Slips Status", path: "duty/duty-slips-status", countKey: "dutySlips" },
      { label: "Miscellaneous", path: "duty/misc", countKey: "misc", tone: "info" },
      { label: "Send SMS", path: "duty/send-sms", countKey: "sms", tone: "ok" }
    ]
  }
];

const priorityTiles: Tile[] = [
  {
    title: "Assign Active Bookings",
    subtitle: "Unassigned active bookings need allocation",
    path: "taxi/active-unassigned",
    countKey: "activeUnassigned",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Handle Radio Queue",
    subtitle: "Unassigned radio bookings",
    path: "taxi/active-radio-unassigned",
    countKey: "activeRadioUnassigned",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Resolve Operator Issues",
    subtitle: "Trips blocked due to operator problems",
    path: "taxi/operator-issues",
    countKey: "operatorIssues",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Review Cancelled/Rejected",
    subtitle: "Investigate cancellations and rebook if needed",
    path: "taxi/cancelled-rejected",
    countKey: "cancelledRejected",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Follow-up Unpaid Invoices",
    subtitle: "Billed but unpaid invoices",
    path: "invoices/unpaid",
    countKey: "invUnpaid",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Resolve Client Corrections",
    subtitle: "Invoices needing correction/comments",
    path: "invoices/corrections",
    countKey: "invCorrections",
    tone: "warn",
    span: "col-4"
  }
];

const shortcutTiles: Tile[] = [
  {
    title: "Open Today's Bookings",
    subtitle: "View and manage new bookings",
    path: "taxi/todays-booking",
    countKey: "todaysBooking",
    tone: "info",
    span: "col-4"
  },
  {
    title: "Track Running Trips",
    subtitle: "Live trips monitoring",
    path: "taxi/running-trips",
    countKey: "runningTrips",
    tone: "neutral",
    span: "col-4"
  },
  {
    title: "View Assigned Active Bookings",
    subtitle: "Upcoming and allocated rides",
    path: "taxi/active-assigned",
    countKey: "activeAssigned",
    tone: "ok",
    span: "col-4"
  },
  {
    title: "Unbilled to Start Approval",
    subtitle: "New invoices pending pipeline",
    path: "invoices/unbilled",
    countKey: "invUnbilled",
    tone: "info",
    span: "col-6"
  },
  {
    title: "Generate and Process Billing",
    subtitle: "Invoices cleared for billing",
    path: "invoices/cleared-for-billing",
    countKey: "invClearedForBilling",
    tone: "ok",
    span: "col-6"
  },
  {
    title: "Duty Slips Status",
    subtitle: "Review slip completion and pending items",
    path: "duty/duty-slips-status",
    countKey: "dutySlips",
    tone: "neutral",
    span: "col-6"
  },
  {
    title: "Send SMS",
    subtitle: "Dispatch messages to drivers/users",
    path: "duty/send-sms",
    countKey: "sms",
    tone: "ok",
    span: "col-6"
  }
];

const toneClasses: Record<Tone, string> = {
  danger: "text-red-500",
  warn: "text-amber-500",
  ok: "text-emerald-500",
  info: "text-blue-500",
  neutral: "text-slate-700"
};

const tileAccentClasses: Record<Tone, string> = {
  danger: "before:bg-red-500",
  warn: "before:bg-amber-500",
  ok: "before:bg-emerald-500",
  info: "before:bg-blue-500",
  neutral: "before:bg-slate-600"
};

const TaxiDashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    taxi: false,
    invoices: false,
    duty: false
  });

  const groupTotals = useMemo(() => {
    return navGroups.reduce<Record<NavGroup["id"], number>>(
      (acc, group) => {
        acc[group.id] = group.items.reduce((sum, item) => sum + COUNTS[item.countKey], 0);
        return acc;
      },
      { taxi: 0, invoices: 0, duty: 0 }
    );
  }, []);

  const navigateTo = (path: string) => {
    const href = routeMap[path];
    if (href) {
      window.location.href = href;
    }
  };

  const taxiNavigationGroups = useMemo(() => {
    return navGroups.map((group) => ({
      id: group.id,
      title: group.title,
      total: groupTotals[group.id],
      items: group.items.map((item) => ({
        label: item.label,
        path: item.path,
        count: COUNTS[item.countKey],
        countClassName: item.tone ? toneClasses[item.tone] : "text-slate-700"
      }))
    }));
  }, [groupTotals]);

  const renderTile = (tile: Tile) => {
    const spanClass = tile.span === "col-6" ? "col-span-12 md:col-span-6" : "col-span-12 md:col-span-6 xl:col-span-4";

    return (
      <button
        key={tile.title}
        type="button"
        onClick={() => navigateTo(tile.path)}
        className={`${spanClass} relative flex min-h-[88px] items-center justify-between gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${tileAccentClasses[tile.tone]}`}
      >
        <div className="min-w-0 pl-2">
          <p className="truncate text-sm font-bold text-slate-900">{tile.title}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{tile.subtitle}</p>
        </div>
        <span className={`shrink-0 text-3xl font-black ${toneClasses[tile.tone]}`}>{COUNTS[tile.countKey]}</span>
      </button>
    );
  };

  return (
    <OpsMainLayout pageTitle="Taxi Dashboard" pageSubtitle="Left navigation with action tiles">
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          <TaxiNavigationMenu
            groups={taxiNavigationGroups}
            collapsed={collapsed}
            onToggleGroup={(groupId) => setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }))}
            onNavigate={navigateTo}
          />

          <main className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="min-w-0">
                <h1 className="text-xl font-black tracking-tight text-slate-900">Taxi Dashboard</h1>
                <p className="truncate text-xs text-slate-500">Action tiles only (details are in left navigation)</p>
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
                  onClick={() => navigateTo("taxi/add-booking")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Add Taxi Booking
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("taxi/unassigned")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Assign Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("taxi/exceptions")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Exceptions
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("invoices/billing-queue")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Billing Queue
                </button>
              </div>
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-600">Priority Actions</p>
            <div className="mt-2 grid grid-cols-12 gap-3">{priorityTiles.map(renderTile)}</div>

            <p className="mt-6 text-xs font-black uppercase tracking-wide text-slate-600">Operations Shortcuts</p>
            <div className="mt-2 grid grid-cols-12 gap-3">{shortcutTiles.map(renderTile)}</div>
          </main>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default TaxiDashboardPage;
