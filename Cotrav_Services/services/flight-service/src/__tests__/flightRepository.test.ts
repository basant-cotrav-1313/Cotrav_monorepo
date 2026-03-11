import * as flightRepository from "../infrastructure/db/repositories/flightRepository";
import { InfraError } from "@cotrav/errors";

jest.mock("../infrastructure/db/connection", () => ({
  query: jest.fn(),
}));

jest.mock("@cotrav/logger", () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

import pool from "../infrastructure/db/connection";
import logger from "@cotrav/logger";

const mockPool = pool as jest.Mocked<typeof pool>;

describe("flightRepository", () => {
  beforeEach(() => jest.clearAllMocks());

  // ─── getAllFlights ────────────────────────────────────────────────────────────

  describe("getAllFlights", () => {
    it("returns list of flights from DB", async () => {
      const mockRows = [
        { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" },
        { id: 2, flight_number: "AI102", origin: "DEL", destination: "BOM", departure_time: "14:00", arrival_time: "16:00" },
      ];
      (mockPool.query as jest.Mock).mockResolvedValueOnce([mockRows]);

      const result = await flightRepository.getAllFlights();

      expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM flight_bookings");
      expect(result).toEqual(mockRows);
      expect(result).toHaveLength(2);
    });

    it("returns empty array when no flights found", async () => {
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[]]);

      const result = await flightRepository.getAllFlights();

      expect(result).toEqual([]);
    });

    it("logs debug before query and info with count after success", async () => {
      const mockRows = [{ id: 1 }];
      (mockPool.query as jest.Mock).mockResolvedValueOnce([mockRows]);

      await flightRepository.getAllFlights();

      expect(logger.debug).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getAllFlights" }),
        "Querying all flights"
      );
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getAllFlights", count: 1 }),
        "Flights fetched successfully"
      );
    });

    it("throws InfraError when DB query fails", async () => {
      (mockPool.query as jest.Mock).mockRejectedValueOnce(new Error("DB connection error"));

      await expect(flightRepository.getAllFlights()).rejects.toThrow(InfraError);
      await expect(flightRepository.getAllFlights()).rejects.toThrow(
        "Failed to fetch flights from database"
      );
    });

    it("logs error when DB query fails", async () => {
      (mockPool.query as jest.Mock).mockRejectedValueOnce(new Error("DB connection error"));

      try {
        await flightRepository.getAllFlights();
      } catch {}

      expect(logger.error).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getAllFlights" }),
        "DB query failed for getAllFlights"
      );
    });
  });

  // ─── getFlightById ────────────────────────────────────────────────────────────

  describe("getFlightById", () => {
    it("returns flight when found", async () => {
      const mockFlight = { id: 1, flight_number: "AI101" };
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[mockFlight]]);

      const result = await flightRepository.getFlightById(1);

      expect(result).toEqual(mockFlight);
      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT * FROM flight_bookings WHERE id = ?",
        [1]
      );
    });

    it("returns null when flight not found", async () => {
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[]]);

      const result = await flightRepository.getFlightById(999);

      expect(result).toBeNull();
    });

    it("logs debug when searching and info when flight is found", async () => {
      const mockFlight = { id: 1, flight_number: "AI101" };
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[mockFlight]]);

      await flightRepository.getFlightById(1);

      expect(logger.debug).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 1 }),
        "Querying flight by ID"
      );
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 1 }),
        "Flight fetched successfully"
      );
    });

    it("logs debug when flight not found", async () => {
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[]]);

      await flightRepository.getFlightById(999);

      expect(logger.debug).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 999 }),
        "No flight found for given ID"
      );
    });

    it("throws InfraError when DB query fails", async () => {
      (mockPool.query as jest.Mock).mockRejectedValueOnce(new Error("DB connection error"));

      await expect(flightRepository.getFlightById(1)).rejects.toThrow(InfraError);
      await expect(flightRepository.getFlightById(1)).rejects.toThrow(
        "Failed to fetch flight bookings from database"
      );
    });

    it("logs error when DB query fails", async () => {
      (mockPool.query as jest.Mock).mockRejectedValueOnce(new Error("DB connection error"));

      try {
        await flightRepository.getFlightById(1);
      } catch {}

      expect(logger.error).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 1 }),
        "DB query failed for getFlightById"
      );
    });
  });
});
