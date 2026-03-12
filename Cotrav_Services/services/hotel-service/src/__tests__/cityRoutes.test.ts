import request from "supertest";
import express from "express";
import cityRoutes from "../api/routes/cityRoutes";
import * as cityRepository from "../infrastructure/db/repositories/cityRepository";
import * as middlewares from "@cotrav/middlewares";

jest.mock("../infrastructure/db/repositories/cityRepository");

const mockGetCities = cityRepository.getCities as jest.MockedFunction<
  typeof cityRepository.getCities
>;

const app = express();
app.use(express.json());
app.use("/getAllCities", cityRoutes);
app.use(middlewares.errorHandler);

describe("POST /getAllCities", () => {
  it("returns 200 with list of cities", async () => {
    const mockData = [
      { id: 1, name: "Mumbai", state_id: 1, state_name: "Maharashtra", country_code: "IN", country_name: "India" },
      { id: 2, name: "Delhi", state_id: 2, state_name: "Delhi", country_code: "IN", country_name: "India" },
    ];

    mockGetCities.mockResolvedValueOnce(mockData as any);

    const res = await request(app).post("/getAllCities");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(res.body).toHaveLength(2);
  });

  it("returns 200 with empty array when no cities", async () => {
    mockGetCities.mockResolvedValueOnce([]);

    const res = await request(app).post("/getAllCities");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns 500 when repository throws", async () => {
    mockGetCities.mockRejectedValueOnce(new Error("API error"));

    const res = await request(app).post("/getAllCities");

    expect(res.status).toBe(500);
  });
});
