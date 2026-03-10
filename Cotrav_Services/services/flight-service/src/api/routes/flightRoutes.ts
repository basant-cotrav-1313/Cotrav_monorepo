import { Router } from "express";
import * as middlewares from "@cotrav/middlewares";
import * as flightController from "../controllers/flightController";

const router = Router();

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

export default router;
