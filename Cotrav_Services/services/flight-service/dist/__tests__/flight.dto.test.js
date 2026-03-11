"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@cotrav/errors");
jest.mock("../infrastructure/db/connection", () => ({ query: jest.fn() }));
const flight_dto_1 = require("../domain/dtos/flight.dto");
describe("FlightByIdRequest.validate", () => {
    beforeEach(() => jest.clearAllMocks());
    // ─── Valid inputs ─────────────────────────────────────────────────────────────
    it("returns DTO with correct id for valid positive integer string", () => {
        const dto = flight_dto_1.FlightByIdRequest.validate("5");
        expect(dto.id).toBe(5);
    });
    it("returns DTO for id = 1 (boundary)", () => {
        const dto = flight_dto_1.FlightByIdRequest.validate("1");
        expect(dto.id).toBe(1);
    });
    it("returns DTO for numeric input (number type)", () => {
        const dto = flight_dto_1.FlightByIdRequest.validate(10);
        expect(dto.id).toBe(10);
    });
    // ─── Invalid inputs → AppError 400 ───────────────────────────────────────────
    it("throws AppError 400 for non-numeric string", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate("abc");
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("Invalid flight ID");
    });
    it("throws AppError 400 for zero", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate("0");
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
    });
    it("throws AppError 400 for negative number", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate("-5");
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
    });
    it("throws AppError 400 for float", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate("1.5");
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
    });
    it("throws AppError 400 for null", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate(null);
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
    });
    it("throws AppError 400 for undefined", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate(undefined);
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
    });
    it("throws AppError 400 for empty string", () => {
        let error;
        try {
            flight_dto_1.FlightByIdRequest.validate("");
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(errors_1.AppError);
        expect(error.statusCode).toBe(400);
    });
});
//# sourceMappingURL=flight.dto.test.js.map