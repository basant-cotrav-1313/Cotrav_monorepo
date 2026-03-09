import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearOpsAuthSession, getOpsRoles } from "@/OPS-MGMT/auth/token";
import { ChevronDown, House, Search, SlidersHorizontal } from "lucide-react";
import logo from "@/assets/images/Cotrav_Logo.png";

type NavLink = {
  label: string;
  href: string;
  internal?: boolean;
  requiredRoles?: string[];
};

type NavSection = {
  label: string;
  links: NavLink[];
  href?: string;
  internal?: boolean;
};

type NavMenu = {
  label: string;
  sections?: NavSection[];
  directLink?: NavLink;
  dashboardPath?: string;
  requiredRolePrefixes?: string[];
};

type OpsTopNavProps = {
  pageTitle?: string;
  pageSubtitle?: string;
};


const SALES_RM_LINKS: NavLink[] = [
  { label: "Analytics", href: "/taxivaxi/client-rm-analytics" },
  { label: "Client Booking Status", href: "/taxivaxi/client-booking-status" },
  { label: "Client Wise Analytics", href: "/taxivaxi/client-wise-analytics" }
];

const OPERATOR_LINKS: NavLink[] = [
  { label: "Operator Leads", href: "/taxivaxi/operator-leads" },
  { label: "View All Operators", href: "/taxivaxi/operators" },
  { label: "Operator Invoice Validation", href: "/taxivaxi/operator-self-invoices/0" },
  { label: "Raised Advance Payment", href: "/taxivaxi/advance-payment-vouchers/0" }
];

const TAXI_LINKS: NavLink[] = [
  { label: "Taxi Analytics", href: "/taxivaxi/taxi-analytic" },
  { label: "Today's Booking", href: "/taxivaxi/taxi-bookings/0" },
  { label: "Running Trips", href: "/taxivaxi/taxi-running-trips" },
  { label: "Paid Invoices", href: "/taxivaxi/invoices/5" }
];

const BUS_LINKS: NavLink[] = [
  { label: "Bus Analytics", href: "/taxivaxi/bus-analytic" },
  { label: "Bus Booking Analytics", href: "/businesstaxivaxi/bus-booking-analytics" },
  { label: "Active Bookings", href: "/businesstaxivaxi/busbookings" },
  { label: "Paid Invoices", href: "/businesstaxivaxi/businvoices/5" }
];

const TRAIN_LINKS: NavLink[] = [
  { label: "Train Analytics", href: "/taxivaxi/train-analytic" },
  { label: "Train Booking Analytics", href: "/businesstaxivaxi/train-booking-analytics" },
  { label: "Active Bookings", href: "/businesstaxivaxi/train-bookings/1" },
  { label: "Paid Invoices", href: "/businesstaxivaxi/train-invoices/5" }
];

const HOTEL_LINKS: NavLink[] = [
  { label: "Hotel Analytics", href: "/taxivaxi/hotel-analytic" },
  { label: "View All Hotels", href: "/taxivaxi/hotels" },
  { label: "Hotel Bookings", href: "/businesstaxivaxi/hotel-bookings/1" },
  { label: "Paid Invoices", href: "/businesstaxivaxi/hotel-invoices/5" }
];

const FLIGHT_LINKS: NavLink[] = [
  { label: "Flight Analytics", href: "/ops-mgmt/flight-analytics", internal: true },
  { label: "Airlines", href: "/taxivaxi/add-airline" },
  {
    label: "Flight Invoices",
    href: "/businesstaxivaxi/flight-invoices/0",
    requiredRoles: ["flight-billing", "flight-invoice", "flight-admin"]
  }
];

const VISA_LINKS: NavLink[] = [
  { label: "Add Visa Booking", href: "/taxivaxi/add-visa-booking" },
  { label: "All Bookings", href: "/taxivaxi/visa-bookings/1?status=All%20Bookings" },
  { label: "Approved", href: "/taxivaxi/visa-bookings/5?status=Approved" }
];

