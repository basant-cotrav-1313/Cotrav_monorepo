import { AppError, InfraError } from "@cotrav/errors";

jest.mock("../infrastructure/db/connection", () => ({ query: jest.fn() }));
jest.mock("../infrastructure/db/repositories/flightRepository");
jest.mock("@cotrav/logger", () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

import * as flightRepository from "../infrastructure/db/repositories/flightRepository";
import * as flightService from "../domain/services/flightService";
import logger from "@cotrav/logger";

const mockGetAllFlights = flightRepository.getAllFlights as jest.MockedFunction<
  typeof flightRepository.getAllFlights
>;
const mockGetFlightById = flightRepository.getFlightById as jest.MockedFunction<
  typeof flightRepository.getFlightById
>;

describe("flightService", () => {
  beforeEach(() => jest.clearAllMocks());

  // ─── getAllFlights ────────────────────────────────────────────────────────────

  describe("getAllFlights", () => {
    it("returns mapped flight responses", async () => {
      const mockRows = [
        { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" },
        { id: 2, flight_number: "AI102", origin: "DEL", destination: "BOM", departure_time: "14:00", arrival_time: "16:00" },
      ] as any;
      mockGetAllFlights.mockResolvedValueOnce(mockRows);

      const result = await flightService.getAllFlights();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ id: 1, flight_number: "AI101" });
      expect(result[1]).toMatchObject({ id: 2, flight_number: "AI102" });
    });

    it("returns empty array when no flights exist", async () => {
      mockGetAllFlights.mockResolvedValueOnce([]);

      const result = await flightService.getAllFlights();

      expect(result).toEqual([]);
    });

    it("logs info when fetching all flights", async () => {
      mockGetAllFlights.mockResolvedValueOnce([]);

      await flightService.getAllFlights();

      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "service", fn: "getAllFlights" }),
        "Fetching all flights"
      );
    });

    it("propagates InfraError from repository", async () => {
      mockGetAllFlights.mockRejectedValueOnce(
        new InfraError("Failed to fetch flights from database")
      );
      mockGetAllFlights.mockRejectedValueOnce(
        new InfraError("Failed to fetch flights from database")
      );

      await expect(flightService.getAllFlights()).rejects.toThrow(InfraError);
      await expect(flightService.getAllFlights()).rejects.toThrow(
        "Failed to fetch flights from database"
      );
    });
  });

  // ─── getFlightById ────────────────────────────────────────────────────────────

  describe("getFlightById", () => {
    it("returns mapped flight when found", async () => {
      const mockFlight = {
        id: 5,
        flight_number: "AI105",
        origin: "BOM",
        destination: "DEL",
        departure_time: "10:00",
        arrival_time: "12:00",
      } as any;
      mockGetFlightById.mockResolvedValueOnce(mockFlight);

      const result = await flightService.getFlightById("5");

      expect(result.id).toBe(5);
      expect(result.flight_number).toBe("AI105");
    });

    // ─── Validation errors (AppError 400) ──────────────────────────────────────

    it("throws AppError 400 for non-numeric string", async () => {
      let error: any;
      try { await flightService.getFlightById("abc"); } catch (e) { error = e; }
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Invalid flight ID");
    });

    it("throws AppError 400 for negative ID", async () => {
      let error: any;
      try { await flightService.getFlightById("-1"); } catch (e) { error = e; }
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
    });

    it("throws AppError 400 for zero", async () => {
      let error: any;
      try { await flightService.getFlightById("0"); } catch (e) { error = e; }
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
    });

    it("throws AppError 400 for float", async () => {
      let error: any;
      try { await flightService.getFlightById("1.5"); } catch (e) { error = e; }
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
    });

    // ─── Not found (AppError 404) ───────────────────────────────────────────────

    it("throws AppError 404 when flight does not exist", async () => {
      mockGetFlightById.mockResolvedValueOnce(null);

      let error: any;
      try { await flightService.getFlightById("999"); } catch (e) { error = e; }
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Flight not found");
    });

    // ─── Infrastructure error (InfraError 500) ─────────────────────────────────

    it("propagates InfraError from repository", async () => {
      mockGetFlightById.mockRejectedValueOnce(
        new InfraError("Failed to fetch flight bookings from database")
      );

      await expect(flightService.getFlightById("1")).rejects.toThrow(InfraError);
    });

    // ─── Log tests ──────────────────────────────────────────────────────────────

    it("logs info when fetching flight by ID", async () => {
      const mockFlight = { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" } as any;
      mockGetFlightById.mockResolvedValueOnce(mockFlight);

      await flightService.getFlightById("1");

      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ layer: "service", fn: "getFlightById", rawId: "1" }),
        "Fetching flight by ID"
      );
    });

  });
});
