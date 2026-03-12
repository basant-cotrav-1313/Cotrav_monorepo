import * as cityRepository from "../infrastructure/db/repositories/cityRepository";
import { InfraError } from "@cotrav/errors";

jest.mock("../infrastructure/db/connection", () => ({
  query: jest.fn(),
}));

import pool from "../infrastructure/db/connection";

const mockPool = pool as jest.Mocked<typeof pool>;

describe("cityRepository", () => {
  describe("getCities", () => {
    it("returns list of cities from DB", async () => {
      const mockRows = [
        { id: 1, name: "Mumbai", state_name: "Maharashtra", country_code: "IN", country_name: "India" },
        { id: 2, name: "Delhi", state_name: "Delhi", country_code: "IN", country_name: "India" },
      ];

      (mockPool.query as jest.Mock).mockResolvedValueOnce([mockRows]);

      const result = await cityRepository.getCities();

      expect(result).toEqual(mockRows);
      expect(result).toHaveLength(2);
    });

    it("returns empty array when no cities found", async () => {
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[]]);

      const result = await cityRepository.getCities();

      expect(result).toEqual([]);
    });

    it("throws InfraError when DB query fails", async () => {
      (mockPool.query as jest.Mock).mockRejectedValueOnce(new Error("DB connection error"));

      await expect(cityRepository.getCities()).rejects.toThrow(InfraError);
      await expect(cityRepository.getCities()).rejects.toThrow("Failed to fetch cities from database");
    });
  });
});
