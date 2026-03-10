import React, { useMemo, useState } from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";
import { HotelNavigationMenu } from "@/OPS-MGMT/components/layout/Navigation";

type CountKey =
  | "viewAllHotels"
  | "viewAllEventHotels"
  | "addHotel"
  | "analytics"
  | "gstInvoiceAnalytics"
  | "addHotelBooking"
  | "hotelProcurementList"
  | "hotelClientCommunicationList"
  | "activeCheckins"
  | "activeCheckouts"
  | "iisf2025Bookings"
  | "activeUnassigned"
  | "activeAssigned"
  | "tbaUnassigned"
  | "tbaAssigned"
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
  | "prCheckout3DaysOrLess"
  | "prCheckoutMoreThan3Days"
  | "prRaisedPendingBudget"
  | "prPendingPayments"
  | "prAcceptedUnderProcess"
  | "prDonePartially"
  | "prDoneCompletely"
  | "prRejected"
  | "prBouncePayments"
  | "gstNonGstPaymentCompleted"
  | "gstNonGstPartialPayment"
  | "gstUploadPendingPaymentNotDone"
  | "gstUploadPendingPaymentDone"
  | "gstInvoiceUploadedVerificationPending"
  | "gstInvoiceRejected"
  | "gstValidatedInvoice"
  | "gstAccountsEntryCompletedVerificationPending"
  | "gstInputReceived"
  | "gstInputNotReceived"
  | "gstNotApplicableAccountsEntryCompleted"
  | "sellerVouchersPending";

type Tone = "danger" | "warn" | "ok" | "info" | "neutral" | "violet";

type NavItem = {
  label: string;
  path: string;
  countKey: CountKey;
  tone?: Tone;
};

type NavGroup = {
  id:
    | "hotelAnalytics"
    | "hotelBookings"
    | "hotelInvoices"
    | "paymentRequests"
    | "hotelGST"
    | "sellerVouchers";
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
  viewAllHotels: 0,
  viewAllEventHotels: 0,
  addHotel: 0,
  analytics: 0,
  gstInvoiceAnalytics: 0,
  addHotelBooking: 0,
  hotelProcurementList: 0,
  hotelClientCommunicationList: 0,
  activeCheckins: 0,
  activeCheckouts: 0,
  iisf2025Bookings: 0,
  activeUnassigned: 0,
  activeAssigned: 0,
  tbaUnassigned: 0,
  tbaAssigned: 0,
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
  prCheckout3DaysOrLess: 0,
  prCheckoutMoreThan3Days: 0,
  prRaisedPendingBudget: 0,
  prPendingPayments: 0,
  prAcceptedUnderProcess: 0,
  prDonePartially: 0,
  prDoneCompletely: 0,
  prRejected: 0,
  prBouncePayments: 0,
  gstNonGstPaymentCompleted: 0,
  gstNonGstPartialPayment: 0,
  gstUploadPendingPaymentNotDone: 0,
  gstUploadPendingPaymentDone: 0,
  gstInvoiceUploadedVerificationPending: 0,
  gstInvoiceRejected: 0,
  gstValidatedInvoice: 0,
  gstAccountsEntryCompletedVerificationPending: 0,
  gstInputReceived: 0,
  gstInputNotReceived: 0,
  gstNotApplicableAccountsEntryCompleted: 0,
  sellerVouchersPending: 0
};

