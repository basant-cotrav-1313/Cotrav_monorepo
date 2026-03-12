import { Router } from "express";
import * as middlewares from "@cotrav/middlewares";
import * as cityController from "../controllers/cityController";

const router = Router();

/**
 * @openapi
 * /getAllCities:
 *   post:
 *     summary: Get all hotel cities
 *     description: Returns a list of all cities available for hotel search.
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: List of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.post("/", middlewares.asyncHandler(cityController.getCities));

export default router;
