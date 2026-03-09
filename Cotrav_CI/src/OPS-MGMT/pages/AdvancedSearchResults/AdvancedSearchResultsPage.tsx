import React, { useState } from "react";
import OpsMainLayout from "@/OPS-MGMT/layouts/MainLayout";

type ServiceType = "Taxi" | "Bus" | "Train" | "Flight" | "Hotel";

type FormState = {
  service: ServiceType;
  bookingId: string;
  pickupLocation: string;
  pickupDate: string;
  spocName: string;
  operatorName: string;
  crnNo: string;
  pnrNo: string;
  ticketNo: string;
  projectCode: string;
  journeyDate: string;
  city: string;
  cityArrivalDeparture: string;
  checkInDate: string;
  voucherNo: string;
  hotelName: string;
  passengerName: string;
};

type FieldConfig = {
  key: keyof FormState;
  label: string;
  placeholder?: string;
  type?: "text" | "date";
  widthClass?: string;
};

type ServiceConfig = {
  row1: FieldConfig[];
  row2: FieldConfig[];
};

const serviceConfig: Record<ServiceType, ServiceConfig> = {
  Taxi: {
    row1: [
      { key: "bookingId", label: "Booking ID", placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pickupLocation", label: "Pickup Location", placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "pickupDate", label: "Pickup Date", type: "date", widthClass: "w-44" }
    ],
    row2: [
      { key: "spocName", label: "SPOC Name", placeholder: "SPOC Name", widthClass: "w-44" },
      { key: "operatorName", label: "Operator Name", placeholder: "Operator Name", widthClass: "w-44" },
      { key: "crnNo", label: "CRN No.", placeholder: "CRN No.", widthClass: "w-40" }
    ]
  },
  Bus: {
    row1: [
      { key: "bookingId", label: "Booking ID", placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pnrNo", label: "PNR No.", placeholder: "PNR No.", widthClass: "w-40" },
      { key: "ticketNo", label: "Ticket No.", placeholder: "Ticket No.", widthClass: "w-40" },
      { key: "projectCode", label: "Project Code", placeholder: "e.g. PRJ-001", widthClass: "w-40" }
    ],
    row2: [
      { key: "journeyDate", label: "Journey Date", type: "date", widthClass: "w-44" },
      { key: "city", label: "City", placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "spocName", label: "SPOC Name", placeholder: "SPOC Name", widthClass: "w-44" }
    ]
  },
  Train: {
    row1: [
      { key: "bookingId", label: "Booking ID", placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pnrNo", label: "PNR No.", placeholder: "PNR No.", widthClass: "w-40" },
      { key: "projectCode", label: "Project Code", placeholder: "e.g. PRJ-001", widthClass: "w-40" }
    ],
    row2: [
      { key: "city", label: "City", placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "journeyDate", label: "Journey Date", type: "date", widthClass: "w-44" },
      { key: "spocName", label: "SPOC Name", placeholder: "SPOC Name", widthClass: "w-44" }
    ]
  },
  Hotel: {
    row1: [
      { key: "bookingId", label: "Booking ID", placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "projectCode", label: "Project Code", placeholder: "e.g. PRJ-001", widthClass: "w-40" },
      { key: "voucherNo", label: "Voucher No.", placeholder: "Voucher No.", widthClass: "w-40" },
      { key: "hotelName", label: "Hotel Name", placeholder: "Hotel Name", widthClass: "w-52" }
    ],
    row2: [
      { key: "city", label: "City", placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "checkInDate", label: "Check-IN Date", type: "date", widthClass: "w-44" },
      { key: "spocName", label: "SPOC Name", placeholder: "SPOC Name", widthClass: "w-44" }
    ]
  },
  Flight: {
    row1: [
      { key: "bookingId", label: "Booking ID", placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pnrNo", label: "PNR / Ticket No.", placeholder: "PNR / Ticket No.", widthClass: "w-44" },
      { key: "projectCode", label: "Project Code", placeholder: "e.g. PRJ-001", widthClass: "w-40" },
      {
        key: "cityArrivalDeparture",
        label: "City (Arrival/Departure)",
        placeholder: "Arrival/Departure City",
        widthClass: "w-52"
      }
    ],
    row2: [
      { key: "journeyDate", label: "Journey Date", type: "date", widthClass: "w-44" },
      { key: "passengerName", label: "Passenger Name", placeholder: "Passenger Name", widthClass: "w-44" },
      { key: "spocName", label: "SPOC Name", placeholder: "SPOC Name", widthClass: "w-44" }
    ]
  }
};

const AdvancedSearchResultsPage: React.FC = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<FormState>({
    service: "Taxi",
    bookingId: "",
    pickupLocation: "",
    pickupDate: "",
    spocName: "",
    operatorName: "",
    crnNo: "",
    pnrNo: "",
    ticketNo: "",
    projectCode: "",
    journeyDate: "",
    city: "",
    cityArrivalDeparture: "",
    checkInDate: "",
    voucherNo: "",
    hotelName: "",
    passengerName: ""
  });

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      service: "Taxi",
      bookingId: "",
      pickupLocation: "",
      pickupDate: "",
      spocName: "",
      operatorName: "",
      crnNo: "",
      pnrNo: "",
      ticketNo: "",
      projectCode: "",
      journeyDate: "",
      city: "",
      cityArrivalDeparture: "",
      checkInDate: "",
      voucherNo: "",
      hotelName: "",
      passengerName: ""
    });
  };

  const renderField = (field: FieldConfig) => (
    <div key={field.key} className={field.widthClass ?? "w-40"}>
      <label className="mb-1 block text-[11px] font-semibold text-slate-700">{field.label}</label>
      <input
        type={field.type ?? "text"}
        value={filters[field.key]}
        onChange={(event) => setField(field.key, event.target.value)}
        placeholder={field.placeholder ?? field.label}
        className="h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-[#003F74] focus:outline-none"
      />
    </div>
  );

  const activeServiceConfig = serviceConfig[filters.service];

  return (
    <OpsMainLayout pageTitle="Advanced Search" pageSubtitle="Search results">
      <div className="mx-auto w-full max-w-[1700px] p-4 md:p-6">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-slate-600">Advanced Search</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-expanded={showAdvancedFilters}
                  onClick={() => setShowAdvancedFilters((prev) => !prev)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {showAdvancedFilters ? "Less filters" : "More filters"}
                </button>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-2">
              <div className="w-28">
                <label className="mb-1 block text-[11px] font-semibold text-slate-700">Service</label>
                <select
                  value={filters.service}
                  onChange={(event) => setField("service", event.target.value as FormState["service"])}
                  className="h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 focus:border-[#003F74] focus:outline-none"
                >
                  <option value="Taxi">Taxi</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                  <option value="Hotel">Hotel</option>
                </select>
              </div>

              {activeServiceConfig.row1.map(renderField)}

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 rounded-md bg-[#003F74] px-3 text-xs font-semibold text-white hover:bg-[#003563]"
                >
                  Search
                </button>
              </div>
            </div>

            {showAdvancedFilters ? (
              <div className="mt-2 border-t border-slate-200 pt-2">
                <div className="flex flex-wrap items-end gap-2">
                  {activeServiceConfig.row2.map(renderField)}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-wide text-slate-600">Search Results</h2>
          <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">No results yet</p>
            <p className="mt-1 text-xs text-slate-500">Search using filters above to view matching OPS-MGMT records.</p>
          </div>
        </section>
      </div>
    </OpsMainLayout>
  );
};

export default AdvancedSearchResultsPage;
