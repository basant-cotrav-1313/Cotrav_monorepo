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
const flightRepository = __importStar(require("../infrastructure/db/repositories/flightRepository"));
const errors_1 = require("@cotrav/errors");
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
const connection_1 = __importDefault(require("../infrastructure/db/connection"));
const logger_1 = __importDefault(require("@cotrav/logger"));
const mockPool = connection_1.default;
describe("flightRepository", () => {
    beforeEach(() => jest.clearAllMocks());
    // ─── getAllFlights ────────────────────────────────────────────────────────────
    describe("getAllFlights", () => {
        it("returns list of flights from DB", async () => {
            const mockRows = [
                { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" },
                { id: 2, flight_number: "AI102", origin: "DEL", destination: "BOM", departure_time: "14:00", arrival_time: "16:00" },
            ];
            mockPool.query.mockResolvedValueOnce([mockRows]);
            const result = await flightRepository.getAllFlights();
            expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM flight_bookings");
            expect(result).toEqual(mockRows);
            expect(result).toHaveLength(2);
        });
        it("returns empty array when no flights found", async () => {
            mockPool.query.mockResolvedValueOnce([[]]);
            const result = await flightRepository.getAllFlights();
            expect(result).toEqual([]);
        });
        it("logs debug before query and info with count after success", async () => {
            const mockRows = [{ id: 1 }];
            mockPool.query.mockResolvedValueOnce([mockRows]);
            await flightRepository.getAllFlights();
            expect(logger_1.default.debug).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getAllFlights" }), "Querying all flights");
            expect(logger_1.default.info).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getAllFlights", count: 1 }), "Flights fetched successfully");
        });
        it("throws InfraError when DB query fails", async () => {
            mockPool.query.mockRejectedValueOnce(new Error("DB connection error"));
            await expect(flightRepository.getAllFlights()).rejects.toThrow(errors_1.InfraError);
            await expect(flightRepository.getAllFlights()).rejects.toThrow("Failed to fetch flights from database");
        });
        it("logs error when DB query fails", async () => {
            mockPool.query.mockRejectedValueOnce(new Error("DB connection error"));
            try {
                await flightRepository.getAllFlights();
            }
            catch { }
            expect(logger_1.default.error).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getAllFlights" }), "DB query failed for getAllFlights");
        });
    });
    // ─── getFlightById ────────────────────────────────────────────────────────────
    describe("getFlightById", () => {
        it("returns flight when found", async () => {
            const mockFlight = { id: 1, flight_number: "AI101" };
            mockPool.query.mockResolvedValueOnce([[mockFlight]]);
            const result = await flightRepository.getFlightById(1);
            expect(result).toEqual(mockFlight);
            expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM flight_bookings WHERE id = ?", [1]);
        });
        it("returns null when flight not found", async () => {
            mockPool.query.mockResolvedValueOnce([[]]);
            const result = await flightRepository.getFlightById(999);
            expect(result).toBeNull();
        });
        it("logs debug when searching and info when flight is found", async () => {
            const mockFlight = { id: 1, flight_number: "AI101" };
            mockPool.query.mockResolvedValueOnce([[mockFlight]]);
            await flightRepository.getFlightById(1);
            expect(logger_1.default.debug).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 1 }), "Querying flight by ID");
            expect(logger_1.default.info).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 1 }), "Flight fetched successfully");
        });
        it("logs debug when flight not found", async () => {
            mockPool.query.mockResolvedValueOnce([[]]);
            await flightRepository.getFlightById(999);
            expect(logger_1.default.debug).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 999 }), "No flight found for given ID");
        });
        it("throws InfraError when DB query fails", async () => {
            mockPool.query.mockRejectedValueOnce(new Error("DB connection error"));
            await expect(flightRepository.getFlightById(1)).rejects.toThrow(errors_1.InfraError);
            await expect(flightRepository.getFlightById(1)).rejects.toThrow("Failed to fetch flight bookings from database");
        });
        it("logs error when DB query fails", async () => {
            mockPool.query.mockRejectedValueOnce(new Error("DB connection error"));
            try {
                await flightRepository.getFlightById(1);
            }
            catch { }
            expect(logger_1.default.error).toHaveBeenCalledWith(expect.objectContaining({ layer: "repository", fn: "getFlightById", flightId: 1 }), "DB query failed for getFlightById");
        });
    });
});
//# sourceMappingURL=flightRepository.test.js.map