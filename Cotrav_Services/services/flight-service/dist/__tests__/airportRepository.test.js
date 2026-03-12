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
const airportRepository = __importStar(require("../infrastructure/db/repositories/airportRepository"));
const errors_1 = require("@cotrav/errors");
jest.mock("@cotrav/logger", () => ({
    __esModule: true,
    default: { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
const logger_1 = __importDefault(require("@cotrav/logger"));
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
            expect(logger_1.default.debug).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getAirports" }), "Fetching airports from external API");
            expect(logger_1.default.info).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getAirports", count: 2 }), "Airports fetched successfully");
        });
        it("throws InfraError when API returns non-ok status", async () => {
            mockFetch.mockResolvedValueOnce({ ok: false, status: 503 });
            await expect(airportRepository.getAirports()).rejects.toThrow(errors_1.InfraError);
        });
        it("throws InfraError on network error", async () => {
            mockFetch.mockRejectedValueOnce(new Error("Network error"));
            await expect(airportRepository.getAirports()).rejects.toThrow(errors_1.InfraError);
        });
        it("logs error when fetch fails", async () => {
            mockFetch.mockRejectedValueOnce(new Error("Network error"));
            try {
                await airportRepository.getAirports();
            }
            catch { }
            expect(logger_1.default.error).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getAirports" }), "Failed to fetch airports from external API");
        });
    });
});
//# sourceMappingURL=airportRepository.test.js.map