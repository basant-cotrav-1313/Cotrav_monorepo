"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAirports = getAirports;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
const AIRPORTS_API_URL = "https://selfbooking.taxivaxi.com/api/airports";
async function getAirports() {
    logger_1.default.debug({ layer: "repository", fn: "getAirports" }, "Fetching airports from external API");
    try {
        const response = await fetch(AIRPORTS_API_URL);
        if (!response.ok) {
            throw new Error(`External API responded with status ${response.status}`);
        }
        const data = await response.json();
        const airports = Array.isArray(data) ? data : data?.data ?? [];
        logger_1.default.info({ layer: "repository", fn: "getAirports", count: airports.length }, "Airports fetched successfully");
        return airports;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getAirports", err }, "Failed to fetch airports from external API");
        throw new errors_1.InfraError("Failed to fetch airports from external API");
    }
}
//# sourceMappingURL=airportRepository.js.map