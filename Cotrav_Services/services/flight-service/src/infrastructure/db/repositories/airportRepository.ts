import { InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";

const AIRPORTS_API_URL = "https://selfbooking.taxivaxi.com/api/airports";

export async function getAirports(): Promise<unknown[]> {
  logger.debug({ layer: "repository", fn: "getAirports" }, "Fetching airports from external API");
  try {
    const response = await fetch(AIRPORTS_API_URL);

    if (!response.ok) {
      throw new Error(`External API responded with status ${response.status}`);
    }

    const data = await response.json() as unknown[];
    const airports = Array.isArray(data) ? data : (data as any)?.data ?? [];

    logger.info({ layer: "repository", fn: "getAirports", count: airports.length }, "Airports fetched successfully");
    return airports;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getAirports", err }, "Failed to fetch airports from external API");
    throw new InfraError("Failed to fetch airports from external API");
  }
}
