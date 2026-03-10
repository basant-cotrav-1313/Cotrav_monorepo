
export interface ExternalHotelSearchPayload {
  is_self_payment?: '0' | '1';
  checkIn?: string;
  checkindate?: string;
  checkOut?: string;
  checkoutdate?: string;

  Rooms?: number | string;
  room_count?: number | string;

  Adults?: number | string;
  PassengerADT?: number | string;

  Children?: number | string;
  Passengerchild?: number | string;

  ChildAge?: number[];
  Passengerchildage?: string | null;

  CityCode?: string;
  city?: string;
  city_name?: string;
  country_code?: string;

  corporate_name?: string | null;
  payment?: number | string;

  admin_id?: string;
  booking_id?: string;
  reference_no?: string;
  booknow?: string;
  state?: string;
  spoc_name?: string;
  approver1_email?: string;
  approver2_email?: string;
  meal_type?: string | null;
  approver1?: string;
  approver2?: string;
  cc_emails?: string; 
  passengerDetailsArray?: string;
}


export interface HotelSearchParams {
  checkIn: string;
  checkOut: string;
  Rooms: number;
  Adults: number;
  Children: number;
  ChildAge: number[];

  CityCode?: string;
  city_name: string;
  country_code?: string;        
  state?: string;               

  corporate_name?: string | null;
  payment?: number;
  filteredCities?: Array<{
    Name: string;
    tbo_city_code: string;
  }>;

  admin_id?: string;
  booking_id?: string;
  reference_no?:string;
  booknow?: string;
  request_type?: string;        
  // is_self_payment?: string; 
  is_self_payment?: boolean;

   
  meal_type?: string | null;    

  spoc_name?: string;
  approver1?: string;
  approver2?: string;

  passengerDetailsArray?: string; 
  cc_emails?: string; 
}


export type HotelLoaderProps = {
  step: number;
};

export interface HotelImage {
  url: string;
  alt?: string;
}

export interface DayRate {
  BasePrice: number;

}

export interface CancellationPolicy {
  FromDate: string;
  ToDate: string;
  ChargeType: 'Fixed' | 'Percentage';
  CancellationCharge: number;
}

export interface Room {
  BookingCode: string;
  Name: string | string[];
  RoomType?: string;
  MealType?: string;
  Inclusion?: string;
  TotalFare: number;
  TotalTax: number;
  DayRates?: DayRate[][];
  CancelPolicies?: CancellationPolicy[];
  Source?: string;
  IsRefundable?: boolean
  RoomPromotion?: string[];
}

export interface Hotel {
  HotelCode: string;
  HotelName: string;
  HotelRating: number;
  CityName: string;
  Address: string;
  Description?: string;
  Image?: string;
  Images?: string[];
  Map?: string;
  HotelFacilities?: string[];
  Rooms?: Room[];
  Source?: string;
  RateConditions: unknown;
  CheckInTime?: string;  
  CheckOutTime?: string;

  // Added For HotelDetailModal
  CountryName?: string;
  PhoneNumber?: string;
  Email?: string;
  HotelWebsiteUrl?: string;
  PinCode?: string;
  Attractions?: Record<string, string>;

  
}

export interface HotelCityItem {
  HotelCode: string;
  HotelName: string;
  HotelRating: number;
  CityId: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
  Address: string;
  Description?: string;
  Image?: string;
  Images?: string[];
  Map?: string;
  HotelFacilities?: string[];
  PhoneNumber?: string;
  PinCode?: string;
  Email?: string;
  FaxNumber?: string;
  CheckInTime?: string;
  CheckOutTime?: string;
}

export interface HotelData {
  hotelcityList?: HotelCityItem[];
  [hotelCode: string]: unknown;
}

export interface HotelApiItem {
  HotelCode: string;
  HotelName: string;
  HotelRating: number; 
  ImageUrls?: { ImageUrl: string }[];
  Address: string;
  Attractions?: string[];
  CountryName: string;
  CountryCode: string;
  Description?: string;
  FaxNumber?: string;
  HotelFacilities?: string[];
  Map?: string;
  Email?: string;
  PhoneNumber?: string;
  PinCode?: string;
  HotelWebsiteUrl?: string;
  CityName: string;
}

