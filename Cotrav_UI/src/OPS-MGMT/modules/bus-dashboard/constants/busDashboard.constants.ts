import type { CountKey, Tone, NavGroup, Tile } from "../types/busDashboard.types";

export const COUNTS: Record<CountKey, number> = {
  busBookingAnalytics:    0,
  addBusBooking:          0,
  archivedUnassigned:     0,
  activeUnassigned:       0,
  activeAssigned:         0,
  archivedAssigned:       0,
  cancelledRejected:      0,
  invUnbilled:            0,
  invClearedBySpoc:       0,
  invClearedForBilling:   0,
  invCorrections:         0,
  invTentative:           0,
  invProforma:            0,
  invUnpaid:              0,
  invPaid:                0,
  invCancelledBooking:    0,
  busLoginIds:            0,
  busVendors:             0,
};

export const ROUTE_MAP: Record<string, string> = {
  "bus/booking-analytics":           "/businesstaxivaxi/bus-booking-analytics",
  "bus/add-booking":                 "/taxivaxi/add-bus-booking",
  "bus/archived-unassigned":         "/businesstaxivaxi/busbookings/5",
  "bus/active-unassigned":           "/businesstaxivaxi/busbookings/1",
  "bus/active-assigned":             "/businesstaxivaxi/busbookings/2",
  "bus/archived-assigned":           "/businesstaxivaxi/busbookings/3",
  "bus/cancelled-rejected":          "/businesstaxivaxi/busbookings/4",
  "bus/exceptions":                  "/businesstaxivaxi/busbookings/4",
  "bus/invoices/unbilled":           "/businesstaxivaxi/businvoices/0",
  "bus/invoices/cleared-by-spoc":    "/businesstaxivaxi/businvoices/1",
  "bus/invoices/cleared-for-billing":"/businesstaxivaxi/businvoices/2",
  "bus/invoices/corrections":        "/businesstaxivaxi/businvoices/3",
  "bus/invoices/tentative":          "/businesstaxivaxi/businvoices/4",
  "bus/invoices/proforma":           "/businesstaxivaxi/businvoices/6",
  "bus/invoices/unpaid":             "/businesstaxivaxi/businvoices/7",
  "bus/invoices/paid":               "/businesstaxivaxi/businvoices/5",
  "bus/invoices/cancelled-booking":  "/businesstaxivaxi/businvoices/8",
  "bus/invoices/billing-queue":      "/businesstaxivaxi/businvoices/2",
  "bus/login-ids":                   "/taxivaxi/bus-login-ids",
  "bus/vendors":                     "/taxivaxi/bus-vendors",
};

export const TONE_CLASSES: Record<Tone, string> = {
  danger:  "text-red-500",
  warn:    "text-amber-500",
  ok:      "text-emerald-500",
  info:    "text-blue-500",
  neutral: "text-slate-700",
};

export const TILE_ACCENT_CLASSES: Record<Tone, string> = {
  danger:  "before:bg-red-500",
  warn:    "before:bg-amber-500",
  ok:      "before:bg-emerald-500",
  info:    "before:bg-blue-500",
  neutral: "before:bg-slate-600",
};

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "busAnalytics",
    title: "Bus Analytics",
    items: [
      { label: "Bus Booking Analytics",          path: "bus/booking-analytics",   countKey: "busBookingAnalytics", tone: "info"    },
      { label: "Archived Bookings (Unassigned)", path: "bus/archived-unassigned", countKey: "archivedUnassigned"                   },
      { label: "Active Bookings (Unassigned)",   path: "bus/active-unassigned",   countKey: "activeUnassigned",    tone: "warn"    },
      { label: "Active Bookings (Assigned)",     path: "bus/active-assigned",     countKey: "activeAssigned",      tone: "ok"      },
      { label: "Archived Bookings (Assigned)",   path: "bus/archived-assigned",   countKey: "archivedAssigned"                     },
      { label: "Cancelled/Rejected Bookings",    path: "bus/cancelled-rejected",  countKey: "cancelledRejected",   tone: "danger"  },
    ],
  },
  {
    id: "busInvoices",
    title: "Bus Invoices",
    items: [
      { label: "New Invoices: Unbilled",                       path: "bus/invoices/unbilled",            countKey: "invUnbilled",          tone: "info"   },
      { label: "Invoices: Cleared by Spoc",                    path: "bus/invoices/cleared-by-spoc",     countKey: "invClearedBySpoc",      tone: "ok"     },
      { label: "Invoices: Cleared for Billing",                path: "bus/invoices/cleared-for-billing", countKey: "invClearedForBilling",  tone: "ok"     },
      { label: "Invoices: Correction/comments from Client",    path: "bus/invoices/corrections",         countKey: "invCorrections",        tone: "warn"   },
      { label: "Invoices: Tentative Bill Generated",           path: "bus/invoices/tentative",           countKey: "invTentative",          tone: "info"   },
      { label: "Invoices: Proforma Invoice Generated",         path: "bus/invoices/proforma",            countKey: "invProforma",           tone: "info"   },
      { label: "Billed Invoices: Unpaid",                      path: "bus/invoices/unpaid",              countKey: "invUnpaid",             tone: "danger" },
      { label: "Paid Invoices",                                path: "bus/invoices/paid",                countKey: "invPaid",               tone: "ok"     },
      { label: "Cancelled Booking Invoices",                   path: "bus/invoices/cancelled-booking",   countKey: "invCancelledBooking",   tone: "danger" },
    ],
  },
  {
    id: "busLogins",
    title: "Bus Login Ids",
    items: [
      { label: "Bus Login Ids", path: "bus/login-ids", countKey: "busLoginIds" },
    ],
  },
  {
    id: "busVendors",
    title: "Bus Vendors",
    items: [
      { label: "Bus Vendors", path: "bus/vendors", countKey: "busVendors" },
    ],
  },
];

