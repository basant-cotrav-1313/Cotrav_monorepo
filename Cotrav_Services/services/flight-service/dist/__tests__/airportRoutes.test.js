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
const airportRoutes_1 = __importDefault(require("../api/routes/airportRoutes"));
const airportRepository = __importStar(require("../infrastructure/db/repositories/airportRepository"));
const middlewares = __importStar(require("@cotrav/middlewares"));
jest.mock("../infrastructure/db/repositories/airportRepository");
const mockGetAirports = airportRepository.getAirports;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/airports", airportRoutes_1.default);
app.use(middlewares.errorHandler);
describe("GET /airports", () => {
    it("returns 200 with list of airports", async () => {
        const mockData = [
            { id: 26555, airport_name: "Indira Gandhi International Airport", airport_municipality: "New Delhi", airport_iata_code: "DEL" },
            { id: 2997, airport_name: "Chhatrapati Shivaji Maharaj International Airport", airport_municipality: "Mumbai", airport_iata_code: "BOM" },
        ];
        mockGetAirports.mockResolvedValueOnce(mockData);
        const res = await (0, supertest_1.default)(app).get("/airports");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockData);
        expect(res.body).toHaveLength(2);
    });
    it("returns 200 with empty array when no airports", async () => {
        mockGetAirports.mockResolvedValueOnce([]);
        const res = await (0, supertest_1.default)(app).get("/airports");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    it("returns 500 when repository throws", async () => {
        mockGetAirports.mockRejectedValueOnce(new Error("API error"));
        const res = await (0, supertest_1.default)(app).get("/airports");
        expect(res.status).toBe(500);
    });
});
//# sourceMappingURL=airportRoutes.test.js.map