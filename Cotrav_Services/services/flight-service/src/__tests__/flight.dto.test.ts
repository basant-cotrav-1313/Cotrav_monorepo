import { AppError } from "@cotrav/errors";

jest.mock("../infrastructure/db/connection", () => ({ query: jest.fn() }));

import { FlightByIdRequest } from "../domain/dtos/flight.dto";

describe("FlightByIdRequest.validate", () => {
  beforeEach(() => jest.clearAllMocks());

  // ─── Valid inputs ─────────────────────────────────────────────────────────────

  it("returns DTO with correct id for valid positive integer string", () => {
    const dto = FlightByIdRequest.validate("5");
    expect(dto.id).toBe(5);
  });

  it("returns DTO for id = 1 (boundary)", () => {
    const dto = FlightByIdRequest.validate("1");
    expect(dto.id).toBe(1);
  });

  it("returns DTO for numeric input (number type)", () => {
    const dto = FlightByIdRequest.validate(10);
    expect(dto.id).toBe(10);
  });

  // ─── Invalid inputs → AppError 400 ───────────────────────────────────────────

  it("throws AppError 400 for non-numeric string", () => {
    let error: any;
    try { FlightByIdRequest.validate("abc"); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe("Invalid flight ID");
  });

  it("throws AppError 400 for zero", () => {
    let error: any;
    try { FlightByIdRequest.validate("0"); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
  });

  it("throws AppError 400 for negative number", () => {
    let error: any;
    try { FlightByIdRequest.validate("-5"); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
  });

  it("throws AppError 400 for float", () => {
    let error: any;
    try { FlightByIdRequest.validate("1.5"); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
  });

  it("throws AppError 400 for null", () => {
    let error: any;
    try { FlightByIdRequest.validate(null); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
  });

  it("throws AppError 400 for undefined", () => {
    let error: any;
    try { FlightByIdRequest.validate(undefined); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
  });

  it("throws AppError 400 for empty string", () => {
    let error: any;
    try { FlightByIdRequest.validate(""); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
  });

});
