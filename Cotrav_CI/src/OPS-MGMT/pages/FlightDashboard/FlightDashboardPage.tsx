import React, { useMemo, useState } from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";
import { FlightNavigationMenu } from "@/OPS-MGMT/components/layout/Navigation";
import { getOpsRoles } from "@/OPS-MGMT/auth/token";

type CountKey =
  | "allFlightQuery"
  | "flightBookingAnalytics"
  | "lossInBooking"
  | "lossVerifiedBooking"
  | "addAirline"
  | "addFlightBooking"
  | "activeUnassigned"
  | "activeAssigned"
  | "updatedFlightFare"
  | "bpPendingNext3Days"
  | "bpUploadedUpcoming"
  | "activeSplittedBookings"
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
  | "flightVendors";

type Tone = "danger" | "warn" | "ok" | "info" | "neutral";

type NavItem = {
  label: string;
  path: string;
  countKey: CountKey;
  tone?: Tone;
};

type NavGroup = {
  id: "flightAnalytics" | "airlines" | "flightInvoices";
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
  allFlightQuery: 0,
  flightBookingAnalytics: 0,
  lossInBooking: 0,
  lossVerifiedBooking: 0,
  addAirline: 0,
  addFlightBooking: 0,
  activeUnassigned: 0,
  activeAssigned: 0,
  updatedFlightFare: 0,
  bpPendingNext3Days: 0,
  bpUploadedUpcoming: 0,
  activeSplittedBookings: 0,
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
  flightVendors: 0
};

const routeMap: Record<string, string> = {
  "flight/all-flight-query": "/taxivaxi/all-flight-query",
  "flight/booking-analytics": "/businesstaxivaxi/flight-booking-analytics",
  "flight/loss-in-booking": "/businesstaxivaxi/flight-loss-bookings",
  "flight/loss-verified": "/businesstaxivaxi/flight-loss-verified-bookings",
  "flight/airlines/add": "/taxivaxi/add-airline",
  "flight/bookings/add": "/taxivaxi/add-flight-booking",
  "flight/bookings/active-unassigned": "/businesstaxivaxi/flight-bookings/1",
  "flight/bookings/active-assigned": "/businesstaxivaxi/flight-bookings/2",
  "flight/fare/updated": "/businesstaxivaxi/flight-fare/updated",
  "flight/boarding-pass/pending-next-3-days": "/businesstaxivaxi/flight-boarding-pass/pending-next-3-days",
  "flight/boarding-pass/uploaded-upcoming": "/businesstaxivaxi/flight-boarding-pass/uploaded-upcoming",
  "flight/bookings/splitted-active": "/businesstaxivaxi/flight-bookings/splitted-active",
  "flight/bookings/archived-unassigned": "/businesstaxivaxi/flight-bookings/5",
  "flight/bookings/archived-assigned": "/businesstaxivaxi/flight-bookings/3",
  "flight/bookings/cancelled-rejected": "/businesstaxivaxi/flight-bookings/4",
  "flight/invoices/unbilled": "/businesstaxivaxi/flight-invoices/0",
  "flight/invoices/cleared-by-spoc": "/businesstaxivaxi/flight-invoices/1",
  "flight/invoices/cleared-for-billing": "/businesstaxivaxi/flight-invoices/2",
  "flight/invoices/corrections": "/businesstaxivaxi/flight-invoices/3",
  "flight/invoices/tentative": "/businesstaxivaxi/flight-invoices/4",
  "flight/invoices/proforma": "/businesstaxivaxi/flight-invoices/6",
  "flight/invoices/unpaid": "/businesstaxivaxi/flight-invoices/7",
  "flight/invoices/paid": "/businesstaxivaxi/flight-invoices/5",
  "flight/invoices/cancelled-booking": "/businesstaxivaxi/flight-invoices/8",
  "flight/invoices/billing-queue": "/businesstaxivaxi/flight-invoices/2",
  "flight/vendors": "/taxivaxi/flight-vendors",
  "flight/exceptions": "/businesstaxivaxi/flight-bookings/4"
};