const FRRO_LINKS: NavLink[] = [
  { label: "Add New Requests", href: "/businesstaxivaxi/add-frro-booking" },
  { label: "Under Process", href: "/businesstaxivaxi/frro-bookings/under-process" },
  { label: "Completed Requests", href: "/businesstaxivaxi/frro-bookings/completed" }
];

const TOUR_PACKAGE_LINKS: NavLink[] = [
  { label: "View All Tour Vendors", href: "/taxivaxi/tour-vendors" },
  { label: "Add Tour Vendor", href: "/taxivaxi/add-tour-vendor" }
];

const MEAL_LINKS: NavLink[] = [
  { label: "Add Meal Booking", href: "/taxivaxi/add-meal-booking" },
  { label: "Active Bookings", href: "/businesstaxivaxi/meal-bookings/1" },
  { label: "Paid Invoices", href: "/businesstaxivaxi/meal-invoices/5" }
];

const WATER_BOTTLE_LINKS: NavLink[] = [
  { label: "Consolidated Sheet", href: "/businesstaxivaxi/water-bottle-bookings/all" },
  { label: "Delivery Done", href: "/businesstaxivaxi/water-bottle-bookings/Delivered" },
  { label: "Payment Raised", href: "/businesstaxivaxi/wb-pending-payments/8" }
];

const PORTAL_MANAGEMENT_LINKS: NavLink[] = [
  { label: "View All Portal", href: "/taxivaxi/view-all-portal" },
  { label: "License Management", href: "/taxivaxi/app-license-management" }
];

const BILL_LINKS: NavLink[] = [
  { label: "Bills Dashboard", href: "/ops-mgmt/bills-dashboard", internal: true },
  { label: "Generate Tentative Bill", href: "/taxivaxi/generate-tentative-bill/1" },
  { label: "Tentative Bills", href: "/taxivaxi/tentative-bills/0" },
  { label: "Online Bills", href: "/taxivaxi/bills" },
  { label: "Reports", href: "/businesstaxivaxi/reports" }
];

const VOUCHER_LINKS: NavLink[] = [
  { label: "Vouchers Dashboard", href: "/ops-mgmt/voucher-dashboard", internal: true }
];

const NAV_MENUS: NavMenu[] = [
  {
    label: "Companies",
    sections: [
      { label: "Sales RM", links: SALES_RM_LINKS },
      { label: "Operators", links: OPERATOR_LINKS }
    ]
  },
  {
    label: "Taxi",
    dashboardPath: "/ops-mgmt/taxi-dashboard",
    sections: [{ label: "Taxi", links: TAXI_LINKS }],
    requiredRolePrefixes: ["taxi"]
  },
  {
    label: "Bus",
    dashboardPath: "/ops-mgmt/bus-dashboard",
    sections: [{ label: "Bus", links: BUS_LINKS }],
    requiredRolePrefixes: ["bus"]
  },
  {
    label: "Train",
    dashboardPath: "/ops-mgmt/train-dashboard",
    sections: [{ label: "Train", links: TRAIN_LINKS }],
    requiredRolePrefixes: ["train"]
  },
  {
    label: "Hotels",
    dashboardPath: "/ops-mgmt/hotel-dashboard",
    sections: [{ label: "Hotels", links: HOTEL_LINKS }],
    requiredRolePrefixes: ["hotel"]
  },
  {
    label: "Flight",
    dashboardPath: "/ops-mgmt/flight-dashboard",
    sections: [{ label: "Flight", links: FLIGHT_LINKS }],
    requiredRolePrefixes: ["flight"]
  },
  {
    label: "Visa",
    sections: [{ label: "Visa", links: VISA_LINKS }],
    requiredRolePrefixes: ["visa"]
  },
  {
    label: "FRRO",
    sections: [{ label: "FRRO", links: FRRO_LINKS }],
    requiredRolePrefixes: ["frro"]
  },
  {
    label: "Misc",
    sections: [
      { label: "Tour Packages", links: TOUR_PACKAGE_LINKS },
      { label: "Meal", links: MEAL_LINKS },
      { label: "Portal Management", links: PORTAL_MANAGEMENT_LINKS }
    ]
  },
  {
    label: "Water Bottles",
    sections: [{ label: "Water Bottles", links: WATER_BOTTLE_LINKS }]
  },
  {
    label: "Finance",
    dashboardPath: "/ops-mgmt/voucher-dashboard",
    sections: [
      { label: "Bills", links: BILL_LINKS, href: "/ops-mgmt/bills-dashboard", internal: true },
      { label: "Vouchers", links: VOUCHER_LINKS, href: "/ops-mgmt/voucher-dashboard", internal: true }
    ]
  }
];

