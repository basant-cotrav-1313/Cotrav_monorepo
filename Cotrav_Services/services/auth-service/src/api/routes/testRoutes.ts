import { Router } from "express";
import logger from "@cotrav/logger";

const router = Router();

/**
 * @openapi
 * /test/log-test:
 *   get:
 *     summary: Emit sample logs for diagnostics
 *     description: Writes info and error logs using the shared logger package and returns a simple success payload.
 *     tags:
 *       - Diagnostics
 *     responses:
 *       200:
 *         description: Log test executed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Log test executed
 */
router.get("/log-test", (req, res) => {
  logger.info("This is an INFO log from /log-test");

  logger.error(
    { reason: "Simulated failure", userId: 123 },
    "This is an ERROR log from /log-test"
  );

  res.json({ message: "Log test executed" });
});

export default router;
