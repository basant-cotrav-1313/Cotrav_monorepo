"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignBookingRequest = void 0;
const errors_1 = require("@cotrav/errors");
// ─── Request DTO ─────────────────────────────────────────────────────────────
class AssignBookingRequest {
    constructor(booking_id, trip_type, flight_type, fare_type, is_extra_baggage_included, extra_baggage, total_ex_tax_fees, tax_and_fees, gst_k3, no_of_stops, no_of_seats, universal_locator_code, discount, date_change_charges, seat_charges, meal_charges, extra_baggage_charges, fast_forward_charges, vip_service_charges, applied_markup, actual_markup, portal_used, no_of_stops_return, fare_type_return, is_extra_baggage_included_return, extra_baggage_return, portal_used_return, universal_locator_code_return, flight_details, return_flight_details) {
        this.booking_id = booking_id;
        this.trip_type = trip_type;
        this.flight_type = flight_type;
        this.fare_type = fare_type;
        this.is_extra_baggage_included = is_extra_baggage_included;
        this.extra_baggage = extra_baggage;
        this.total_ex_tax_fees = total_ex_tax_fees;
        this.tax_and_fees = tax_and_fees;
        this.gst_k3 = gst_k3;
        this.no_of_stops = no_of_stops;
        this.no_of_seats = no_of_seats;
        this.universal_locator_code = universal_locator_code;
        this.discount = discount;
        this.date_change_charges = date_change_charges;
        this.seat_charges = seat_charges;
        this.meal_charges = meal_charges;
        this.extra_baggage_charges = extra_baggage_charges;
        this.fast_forward_charges = fast_forward_charges;
        this.vip_service_charges = vip_service_charges;
        this.applied_markup = applied_markup;
        this.actual_markup = actual_markup;
        this.portal_used = portal_used;
        this.no_of_stops_return = no_of_stops_return;
        this.fare_type_return = fare_type_return;
        this.is_extra_baggage_included_return = is_extra_baggage_included_return;
        this.extra_baggage_return = extra_baggage_return;
        this.portal_used_return = portal_used_return;
        this.universal_locator_code_return = universal_locator_code_return;
        this.flight_details = flight_details;
        this.return_flight_details = return_flight_details;
    }
    static validate(raw) {
        if (!raw || typeof raw !== "object") {
            throw new errors_1.AppError("Invalid request body", "APP_ERROR", 400);
        }
        const r = raw;
        const required = [
            "trip_type", "flight_type", "fare_type", "is_extra_baggage_included",
            "extra_baggage", "booking_id", "total_ex_tax_fees", "tax_and_fees",
            "gst_k3", "no_of_stops", "no_of_seats", "universallocatorCode",
            "discount", "date_change_charges", "seat_charges", "meal_charges",
            "extra_baggage_charges", "fast_forward_charges", "vip_service_charges",
            "applied_markup", "actual_markup", "flight_details", "portal_used",
        ];
        for (const field of required) {
            if (r[field] === undefined || r[field] === null) {
                throw new errors_1.AppError(`Missing required field: ${field}`, "APP_ERROR", 400);
            }
        }
        const booking_id = Number(r["booking_id"]);
        if (!Number.isInteger(booking_id) || booking_id <= 0) {
            throw new errors_1.AppError("booking_id must be a positive integer", "APP_ERROR", 400);
        }
        if (!Array.isArray(r["flight_details"]) || r["flight_details"].length === 0) {
            throw new errors_1.AppError("flight_details must be a non-empty array", "APP_ERROR", 400);
        }
        const flight_details = AssignBookingRequest.parseSegments(r["flight_details"]);
        const return_flight_details = Array.isArray(r["return_flight_details"])
            ? AssignBookingRequest.parseSegments(r["return_flight_details"])
            : [];
        return new AssignBookingRequest(booking_id, String(r["trip_type"]), String(r["flight_type"]), String(r["fare_type"]), String(r["is_extra_baggage_included"]), String(r["extra_baggage"]), parseFloat(String(r["total_ex_tax_fees"])) || 0, parseFloat(String(r["tax_and_fees"])) || 0, parseFloat(String(r["gst_k3"])) || 0, Number(r["no_of_stops"]) || 0, Number(r["no_of_seats"]), String(r["universallocatorCode"] ?? ""), parseFloat(String(r["discount"])) || 0, parseFloat(String(r["date_change_charges"])) || 0, parseFloat(String(r["seat_charges"])) || 0, parseFloat(String(r["meal_charges"])) || 0, parseFloat(String(r["extra_baggage_charges"])) || 0, parseFloat(String(r["fast_forward_charges"])) || 0, parseFloat(String(r["vip_service_charges"])) || 0, parseFloat(String(r["applied_markup"])) || 0, parseFloat(String(r["actual_markup"])) || 0, String(r["portal_used"] ?? ""), Number(r["no_of_stops_return"] ?? 0), String(r["fare_type_return"] ?? ""), String(r["is_extra_baggage_included_return"] ?? ""), String(r["extra_baggage_return"] ?? ""), String(r["portal_used_return"] ?? ""), String(r["universallocatorCode_return"] ?? ""), flight_details, return_flight_details);
    }
    static parseSegments(raw) {
        return raw.map((item, idx) => {
            if (!item || typeof item !== "object") {
                throw new errors_1.AppError(`flight_details[${idx}] must be an object`, "APP_ERROR", 400);
            }
            const s = item;
            const segRequired = ["from_city", "to_city", "departure_datetime", "arrival_datetime", "flight_name", "flight_no", "pnr_no", "seat_type"];
            for (const field of segRequired) {
                if (!s[field]) {
                    throw new errors_1.AppError(`flight_details[${idx}].${field} is required`, "APP_ERROR", 400);
                }
            }
            if (!Array.isArray(s["passenger_details"]) || s["passenger_details"].length === 0) {
                throw new errors_1.AppError(`flight_details[${idx}].passenger_details must be a non-empty array`, "APP_ERROR", 400);
            }
            const passengers = s["passenger_details"].map((p, pIdx) => {
                if (!p || typeof p !== "object") {
                    throw new errors_1.AppError(`passenger_details[${pIdx}] must be an object`, "APP_ERROR", 400);
                }
                const pd = p;
                return {
                    people_id: String(pd["people_id"] ?? ""),
                    seat_no: String(pd["seat_no"] ?? ""),
                    ticket_no: String(pd["ticket_no"] ?? ""),
                    meal_include: String(pd["meal_include"] ?? ""),
                };
            });
            return {
                from_city: String(s["from_city"] ?? ""),
                to_city: String(s["to_city"] ?? ""),
                departure_datetime: String(s["departure_datetime"] ?? ""),
                arrival_datetime: String(s["arrival_datetime"] ?? ""),
                flight_name: String(s["flight_name"] ?? ""),
                flight_no: String(s["flight_no"] ?? ""),
                pnr_no: String(s["pnr_no"] ?? ""),
                seat_type: String(s["seat_type"] ?? ""),
                checked_bg: String(s["checked_bg"] ?? ""),
                cabin_bg: String(s["cabin_bg"] ?? ""),
                via: String(s["via"] ?? ""),
                passengers,
            };
        });
    }
}
exports.AssignBookingRequest = AssignBookingRequest;
//# sourceMappingURL=booking.dto.js.map