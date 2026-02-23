import { Router } from "express";
import logger from "@cotrav/logger";

const router = Router();

router.get("/log-test", (req, res) => {
  logger.info("This is an INFO log from /log-test");

  logger.error(
    { reason: "Simulated failure", userId: 123 },
    "This is an ERROR log from /log-test"
  );

  res.json({ message: "Log test executed" });
});

export default router;
