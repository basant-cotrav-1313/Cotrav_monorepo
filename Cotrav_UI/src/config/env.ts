export const ENV = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ?? "https://demo.taxivaxi.com/api/hotels",
  CORE_BASE_URL:
    import.meta.env.VITE_CORE_BASE_URL ??
    "https://demo.taxivaxi.com/api/flights/employeeByTaxivaxi",
  FLIGHT_BASE_URL:
    import.meta.env.VITE_FLIGHT_BASE_URL ?? "http://localhost:4002",
} as const;

if (!import.meta.env.VITE_API_BASE_URL || !import.meta.env.VITE_CORE_BASE_URL) {
  console.warn(
    "Using fallback API URLs because VITE_API_BASE_URL and/or VITE_CORE_BASE_URL are not set."
  );
}
