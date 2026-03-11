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
const companyRoutes_1 = __importDefault(require("../api/routes/companyRoutes"));
const companyRepository = __importStar(require("../infrastructure/db/repositories/companyRepository"));
const middlewares = __importStar(require("@cotrav/middlewares"));
// Mock DB pool so service doesn't need a real DB
jest.mock("../infrastructure/db/connection", () => ({
    query: jest.fn(),
}));
jest.mock("../infrastructure/db/repositories/companyRepository");
const mockGetCompanies = companyRepository.getCompanies;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/companies", companyRoutes_1.default);
app.use(middlewares.errorHandler);
describe("GET /companies", () => {
    it("returns 200 with list of companies", async () => {
        const mockData = [
            { id: 1, corporate_name: "Acme Corp" },
            { id: 2, corporate_name: "Beta Ltd" },
        ];
        mockGetCompanies.mockResolvedValueOnce(mockData);
        const res = await (0, supertest_1.default)(app).get("/companies");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockData);
        expect(res.body).toHaveLength(2);
    });
    it("returns 200 with empty array when no companies", async () => {
        mockGetCompanies.mockResolvedValueOnce([]);
        const res = await (0, supertest_1.default)(app).get("/companies");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    it("returns 500 when repository throws", async () => {
        mockGetCompanies.mockRejectedValueOnce(new Error("DB error"));
        const res = await (0, supertest_1.default)(app).get("/companies");
        expect(res.status).toBe(500);
    });
});
//# sourceMappingURL=companyRoutes.test.js.map