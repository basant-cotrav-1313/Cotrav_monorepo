import { coreAxios } from "@/libs/axios";

export const fetchPeopleDetails = (ids: string[]) =>
  coreAxios.post("/hotels/getPeoplewithId", {
    people_ids: ids,
  });

// export const getCompanies = () => 
//     coreAxios.get("/getAllSBTCompanies");
export const getCompanies = <T>() =>
  coreAxios.get<T>("/getAllSBTCompanies");


export const assignSBTHotelBooking = (payload: Record<string, any>) => {
  // Convert object to URLSearchParams
  const formData = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  return coreAxios.post("/hotels/assignSBTHotelBooking", formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
