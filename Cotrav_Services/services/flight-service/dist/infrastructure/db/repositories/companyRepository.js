"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanies = getCompanies;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
const connection_1 = __importDefault(require("../connection"));
async function getCompanies() {
    logger_1.default.debug({ layer: "repository", fn: "getCompanies" }, "Querying all companies");
    try {
        const [rows] = await connection_1.default.query("SELECT id, corporate_name FROM admins");
        logger_1.default.info({ layer: "repository", fn: "getCompanies", count: rows.length }, "Companies fetched successfully");
        return rows;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getCompanies", err }, "DB query failed for getCompanies");
        throw new errors_1.InfraError("Failed to fetch companies from database");
    }
}
//# sourceMappingURL=companyRepository.js.map