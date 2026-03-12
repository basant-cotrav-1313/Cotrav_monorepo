import { Router } from "express";
import * as middlewares from "@cotrav/middlewares";
import * as airportController from "../controllers/airportController";

const router = Router();

router.get("/", middlewares.asyncHandler(airportController.getAirports));

export default router;