export const PRIORITY_TILES: Tile[] = [
  { title: "Assign Active Bookings",    subtitle: "Unassigned active bookings need allocation",      path: "bus/active-unassigned",            countKey: "activeUnassigned",       tone: "warn",   span: "col-4" },
  { title: "Review Cancelled/Rejected", subtitle: "Investigate cancellations and rebook if needed",  path: "bus/cancelled-rejected",           countKey: "cancelledRejected",      tone: "danger", span: "col-4" },
  { title: "Follow-up Unpaid Invoices", subtitle: "Billed but unpaid invoices",                      path: "bus/invoices/unpaid",              countKey: "invUnpaid",              tone: "danger", span: "col-4" },
  { title: "Resolve Client Corrections",subtitle: "Invoices needing correction/comments",            path: "bus/invoices/corrections",         countKey: "invCorrections",         tone: "warn",   span: "col-4" },
  { title: "Start Invoice Approval",    subtitle: "New invoices: unbilled",                          path: "bus/invoices/unbilled",            countKey: "invUnbilled",            tone: "info",   span: "col-4" },
  { title: "Process Billing",           subtitle: "Invoices cleared for billing",                    path: "bus/invoices/cleared-for-billing", countKey: "invClearedForBilling",   tone: "ok",     span: "col-4" },
];

export const SHORTCUT_TILES: Tile[] = [
  { title: "Bus Booking Analytics",          subtitle: "View booking trends and KPIs",          path: "bus/booking-analytics",          countKey: "busBookingAnalytics", tone: "info",    span: "col-4"  },
  { title: "Add Bus Booking",                subtitle: "Create a new bus booking",              path: "bus/add-booking",                countKey: "addBusBooking",       tone: "ok",      span: "col-4"  },
  { title: "View Assigned Active Bookings",  subtitle: "Allocated and upcoming trips",          path: "bus/active-assigned",            countKey: "activeAssigned",      tone: "ok",      span: "col-4"  },
  { title: "Archived Bookings (Assigned)",   subtitle: "Completed and closed trips",            path: "bus/archived-assigned",          countKey: "archivedAssigned",    tone: "neutral", span: "col-6"  },
  { title: "Archived Bookings (Unassigned)", subtitle: "Closed without assignment",             path: "bus/archived-unassigned",        countKey: "archivedUnassigned",  tone: "neutral", span: "col-6"  },
  { title: "Cancelled Booking Invoices",     subtitle: "Audit invoices linked to cancelled",    path: "bus/invoices/cancelled-booking", countKey: "invCancelledBooking", tone: "danger",  span: "col-6"  },
  { title: "Bus Vendors",                    subtitle: "Manage vendors and allocations",        path: "bus/vendors",                    countKey: "busVendors",          tone: "neutral", span: "col-6"  },
  { title: "Bus Login Ids",                  subtitle: "View and manage bus login IDs",         path: "bus/login-ids",                  countKey: "busLoginIds",         tone: "neutral", span: "col-12" },
];