import { useEffect, useState } from "react";
import { getFlightCities } from "@/common/api/commonapi";
import { FlightAirport } from "@/Homepage/components/AirportSelector";

const normalizeAirport = (a: any): FlightAirport => ({
  id: String(a.id),
  city: a.airport_municipality ?? "",
  code: a.airport_iata_code ?? "",
  airport_name: a.airport_name ?? "",
  country: a.airport_iso_country ?? "",
});

export const useFlightCities = () => {
  const [airports, setAirports] = useState<FlightAirport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getFlightCities();
        const raw: any[] = Array.isArray(data) ? data : data?.data ?? data?.airports ?? [];
        // Only include airports with a valid IATA code
        const filtered = raw.filter((a) => a.airport_iata_code);
        setAirports(filtered.map(normalizeAirport));
      } catch (err) {
        console.error("Flight cities API error:", err);
        setError("Failed to load airports");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { airports, loading, error };
};
