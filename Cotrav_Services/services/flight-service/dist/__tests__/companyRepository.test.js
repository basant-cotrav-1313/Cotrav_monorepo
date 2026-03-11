"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companyRepository = __importStar(require("../infrastructure/db/repositories/companyRepository"));
const errors_1 = require("@cotrav/errors");
// Mock the DB pool
jest.mock("../infrastructure/db/connection", () => ({
    query: jest.fn(),
}));
const connection_1 = __importDefault(require("../infrastructure/db/connection"));
const mockPool = connection_1.default;
describe("companyRepository", () => {
    describe("getCompanies", () => {
        it("returns list of companies from DB", async () => {
            const mockRows = [
                { id: 1, corporate_name: "Acme Corp" },
                { id: 2, corporate_name: "Beta Ltd" },
            ];
            mockPool.query.mockResolvedValueOnce([mockRows]);
            const result = await companyRepository.getCompanies();
            expect(mockPool.query).toHaveBeenCalledWith("SELECT id, corporate_name FROM admins");
            expect(result).toEqual(mockRows);
            expect(result).toHaveLength(2);
        });
        it("returns empty array when no companies found", async () => {
            mockPool.query.mockResolvedValueOnce([[]]);
            const result = await companyRepository.getCompanies();
            expect(result).toEqual([]);
        });
        it("throws InfraError when DB query fails", async () => {
            mockPool.query.mockRejectedValueOnce(new Error("DB connection error"));
            await expect(companyRepository.getCompanies()).rejects.toThrow(errors_1.InfraError);
            await expect(companyRepository.getCompanies()).rejects.toThrow("Failed to fetch companies from database");
        });
    });
});
//# sourceMappingURL=companyRepository.test.js.map