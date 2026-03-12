import { hotelAxios } from "@/libs/axios";

export const getHotelCodes = (city: string) =>
  hotelAxios.post("/sbtHotelCodesList", {
    CityCode: city,
    IsDetailedResponse: true,
  });

export const searchHotels = (payload: unknown) =>
  hotelAxios.post("/sbtHotelCodesSearch", payload);

export const getHotelDetails = (codes: string) =>
  hotelAxios.post("/sbtHotelDetails", {
    Hotelcodes: codes,
    Language: "EN",
  });

export const getCities = () =>
  hotelAxios.post("/getAllCities");

export const shareHotelOptions = (payload: unknown) =>
  hotelAxios.post("/addsbthoteloptions", payload);

export const preBookHotel = (bookingCode: string) =>
  hotelAxios.post("/sbtHotelPreBook", {
    BookingCode: bookingCode,
    Language: "EN",
  });

export const submitHotelBooking = (payload: unknown) =>
  hotelAxios.post("/sbtHotelBook", payload);

export const getBookingDetails = (payload: {
  EndUserIp: string;
  TokenId: string;
  BookingId: string;
}) =>
  hotelAxios.post("/sbtHotelBookingDetail", payload);

export const cancelHotelBooking = (bookingId: string) =>
  hotelAxios.post("/sbtHotelCancel", {
    BookingId: bookingId,
  });

export const generateHotelVoucher = (payload: {
  BookingId: string;
  EndUserIp: string;
  TokenId: string;
}) =>
  hotelAxios.post("/addSbtHotelBookingGenerateVoucher", payload);

/**
 * Sends hotel change request (for cancellation)
 */
export const sendHotelChangeRequest = (payload: {
  BookingMode: number;
  RequestType: number;
  Remarks: string;
  BookingId: string;
  EndUserIp: string;
  TokenId: string;
}) =>
  hotelAxios.post("/sbtHotelSendChangeRequest", payload);
