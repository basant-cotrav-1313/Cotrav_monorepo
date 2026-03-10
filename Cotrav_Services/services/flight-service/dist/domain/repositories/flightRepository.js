"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFlights = getAllFlights;
exports.getFlightById = getFlightById;
const connection_1 = __importDefault(require("../../infrastructure/db/connection"));
async function getAllFlights() {
    const [rows] = await connection_1.default.query("SELECT * FROM flights");
    return rows;
}
async function getFlightById(id) {
    const [rows] = await connection_1.default.query("SELECT * FROM flights WHERE id = ?", [id]);
    return rows[0] ?? null;
}
//# sourceMappingURL=flightRepository.js.map