const routeMap: Record<string, string> = {
  "hotel/view-all-hotels": "/taxivaxi/hotels",
  "hotel/view-all-event-hotels": "/taxivaxi/event-hotels",
  "hotel/add-hotel": "/taxivaxi/add-hotel",
  "hotel/analytics": "/taxivaxi/hotel-analytic",
  "hotel/gst-invoice-analytics": "/taxivaxi/hotel-gst-invoice-analytics",
  "hotel/bookings/add": "/taxivaxi/add-hotel-booking",
  "hotel/bookings/procurement-list": "/businesstaxivaxi/hotel-procurement-list",
  "hotel/bookings/client-communication": "/businesstaxivaxi/hotel-client-communication-list",
  "hotel/bookings/active-checkins": "/businesstaxivaxi/hotel-bookings/checkins",
  "hotel/bookings/active-checkouts": "/businesstaxivaxi/hotel-bookings/checkouts",
  "hotel/bookings/checkins": "/businesstaxivaxi/hotel-bookings/checkins",
  "hotel/bookings/iisf2025": "/businesstaxivaxi/hotel-bookings/iisf2025",
  "hotel/bookings/active-unassigned": "/businesstaxivaxi/hotel-bookings/1",
  "hotel/bookings/active-assigned": "/businesstaxivaxi/hotel-bookings/2",
  "hotel/bookings/tba-unassigned": "/businesstaxivaxi/hotel-bookings/tba-unassigned",
  "hotel/bookings/tba-assigned": "/businesstaxivaxi/hotel-bookings/tba-assigned",
  "hotel/bookings/archived-unassigned": "/businesstaxivaxi/hotel-bookings/5",
  "hotel/bookings/archived-assigned": "/businesstaxivaxi/hotel-bookings/3",
  "hotel/bookings/cancelled-rejected": "/businesstaxivaxi/hotel-bookings/4",
  "hotel/invoices/unbilled": "/businesstaxivaxi/hotel-invoices/0",
  "hotel/invoices/cleared-by-spoc": "/businesstaxivaxi/hotel-invoices/1",
  "hotel/invoices/cleared-for-billing": "/businesstaxivaxi/hotel-invoices/2",
  "hotel/invoices/corrections": "/businesstaxivaxi/hotel-invoices/3",
  "hotel/invoices/tentative": "/businesstaxivaxi/hotel-invoices/4",
  "hotel/invoices/proforma": "/businesstaxivaxi/hotel-invoices/6",
  "hotel/invoices/unpaid": "/businesstaxivaxi/hotel-invoices/7",
  "hotel/invoices/paid": "/businesstaxivaxi/hotel-invoices/5",
  "hotel/invoices/cancelled-booking": "/businesstaxivaxi/hotel-invoices/8",
  "hotel/invoices/billing-queue": "/businesstaxivaxi/hotel-invoices/2",
  "hotel/payments/checkout-3days-or-less": "/businesstaxivaxi/hotel-payment-requests/checkout-3-days-or-less",
  "hotel/payments/checkout-more-than-3days": "/businesstaxivaxi/hotel-payment-requests/checkout-more-than-3-days",
  "hotel/payments/raised-pending-budget": "/businesstaxivaxi/hotel-payment-requests/raised-pending-budget",
  "hotel/payments/pending": "/businesstaxivaxi/hotel-payment-requests/pending",
  "hotel/payments/accepted-under-process": "/businesstaxivaxi/hotel-payment-requests/accepted-under-process",
  "hotel/payments/done-partially": "/businesstaxivaxi/hotel-payment-requests/done-partially",
  "hotel/payments/done-completely": "/businesstaxivaxi/hotel-payment-requests/done-completely",
  "hotel/payments/rejected": "/businesstaxivaxi/hotel-payment-requests/rejected",
  "hotel/payments/bounce": "/businesstaxivaxi/hotel-payment-requests/bounce",
  "hotel/gst/non-gst-payment-complete": "/businesstaxivaxi/hotel-gst/non-gst-payment-complete",
  "hotel/gst/non-gst-partial": "/businesstaxivaxi/hotel-gst/non-gst-partial",
  "hotel/gst/upload-pending-payment-not-done": "/businesstaxivaxi/hotel-gst/upload-pending-payment-not-done",
  "hotel/gst/upload-pending-payment-done": "/businesstaxivaxi/hotel-gst/upload-pending-payment-done",
  "hotel/gst/uploaded-verification-pending": "/businesstaxivaxi/hotel-gst/uploaded-verification-pending",
  "hotel/gst/uploaded-rejected": "/businesstaxivaxi/hotel-gst/uploaded-rejected",
  "hotel/gst/validated-invoice": "/businesstaxivaxi/hotel-gst/validated-invoice",
  "hotel/gst/accounts-entry-completed-verification-pending":
    "/businesstaxivaxi/hotel-gst/accounts-entry-completed-verification-pending",
  "hotel/gst/input-received": "/businesstaxivaxi/hotel-gst/input-received",
  "hotel/gst/input-not-received": "/businesstaxivaxi/hotel-gst/input-not-received",
  "hotel/gst-not-applicable-accounts-entry": "/businesstaxivaxi/hotel-gst-not-applicable-accounts-entry",
  "hotel/seller-vouchers/pending": "/businesstaxivaxi/hotel-seller-vouchers/pending"
};

