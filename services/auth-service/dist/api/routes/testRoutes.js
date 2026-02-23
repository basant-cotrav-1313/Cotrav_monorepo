"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("@cotrav/logger"));
const router = (0, express_1.Router)();
router.get("/log-test", (req, res) => {
    logger_1.default.info("This is an INFO log from /log-test");
    logger_1.default.error({ reason: "Simulated failure", userId: 123 }, "This is an ERROR log from /log-test");
    res.json({ message: "Log test executed" });
});
exports.default = router;
//# sourceMappingURL=testRoutes.js.map