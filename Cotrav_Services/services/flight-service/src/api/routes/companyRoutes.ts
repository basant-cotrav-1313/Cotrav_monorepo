import { Router } from "express";
import * as middlewares from "@cotrav/middlewares";
import * as companyController from "../controllers/companyController";

const router = Router();

/**
 * @openapi
 * /companies:
 *   get:
 *     summary: Get all companies
 *     description: Returns a list of all registered corporate companies.
 *     tags:
 *       - Companies
 *     responses:
 *       200:
 *         description: List of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   corporate_name:
 *                     type: string
 *                     example: "Acme Corp"
 *       500:
 *         description: Internal server error
 */
router.get("/", middlewares.asyncHandler(companyController.getCompanies));

export default router;
