// import React, { useMemo, useState } from "react";
// import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";
// import { BusNavigationMenu } from "@/OPS-MGMT/components/layout/Navigation";

// type CountKey =
//   | "busBookingAnalytics"
//   | "addBusBooking"
//   | "archivedUnassigned"
//   | "activeUnassigned"
//   | "activeAssigned"
//   | "archivedAssigned"
//   | "cancelledRejected"
//   | "invUnbilled"
//   | "invClearedBySpoc"
//   | "invClearedForBilling"
//   | "invCorrections"
//   | "invTentative"
//   | "invProforma"
//   | "invUnpaid"
//   | "invPaid"
//   | "invCancelledBooking"
//   | "busLoginIds"
//   | "busVendors";

// type Tone = "danger" | "warn" | "ok" | "info" | "neutral";

// type NavItem = {
//   label: string;
//   path: string;
//   countKey: CountKey;
//   tone?: Tone;
// };

// type NavGroup = {
//   id: "busAnalytics" | "busInvoices" | "busLogins" | "busVendors";
//   title: string;
//   items: NavItem[];
// };

// type Tile = {
//   title: string;
//   subtitle: string;
//   path: string;
//   countKey: CountKey;
//   tone: Tone;
//   span: "col-4" | "col-6" | "col-12";
// };

// const COUNTS: Record<CountKey, number> = {
//   busBookingAnalytics: 0,
//   addBusBooking: 0,
//   archivedUnassigned: 0,
//   activeUnassigned: 0,
//   activeAssigned: 0,
//   archivedAssigned: 0,
//   cancelledRejected: 0,
//   invUnbilled: 0,
//   invClearedBySpoc: 0,
//   invClearedForBilling: 0,
//   invCorrections: 0,
//   invTentative: 0,
//   invProforma: 0,
//   invUnpaid: 0,
//   invPaid: 0,
//   invCancelledBooking: 0,
//   busLoginIds: 0,
//   busVendors: 0
// };

// const routeMap: Record<string, string> = {
//   "bus/booking-analytics": "/businesstaxivaxi/bus-booking-analytics",
//   "bus/add-booking": "/taxivaxi/add-bus-booking",
//   "bus/archived-unassigned": "/businesstaxivaxi/busbookings/5",
//   "bus/active-unassigned": "/businesstaxivaxi/busbookings/1",
//   "bus/active-assigned": "/businesstaxivaxi/busbookings/2",
//   "bus/archived-assigned": "/businesstaxivaxi/busbookings/3",
//   "bus/cancelled-rejected": "/businesstaxivaxi/busbookings/4",
//   "bus/exceptions": "/businesstaxivaxi/busbookings/4",
//   "bus/invoices/unbilled": "/businesstaxivaxi/businvoices/0",
//   "bus/invoices/cleared-by-spoc": "/businesstaxivaxi/businvoices/1",
//   "bus/invoices/cleared-for-billing": "/businesstaxivaxi/businvoices/2",
//   "bus/invoices/corrections": "/businesstaxivaxi/businvoices/3",
//   "bus/invoices/tentative": "/businesstaxivaxi/businvoices/4",
//   "bus/invoices/proforma": "/businesstaxivaxi/businvoices/6",
//   "bus/invoices/unpaid": "/businesstaxivaxi/businvoices/7",
//   "bus/invoices/paid": "/businesstaxivaxi/businvoices/5",
//   "bus/invoices/cancelled-booking": "/businesstaxivaxi/businvoices/8",
//   "bus/invoices/billing-queue": "/businesstaxivaxi/businvoices/2",
//   "bus/login-ids": "/taxivaxi/bus-login-ids",
//   "bus/vendors": "/taxivaxi/bus-vendors"
// };

