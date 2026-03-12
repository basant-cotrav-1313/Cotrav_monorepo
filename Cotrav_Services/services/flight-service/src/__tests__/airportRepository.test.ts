import * as airportRepository from "../infrastructure/db/repositories/airportRepository";
import { InfraError } from "@cotrav/errors";

jest.mock("@cotrav/logger", () => ({
  __esModule: true,
  default: { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import logger from "@cotrav/logger";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockAirports = [
  { id: 26555, airport_name: "Indira Gandhi International Airport", airport_municipality: "New Delhi", airport_iata_code: "DEL" },
  { id: 2997, airport_name: "Chhatrapati Shivaji Maharaj International Airport", airport_municipality: "Mumbai", airport_iata_code: "BOM" },
];

describe("airportRepository", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getAirports", () => {
    it("returns list of airports from external API", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockAirports });

      const result = await airportRepository.getAirports();

      expect(mockFetch).toHaveBeenCalledWith("https://selfbooking.taxivaxi.com/api/airports");
      expect(result).toEqual(mockAirports);
      expect(result).toHaveLength(2);
    });

    it("returns airports from nested data property if wrapped", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ data: mockAirports }) });

      const result = await airportRepository.getAirports();

      expect(result).toEqual(mockAirports);
    });

    it("returns empty array when API returns empty array", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

      const result = await airportRepository.getAirports();

      expect(result).toEqual([]);
    });

    it("logs debug before fetch and info with count after success", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockAirports });

      await airportRepository.getAirports();

      expect(logger.debug).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getAirports" }),
        "Fetching airports from external API"
      );
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getAirports", count: 2 }),
        "Airports fetched successfully"
      );
    });

    it("throws InfraError when API returns non-ok status", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 503 });

      await expect(airportRepository.getAirports()).rejects.toThrow(InfraError);
    });

    it("throws InfraError on network error", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(airportRepository.getAirports()).rejects.toThrow(InfraError);
    });

    it("logs error when fetch fails", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      try { await airportRepository.getAirports(); } catch {}

      expect(logger.error).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getAirports" }),
        "Failed to fetch airports from external API"
      );
    });
  });
});
