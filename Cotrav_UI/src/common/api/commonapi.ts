import { hotelAxios, coreAxios, flightAxios } from "@/libs/axios";

export const fetchCompanies = async () => {
  const response = await flightAxios.get("/companies");
  return response.data;
};

export const getCities = async () => {
  try {
    const response = await hotelAxios.post("/getAllCities");
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};