const OpsTopNav: React.FC<OpsTopNavProps> = ({ pageTitle, pageSubtitle }) => {
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const opsRoles = getOpsRoles();

  const visibleMenus = useMemo(() => {
    const normalizedRoles = opsRoles.map((role) => role.toLowerCase());
    const hasRoleAccess = (requiredRoles?: string[]) => {
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
      return requiredRoles.some((role) => normalizedRoles.includes(role.toLowerCase()));
    };

    return NAV_MENUS.filter((menu) => {
      if (!menu.requiredRolePrefixes || menu.requiredRolePrefixes.length === 0) {
        return (menu.sections ?? []).some((section) => section.links.some((link) => hasRoleAccess(link.requiredRoles)));
      }

      return menu.requiredRolePrefixes.some((prefix) => {
        const normalizedPrefix = prefix.toLowerCase();
        const hasServiceRole = normalizedRoles.some((role) => role === normalizedPrefix || role.startsWith(`${normalizedPrefix}-`));
        if (!hasServiceRole) {
          return false;
        }

        return (menu.sections ?? []).some((section) => section.links.some((link) => hasRoleAccess(link.requiredRoles)));
      });
    }).map((menu) => ({
      ...menu,
      sections: (menu.sections ?? [])
        .map((section) => ({
          ...section,
          links: section.links.filter((link) => hasRoleAccess(link.requiredRoles))
        }))
        .filter((section) => section.links.length > 0)
    }));
  }, [opsRoles]);

  const quickResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return [];
    }

    const searchableLinks = visibleMenus.flatMap((menu) => {
      const direct = menu.directLink ? [{ ...menu.directLink, section: menu.label }] : [];
      const submenuLinks = (menu.sections ?? []).flatMap((section) =>
        section.links.map((link) => ({ ...link, section: section.label }))
      );
      return [...direct, ...submenuLinks];
    });

    return searchableLinks.filter((link) => link.label.toLowerCase().includes(trimmed)).slice(0, 8);
  }, [query, visibleMenus]);

  const handleSignOut = () => {
    clearOpsAuthSession();
    navigate("/ops-mgmt/login");
  };

  const openDropdown = (label: string) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(label);
  };

  const closeDropdown = (label: string) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu((current) => (current === label ? null : current));
      closeTimerRef.current = null;
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 overflow-visible border-b border-[#1f255a] bg-[#0B0E2D] text-slate-100 shadow-sm">
      <div className="space-y-2 px-4 py-2 md:px-6">
        <div className="relative z-[70] grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <Link to="/ops-mgmt/dashboard" className="inline-flex items-center rounded-md px-2 py-1">
            <img src={logo} alt="CoTrav Logo" className="h-8 w-auto md:h-9" />
          </Link>

          <div className="min-w-0 text-center">
            {pageTitle ? (
              <h1 className="truncate text-sm font-semibold tracking-tight text-white">{pageTitle}</h1>
            ) : null}
            {pageSubtitle ? (
              <p className="truncate text-[11px] text-indigo-200">{pageSubtitle}</p>
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/ops-mgmt/dashboard"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Go to home"
            >
              <House size={14} />
            </Link>

            <div className="z-50 hidden w-72 shrink-0 items-center gap-2 md:flex">
              <div className="relative w-full">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/70">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Global search..."
                  className="w-full rounded-md border border-white/20 bg-white/10 py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-white/65 focus:border-[#F6C34A] focus:outline-none"
                />
                {quickResults.length > 0 ? (
                  <div className="absolute right-0 z-50 mt-1 w-full rounded-md border border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
                    {quickResults.map((item) =>
                      item.internal ? (
                        <Link
                          key={`${item.section}-${item.label}`}
                          to={item.href}
                          className="block rounded-md px-3 py-2 text-xs hover:bg-[#F6C34A]/20"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={`${item.section}-${item.label}`}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-xs hover:bg-[#F6C34A]/20"
                        >
                          {item.label}
                        </a>
                      )
                    )}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => navigate("/ops-mgmt/advanced-search-results")}
                aria-label="Advanced search"
                title="Advanced search"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>

            <div className="group relative z-[80]">
              <button
                type="button"
                className="inline-flex h-8 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-2 text-white transition hover:bg-white/20"
                aria-label="User menu"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F6C34A] text-[10px] font-bold text-[#0B0E2D]">
                  PP
                </span>
                <span className="hidden text-xs font-medium md:inline">Profile</span>
                <ChevronDown size={12} className="hidden md:block" />
              </button>
              <div className="pointer-events-none invisible absolute right-0 top-full z-[90] w-44 pt-1 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-md border border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
                  <Link to="/ops-mgmt/profile" className="block rounded-md px-3 py-2 text-xs hover:bg-[#F6C34A]/20">
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-[#F6C34A]/20"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t border-white/10 pt-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-visible">
          {visibleMenus.map((menu) =>
            menu.directLink ? (
              <a
                key={menu.label}
                href={menu.directLink.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                {menu.label}
              </a>
            ) : (
              <div
                key={menu.label}
                className="relative z-50 pb-1"
                onMouseEnter={() => openDropdown(menu.label)}
                onMouseLeave={(event) => {
                  const to = event.relatedTarget as Node | null;
                  if (!to || !event.currentTarget.contains(to)) {
                    closeDropdown(menu.label);
                  }
                }}
                onPointerEnter={() => openDropdown(menu.label)}
                onPointerLeave={(event) => {
                  const to = event.relatedTarget as Node | null;
                  if (!to || !event.currentTarget.contains(to)) {
                    closeDropdown(menu.label);
                  }
                }}
              >
                <button
                  type="button"
                  onClick={menu.dashboardPath ? () => navigate(menu.dashboardPath!) : undefined}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
                >
                  {menu.label}
                  <ChevronDown size={11} />
                </button>
                <div className="pointer-events-none absolute left-0 top-full z-50 w-80 pt-1">
                  <div
                    className={`rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-lg transition-all duration-150 ${
                      openMenu === menu.label ? "visible translate-y-0 opacity-100 pointer-events-auto" : "invisible translate-y-1 opacity-0"
                    }`}
                  >
                    {(menu.sections ?? []).map((section) => (
                      <div key={`${menu.label}-${section.label}`} className="mb-2 last:mb-0">
                        {(menu.sections ?? []).length > 1 ? (
                          section.internal ? (
                            <Link
                              to={section.href ?? "#"}
                              className="block px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500 hover:text-slate-700"
                            >
                              {section.label}
                            </Link>
                          ) : section.href ? (
                            <a
                              href={section.href}
                              className="block px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500 hover:text-slate-700"
                            >
                              {section.label}
                            </a>
                          ) : (
                            <p className="px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
                              {section.label}
                            </p>
                          )
                        ) : null}
                        {section.links.map((link) =>
                          link.internal ? (
                            <Link
                              key={link.label}
                              to={link.href}
                              className="block rounded-md px-3 py-2 text-xs hover:bg-[#F6C34A]/20"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              key={link.label}
                              href={link.href}
                              className="block rounded-md px-3 py-2 text-xs hover:bg-[#F6C34A]/20"
                            >
                              {link.label}
                            </a>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OpsTopNav;
