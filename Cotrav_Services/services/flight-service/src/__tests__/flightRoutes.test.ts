import request from "supertest";
import express from "express";
import { AppError, InfraError } from "@cotrav/errors";
import * as middlewares from "@cotrav/middlewares";

jest.mock("../infrastructure/db/connection", () => ({ query: jest.fn() }));
jest.mock("../domain/services/flightService");
jest.mock("@cotrav/logger", () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

import flightRoutes from "../api/routes/flightRoutes";
import * as flightService from "../domain/services/flightService";

const mockGetAllFlights = flightService.getAllFlights as jest.MockedFunction<
  typeof flightService.getAllFlights
>;
const mockGetFlightById = flightService.getFlightById as jest.MockedFunction<
  typeof flightService.getFlightById
>;

const app = express();
app.use(express.json());
app.use("/flights", flightRoutes);
app.use(middlewares.errorHandler);

describe("Flight Routes", () => {
  beforeEach(() => jest.clearAllMocks());

  // ─── GET /flights ─────────────────────────────────────────────────────────────

  describe("GET /flights", () => {
    it("returns 200 with list of flights", async () => {
      const mockData = [
        { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" },
        { id: 2, flight_number: "AI102", origin: "DEL", destination: "BOM", departure_time: "14:00", arrival_time: "16:00" },
      ];
      mockGetAllFlights.mockResolvedValueOnce(mockData as any);

      const res = await request(app).get("/flights");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(res.body).toHaveLength(2);
    });

    it("returns 200 with empty array when no flights", async () => {
      mockGetAllFlights.mockResolvedValueOnce([]);

      const res = await request(app).get("/flights");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("returns 500 when service throws InfraError", async () => {
      mockGetAllFlights.mockRejectedValueOnce(
        new InfraError("Failed to fetch flights from database")
      );

      const res = await request(app).get("/flights");

      expect(res.status).toBe(500);
    });
  });

  // ─── GET /flights/:id ─────────────────────────────────────────────────────────

  describe("GET /flights/:id", () => {
    it("returns 200 with flight data for valid ID", async () => {
      const mockFlight = {
        id: 1,
        flight_number: "AI101",
        origin: "BOM",
        destination: "DEL",
        departure_time: "10:00",
        arrival_time: "12:00",
      };
      mockGetFlightById.mockResolvedValueOnce(mockFlight as any);

      const res = await request(app).get("/flights/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockFlight);
    });

    it("returns 400 for non-numeric ID (abc)", async () => {
      mockGetFlightById.mockRejectedValueOnce(
        new AppError("Invalid flight ID", "APP_ERROR", 400)
      );

      const res = await request(app).get("/flights/abc");

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid flight ID");
    });

    it("returns 400 for negative ID", async () => {
      mockGetFlightById.mockRejectedValueOnce(
        new AppError("Invalid flight ID", "APP_ERROR", 400)
      );

      const res = await request(app).get("/flights/-1");

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid flight ID");
    });

    it("returns 400 for zero", async () => {
      mockGetFlightById.mockRejectedValueOnce(
        new AppError("Invalid flight ID", "APP_ERROR", 400)
      );

      const res = await request(app).get("/flights/0");

      expect(res.status).toBe(400);
    });

    it("returns 404 when flight does not exist", async () => {
      mockGetFlightById.mockRejectedValueOnce(
        new AppError("Flight not found", "APP_ERROR", 404)
      );

      const res = await request(app).get("/flights/999");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Flight not found");
    });

    it("returns 500 when service throws InfraError", async () => {
      mockGetFlightById.mockRejectedValueOnce(
        new InfraError("Failed to fetch flight bookings from database")
      );

      const res = await request(app).get("/flights/1");

      expect(res.status).toBe(500);
    });
  });
});
