
import { useEffect, useState } from "react";
import { getCities } from "@/common/api/commonapi";

export type City = {
  id: string;
  name: string;
  code?: string;
  state?: string;
  country?: string;
  tbo_city_code: string;
  // Add other fields based on your API response
};

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        const data = await getCities();

        // Adjust this based on your actual API response structure
        const cityList = data?.response?.Cities || data?.cities || data;

        setCities(Array.isArray(cityList) ? cityList : []);
      } catch (err) {
        console.error("Cities API error:", err);
        setError("Failed to load cities");
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  return {
    cities,
    loading,
    error,
  };
};