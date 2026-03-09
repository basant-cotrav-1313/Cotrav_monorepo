import { hotelAxios, coreAxios } from "@/libs/axios";

export const fetchCompanies = async () => {
  const response = await coreAxios.get("/getIDNameAllCompanies");
  // console.log("Companies response:", response);
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