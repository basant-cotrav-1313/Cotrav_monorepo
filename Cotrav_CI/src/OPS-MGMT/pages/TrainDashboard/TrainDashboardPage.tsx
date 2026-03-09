import React, { useMemo, useState } from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";
import { TrainNavigationMenu } from "@/OPS-MGMT/components/layout/Navigation";

type CountKey =
  | "trainBookingAnalytics"
  | "addTrainBooking"
  | "activeUnassignedGeneral"
  | "activeUnassignedTatkal"
  | "activeUnassignedNotBookedTatkal"
  | "activeAssigned"
  | "archivedUnassigned"
  | "archivedAssigned"
  | "cancelledRejected"
  | "invUnbilled"
  | "invClearedBySpoc"
  | "invClearedForBilling"
  | "invCorrections"
  | "invTentative"
  | "invProforma"
  | "invUnpaid"
  | "invPaid"
  | "invCancelledBooking"
  | "trainLoginIds"
  | "trainVendors";

type Tone = "danger" | "warn" | "ok" | "info" | "neutral";

type NavItem = {
  label: string;
  path: string;
  countKey: CountKey;
  tone?: Tone;
};

type NavGroup = {
  id: "trainAnalytics" | "trainInvoices" | "trainLogins" | "trainVendors";
  title: string;
  items: NavItem[];
};

type Tile = {
  title: string;
  subtitle: string;
  path: string;
  countKey: CountKey;
  tone: Tone;
  span: "col-4" | "col-6" | "col-12";
};

const COUNTS: Record<CountKey, number> = {
  trainBookingAnalytics: 0,
  addTrainBooking: 0,
  activeUnassignedGeneral: 0,
  activeUnassignedTatkal: 0,
  activeUnassignedNotBookedTatkal: 0,
  activeAssigned: 0,
  archivedUnassigned: 0,
  archivedAssigned: 0,
  cancelledRejected: 0,
  invUnbilled: 0,
  invClearedBySpoc: 0,
  invClearedForBilling: 0,
  invCorrections: 0,
  invTentative: 0,
  invProforma: 0,
  invUnpaid: 0,
  invPaid: 0,
  invCancelledBooking: 0,
  trainLoginIds: 0,
  trainVendors: 0
};

const routeMap: Record<string, string> = {
  "train/booking-analytics": "/businesstaxivaxi/train-booking-analytics",
  "train/add-booking": "/taxivaxi/add-train-booking",
  "train/active-unassigned-general": "/businesstaxivaxi/train-bookings/1?type=general",
  "train/active-unassigned-tatkal": "/businesstaxivaxi/train-bookings/1?type=tatkal",
  "train/active-unassigned-not-booked-tatkal": "/businesstaxivaxi/train-bookings/1?type=not-booked-tatkal",
  "train/active-assigned": "/businesstaxivaxi/train-bookings/2",
  "train/archived-unassigned": "/businesstaxivaxi/train-bookings/5",
  "train/archived-assigned": "/businesstaxivaxi/train-bookings/3",
  "train/cancelled-rejected": "/businesstaxivaxi/train-bookings/4",
  "train/assign-queue": "/businesstaxivaxi/train-bookings/1",
  "train/exceptions": "/businesstaxivaxi/train-bookings/4",
  "train/invoices/unbilled": "/businesstaxivaxi/train-invoices/0",
  "train/invoices/cleared-by-spoc": "/businesstaxivaxi/train-invoices/1",
  "train/invoices/cleared-for-billing": "/businesstaxivaxi/train-invoices/2",
  "train/invoices/corrections": "/businesstaxivaxi/train-invoices/3",
  "train/invoices/tentative": "/businesstaxivaxi/train-invoices/4",
  "train/invoices/proforma": "/businesstaxivaxi/train-invoices/6",
  "train/invoices/unpaid": "/businesstaxivaxi/train-invoices/7",
  "train/invoices/paid": "/businesstaxivaxi/train-invoices/5",
  "train/invoices/cancelled-booking": "/businesstaxivaxi/train-invoices/8",
  "train/invoices/billing-queue": "/businesstaxivaxi/train-invoices/2",
  "train/login-ids": "/taxivaxi/train-login-ids",
  "train/vendors": "/taxivaxi/train-vendors"
};

