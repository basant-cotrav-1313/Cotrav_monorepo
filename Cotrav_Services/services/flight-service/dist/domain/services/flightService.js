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
exports.getAllFlights = getAllFlights;
exports.getFlightById = getFlightById;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
const flightRepository = __importStar(require("../../infrastructure/db/repositories/flightRepository"));
const flight_dto_1 = require("../dtos/flight.dto");
async function getAllFlights() {
    logger_1.default.info({ layer: "service", fn: "getAllFlights" }, "Fetching all flights");
    const rows = await flightRepository.getAllFlights();
    return rows.map(flight_dto_1.toFlightResponse);
}
async function getFlightById(rawId) {
    logger_1.default.info({ layer: "service", fn: "getFlightById", rawId }, "Fetching flight by ID");
    const dto = flight_dto_1.FlightByIdRequest.validate(rawId); // DTO handles validation + AppError(400)
    const flight = await flightRepository.getFlightById(dto.id);
    if (!flight) {
        throw new errors_1.AppError("Flight not found", "APP_ERROR", 404);
    }
    return (0, flight_dto_1.toFlightResponse)(flight);
}
//# sourceMappingURL=flightService.js.map