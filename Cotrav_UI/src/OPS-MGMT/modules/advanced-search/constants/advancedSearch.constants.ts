import type { FormState, ServiceConfig, ServiceType } from "../types/advancedSearch.types";

export const INITIAL_FILTERS: FormState = {
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
  passengerName: "",
};

export const SERVICE_CONFIG: Record<ServiceType, ServiceConfig> = {
  Taxi: {
    row1: [
      { key: "bookingId",      label: "Booking ID",      placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pickupLocation", label: "Pickup Location",  placeholder: "e.g. Mumbai",  widthClass: "w-40" },
      { key: "pickupDate",     label: "Pickup Date",      type: "date",                widthClass: "w-44" },
    ],
    row2: [
      { key: "spocName",     label: "SPOC Name",     placeholder: "SPOC Name",     widthClass: "w-44" },
      { key: "operatorName", label: "Operator Name", placeholder: "Operator Name", widthClass: "w-44" },
      { key: "crnNo",        label: "CRN No.",       placeholder: "CRN No.",       widthClass: "w-40" },
    ],
  },
  Bus: {
    row1: [
      { key: "bookingId",   label: "Booking ID",   placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pnrNo",       label: "PNR No.",       placeholder: "PNR No.",       widthClass: "w-40" },
      { key: "ticketNo",    label: "Ticket No.",    placeholder: "Ticket No.",    widthClass: "w-40" },
      { key: "projectCode", label: "Project Code",  placeholder: "e.g. PRJ-001", widthClass: "w-40" },
    ],
    row2: [
      { key: "journeyDate", label: "Journey Date", type: "date",             widthClass: "w-44" },
      { key: "city",        label: "City",          placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "spocName",    label: "SPOC Name",     placeholder: "SPOC Name",   widthClass: "w-44" },
    ],
  },
  Train: {
    row1: [
      { key: "bookingId",   label: "Booking ID",  placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "pnrNo",       label: "PNR No.",      placeholder: "PNR No.",       widthClass: "w-40" },
      { key: "projectCode", label: "Project Code", placeholder: "e.g. PRJ-001", widthClass: "w-40" },
    ],
    row2: [
      { key: "city",        label: "City",         placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "journeyDate", label: "Journey Date", type: "date",               widthClass: "w-44" },
      { key: "spocName",    label: "SPOC Name",    placeholder: "SPOC Name",   widthClass: "w-44" },
    ],
  },
  Hotel: {
    row1: [
      { key: "bookingId",   label: "Booking ID",   placeholder: "e.g. BK12345", widthClass: "w-40" },
      { key: "projectCode", label: "Project Code", placeholder: "e.g. PRJ-001", widthClass: "w-40" },
      { key: "voucherNo",   label: "Voucher No.",  placeholder: "Voucher No.",   widthClass: "w-40" },
      { key: "hotelName",   label: "Hotel Name",   placeholder: "Hotel Name",    widthClass: "w-52" },
    ],
    row2: [
      { key: "city",        label: "City",           placeholder: "e.g. Mumbai", widthClass: "w-40" },
      { key: "checkInDate", label: "Check-IN Date",  type: "date",               widthClass: "w-44" },
      { key: "spocName",    label: "SPOC Name",      placeholder: "SPOC Name",   widthClass: "w-44" },
    ],
  },
  Flight: {
    row1: [
      { key: "bookingId",            label: "Booking ID",             placeholder: "e.g. BK12345",       widthClass: "w-40" },
      { key: "pnrNo",                label: "PNR / Ticket No.",       placeholder: "PNR / Ticket No.",    widthClass: "w-44" },
      { key: "projectCode",          label: "Project Code",           placeholder: "e.g. PRJ-001",        widthClass: "w-40" },
      { key: "cityArrivalDeparture", label: "City (Arrival/Departure)", placeholder: "Arrival/Departure City", widthClass: "w-52" },
    ],
    row2: [
      { key: "journeyDate",   label: "Journey Date",    type: "date",                   widthClass: "w-44" },
      { key: "passengerName", label: "Passenger Name",  placeholder: "Passenger Name",  widthClass: "w-44" },
      { key: "spocName",      label: "SPOC Name",       placeholder: "SPOC Name",       widthClass: "w-44" },
    ],
  },
};