const navGroups: NavGroup[] = [
  {
    id: "flightAnalytics",
    title: "Flight Analytics",
    items: [
      {
        label: "Flight Booking Analytics",
        path: "flight/booking-analytics",
        countKey: "flightBookingAnalytics",
        tone: "info"
      },
      { label: "Loss In Flight Booking", path: "flight/loss-in-booking", countKey: "lossInBooking", tone: "danger" },
      {
        label: "Loss Verified Flight Booking",
        path: "flight/loss-verified",
        countKey: "lossVerifiedBooking",
        tone: "danger"
      }
    ]
  },
  {
    id: "airlines",
    title: "Airlines",
    items: [
      { label: "Add Airline", path: "flight/airlines/add", countKey: "addAirline", tone: "ok" },
      { label: "Add Flight Booking", path: "flight/bookings/add", countKey: "addFlightBooking", tone: "ok" },
      {
        label: "Active Bookings (Unassigned)",
        path: "flight/bookings/active-unassigned",
        countKey: "activeUnassigned",
        tone: "warn"
      },
      { label: "Active Bookings (Assigned)", path: "flight/bookings/active-assigned", countKey: "activeAssigned", tone: "ok" },
      { label: "Updated Flight Fare", path: "flight/fare/updated", countKey: "updatedFlightFare", tone: "info" },
      {
        label: "Next 2-3 Days | BP Pending",
        path: "flight/boarding-pass/pending-next-3-days",
        countKey: "bpPendingNext3Days",
        tone: "warn"
      },
      {
        label: "Upcoming | BP Uploaded",
        path: "flight/boarding-pass/uploaded-upcoming",
        countKey: "bpUploadedUpcoming",
        tone: "info"
      },
      {
        label: "Active Splitted Bookings",
        path: "flight/bookings/splitted-active",
        countKey: "activeSplittedBookings",
        tone: "warn"
      },
      { label: "Archived Bookings (Unassigned)", path: "flight/bookings/archived-unassigned", countKey: "archivedUnassigned" },
      { label: "Archived Bookings (Assigned)", path: "flight/bookings/archived-assigned", countKey: "archivedAssigned" },
      {
        label: "Cancelled/Rejected Bookings",
        path: "flight/bookings/cancelled-rejected",
        countKey: "cancelledRejected",
        tone: "danger"
      }
    ]
  },
  {
    id: "flightInvoices",
    title: "Flight Invoices",
    items: [
      { label: "New Invoices: Unbilled", path: "flight/invoices/unbilled", countKey: "invUnbilled", tone: "info" },
      {
        label: "Invoices: Cleared by Spoc",
        path: "flight/invoices/cleared-by-spoc",
        countKey: "invClearedBySpoc",
        tone: "ok"
      },
      {
        label: "Invoices: Cleared for Billing",
        path: "flight/invoices/cleared-for-billing",
        countKey: "invClearedForBilling",
        tone: "ok"
      },
      {
        label: "Invoices: Correction/comments from Client",
        path: "flight/invoices/corrections",
        countKey: "invCorrections",
        tone: "warn"
      },
      {
        label: "Invoices: Tentative Bill Generated",
        path: "flight/invoices/tentative",
        countKey: "invTentative",
        tone: "info"
      },
      {
        label: "Invoices: Proforma Invoice Generated",
        path: "flight/invoices/proforma",
        countKey: "invProforma",
        tone: "info"
      },
      { label: "Billed Invoices: Unpaid", path: "flight/invoices/unpaid", countKey: "invUnpaid", tone: "danger" },
      { label: "Paid Invoices", path: "flight/invoices/paid", countKey: "invPaid", tone: "ok" },
      {
        label: "Cancelled Booking Invoices",
        path: "flight/invoices/cancelled-booking",
        countKey: "invCancelledBooking",
        tone: "danger"
      }
    ]
  }
];

const FLIGHT_INVOICE_ALLOWED_ROLES = ["flight-billing", "flight-invoice", "flight-admin"];

const priorityTiles: Tile[] = [
  {
    title: "Assign Active Bookings",
    subtitle: "Unassigned active bookings need allocation",
    path: "flight/bookings/active-unassigned",
    countKey: "activeUnassigned",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Boarding Pass Pending (Next 2-3 Days)",
    subtitle: "Collect/upload boarding passes before travel",
    path: "flight/boarding-pass/pending-next-3-days",
    countKey: "bpPendingNext3Days",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Resolve Splitted Bookings",
    subtitle: "Active splitted bookings need attention",
    path: "flight/bookings/splitted-active",
    countKey: "activeSplittedBookings",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Follow-up Unpaid Invoices",
    subtitle: "Billed but unpaid invoices",
    path: "flight/invoices/unpaid",
    countKey: "invUnpaid",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Resolve Client Corrections",
    subtitle: "Invoices needing correction/comments",
    path: "flight/invoices/corrections",
    countKey: "invCorrections",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Review Cancelled/Rejected",
    subtitle: "Investigate cancellations and rebook if needed",
    path: "flight/bookings/cancelled-rejected",
    countKey: "cancelledRejected",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Investigate Loss Bookings",
    subtitle: "Loss in flight booking pipeline",
    path: "flight/loss-in-booking",
    countKey: "lossInBooking",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Loss Verified Bookings",
    subtitle: "Verified loss cases for action",
    path: "flight/loss-verified",
    countKey: "lossVerifiedBooking",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Review Updated Flight Fare",
    subtitle: "Fare changes requiring validation",
    path: "flight/fare/updated",
    countKey: "updatedFlightFare",
    tone: "info",
    span: "col-4"
  }
];