// const navGroups: NavGroup[] = [
//   {
//     id: "busAnalytics",
//     title: "Bus Analytics",
//     items: [
//       {
//         label: "Bus Booking Analytics",
//         path: "bus/booking-analytics",
//         countKey: "busBookingAnalytics",
//         tone: "info"
//       },
//       { label: "Archived Bookings (Unassigned)", path: "bus/archived-unassigned", countKey: "archivedUnassigned" },
//       {
//         label: "Active Bookings (Unassigned)",
//         path: "bus/active-unassigned",
//         countKey: "activeUnassigned",
//         tone: "warn"
//       },
//       { label: "Active Bookings (Assigned)", path: "bus/active-assigned", countKey: "activeAssigned", tone: "ok" },
//       { label: "Archived Bookings (Assigned)", path: "bus/archived-assigned", countKey: "archivedAssigned" },
//       {
//         label: "Cancelled/Rejected Bookings",
//         path: "bus/cancelled-rejected",
//         countKey: "cancelledRejected",
//         tone: "danger"
//       }
//     ]
//   },
//   {
//     id: "busInvoices",
//     title: "Bus Invoices",
//     items: [
//       { label: "New Invoices: Unbilled", path: "bus/invoices/unbilled", countKey: "invUnbilled", tone: "info" },
//       {
//         label: "Invoices: Cleared by Spoc",
//         path: "bus/invoices/cleared-by-spoc",
//         countKey: "invClearedBySpoc",
//         tone: "ok"
//       },
//       {
//         label: "Invoices: Cleared for Billing",
//         path: "bus/invoices/cleared-for-billing",
//         countKey: "invClearedForBilling",
//         tone: "ok"
//       },
//       {
//         label: "Invoices: Correction/comments from Client",
//         path: "bus/invoices/corrections",
//         countKey: "invCorrections",
//         tone: "warn"
//       },
//       {
//         label: "Invoices: Tentative Bill Generated",
//         path: "bus/invoices/tentative",
//         countKey: "invTentative",
//         tone: "info"
//       },
//       {
//         label: "Invoices: Proforma Invoice Generated",
//         path: "bus/invoices/proforma",
//         countKey: "invProforma",
//         tone: "info"
//       },
//       { label: "Billed Invoices: Unpaid", path: "bus/invoices/unpaid", countKey: "invUnpaid", tone: "danger" },
//       { label: "Paid Invoices", path: "bus/invoices/paid", countKey: "invPaid", tone: "ok" },
//       {
//         label: "Cancelled Booking Invoices",
//         path: "bus/invoices/cancelled-booking",
//         countKey: "invCancelledBooking",
//         tone: "danger"
//       }
//     ]
//   },
//   {
//     id: "busLogins",
//     title: "Bus Login Ids",
//     items: [{ label: "Bus Login Ids", path: "bus/login-ids", countKey: "busLoginIds" }]
//   },
//   {
//     id: "busVendors",
//     title: "Bus Vendors",
//     items: [{ label: "Bus Vendors", path: "bus/vendors", countKey: "busVendors" }]
//   }
// ];

// const priorityTiles: Tile[] = [
//   {
//     title: "Assign Active Bookings",
//     subtitle: "Unassigned active bookings need allocation",
//     path: "bus/active-unassigned",
//     countKey: "activeUnassigned",
//     tone: "warn",
//     span: "col-4"
//   },
//   {
//     title: "Review Cancelled/Rejected",
//     subtitle: "Investigate cancellations and rebook if needed",
//     path: "bus/cancelled-rejected",
//     countKey: "cancelledRejected",
//     tone: "danger",
//     span: "col-4"
//   },
//   {
//     title: "Follow-up Unpaid Invoices",
//     subtitle: "Billed but unpaid invoices",
//     path: "bus/invoices/unpaid",
//     countKey: "invUnpaid",
//     tone: "danger",
//     span: "col-4"
//   },
//   {
//     title: "Resolve Client Corrections",
//     subtitle: "Invoices needing correction/comments",
//     path: "bus/invoices/corrections",
//     countKey: "invCorrections",
//     tone: "warn",
//     span: "col-4"
//   },
//   {
//     title: "Start Invoice Approval",
//     subtitle: "New invoices: unbilled",
//     path: "bus/invoices/unbilled",
//     countKey: "invUnbilled",
//     tone: "info",
//     span: "col-4"
//   },
//   {
//     title: "Process Billing",
//     subtitle: "Invoices cleared for billing",
//     path: "bus/invoices/cleared-for-billing",
//     countKey: "invClearedForBilling",
//     tone: "ok",
//     span: "col-4"
//   }
// ];