const navGroups: NavGroup[] = [
  {
    id: "hotelAnalytics",
    title: "Hotel Analytics",
    items: [
      { label: "View All Hotels", path: "hotel/view-all-hotels", countKey: "viewAllHotels" },
      { label: "View All Event Hotels", path: "hotel/view-all-event-hotels", countKey: "viewAllEventHotels" },
      { label: "Add Hotel", path: "hotel/add-hotel", countKey: "addHotel", tone: "ok" },
      { label: "Analytics", path: "hotel/analytics", countKey: "analytics", tone: "info" },
      {
        label: "Gst Invoice Analytics",
        path: "hotel/gst-invoice-analytics",
        countKey: "gstInvoiceAnalytics",
        tone: "info"
      }
    ]
  },
  {
    id: "hotelBookings",
    title: "Hotel Bookings",
    items: [
      { label: "Add Hotel Booking", path: "hotel/bookings/add", countKey: "addHotelBooking", tone: "ok" },
      {
        label: "Hotel Procurement List",
        path: "hotel/bookings/procurement-list",
        countKey: "hotelProcurementList"
      },
      {
        label: "Hotel Client Communication List",
        path: "hotel/bookings/client-communication",
        countKey: "hotelClientCommunicationList"
      },
      { label: "Active Check-ins", path: "hotel/bookings/active-checkins", countKey: "activeCheckins", tone: "info" },
      {
        label: "Active Check-outs",
        path: "hotel/bookings/active-checkouts",
        countKey: "activeCheckouts",
        tone: "info"
      },
      { label: "IISF2025 Bookings", path: "hotel/bookings/iisf2025", countKey: "iisf2025Bookings", tone: "violet" },
      {
        label: "Active Bookings (Unassigned)",
        path: "hotel/bookings/active-unassigned",
        countKey: "activeUnassigned",
        tone: "warn"
      },
      {
        label: "Active Bookings (Assigned)",
        path: "hotel/bookings/active-assigned",
        countKey: "activeAssigned",
        tone: "ok"
      },
      { label: "TBA Bookings (Unassigned)", path: "hotel/bookings/tba-unassigned", countKey: "tbaUnassigned", tone: "warn" },
      { label: "TBA Bookings (Assigned)", path: "hotel/bookings/tba-assigned", countKey: "tbaAssigned", tone: "ok" },
      {
        label: "Archived Bookings (Unassigned)",
        path: "hotel/bookings/archived-unassigned",
        countKey: "archivedUnassigned"
      },
      { label: "Archived Bookings (Assigned)", path: "hotel/bookings/archived-assigned", countKey: "archivedAssigned" },
      {
        label: "Cancelled/Rejected Bookings",
        path: "hotel/bookings/cancelled-rejected",
        countKey: "cancelledRejected",
        tone: "danger"
      }
    ]
  },
  {
    id: "hotelInvoices",
    title: "Hotel Invoices",
    items: [
      { label: "New Invoices: Unbilled", path: "hotel/invoices/unbilled", countKey: "invUnbilled", tone: "info" },
      {
        label: "Invoices: Cleared by Spoc",
        path: "hotel/invoices/cleared-by-spoc",
        countKey: "invClearedBySpoc",
        tone: "ok"
      },
      {
        label: "Invoices: Cleared for Billing",
        path: "hotel/invoices/cleared-for-billing",
        countKey: "invClearedForBilling",
        tone: "ok"
      },
      {
        label: "Invoices: Correction/comments from Client",
        path: "hotel/invoices/corrections",
        countKey: "invCorrections",
        tone: "warn"
      },
      {
        label: "Invoices: Tentative Bill Generated",
        path: "hotel/invoices/tentative",
        countKey: "invTentative",
        tone: "info"
      },
      {
        label: "Invoices: Proforma Invoice Generated",
        path: "hotel/invoices/proforma",
        countKey: "invProforma",
        tone: "info"
      },
      { label: "Billed Invoices: Unpaid", path: "hotel/invoices/unpaid", countKey: "invUnpaid", tone: "danger" },
      { label: "Paid Invoices", path: "hotel/invoices/paid", countKey: "invPaid", tone: "ok" },
      {
        label: "Cancelled Booking Invoices",
        path: "hotel/invoices/cancelled-booking",
        countKey: "invCancelledBooking",
        tone: "danger"
      }
    ]
  },
  {
    id: "paymentRequests",
    title: "Payment Requests",
    items: [
      {
        label: "≤ 3 Days Checkout",
        path: "hotel/payments/checkout-3days-or-less",
        countKey: "prCheckout3DaysOrLess",
        tone: "warn"
      },
      {
        label: "> 3 Days Checkout",
        path: "hotel/payments/checkout-more-than-3days",
        countKey: "prCheckoutMoreThan3Days"
      },
      {
        label: "Raised | Pending Budget",
        path: "hotel/payments/raised-pending-budget",
        countKey: "prRaisedPendingBudget",
        tone: "warn"
      },
      { label: "Pending Payments", path: "hotel/payments/pending", countKey: "prPendingPayments", tone: "danger" },
      {
        label: "Accepted | Under Process",
        path: "hotel/payments/accepted-under-process",
        countKey: "prAcceptedUnderProcess",
        tone: "info"
      },
      {
        label: "Payments Done Partially",
        path: "hotel/payments/done-partially",
        countKey: "prDonePartially",
        tone: "info"
      },
      {
        label: "Payments Done Completely",
        path: "hotel/payments/done-completely",
        countKey: "prDoneCompletely",
        tone: "ok"
      },
      { label: "Rejected Requests", path: "hotel/payments/rejected", countKey: "prRejected", tone: "danger" },
      { label: "Bounce Payments", path: "hotel/payments/bounce", countKey: "prBouncePayments", tone: "danger" }
    ]
  },
  {
    id: "hotelGST",
    title: "Hotel GST Invoice",
    items: [
      {
        label: "Non-GST | Payment Completed",
        path: "hotel/gst/non-gst-payment-complete",
        countKey: "gstNonGstPaymentCompleted",
        tone: "ok"
      },
      {
        label: "Non-GST | Partial Payment",
        path: "hotel/gst/non-gst-partial",
        countKey: "gstNonGstPartialPayment",
        tone: "warn"
      },
      {
        label: "GST | Upload Pending | Payment not Done",
        path: "hotel/gst/upload-pending-payment-not-done",
        countKey: "gstUploadPendingPaymentNotDone",
        tone: "danger"
      },
      {
        label: "GST | Upload Pending | Payment Done",
        path: "hotel/gst/upload-pending-payment-done",
        countKey: "gstUploadPendingPaymentDone",
        tone: "warn"
      },
      {
        label: "Invoice Uploaded | Verification Pending",
        path: "hotel/gst/uploaded-verification-pending",
        countKey: "gstInvoiceUploadedVerificationPending",
        tone: "warn"
      },
      {
        label: "GST Invoice Uploaded | Rejected",
        path: "hotel/gst/uploaded-rejected",
        countKey: "gstInvoiceRejected",
        tone: "danger"
      },
      { label: "Validated Invoice", path: "hotel/gst/validated-invoice", countKey: "gstValidatedInvoice", tone: "ok" },
      {
        label: "GST Validated | Accounts Entry | GST Input Pending",
        path: "hotel/gst/accounts-entry-completed-verification-pending",
        countKey: "gstAccountsEntryCompletedVerificationPending",
        tone: "warn"
      },
      { label: "GST Input Received", path: "hotel/gst/input-received", countKey: "gstInputReceived", tone: "ok" },
      {
        label: "GST Input Not Received",
        path: "hotel/gst/input-not-received",
        countKey: "gstInputNotReceived",
        tone: "danger"
      },
      {
        label: "GST Not Applicable | Accounts Entry Done",
        path: "hotel/gst-not-applicable-accounts-entry",
        countKey: "gstNotApplicableAccountsEntryCompleted"
      }
    ]
  },
  {
    id: "sellerVouchers",
    title: "Hotel Seller Vouchers",
    items: [
      {
        label: "Seller Vouchers Pending",
        path: "hotel/seller-vouchers/pending",
        countKey: "sellerVouchersPending",
        tone: "warn"
      }
    ]
  }
];