const shortcutTiles: Tile[] = [
  {
    title: "All Flight Query",
    subtitle: "Search / query flight requests",
    path: "flight/all-flight-query",
    countKey: "allFlightQuery",
    tone: "neutral",
    span: "col-4"
  },
  {
    title: "Flight Booking Analytics",
    subtitle: "View booking trends and KPIs",
    path: "flight/booking-analytics",
    countKey: "flightBookingAnalytics",
    tone: "info",
    span: "col-4"
  },
  {
    title: "Add Flight Booking",
    subtitle: "Create a new flight booking",
    path: "flight/bookings/add",
    countKey: "addFlightBooking",
    tone: "ok",
    span: "col-4"
  },
  {
    title: "Add Airline",
    subtitle: "Manage airline master",
    path: "flight/airlines/add",
    countKey: "addAirline",
    tone: "ok",
    span: "col-6"
  },
  {
    title: "Upcoming | Boarding Pass Uploaded",
    subtitle: "Review upcoming travel with BP uploaded",
    path: "flight/boarding-pass/uploaded-upcoming",
    countKey: "bpUploadedUpcoming",
    tone: "info",
    span: "col-6"
  },
  {
    title: "Archived (Assigned)",
    subtitle: "Completed and closed bookings",
    path: "flight/bookings/archived-assigned",
    countKey: "archivedAssigned",
    tone: "neutral",
    span: "col-6"
  },
  {
    title: "Archived (Unassigned)",
    subtitle: "Closed without assignment",
    path: "flight/bookings/archived-unassigned",
    countKey: "archivedUnassigned",
    tone: "neutral",
    span: "col-6"
  },
  {
    title: "Start Invoice Approval",
    subtitle: "New invoices: unbilled",
    path: "flight/invoices/unbilled",
    countKey: "invUnbilled",
    tone: "info",
    span: "col-6"
  },
  {
    title: "Process Billing",
    subtitle: "Invoices cleared for billing",
    path: "flight/invoices/cleared-for-billing",
    countKey: "invClearedForBilling",
    tone: "ok",
    span: "col-6"
  },
  {
    title: "Cancelled Booking Invoices",
    subtitle: "Audit invoices linked to cancelled bookings",
    path: "flight/invoices/cancelled-booking",
    countKey: "invCancelledBooking",
    tone: "danger",
    span: "col-6"
  },
  {
    title: "Flight Vendors",
    subtitle: "Manage vendors and allocations",
    path: "flight/vendors",
    countKey: "flightVendors",
    tone: "neutral",
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
  neutral: "before:bg-violet-600"
};

const FlightDashboardPage: React.FC = () => {
  const normalizedRoles = getOpsRoles().map((role) => role.toLowerCase());
  const canViewFlightInvoices = FLIGHT_INVOICE_ALLOWED_ROLES.some((role) => normalizedRoles.includes(role));
  const visibleNavGroups = useMemo(
    () => navGroups.filter((group) => (group.id === "flightInvoices" ? canViewFlightInvoices : true)),
    [canViewFlightInvoices]
  );

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    flightAnalytics: false,
    airlines: false,
    flightInvoices: false
  });

  const groupTotals = useMemo(() => {
    return visibleNavGroups.reduce<Record<NavGroup["id"], number>>(
      (acc, group) => {
        acc[group.id] = group.items.reduce((sum, item) => sum + COUNTS[item.countKey], 0);
        return acc;
      },
      { flightAnalytics: 0, airlines: 0, flightInvoices: 0 }
    );
  }, [visibleNavGroups]);

  const navigateTo = (path: string) => {
    const href = routeMap[path];
    if (href) {
      window.location.href = href;
    }
  };

  const flightNavigationGroups = useMemo(() => {
    return visibleNavGroups.map((group) => ({
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
  }, [groupTotals, visibleNavGroups]);

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
    <OpsMainLayout pageTitle="Flight Dashboard" pageSubtitle="Left navigation with action tiles">
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          <FlightNavigationMenu
            groups={flightNavigationGroups}
            collapsed={collapsed}
            onToggleGroup={(groupId) => setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }))}
            onNavigate={navigateTo}
          />

          <main className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="min-w-0">
                <h1 className="text-xl font-black tracking-tight text-slate-900">Flight Dashboard</h1>
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
                  onClick={() => navigateTo("flight/bookings/active-unassigned")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Assign Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("flight/boarding-pass/pending-next-3-days")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  BP Pending
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("flight/invoices/billing-queue")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Billing Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("flight/exceptions")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Exceptions
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

export default FlightDashboardPage;
