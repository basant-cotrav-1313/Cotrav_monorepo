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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlights = getFlights;
exports.getFlightById = getFlightById;
exports.assignBooking = assignBooking;
const flightService = __importStar(require("../../domain/services/flightService"));
const bookingService = __importStar(require("../../domain/services/bookingService"));
async function getFlights(_req, res) {
    const flights = await flightService.getAllFlights();
    res.json(flights);
}
async function getFlightById(req, res) {
    const flight = await flightService.getFlightById(req.params.id);
    res.json(flight);
}
async function assignBooking(req, res) {
    const authId = Number(req["authId"] ?? 0);
    const result = await bookingService.assignFlightBooking(req.body, authId);
    res.status(200).json(result);
}
//# sourceMappingURL=flightController.js.map