"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCities = getCities;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
const connection_1 = __importDefault(require("../connection"));
const CITIES_QUERY = `
  SELECT c.*, s.name AS state_name, ct.country_code, ct.country_name
  FROM cities c
  INNER JOIN states s ON c.state_id = s.id
  INNER JOIN countries ct ON s.country_id = ct.id
`;
async function getCities() {
    logger_1.default.debug({ layer: "repository", fn: "getCities" }, "Querying all cities");
    try {
        const [rows] = await connection_1.default.query(CITIES_QUERY);
        logger_1.default.info({ layer: "repository", fn: "getCities", count: rows.length }, "Cities fetched successfully");
        return rows;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getCities", err }, "DB query failed for getCities");
        throw new errors_1.InfraError("Failed to fetch cities from database");
    }
}
//# sourceMappingURL=cityRepository.js.map