export interface HotelCodesResponse {
  Status: {
    Code: number;
    Description: string;
  };
  Hotels: HotelApiItem[];
}



export interface HotelSearchItem {
  HotelCode: string;
  HotelName?: string;
  HotelRating?: number;
  CityName?: string;
  Address?: string;
  Description?: string;
  Image?: string;
  Images?: string[];
  Map?: string;
  HotelFacilities?: string[];
  Rooms?: Room[];
  Source?: string;
}

export interface HotelSearchResponse {
  Status: {
    Code: number;
    Description: string;
  };
  HotelResult: HotelSearchItem[];
}

export interface SelectedRoom extends Room {
  HotelCode: string;
  HotelName: string;
  CityName: string;
  Address: string;
  Description?: string;
  numberOfNights: number
}

export interface HotelFilters {
  priceRange: [number, number];
  selectedRatings: number[];
  selectedFacilities: string[];
  mealType: string;
  refundable: boolean | null;
  searchQuery: string;
}

export interface ShareOptionRoom {
  RoomType: string;
  MealPlan: string | null;
  BaseFare: string | null;
  TotalFare: number;
  Tax: number;
  markup?: string;
  base_price?: string;
  updated_total_price?: string;
}

export interface ShareOption {
  hotel_code: string;
  booking_code: string;
  hotel_name: string;
  hotel_address: string;
  city: string;
  source: string;
  Rooms: ShareOptionRoom[];
}

export interface ShareFormData {
  bookingId: string;
  // referenceNo: string;     
  clientName: string;
  spocName: string;
  spocEmail: string;
  markup: string;        
  remark: string;
}

export interface ShareFormErrors {
  bookingId?:string;
  referenceNo?: string;   
  spocName?: string;
  spocEmail?: string;
  toEmail?: string;
  ccEmail?: string;
  remark?: string;
  clientName?: string;
  markup?: string
}

export type GuestType = 'adults' | 'children' | 'rooms';

export type FilterType =
  | 'price'
  | 'priceBucket'
  | 'rating'
  | 'facility'
  | 'meal'
  | 'refundable'
  | 'search';


  export type FilterValueMap = {
  price: [number, number];
  priceBucket: string[];
  rating: number;
  facility: string;
  meal: string;
  refundable: boolean | null;
  search: string;
};

export interface FilterState {
  priceRange: [number, number];
  selectedRatings: number[];
  selectedFacilities: string[];
  selectedMealTypes: string[]; 
  mealType: string;
  refundable: boolean | null;
  searchQuery: string;
  selectedPriceBuckets?: string[];
}

// ✅ ADD THIS new type
export interface SearchSuggestion {
  type: 'hotel' | 'city' | 'location';
  label: string;
  hotelName?: string;
  cityName?: string;
  address?: string;
}

export interface GroupedHotel {
  HotelCode: string;
  HotelName: string;
  CityName?: string;
  Description?: string;
  rooms: SelectedRoom[];
}

export interface HotelImportantInfoProps {
  rateConditions: string[];
  previewCount?: number;
  className?: string;
}

export interface ImportantInfoSectionProps {
  rateConditions: string[];
  previewCount?: number;
  className?: string;
}


export interface HotelImportantInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  rateConditions: string[];
}


export interface RoomPriceModalProps {
  isOpen: boolean;
  hotel: HotelSearchItem;
  selectedRooms: SelectedRoom[];
  onClose: () => void;
  onAddRoom: (room: SelectedRoom) => void;
  onRemoveRoom: (bookingCode: string) => void;
  onShare: () => void;
}


export interface ShareModalProps {
  isOpen?: boolean;
  onClose: () => void;
  formData?: ShareFormData;
  toEmailList?: string[];
  ccEmailList?: string[];
  errors?: ShareFormErrors;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
  handleDeleteEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
  handleApproverEmailBlur: () => void;
  toEmail?: string;
  setToEmail: (val: string) => void;
  ccEmail?: string;
  setCcEmail: (val: string) => void;
}

