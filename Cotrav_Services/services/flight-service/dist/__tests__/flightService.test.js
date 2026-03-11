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
const errors_1 = require("@cotrav/errors");
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
const flightRepository = __importStar(require("../infrastructure/db/repositories/flightRepository"));
const flightService = __importStar(require("../domain/services/flightService"));
const logger_1 = __importDefault(require("@cotrav/logger"));
const mockGetAllFlights = flightRepository.getAllFlights;
const mockGetFlightById = flightRepository.getFlightById;
describe("flightService", () => {
    beforeEach(() => jest.clearAllMocks());
    // ─── getAllFlights ────────────────────────────────────────────────────────────
    describe("getAllFlights", () => {
        it("returns mapped flight responses", async () => {
            const mockRows = [
                { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" },
                { id: 2, flight_number: "AI102", origin: "DEL", destination: "BOM", departure_time: "14:00", arrival_time: "16:00" },
            ];
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
            expect(logger_1.default.info).toHaveBeenCalledWith(expect.objectContaining({ layer: "service", fn: "getAllFlights" }), "Fetching all flights");
        });
        it("propagates InfraError from repository", async () => {
            mockGetAllFlights.mockRejectedValueOnce(new errors_1.InfraError("Failed to fetch flights from database"));
            mockGetAllFlights.mockRejectedValueOnce(new errors_1.InfraError("Failed to fetch flights from database"));
            await expect(flightService.getAllFlights()).rejects.toThrow(errors_1.InfraError);
            await expect(flightService.getAllFlights()).rejects.toThrow("Failed to fetch flights from database");
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
            };
            mockGetFlightById.mockResolvedValueOnce(mockFlight);
            const result = await flightService.getFlightById("5");
            expect(result.id).toBe(5);
            expect(result.flight_number).toBe("AI105");
        });
        // ─── Validation errors (AppError 400) ──────────────────────────────────────
        it("throws AppError 400 for non-numeric string", async () => {
            let error;
            try {
                await flightService.getFlightById("abc");
            }
            catch (e) {
                error = e;
            }
            expect(error).toBeInstanceOf(errors_1.AppError);
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("Invalid flight ID");
        });
        it("throws AppError 400 for negative ID", async () => {
            let error;
            try {
                await flightService.getFlightById("-1");
            }
            catch (e) {
                error = e;
            }
            expect(error).toBeInstanceOf(errors_1.AppError);
            expect(error.statusCode).toBe(400);
        });
        it("throws AppError 400 for zero", async () => {
            let error;
            try {
                await flightService.getFlightById("0");
            }
            catch (e) {
                error = e;
            }
            expect(error).toBeInstanceOf(errors_1.AppError);
            expect(error.statusCode).toBe(400);
        });
        it("throws AppError 400 for float", async () => {
            let error;
            try {
                await flightService.getFlightById("1.5");
            }
            catch (e) {
                error = e;
            }
            expect(error).toBeInstanceOf(errors_1.AppError);
            expect(error.statusCode).toBe(400);
        });
        // ─── Not found (AppError 404) ───────────────────────────────────────────────
        it("throws AppError 404 when flight does not exist", async () => {
            mockGetFlightById.mockResolvedValueOnce(null);
            let error;
            try {
                await flightService.getFlightById("999");
            }
            catch (e) {
                error = e;
            }
            expect(error).toBeInstanceOf(errors_1.AppError);
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("Flight not found");
        });
        // ─── Infrastructure error (InfraError 500) ─────────────────────────────────
        it("propagates InfraError from repository", async () => {
            mockGetFlightById.mockRejectedValueOnce(new errors_1.InfraError("Failed to fetch flight bookings from database"));
            await expect(flightService.getFlightById("1")).rejects.toThrow(errors_1.InfraError);
        });
        // ─── Log tests ──────────────────────────────────────────────────────────────
        it("logs info when fetching flight by ID", async () => {
            const mockFlight = { id: 1, flight_number: "AI101", origin: "BOM", destination: "DEL", departure_time: "10:00", arrival_time: "12:00" };
            mockGetFlightById.mockResolvedValueOnce(mockFlight);
            await flightService.getFlightById("1");
            expect(logger_1.default.info).toHaveBeenCalledWith(expect.objectContaining({ layer: "service", fn: "getFlightById", rawId: "1" }), "Fetching flight by ID");
        });
    });
});
//# sourceMappingURL=flightService.test.js.map