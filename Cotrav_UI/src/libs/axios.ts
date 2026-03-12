
import axios, { AxiosInstance } from "axios";
import { ENV } from "@/config/env";

function getSessionCorrelationId(): string {
  const key = "x-correlation-id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function addCorrelationId(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    config.headers["x-correlation-id"] = getSessionCorrelationId();
    return config;
  });
}

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

addCorrelationId(hotelAxios);
addCorrelationId(coreAxios);
addCorrelationId(flightAxios);
