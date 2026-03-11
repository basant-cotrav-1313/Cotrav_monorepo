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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const errors_1 = require("@cotrav/errors");
const middlewares = __importStar(require("@cotrav/middlewares"));
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
const flightRoutes_1 = __importDefault(require("../api/routes/flightRoutes"));
const flightService = __importStar(require("../domain/services/flightService"));
const mockGetAllFlights = flightService.getAllFlights;
const mockGetFlightById = flightService.getFlightById;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/flights", flightRoutes_1.default);
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
            mockGetAllFlights.mockResolvedValueOnce(mockData);
            const res = await (0, supertest_1.default)(app).get("/flights");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockData);
            expect(res.body).toHaveLength(2);
        });
        it("returns 200 with empty array when no flights", async () => {
            mockGetAllFlights.mockResolvedValueOnce([]);
            const res = await (0, supertest_1.default)(app).get("/flights");
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
        it("returns 500 when service throws InfraError", async () => {
            mockGetAllFlights.mockRejectedValueOnce(new errors_1.InfraError("Failed to fetch flights from database"));
            const res = await (0, supertest_1.default)(app).get("/flights");
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
            mockGetFlightById.mockResolvedValueOnce(mockFlight);
            const res = await (0, supertest_1.default)(app).get("/flights/1");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockFlight);
        });
        it("returns 400 for non-numeric ID (abc)", async () => {
            mockGetFlightById.mockRejectedValueOnce(new errors_1.AppError("Invalid flight ID", "APP_ERROR", 400));
            const res = await (0, supertest_1.default)(app).get("/flights/abc");
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Invalid flight ID");
        });
        it("returns 400 for negative ID", async () => {
            mockGetFlightById.mockRejectedValueOnce(new errors_1.AppError("Invalid flight ID", "APP_ERROR", 400));
            const res = await (0, supertest_1.default)(app).get("/flights/-1");
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Invalid flight ID");
        });
        it("returns 400 for zero", async () => {
            mockGetFlightById.mockRejectedValueOnce(new errors_1.AppError("Invalid flight ID", "APP_ERROR", 400));
            const res = await (0, supertest_1.default)(app).get("/flights/0");
            expect(res.status).toBe(400);
        });
        it("returns 404 when flight does not exist", async () => {
            mockGetFlightById.mockRejectedValueOnce(new errors_1.AppError("Flight not found", "APP_ERROR", 404));
            const res = await (0, supertest_1.default)(app).get("/flights/999");
            expect(res.status).toBe(404);
            expect(res.body.message).toBe("Flight not found");
        });
        it("returns 500 when service throws InfraError", async () => {
            mockGetFlightById.mockRejectedValueOnce(new errors_1.InfraError("Failed to fetch flight bookings from database"));
            const res = await (0, supertest_1.default)(app).get("/flights/1");
            expect(res.status).toBe(500);
        });
    });
});
//# sourceMappingURL=flightRoutes.test.js.map