// const shortcutTiles: Tile[] = [
//   {
//     title: "Bus Booking Analytics",
//     subtitle: "View booking trends and KPIs",
//     path: "bus/booking-analytics",
//     countKey: "busBookingAnalytics",
//     tone: "info",
//     span: "col-4"
//   },
//   {
//     title: "Add Bus Booking",
//     subtitle: "Create a new bus booking",
//     path: "bus/add-booking",
//     countKey: "addBusBooking",
//     tone: "ok",
//     span: "col-4"
//   },
//   {
//     title: "View Assigned Active Bookings",
//     subtitle: "Allocated and upcoming trips",
//     path: "bus/active-assigned",
//     countKey: "activeAssigned",
//     tone: "ok",
//     span: "col-4"
//   },
//   {
//     title: "Archived Bookings (Assigned)",
//     subtitle: "Completed and closed trips",
//     path: "bus/archived-assigned",
//     countKey: "archivedAssigned",
//     tone: "neutral",
//     span: "col-6"
//   },
//   {
//     title: "Archived Bookings (Unassigned)",
//     subtitle: "Closed without assignment",
//     path: "bus/archived-unassigned",
//     countKey: "archivedUnassigned",
//     tone: "neutral",
//     span: "col-6"
//   },
//   {
//     title: "Cancelled Booking Invoices",
//     subtitle: "Audit invoices linked to cancelled bookings",
//     path: "bus/invoices/cancelled-booking",
//     countKey: "invCancelledBooking",
//     tone: "danger",
//     span: "col-6"
//   },
//   {
//     title: "Bus Vendors",
//     subtitle: "Manage vendors and allocations",
//     path: "bus/vendors",
//     countKey: "busVendors",
//     tone: "neutral",
//     span: "col-6"
//   },
//   {
//     title: "Bus Login Ids",
//     subtitle: "View and manage bus login IDs",
//     path: "bus/login-ids",
//     countKey: "busLoginIds",
//     tone: "neutral",
//     span: "col-12"
//   }
// ];

// const toneClasses: Record<Tone, string> = {
//   danger: "text-red-500",
//   warn: "text-amber-500",
//   ok: "text-emerald-500",
//   info: "text-blue-500",
//   neutral: "text-slate-700"
// };

// const tileAccentClasses: Record<Tone, string> = {
//   danger: "before:bg-red-500",
//   warn: "before:bg-amber-500",
//   ok: "before:bg-emerald-500",
//   info: "before:bg-blue-500",
//   neutral: "before:bg-slate-600"
// };

// const BusDashboardPage: React.FC = () => {
//   const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
//     busAnalytics: false,
//     busInvoices: false,
//     busLogins: false,
//     busVendors: false
//   });

//   const groupTotals = useMemo(() => {
//     return navGroups.reduce<Record<NavGroup["id"], number>>(
//       (acc, group) => {
//         acc[group.id] = group.items.reduce((sum, item) => sum + COUNTS[item.countKey], 0);
//         return acc;
//       },
//       { busAnalytics: 0, busInvoices: 0, busLogins: 0, busVendors: 0 }
//     );
//   }, []);

//   const navigateTo = (path: string) => {
//     const href = routeMap[path];
//     if (href) {
//       window.location.href = href;
//     }
//   };

//   const busNavigationGroups = useMemo(() => {
//     return navGroups.map((group) => ({
//       id: group.id,
//       title: group.title,
//       total: groupTotals[group.id],
//       items: group.items.map((item) => ({
//         label: item.label,
//         path: item.path,
//         count: COUNTS[item.countKey],
//         countClassName: item.tone ? toneClasses[item.tone] : "text-slate-700"
//       }))
//     }));
//   }, [groupTotals]);

