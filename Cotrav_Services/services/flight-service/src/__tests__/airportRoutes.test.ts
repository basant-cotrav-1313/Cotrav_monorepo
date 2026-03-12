import request from "supertest";
import express from "express";
import airportRoutes from "../api/routes/airportRoutes";
import * as airportRepository from "../infrastructure/db/repositories/airportRepository";
import * as middlewares from "@cotrav/middlewares";

jest.mock("../infrastructure/db/repositories/airportRepository");

const mockGetAirports = airportRepository.getAirports as jest.MockedFunction<
  typeof airportRepository.getAirports
>;

const app = express();
app.use(express.json());
app.use("/airports", airportRoutes);
app.use(middlewares.errorHandler);

describe("GET /airports", () => {
  it("returns 200 with list of airports", async () => {
    const mockData = [
      { id: 26555, airport_name: "Indira Gandhi International Airport", airport_municipality: "New Delhi", airport_iata_code: "DEL" },
      { id: 2997, airport_name: "Chhatrapati Shivaji Maharaj International Airport", airport_municipality: "Mumbai", airport_iata_code: "BOM" },
    ];

    mockGetAirports.mockResolvedValueOnce(mockData as any);

    const res = await request(app).get("/airports");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(res.body).toHaveLength(2);
  });

  it("returns 200 with empty array when no airports", async () => {
    mockGetAirports.mockResolvedValueOnce([]);

    const res = await request(app).get("/airports");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns 500 when repository throws", async () => {
    mockGetAirports.mockRejectedValueOnce(new Error("API error"));

    const res = await request(app).get("/airports");

    expect(res.status).toBe(500);
  });
});
