import React from "react";
import { Link } from "react-router-dom";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

const TAXI_ACTIONS = [
  { label: "Taxi Analytics", href: "/taxivaxi/taxi-analytic" },
  { label: "Add Booking", href: "/taxivaxi/add-taxi-booking" },
  { label: "Today's Booking", href: "/taxivaxi/taxi-bookings/0" },
  { label: "Running Trips", href: "/taxivaxi/taxi-running-trips" },
  { label: "Active Bookings(Unassigned)", href: "/taxivaxi/taxi-bookings/1" },
  { label: "Active Radio Bookings (Unassigned)", href: "/taxivaxi/taxi-bookings/12" },
  { label: "Active Bookings(Assigned)", href: "/taxivaxi/taxi-bookings/2" },
  { label: "Archived Bookings(Unassigned)", href: "/taxivaxi/taxi-bookings/5" },
  { label: "Archived Bookings(Assigned)", href: "/taxivaxi/taxi-bookings/3" },
  { label: "Cancelled/Rejected Bookings", href: "/taxivaxi/taxi-bookings/4" },
  { label: "Operator Issues", href: "/taxivaxi/taxi-bookings/6" }
];

const DashboardPage: React.FC = () => {
  return (
    <OpsMainLayout pageTitle="OPS Dashboard" pageSubtitle="Taxi operations quick actions">
      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Link
                to="/ops-mgmt/profile"
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                My Profile
              </Link>
              <Link
                to="/ops-mgmt/login"
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Back to Login
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Taxi</h2>
              <span className="rounded-full bg-[#FCB912]/20 px-2.5 py-1 text-xs font-medium text-[#8a6400]">
                {TAXI_ACTIONS.length} actions
              </span>
            </div>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {TAXI_ACTIONS.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 transition hover:border-[#0A7CC5] hover:bg-blue-50 hover:text-[#0A7CC5]"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default DashboardPage;
