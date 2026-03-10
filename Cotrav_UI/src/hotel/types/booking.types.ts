import * as hotelTypes from "./hotel";

export interface BookingDetails {
  HotelName: string;
  StarRating: number;
  AddressLine1: string;
  AddressLine2?: string;
  CheckInDate: string;
  CheckOutDate: string;
  Rooms: BookingRoom[];
  RateConditions?: string[];
}

export interface BookingConfirmationCardProps {
  bookingDetails: BookingDetails;
  hotelImages?: string[];
  hotelMap?: string;
  onViewMap?: () => void;
  className?: string;
  guestCount?: number;
}


// HotelBookingSummary Types
export interface CancellationPolicy {
  FromDate: string;
  ToDate: string;
  ChargeType: 'Fixed' | 'Percentage';
  CancellationCharge: number;
}

export interface RoomSummary {
  Name: string | string[];
  Inclusion?: string;
  MealType?: string;
  CancelPolicies?: CancellationPolicy[];
}

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  Adults: number;
  Children: number;
  ChildAge?: number[];
  Rooms: number;
}

export interface HotelBookingSummaryProps {
  hotelName: string;
  hotelRating: number;
  address: string;
  selectedRoom: RoomSummary;
  searchParams: SearchParams;
  nights: number;
  checkInTime?: string;
  checkOutTime?: string;
  onSeeInclusion: () => void;
}


// Price Summary Types
export interface TaxBreakup {
  TaxType: string;
  TaxPercentage: number;
  TaxableAmount: number;
  TaxAmount: number;
}

export interface PriceBreakUp {
  RoomRate: number;
  RoomTax: number;
  AgentCommission: number;
  TaxBreakup: TaxBreakup[];
}

export interface DayRate {
  BasePrice: number;
  Date?: string;
}

export interface PriceBreakupItem {
  TaxBreakup: TaxBreakup[];
}

export interface RoomPriceSummary  {
  TotalFare: number;
  TotalTax: number;
  DayRates?: DayRate[][];
  PriceBreakUp?: PriceBreakupItem[];
}

export interface PriceSummaryProps {
  room: RoomPriceSummary;
  nights: number;
  className?: string;
}



export interface SelectedRoom extends hotelTypes.Room {
  BookingCode: string;
}

export interface BookingPayload {
  BookingCode: string;
  IsVoucherBooking: boolean;
  GuestNationality: string;
  EndUserIp: string;
  RequestedBookingMode: number;
  NetAmount: number;
  HotelRoomsDetails: HotelRoomDetail[];
}

export interface HotelRoomDetail {
  HotelPassenger: HotelPassenger[];
}

export interface HotelPassenger {
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string | null;
  PaxType: number;
  LeadPassenger: boolean;
  Age: number;
  PassportNo: string | null;
  PassportIssueDate: string | null;
  PassportExpDate: string | null;
  Phoneno: string | null;
  PaxId: number;
  GSTCompanyAddress: string | null;
  GSTCompanyContactNumber: string | null;
  GSTCompanyName: string | null;
  GSTNumber: string | null;
  GSTCompanyEmail: string | null;
  PAN?: string | null;
}

export interface BookingResult {
  bookingId: string;
  traceId: string;
  tokenId: string;
  endUserIp: string;
}

export enum BookingStatus {
  BookFailed = 0,
  Confirmed = 1,
  VerifyPrice = 3,
  Cancelled = 6,
}

export interface PreBookResponse {
  Status: ApiStatus;
  HotelResult: hotelTypes.Hotel[];
  ValidationInfo: Record<string, unknown>;
}

export interface ApiError {
  ErrorCode: number;
  ErrorMessage: string;
}

export interface ApiStatus {
  Code: number;
  Description: string;
}

export interface DayRate {
  BasePrice: number;
}

export interface UseHotelBookingProps {
  hotel: hotelTypes.Hotel | null;
  selectedRoom: SelectedRoom | null;
  searchParams: hotelTypes.HotelSearchParams;
  pricing?: { // ✅ ADD: Optional pricing prop
    clientPrice: number;
    totalFare: number;
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
  } | null;
}


export interface BookingPriceSummaryProps {
  basePrice: number;
  taxAmount: number;
  totalAmount: number;
  nights: number;
  showBreakdown?: boolean;
  className?: string;
}

export interface BookResult {
  TBOReferenceNo: string | null;
  VoucherStatus: boolean;
  ResponseStatus: number;
  Error: ApiError;
  TraceId: string;
  Status: BookingStatus; // 0 | 1 | 3 | 6
  HotelBookingStatus: 'Confirmed' | string;
  InvoiceNumber: string;
  ConfirmationNo: string;
  BookingRefNo: string;
  BookingId: number;
  IsPriceChanged: boolean;
  IsCancellationPolicyChanged: boolean;
}

export interface SubmitBookingResponse {
  BookResult: BookResult;
  enduserip: string;
  tokenid: string;
}

export interface BookingPassenger {
  PaxId: number;
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phoneno: string;
  LeadPassenger: boolean;
  PAN?: string;
}

export interface BookingRoom {
  RoomId?: number;
  RoomIndex?: number;
  RoomTypeName?: string;
  Inclusion?: string;
  Amenities?: string[];
  NetAmount?: number;
  PriceBreakUp?: {
    CurrencyCode: string;
    RoomRate: number;
    RoomTax: number;
    AgentCommission: number;
  };
  HotelPassenger?: BookingPassenger[];
  MealType?: string;
  CancellationPolicy?: string

}

export interface GetBookingDetailResult {
  BookingId: number;
  Status: BookingStatus;
  Error: ApiError;
  HotelName: string;
  HotelCode: string;
  Rooms: BookingRoom[];
  NetAmount: number;
  NetTax: number;
  CheckInDate: string;
  CheckOutDate: string;
  BookingDate: string;
}

