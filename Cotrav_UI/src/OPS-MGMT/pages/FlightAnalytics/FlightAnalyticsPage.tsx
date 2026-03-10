import React from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

type Kpi = {
  label: string;
  value: string;
  subtext: string;
};

type TableColumn = {
  key: string;
  label: string;
};

type TableRow = Record<string, string>;

type AnalyticsCard = {
  title: string;
  subtitle: string;
  filterLabel?: string;
  columns: TableColumn[];
  rows: TableRow[];
  note?: string;
};

const KPI_DATA: Kpi[] = [
  { label: "Total Bookings", value: "22", subtext: "Overall pending + processed scope" },
  { label: "Assigned Today", value: "1", subtext: "Bookings assigned on 06 Mar 2026" },
  { label: "Pending > 2 Days", value: "21", subtext: "By departure date pending TAT" },
  { label: "Upcoming Pending", value: "12", subtext: "Approved date vs departure date view" }
];

const LEFT_CARDS: AnalyticsCard[] = [
  {
    title: "Booking Snapshot",
    subtitle: "Overall booking count and today's assigned booking count",
    filterLabel: "Filter",
    columns: [
      { key: "total", label: "Total Bookings" },
      { key: "assignedToday", label: "Total Assigned (Today's)" }
    ],
    rows: [{ total: "22", assignedToday: "1" }]
  },
  {
    title: "RM Wise Assigned Data",
    subtitle: "Assignment ownership breakdown by RM for 06 Mar 2026",
    filterLabel: "Filter",
    columns: [
      { key: "assignedBy", label: "Assigned By" },
      { key: "bookings", label: "No. of Bookings" }
    ],
    rows: [{ assignedBy: "ashok.kadam@taxivaxi.com", bookings: "1" }]
  },
  {
    title: "RM Wise Created Data",
    subtitle: "Creation productivity by RM for 06 Mar 2026",
    filterLabel: "Filter",
    columns: [
      { key: "createdBy", label: "Created By" },
      { key: "bookings", label: "No. of Bookings" }
    ],
    rows: [{ createdBy: "ashok.kadam@taxivaxi.com", bookings: "2" }]
  },
  {
    title: "Client Wise Data",
    subtitle: "Pending vs assigned booking distribution by client",
    filterLabel: "Filter",
    columns: [
      { key: "client", label: "Client Name" },
      { key: "pending", label: "Total Pending Booking" },
      { key: "assigned", label: "Total Assign Booking" }
    ],
    rows: [{ client: "Demo WA Company", pending: "22", assigned: "1" }],
    note: "Pending booking means total pending bookings. Assigned bookings represent either the current day's assigned bookings or those within the selected date range."
  },
  {
    title: "Pending Bookings by Departure Date",
    subtitle: "Ageing view based on difference between current date and departure date",
    columns: [
      { key: "tat01", label: "Pending (TAT 0-1 Day)" },
      { key: "tat12", label: "Pending (TAT 1-2 Day)" },
      { key: "tat2plus", label: "Pending (TAT Above 2 Day)" }
    ],
    rows: [{ tat01: "0", tat12: "0", tat2plus: "21" }],
    note: "TAT is the time difference between the Departure Date and the current date."
  }
];

