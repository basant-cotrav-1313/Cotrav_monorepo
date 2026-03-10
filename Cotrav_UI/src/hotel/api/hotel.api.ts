import { hotelAxios } from "@/libs/axios";
// import { ENV } from "@/config/env";
// import axios from "axios";

// console.log("Basant : ",ENV.API_BASE_URL)

export const getHotelCodes = (city: string) =>
  hotelAxios.post("/sbtHotelCodesList", {
    CityCode: city,
    IsDetailedResponse: true,
  });

// export const getHotelCodes = async (city: string) => {
//   try {
//     console.log('🔍 Fetching hotel codes for city:', city);
//     console.log('🌐 API URL:', `${ENV.API_BASE_URL}/sbtHotelCodesList`);
    
//     const response = await hotelAxios.post("/sbtHotelCodesList", {
//       CityCode: city,
//       IsDetailedResponse: true,
//     });

//     console.log('✅ Hotel codes received:', response.data);
//     return response.data;
    
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('❌ Axios Error:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//         headers: error.config?.headers,
//       });
      
//       if (error.message.includes('Network Error') || error.message.includes('CORS')) {
//         throw new Error('CORS error - check axios configuration');
//       }
      
//       throw new Error(`API Error: ${error.response?.status} - ${error.message}`);
//     }
    
//     console.error('❌ Unknown error:', error);
//     throw new Error(`Failed to fetch hotel codes: ${error}`);
//   }
// };


// export const getHotelCodes = async (city: string) => {
//   const response = await fetch(`${ENV.API_BASE_URL}/sbtHotelCodesList`, {
//     method: "POST",
//     // headers: {
//     //   "Content-Type": "application/json",
//     //   Accept: "application/json",
//     // },
//     body: JSON.stringify({
//       CityCode: city,
//       IsDetailedResponse: true,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   return response.json();
// };

// export const getHotelCodes = async (city: string) => {
//   const response = await fetch("https://demo.taxivaxi.com/api/hotels/sbtHotelCodesList", {
//     method: "POST",
//     // headers: {
//     //   "origin": "*"
//     // },
//     body: JSON.stringify({
//       CityCode: city,
//       IsDetailedResponse: true,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   return response.json();
// };


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
 
// Booking Page API
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
  
