"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationId = correlationId;
function correlationId(req, res, next) {
    const id = req.headers["x-correlation-id"] ||
        crypto.randomUUID();
    req.correlationId = id;
    res.setHeader("x-correlation-id", id);
    next();
}
