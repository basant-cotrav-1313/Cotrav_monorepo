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

/**
 * @openapi
 * /flights/bookings/assign:
 *   post:
 *     summary: Assign a flight booking (assignSbtCotravFlightBooking)
 *     description: >
 *       Assigns a flight booking with structured segment details, passenger info, and pricing.
 *       Creates or updates the invoice and flight segments atomically.
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - booking_id
 *               - trip_type
 *               - flight_type
 *               - fare_type
 *               - is_extra_baggage_included
 *               - extra_baggage
 *               - total_ex_tax_fees
 *               - tax_and_fees
 *               - gst_k3
 *               - no_of_stops
 *               - no_of_seats
 *               - universallocatorCode
 *               - discount
 *               - date_change_charges
 *               - seat_charges
 *               - meal_charges
 *               - extra_baggage_charges
 *               - fast_forward_charges
 *               - vip_service_charges
 *               - applied_markup
 *               - actual_markup
 *               - portal_used
 *               - flight_details
 *             properties:
 *               booking_id:
 *                 type: integer
 *                 example: 1234
 *               trip_type:
 *                 type: string
 *                 enum: [One Way, Round Trip]
 *                 example: One Way
 *               flight_type:
 *                 type: string
 *                 enum: [Domestic, International]
 *                 example: Domestic
 *               fare_type:
 *                 type: string
 *                 example: Regular
 *               is_extra_baggage_included:
 *                 type: string
 *                 example: "0"
 *               extra_baggage:
 *                 type: string
 *                 example: "0"
 *               total_ex_tax_fees:
 *                 type: number
 *                 example: 5000
 *               tax_and_fees:
 *                 type: number
 *                 example: 450
 *               gst_k3:
 *                 type: number
 *                 example: 225
 *               no_of_stops:
 *                 type: integer
 *                 example: 0
 *               no_of_seats:
 *                 type: integer
 *                 example: 2
 *               universallocatorCode:
 *                 type: string
 *                 example: ABCDEF
 *               discount:
 *                 type: number
 *                 example: 0
 *               date_change_charges:
 *                 type: number
 *                 example: 0
 *               seat_charges:
 *                 type: number
 *                 example: 0
 *               meal_charges:
 *                 type: number
 *                 example: 0
 *               extra_baggage_charges:
 *                 type: number
 *                 example: 0
 *               fast_forward_charges:
 *                 type: number
 *                 example: 0
 *               vip_service_charges:
 *                 type: number
 *                 example: 0
 *               applied_markup:
 *                 type: number
 *                 example: 100
 *               actual_markup:
 *                 type: number
 *                 example: 100
 *               portal_used:
 *                 type: string
 *                 example: UAPI
 *               no_of_stops_return:
 *                 type: integer
 *                 example: 0
 *               flight_details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - from_city
 *                     - to_city
 *                     - departure_datetime
 *                     - arrival_datetime
 *                     - flight_name
 *                     - flight_no
 *                     - pnr_no
 *                     - seat_type
 *                     - passenger_details
 *                   properties:
 *                     from_city:
 *                       type: string
 *                       example: Pune (PNQ)
 *                     to_city:
 *                       type: string
 *                       example: Mumbai (BOM)
 *                     departure_datetime:
 *                       type: string
 *                       example: "2024-03-15 10:00:00"
 *                     arrival_datetime:
 *                       type: string
 *                       example: "2024-03-15 11:00:00"
 *                     flight_name:
 *                       type: string
 *                       example: IndiGo
 *                     flight_no:
 *                       type: string
 *                       example: 6E123
 *                     pnr_no:
 *                       type: string
 *                       example: ABC123
 *                     seat_type:
 *                       type: string
 *                       example: Economy
 *                     checked_bg:
 *                       type: string
 *                       example: 15kg
 *                     cabin_bg:
 *                       type: string
 *                       example: 7kg
 *                     via:
 *                       type: string
 *                       example: ""
 *                     passenger_details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - people_id
 *                           - seat_no
 *                           - ticket_no
 *                           - meal_include
 *                         properties:
 *                           people_id:
 *                             type: string
 *                             example: "456"
 *                           seat_no:
 *                             type: string
 *                             example: 12A
 *                           ticket_no:
 *                             type: string
 *                             example: TKT001
 *                           meal_include:
 *                             type: string
 *                             example: "0"
 *               return_flight_details:
 *                 type: array
 *                 description: Required only when trip_type is Round Trip
 *                 items:
 *                   $ref: '#/components/schemas/FlightSegment'
 *     responses:
 *       200:
 *         description: Booking assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 booking_id:
 *                   type: integer
 *                 invoice_id:
 *                   type: integer
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error — missing or invalid fields
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.post("/bookings/assign", middlewares.asyncHandler(flightController.assignBooking));

export default router;