const priorityTiles: Tile[] = [
  {
    title: "Assign Active Bookings",
    subtitle: "Unassigned active bookings need allocation",
    path: "hotel/bookings/active-unassigned",
    countKey: "activeUnassigned",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Resolve TBA (Unassigned)",
    subtitle: "TBA bookings pending assignment",
    path: "hotel/bookings/tba-unassigned",
    countKey: "tbaUnassigned",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Manage Active Check-ins",
    subtitle: "Today/ongoing check-ins",
    path: "hotel/bookings/active-checkins",
    countKey: "activeCheckins",
    tone: "info",
    span: "col-4"
  },
  {
    title: "Manage Active Check-outs",
    subtitle: "Today/ongoing check-outs",
    path: "hotel/bookings/active-checkouts",
    countKey: "activeCheckouts",
    tone: "info",
    span: "col-4"
  },
  {
    title: "Follow-up Unpaid Invoices",
    subtitle: "Billed but unpaid invoices",
    path: "hotel/invoices/unpaid",
    countKey: "invUnpaid",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "Resolve Client Corrections",
    subtitle: "Invoices needing correction/comments",
    path: "hotel/invoices/corrections",
    countKey: "invCorrections",
    tone: "warn",
    span: "col-4"
  },
  {
    title: "Clear Pending Payments",
    subtitle: "Payment requests pending action",
    path: "hotel/payments/pending",
    countKey: "prPendingPayments",
    tone: "danger",
    span: "col-6"
  },
  {
    title: "Urgent: Checkout <= 3 Days",
    subtitle: "Prioritize short checkout window requests",
    path: "hotel/payments/checkout-3days-or-less",
    countKey: "prCheckout3DaysOrLess",
    tone: "warn",
    span: "col-6"
  }
];

