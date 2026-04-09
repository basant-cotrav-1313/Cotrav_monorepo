export type CountKey =
  | "busBookingAnalytics"
  | "addBusBooking"
  | "archivedUnassigned"
  | "activeUnassigned"
  | "activeAssigned"
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
  | "busLoginIds"
  | "busVendors";

export type Tone = "danger" | "warn" | "ok" | "info" | "neutral";

export type NavItem = {
  label: string;
  path: string;
  countKey: CountKey;
  tone?: Tone;
};

export type NavGroup = {
  id: "busAnalytics" | "busInvoices" | "busLogins" | "busVendors";
  title: string;
  items: NavItem[];
};

export type Tile = {
  title: string;
  subtitle: string;
  path: string;
  countKey: CountKey;
  tone: Tone;
  span: "col-4" | "col-6" | "col-12";
};