const navGroups: NavGroup[] = [
  {
    id: "trainAnalytics",
    title: "Train Analytics",
    items: [
      {
        label: "Train Booking Analytics",
        path: "train/booking-analytics",
        countKey: "trainBookingAnalytics",
        tone: "info"
      },
      { label: "Add Train Booking", path: "train/add-booking", countKey: "addTrainBooking", tone: "ok" },
      {
        label: "Active (Unassigned) - General",
        path: "train/active-unassigned-general",
        countKey: "activeUnassignedGeneral",
        tone: "warn"
      },
      {
        label: "Active (Unassigned) - Tatkal",
        path: "train/active-unassigned-tatkal",
        countKey: "activeUnassignedTatkal",
        tone: "warn"
      },
      {
        label: "Active (Unassigned) - Not Booked In Tatkal",
        path: "train/active-unassigned-not-booked-tatkal",
        countKey: "activeUnassignedNotBookedTatkal",
        tone: "warn"
      },
      { label: "Active Bookings (Assigned)", path: "train/active-assigned", countKey: "activeAssigned", tone: "ok" },
      { label: "Archived Bookings (Unassigned)", path: "train/archived-unassigned", countKey: "archivedUnassigned" },
      { label: "Archived Bookings (Assigned)", path: "train/archived-assigned", countKey: "archivedAssigned" },
      {
        label: "Cancelled/Rejected Bookings",
        path: "train/cancelled-rejected",
        countKey: "cancelledRejected",
        tone: "danger"
      }
    ]
  },
  {
    id: "trainInvoices",
    title: "Train Invoices",
    items: [
      { label: "New Invoices: Unbilled", path: "train/invoices/unbilled", countKey: "invUnbilled", tone: "info" },
      {
        label: "Invoices: Cleared by Spoc",
        path: "train/invoices/cleared-by-spoc",
        countKey: "invClearedBySpoc",
        tone: "ok"
      },
      {
        label: "Invoices: Cleared for Billing",
        path: "train/invoices/cleared-for-billing",
        countKey: "invClearedForBilling",
        tone: "ok"
      },
      {
        label: "Invoices: Correction/comments from Client",
        path: "train/invoices/corrections",
        countKey: "invCorrections",
        tone: "warn"
      },
      {
        label: "Invoices: Tentative Bill Generated",
        path: "train/invoices/tentative",
        countKey: "invTentative",
        tone: "info"
      },
      {
        label: "Invoices: Proforma Invoice Generated",
        path: "train/invoices/proforma",
        countKey: "invProforma",
        tone: "info"
      },
      { label: "Billed Invoices: Unpaid", path: "train/invoices/unpaid", countKey: "invUnpaid", tone: "danger" },
      { label: "Paid Invoices", path: "train/invoices/paid", countKey: "invPaid", tone: "ok" },
      {
        label: "Cancelled Booking Invoices",
        path: "train/invoices/cancelled-booking",
        countKey: "invCancelledBooking",
        tone: "danger"
      }
    ]
  },
  {
    id: "trainLogins",
    title: "Train Login Ids",
    items: [{ label: "Train Login Ids", path: "train/login-ids", countKey: "trainLoginIds" }]
  },
  {
    id: "trainVendors",
    title: "Train Vendors",
    items: [{ label: "Train Vendors", path: "train/vendors", countKey: "trainVendors" }]
  }
];

const priorityTiles: Tile[] = [
  {
    title: "Assign: General (Unassigned)",
    subtitle: "Allocate bookings in General quota",
    path: "train/active-unassigned-general",
    countKey: "activeUnassignedGeneral",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Assign: Tatkal (Unassigned)",
    subtitle: "Handle Tatkal booking queue",
    path: "train/active-unassigned-tatkal",
    countKey: "activeUnassignedTatkal",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Tatkal Missed (Not Booked)",
    subtitle: "Bookings not booked during Tatkal window",
    path: "train/active-unassigned-not-booked-tatkal",
    countKey: "activeUnassignedNotBookedTatkal",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Review Cancelled/Rejected",
    subtitle: "Investigate cancellations and rebook if needed",
    path: "train/cancelled-rejected",
    countKey: "cancelledRejected",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Follow-up Unpaid Invoices",
    subtitle: "Billed but unpaid invoices",
    path: "train/invoices/unpaid",
    countKey: "invUnpaid",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Resolve Client Corrections",
    subtitle: "Invoices needing correction/comments",
    path: "train/invoices/corrections",
    countKey: "invCorrections",
    tone: "warn",
    span: "col-4"
  }
];

