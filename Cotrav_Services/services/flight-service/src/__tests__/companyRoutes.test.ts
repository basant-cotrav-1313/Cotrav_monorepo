import request from "supertest";
import express from "express";
import companyRoutes from "../api/routes/companyRoutes";
import * as companyRepository from "../infrastructure/db/repositories/companyRepository";
import * as middlewares from "@cotrav/middlewares";

// Mock DB pool so service doesn't need a real DB
jest.mock("../infrastructure/db/connection", () => ({
  query: jest.fn(),
}));

jest.mock("../infrastructure/db/repositories/companyRepository");

const mockGetCompanies = companyRepository.getCompanies as jest.MockedFunction<
  typeof companyRepository.getCompanies
>;

const app = express();
app.use(express.json());
app.use("/companies", companyRoutes);
app.use(middlewares.errorHandler);

describe("GET /companies", () => {
  it("returns 200 with list of companies", async () => {
    const mockData = [
      { id: 1, corporate_name: "Acme Corp" },
      { id: 2, corporate_name: "Beta Ltd" },
    ];

    mockGetCompanies.mockResolvedValueOnce(mockData as any);

    const res = await request(app).get("/companies");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(res.body).toHaveLength(2);
  });

  it("returns 200 with empty array when no companies", async () => {
    mockGetCompanies.mockResolvedValueOnce([]);

    const res = await request(app).get("/companies");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns 500 when repository throws", async () => {
    mockGetCompanies.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).get("/companies");

    expect(res.status).toBe(500);
  });
});
