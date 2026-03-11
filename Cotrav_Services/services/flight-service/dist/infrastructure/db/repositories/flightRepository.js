"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFlights = getAllFlights;
exports.getFlightById = getFlightById;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
const connection_1 = __importDefault(require("../connection"));
async function getAllFlights() {
    logger_1.default.debug({ layer: "repository", fn: "getAllFlights" }, "Querying all flights");
    try {
        const [rows] = await connection_1.default.query("SELECT * FROM flight_bookings");
        logger_1.default.info({ layer: "repository", fn: "getAllFlights", count: rows.length }, "Flights fetched successfully");
        return rows;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getAllFlights", err }, "DB query failed for getAllFlights");
        throw new errors_1.InfraError("Failed to fetch flights from database");
    }
}
async function getFlightById(id) {
    logger_1.default.debug({ layer: "repository", fn: "getFlightById", flightId: id }, "Querying flight by ID");
    try {
        const [rows] = await connection_1.default.query("SELECT * FROM flight_bookings WHERE id = ?", [id]);
        const flight = rows[0] ?? null;
        if (flight) {
            logger_1.default.info({ layer: "repository", fn: "getFlightById", flightId: id }, "Flight fetched successfully");
        }
        else {
            logger_1.default.debug({ layer: "repository", fn: "getFlightById", flightId: id }, "No flight found for given ID");
        }
        return flight;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getFlightById", flightId: id, err }, "DB query failed for getFlightById");
        throw new errors_1.InfraError("Failed to fetch flight bookings from database");
    }
}
//# sourceMappingURL=flightRepository.js.map