const shortcutTiles: Tile[] = [
  {
    title: "Train Booking Analytics",
    subtitle: "View booking trends and KPIs",
    path: "train/booking-analytics",
    countKey: "trainBookingAnalytics",
    tone: "info",
    span: "col-4"
  },
  {
    title: "Add Train Booking",
    subtitle: "Create a new train booking",
    path: "train/add-booking",
    countKey: "addTrainBooking",
    tone: "ok",
    span: "col-4"
  },
  {
    title: "View Assigned Active Bookings",
    subtitle: "Allocated and upcoming journeys",
    path: "train/active-assigned",
    countKey: "activeAssigned",
    tone: "ok",
    span: "col-4"
  },
  {
    title: "Archived Bookings (Assigned)",
    subtitle: "Completed and closed journeys",
    path: "train/archived-assigned",
    countKey: "archivedAssigned",
    tone: "neutral",
    span: "col-6"
  },
  {
    title: "Archived Bookings (Unassigned)",
    subtitle: "Closed without assignment",
    path: "train/archived-unassigned",
    countKey: "archivedUnassigned",
    tone: "neutral",
    span: "col-6"
  },
  {
    title: "Start Invoice Approval",
    subtitle: "New invoices: unbilled",
    path: "train/invoices/unbilled",
    countKey: "invUnbilled",
    tone: "info",
    span: "col-6"
  },
  {
    title: "Process Billing",
    subtitle: "Invoices cleared for billing",
    path: "train/invoices/cleared-for-billing",
    countKey: "invClearedForBilling",
    tone: "ok",
    span: "col-6"
  },
  {
    title: "Cancelled Booking Invoices",
    subtitle: "Audit invoices linked to cancelled bookings",
    path: "train/invoices/cancelled-booking",
    countKey: "invCancelledBooking",
    tone: "danger",
    span: "col-6"
  },
  {
    title: "Train Vendors",
    subtitle: "Manage vendors and allocations",
    path: "train/vendors",
    countKey: "trainVendors",
    tone: "neutral",
    span: "col-6"
  },
  {
    title: "Train Login Ids",
    subtitle: "View and manage train login IDs",
    path: "train/login-ids",
    countKey: "trainLoginIds",
    tone: "neutral",
    span: "col-12"
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
  info: "before:bg-blue-600",
  neutral: "before:bg-slate-600"
};

const TrainDashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    trainAnalytics: false,
    trainInvoices: false,
    trainLogins: false,
    trainVendors: false
  });

  const groupTotals = useMemo(() => {
    return navGroups.reduce<Record<NavGroup["id"], number>>(
      (acc, group) => {
        acc[group.id] = group.items.reduce((sum, item) => sum + COUNTS[item.countKey], 0);
        return acc;
      },
      { trainAnalytics: 0, trainInvoices: 0, trainLogins: 0, trainVendors: 0 }
    );
  }, []);

  const navigateTo = (path: string) => {
    const href = routeMap[path];
    if (href) {
      window.location.href = href;
    }
  };

  const trainNavigationGroups = useMemo(() => {
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
    const spanClass =
      tile.span === "col-12"
        ? "col-span-12"
        : tile.span === "col-6"
          ? "col-span-12 md:col-span-6"
          : "col-span-12 md:col-span-6 xl:col-span-4";

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
    <OpsMainLayout pageTitle="Train Dashboard" pageSubtitle="Left navigation with action tiles">
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          <TrainNavigationMenu
            groups={trainNavigationGroups}
            collapsed={collapsed}
            onToggleGroup={(groupId) => setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }))}
            onNavigate={navigateTo}
          />

          <main className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="min-w-0">
                <h1 className="text-xl font-black tracking-tight text-slate-900">Train Dashboard</h1>
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
                  onClick={() => navigateTo("train/add-booking")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Add Train Booking
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("train/assign-queue")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Assign Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("train/exceptions")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Exceptions
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("train/invoices/billing-queue")}
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

export default TrainDashboardPage;

