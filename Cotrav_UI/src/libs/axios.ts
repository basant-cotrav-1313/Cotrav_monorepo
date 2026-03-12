
import axios from "axios";
import { ENV } from "@/config/env";

// export const hotelAxios = axios.create({
//   baseURL: ENV.API_BASE_URL,
  
// });

export const hotelAxios = axios.create({
  baseURL: ENV.HOTEL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const coreAxios = axios.create({
  baseURL: ENV.CORE_BASE_URL,
  headers: {
    'Content-Type': 'text/plain',  //  Prevents CORS preflight
  },
});

export const flightAxios = axios.create({
  baseURL: ENV.FLIGHT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
