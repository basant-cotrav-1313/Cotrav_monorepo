import * as companyRepository from "../domain/repositories/companyRepository";

// Mock the DB pool
jest.mock("../infrastructure/db/connection", () => ({
  query: jest.fn(),
}));

import pool from "../infrastructure/db/connection";

const mockPool = pool as jest.Mocked<typeof pool>;

describe("companyRepository", () => {
  describe("getCompanies", () => {
    it("returns list of companies from DB", async () => {
      const mockRows = [
        { id: 1, corporate_name: "Acme Corp" },
        { id: 2, corporate_name: "Beta Ltd" },
      ];

      (mockPool.query as jest.Mock).mockResolvedValueOnce([mockRows]);

      const result = await companyRepository.getCompanies();

      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT id, corporate_name FROM admins"
      );
      expect(result).toEqual(mockRows);
      expect(result).toHaveLength(2);
    });

    it("returns empty array when no companies found", async () => {
      (mockPool.query as jest.Mock).mockResolvedValueOnce([[]]);

      const result = await companyRepository.getCompanies();

      expect(result).toEqual([]);
    });

    it("throws when DB query fails", async () => {
      (mockPool.query as jest.Mock).mockRejectedValueOnce(
        new Error("DB connection error")
      );

      await expect(companyRepository.getCompanies()).rejects.toThrow(
        "DB connection error"
      );
    });
  });
});
