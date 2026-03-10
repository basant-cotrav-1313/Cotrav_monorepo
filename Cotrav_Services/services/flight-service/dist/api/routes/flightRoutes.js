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
const express_1 = require("express");
const middlewares = __importStar(require("@cotrav/middlewares"));
const flightController = __importStar(require("../controllers/flightController"));
const router = (0, express_1.Router)();
/**
 * @openapi
 * /flights:
 *   get:
 *     summary: Get all flights
 *     description: Returns a list of all available flights.
 *     tags:
 *       - Flights
 *     responses:
 *       200:
 *         description: List of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get("/", middlewares.asyncHandler(flightController.getFlights));
/**
 * @openapi
 * /flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     description: Returns a single flight by its ID.
 *     tags:
 *       - Flights
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The flight ID
 *     responses:
 *       200:
 *         description: Flight details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", middlewares.asyncHandler(flightController.getFlightById));
exports.default = router;
//# sourceMappingURL=flightRoutes.js.map