//   const renderTile = (tile: Tile) => {
//     const spanClass =
//       tile.span === "col-12"
//         ? "col-span-12"
//         : tile.span === "col-6"
//           ? "col-span-12 md:col-span-6"
//           : "col-span-12 md:col-span-6 xl:col-span-4";

//     return (
//       <button
//         key={tile.title}
//         type="button"
//         onClick={() => navigateTo(tile.path)}
//         className={`${spanClass} relative flex min-h-[88px] items-center justify-between gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${tileAccentClasses[tile.tone]}`}
//       >
//         <div className="min-w-0 pl-2">
//           <p className="truncate text-sm font-bold text-slate-900">{tile.title}</p>
//           <p className="mt-1 truncate text-xs text-slate-500">{tile.subtitle}</p>
//         </div>
//         <span className={`shrink-0 text-3xl font-black ${toneClasses[tile.tone]}`}>{COUNTS[tile.countKey]}</span>
//       </button>
//     );
//   };

//   return (
//     <OpsMainLayout pageTitle="Bus Dashboard" pageSubtitle="Left navigation with action tiles">
//       <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
//           <BusNavigationMenu
//             groups={busNavigationGroups}
//             collapsed={collapsed}
//             onToggleGroup={(groupId) => setCollapsed((prev) => ({ ...prev, [groupId]: !prev[groupId] }))}
//             onNavigate={navigateTo}
//           />

//           <main className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
//             <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
//               <div className="min-w-0">
//                 <h1 className="text-xl font-black tracking-tight text-slate-900">Bus Dashboard</h1>
//                 <p className="truncate text-xs text-slate-500">Action tiles only (details are in left navigation)</p>
//               </div>

//               <div className="flex flex-wrap justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => window.location.reload()}
//                   className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
//                 >
//                   Refresh
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigateTo("bus/add-booking")}
//                   className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
//                 >
//                   Add Bus Booking
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigateTo("bus/active-unassigned")}
//                   className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
//                 >
//                   Assign Queue
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigateTo("bus/exceptions")}
//                   className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
//                 >
//                   Exceptions
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigateTo("bus/invoices/billing-queue")}
//                   className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
//                 >
//                   Billing Queue
//                 </button>
//               </div>
//             </div>

//             <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-600">Priority Actions</p>
//             <div className="mt-2 grid grid-cols-12 gap-3">{priorityTiles.map(renderTile)}</div>

//             <p className="mt-6 text-xs font-black uppercase tracking-wide text-slate-600">Operations Shortcuts</p>
//             <div className="mt-2 grid grid-cols-12 gap-3">{shortcutTiles.map(renderTile)}</div>
//           </main>
//         </div>
//       </div>
//     </OpsMainLayout>
//   );
// };

// export default BusDashboardPage;


import React from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";
import { BusNavigationMenu } from "@/OPS-MGMT/components/layout/Navigation";
import {PRIORITY_TILES, SHORTCUT_TILES, useBusDashboard,BusDashboardHeader, TileSection} from '@/OPS-MGMT/modules/bus-dashboard/index'

const BusDashboardPage: React.FC = () => {
  const { collapsed, toggleGroup, navigateTo, busNavigationGroups } = useBusDashboard();

  return (
    <OpsMainLayout pageTitle="Bus Dashboard" pageSubtitle="Left navigation with action tiles">
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">

          <BusNavigationMenu
            groups={busNavigationGroups}
            collapsed={collapsed}
            onToggleGroup={toggleGroup}
            onNavigate={navigateTo}
          />

          <main className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <BusDashboardHeader onNavigate={navigateTo} />

            <TileSection
              label="Priority Actions"
              tiles={PRIORITY_TILES}
              onNavigate={navigateTo}
            />

            <TileSection
              label="Operations Shortcuts"
              tiles={SHORTCUT_TILES}
              onNavigate={navigateTo}
            />
          </main>

        </div>
      </div>
    </OpsMainLayout>
  );
};

export default BusDashboardPage;
