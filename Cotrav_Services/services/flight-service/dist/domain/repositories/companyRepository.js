"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanies = getCompanies;
const connection_1 = __importDefault(require("../../infrastructure/db/connection"));
async function getCompanies() {
    const [rows] = await connection_1.default.query("SELECT id, corporate_name FROM admins");
    return rows;
}
//# sourceMappingURL=companyRepository.js.map