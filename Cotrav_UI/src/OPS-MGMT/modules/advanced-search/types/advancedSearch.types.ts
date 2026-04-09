export type ServiceType = "Taxi" | "Bus" | "Train" | "Flight" | "Hotel";

export type FormState = {
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

export type FieldConfig = {
  key: keyof FormState;
  label: string;
  placeholder?: string;
  type?: "text" | "date";
  widthClass?: string;
};

export type ServiceConfig = {
  row1: FieldConfig[];
  row2: FieldConfig[];
};