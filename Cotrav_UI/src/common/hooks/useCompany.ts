import { useEffect, useState } from "react";
import { fetchCompanies } from "@/common/api/commonapi";

export type Company = {
  short_name: any;
  id: string;
  corporate_name: string;
};

export const useCompany = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanies();

        setCompanies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Company API error:", err);
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  return {
    companies,
    loading,
    error,
  };
};