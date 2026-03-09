
import axios from "axios";
import { ENV } from "@/config/env";

// export const hotelAxios = axios.create({
//   baseURL: ENV.API_BASE_URL,
  
// });

export const hotelAxios = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'text/plain',  //  Prevents CORS preflight
  },
  // transformRequest: [
  //   (data) => JSON.stringify(data),  // Still send JSON
  // ],
});

export const coreAxios = axios.create({
  baseURL: ENV.CORE_BASE_URL,
  headers: {
    'Content-Type': 'text/plain',  //  Prevents CORS preflight
  },
});