const RIGHT_CARDS: AnalyticsCard[] = [
  {
    title: "RM Wise Booked Data",
    subtitle: "Booking completion data by RM based on booking assign date",
    filterLabel: "Filter",
    columns: [
      { key: "bookedBy", label: "Booked By" },
      { key: "bookings", label: "No. of Bookings" }
    ],
    rows: [{ bookedBy: "ashok", bookings: "1" }],
    note: "Data is available only from 15 Apr 2025 onward. This section is based on the booking assign date."
  },
  {
    title: "TCS SPOC Wise Data",
    subtitle: "Client and SPOC-level pending vs assigned booking visibility",
    filterLabel: "Filter",
    columns: [
      { key: "client", label: "Client Name" },
      { key: "spoc", label: "SPOC Name" },
      { key: "pending", label: "Total Pending Booking" },
      { key: "assigned", label: "Total Assign Booking" }
    ],
    rows: [],
    note: "Pending booking means total pending bookings. Assigned bookings represent either the current day's assigned bookings or those within the selected date range."
  },
  {
    title: "Non-TCS SPOC Wise Data",
    subtitle: "Pending and assigned booking metrics across non-TCS SPOCs",
    filterLabel: "Filter",
    columns: [
      { key: "client", label: "Client Name" },
      { key: "spoc", label: "SPOC Name" },
      { key: "pending", label: "Total Pending Booking" },
      { key: "assigned", label: "Total Assign Booking" }
    ],
    rows: [
      { client: "Demo WA Company", spoc: "DEMOWA", pending: "21", assigned: "0" },
      { client: "Demo WA Company", spoc: "Akib Raut 1", pending: "1", assigned: "1" }
    ],
    note: "Pending booking means total pending bookings. Assigned bookings represent either the current day's assigned bookings or those within the selected date range."
  },
  {
    title: "Upcoming Pending Bookings",
    subtitle: "Difference between approved date and departure date",
    columns: [
      { key: "tat01", label: "Pending (TAT 0-1 Day)" },
      { key: "tat12", label: "Pending (TAT 1-2 Day)" },
      { key: "tat2plus", label: "Pending (TAT Above 2 Day)" }
    ],
    rows: [{ tat01: "1", tat12: "0", tat2plus: "11" }],
    note: "TAT is the time difference between the Approve Date and the Departure Date."
  }
];

const AnalyticsTable: React.FC<{ columns: TableColumn[]; rows: TableRow[] }> = ({ columns, rows }) => {
  if (rows.length === 0) {
    return <div className="rounded-lg border border-slate-200 px-3 py-5 text-center text-sm text-slate-400">No data available</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-[#eef4fb]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="border-b border-slate-200 px-3 py-2 text-left text-xs font-bold text-slate-700">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {columns.map((column) => (
                <td key={column.key} className="border-b border-slate-100 px-3 py-2 text-slate-800">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AnalyticsCardView: React.FC<{ card: AnalyticsCard; showTodayTag?: boolean }> = ({ card, showTodayTag }) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {card.title}
            {showTodayTag ? (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                Today
              </span>
            ) : null}
          </h3>
          <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
        </div>
        {card.filterLabel ? (
          <button
            type="button"
            className="rounded-md border border-[#1d4ed8] bg-[#1d4ed8] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1e40af]"
          >
            {card.filterLabel}
          </button>
        ) : null}
      </div>
      <div className="space-y-3 px-4 py-4">
        <AnalyticsTable columns={card.columns} rows={card.rows} />
        {card.note ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <span className="font-bold">Note:</span> {card.note}
          </div>
        ) : null}
      </div>
    </section>
  );
};

const FlightAnalyticsPage: React.FC = () => {
  return (
    <OpsMainLayout pageTitle="Flight Productivity Analytics" pageSubtitle="Operational view for booking, assignment and invoice pipeline">
      <div className="bg-slate-100 p-4 md:p-6">
        <div className="mx-auto max-w-[1500px] space-y-5">
          <header className="rounded-2xl bg-gradient-to-r from-[#0B0E2D] to-[#163a7d] px-6 py-5 text-white shadow-lg">
            <h1 className="text-2xl font-bold">Flight Productivity Analytics</h1>
            <p className="mt-1 text-sm text-blue-100">
              Operational overview of booking creation, assignment, RM productivity, client performance, and pending travel timelines
              for <strong>06 Mar 2026</strong>.
            </p>
          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPI_DATA.map((kpi) => (
              <article key={kpi.label} className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{kpi.label}</p>
                <p className="mt-2 text-4xl font-bold leading-none text-slate-900">{kpi.value}</p>
                <p className="mt-2 text-xs text-slate-500">{kpi.subtext}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="space-y-4">
              {LEFT_CARDS.map((card, index) => (
                <AnalyticsCardView key={card.title} card={card} showTodayTag={index === 0} />
              ))}
            </div>

            <div className="space-y-4">
              {RIGHT_CARDS.map((card) => (
                <AnalyticsCardView key={card.title} card={card} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </OpsMainLayout>
  );
};

export default FlightAnalyticsPage;