const billingTiles: Tile[] = [
  {
    title: "Start Invoice Approval",
    subtitle: "New invoices: unbilled",
    path: "hotel/invoices/unbilled",
    countKey: "invUnbilled",
    tone: "info",
    span: "col-4"
  },
  {
    title: "Process Billing",
    subtitle: "Invoices cleared for billing",
    path: "hotel/invoices/cleared-for-billing",
    countKey: "invClearedForBilling",
    tone: "ok",
    span: "col-4"
  },
  {
    title: "Cancelled Booking Invoices",
    subtitle: "Audit invoices linked to cancelled bookings",
    path: "hotel/invoices/cancelled-booking",
    countKey: "invCancelledBooking",
    tone: "danger",
    span: "col-4"
  },
  {
    title: "GST Upload Pending (Payment Not Done)",
    subtitle: "Blockers: invoice upload pending and payment pending",
    path: "hotel/gst/upload-pending-payment-not-done",
    countKey: "gstUploadPendingPaymentNotDone",
    tone: "danger",
    span: "col-6"
  },
  {
    title: "GST Verification Pending",
    subtitle: "Invoice uploaded; verification required",
    path: "hotel/gst/uploaded-verification-pending",
    countKey: "gstInvoiceUploadedVerificationPending",
    tone: "warn",
    span: "col-6"
  },
  {
    title: "Validated Invoices",
    subtitle: "GST invoices validated",
    path: "hotel/gst/validated-invoice",
    countKey: "gstValidatedInvoice",
    tone: "ok",
    span: "col-6"
  },
  {
    title: "GST Input Not Received",
    subtitle: "Follow up for GST input",
    path: "hotel/gst/input-not-received",
    countKey: "gstInputNotReceived",
    tone: "danger",
    span: "col-6"
  }
];

