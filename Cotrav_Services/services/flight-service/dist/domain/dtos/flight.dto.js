"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightByIdRequest = void 0;
exports.toFlightResponse = toFlightResponse;
const errors_1 = require("@cotrav/errors");
// ─── Request DTO ─────────────────────────────────────────────────────────────
class FlightByIdRequest {
    constructor(id) {
        this.id = id;
    }
    static validate(raw) {
        const id = Number(raw);
        if (!Number.isInteger(id) || id <= 0) {
            throw new errors_1.AppError("Invalid flight ID", "APP_ERROR", 400);
        }
        return new FlightByIdRequest(id);
    }
}
exports.FlightByIdRequest = FlightByIdRequest;
function toFlightResponse(row) {
    return {
        id: row.id,
        flight_number: row.flight_number,
        origin: row.origin,
        destination: row.destination,
        departure_time: row.departure_time,
        arrival_time: row.arrival_time,
    };
}
//# sourceMappingURL=flight.dto.js.map