const shortcutTiles: Tile[] = [
  {
    title: "Add Hotel Booking",
    subtitle: "Create a new hotel booking",
    path: "hotel/bookings/add",
    countKey: "addHotelBooking",
    tone: "ok",
    span: "col-4"
  },
  {
    title: "Procurement List",
    subtitle: "Hotel procurement tasks",
    path: "hotel/bookings/procurement-list",
    countKey: "hotelProcurementList",
    tone: "neutral",
    span: "col-4"
  },
  {
    title: "Client Communication",
    subtitle: "Messages and follow-ups",
    path: "hotel/bookings/client-communication",
    countKey: "hotelClientCommunicationList",
    tone: "neutral",
    span: "col-4"
  },
  {
    title: "IISF2025 Bookings",
    subtitle: "Event bookings view",
    path: "hotel/bookings/iisf2025",
    countKey: "iisf2025Bookings",
    tone: "violet",
    span: "col-6"
  },
  {
    title: "Seller Vouchers Pending",
    subtitle: "Vouchers awaiting upload/approval",
    path: "hotel/seller-vouchers/pending",
    countKey: "sellerVouchersPending",
    tone: "warn",
    span: "col-6"
  }
];

const toneClasses: Record<Tone, string> = {
  danger: "text-red-500",
  warn: "text-amber-500",
  ok: "text-emerald-500",
  info: "text-blue-500",
  neutral: "text-slate-700",
  violet: "text-violet-600"
};

const tileAccentClasses: Record<Tone, string> = {
  danger: "before:bg-red-500",
  warn: "before:bg-amber-500",
  ok: "before:bg-emerald-500",
  info: "before:bg-sky-500",
  neutral: "before:bg-slate-600",
  violet: "before:bg-violet-600"
};

const HotelDashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    hotelAnalytics: false,
    hotelBookings: false,
    hotelInvoices: false,
    paymentRequests: false,
    hotelGST: false,
    sellerVouchers: false
  });

  const groupTotals = useMemo(() => {
    return navGroups.reduce<Record<NavGroup["id"], number>>(
      (acc, group) => {
        acc[group.id] = group.items.reduce((sum, item) => sum + COUNTS[item.countKey], 0);
        return acc;
      },
      {
        hotelAnalytics: 0,
        hotelBookings: 0,
        hotelInvoices: 0,
        paymentRequests: 0,
        hotelGST: 0,
        sellerVouchers: 0
      }
    );
  }, []);

  const navigateTo = (path: string) => {
    const href = routeMap[path];
    if (href) {
      window.location.href = href;
    }
  };

  const hotelNavigationGroups = useMemo(() => {
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
    <OpsMainLayout pageTitle="Hotel Dashboard" pageSubtitle="Left navigation with action tiles">
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          <HotelNavigationMenu
            groups={hotelNavigationGroups}
            collapsed={collapsed}
            onToggleGroup={(groupId) => setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }))}
            onNavigate={navigateTo}
          />

          <main className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="min-w-0">
                <h1 className="text-xl font-black tracking-tight text-slate-900">Hotel Dashboard</h1>
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
                  onClick={() => navigateTo("hotel/bookings/active-unassigned")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Assign Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("hotel/bookings/checkins")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Check-ins
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("hotel/invoices/billing-queue")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Billing Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("hotel/payments/pending")}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                >
                  Pending Payments
                </button>
              </div>
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-600">Priority Actions</p>
            <div className="mt-2 grid grid-cols-12 gap-3">{priorityTiles.map(renderTile)}</div>

            <p className="mt-6 text-xs font-black uppercase tracking-wide text-slate-600">Billing and GST Shortcuts</p>
            <div className="mt-2 grid grid-cols-12 gap-3">{billingTiles.map(renderTile)}</div>

            <p className="mt-6 text-xs font-black uppercase tracking-wide text-slate-600">Operations Shortcuts</p>
            <div className="mt-2 grid grid-cols-12 gap-3">{shortcutTiles.map(renderTile)}</div>
          </main>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default HotelDashboardPage;

