"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightBookingById = getFlightBookingById;
exports.updateFlightBooking = updateFlightBooking;
exports.getFlightSegmentIds = getFlightSegmentIds;
exports.deletePassengerDetails = deletePassengerDetails;
exports.deleteFlightSegments = deleteFlightSegments;
exports.insertFlightSegment = insertFlightSegment;
exports.insertPassengerDetail = insertPassengerDetail;
exports.insertTrackingStatus = insertTrackingStatus;
exports.upsertFlightCharges = upsertFlightCharges;
exports.getInvoiceByBookingId = getInvoiceByBookingId;
exports.createInvoice = createInvoice;
exports.updateInvoice = updateInvoice;
exports.markBookingInvoiced = markBookingInvoiced;
exports.insertInvoiceLog = insertInvoiceLog;
const errors_1 = require("@cotrav/errors");
const logger_1 = __importDefault(require("@cotrav/logger"));
const connection_1 = __importDefault(require("../connection"));
// ─── Booking ──────────────────────────────────────────────────────────────────
async function getFlightBookingById(bookingId) {
    logger_1.default.debug({ layer: "repository", fn: "getFlightBookingById", bookingId }, "Fetching booking");
    try {
        const [rows] = await connection_1.default.query(`SELECT b.*, a.flight_mgmt_fee, a.flight_mgmt_fee_international, a.flight_mgmt_fee_business,
              a.flight_mgmt_fee_web_checkin, a.billing_state_id, a.has_billing_spoc_auth_level,
              a.has_billing_admin_auth_level, a.notification_to_passengers,
              a.is_sms_sent, a.is_whatsapp_sent, ssi.sender_id AS sms_sender_id
       FROM flight_bookings b
       LEFT JOIN admins a ON b.admin_id = a.id
       LEFT JOIN sms_sender_ids ssi ON a.sms_sender_id = ssi.id
       WHERE b.id = ? LIMIT 1`, [bookingId]);
        const booking = rows[0] ?? null;
        logger_1.default.info({ layer: "repository", fn: "getFlightBookingById", bookingId, found: !!booking }, "Booking fetch done");
        return booking;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getFlightBookingById", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to fetch flight booking from database");
    }
}
async function updateFlightBooking(bookingId, data) {
    logger_1.default.debug({ layer: "repository", fn: "updateFlightBooking", bookingId }, "Updating flight booking");
    const assignTimeField = data.has_existing_invoice ? "last_assign_time = NOW()" : "taxivaxi_assign_time = NOW()";
    try {
        await connection_1.default.query(`UPDATE flight_bookings SET
        seat_type = ?, trip_type = ?, universal_locator_code = ?, flight_type = ?,
        flight_name = ?, flight_number = ?, departure_datetime_taxivaxi = ?,
        pnr_number = ?, portal_used = ?, departure_point_taxivaxi = ?,
        no_of_stops = ?, no_of_stops_return = ?,
        is_assign = 1, status_auth_taxivaxi = 3, status_approver = 1,
        status = 'Assigned', ${assignTimeField},
        vendor_bill_no = 'NA', terms_and_conditions = '', fare_type = ?,
        is_extra_baggage_included = ?, extra_baggage = ?,
        fare_screenshot = '', mmt_fare = 0, client_fare = 0,
        last_tracking_status = '', last_assigned_by = ?, booked_by = ?,
        uapi_reservation_status = ?, is_self_booking = 1
      WHERE id = ?`, [
            data.seat_type, data.trip_type, data.universal_locator_code, data.flight_type,
            data.flight_name, data.flight_number, data.departure_datetime_taxivaxi,
            data.pnr_number, data.portal_used, data.departure_point_taxivaxi,
            data.no_of_stops, data.no_of_stops_return,
            data.fare_type, data.is_extra_baggage_included, data.extra_baggage,
            data.last_assigned_by, data.last_assigned_by,
            data.reservation_status, bookingId,
        ]);
        logger_1.default.info({ layer: "repository", fn: "updateFlightBooking", bookingId }, "Flight booking updated");
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "updateFlightBooking", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to update flight booking in database");
    }
}
// ─── Flight segments ──────────────────────────────────────────────────────────
async function getFlightSegmentIds(bookingId) {
    logger_1.default.debug({ layer: "repository", fn: "getFlightSegmentIds", bookingId }, "Fetching segment IDs");
    try {
        const [rows] = await connection_1.default.query("SELECT id FROM flight_booking_flights WHERE booking_id = ?", [bookingId]);
        return rows.map((r) => r.id);
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getFlightSegmentIds", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to fetch flight segment IDs from database");
    }
}
async function deletePassengerDetails(flightBookingFlightId) {
    try {
        await connection_1.default.query("DELETE FROM flight_passenger_details WHERE flight_booking_flight_id = ?", [flightBookingFlightId]);
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "deletePassengerDetails", flightBookingFlightId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to delete passenger details from database");
    }
}
async function deleteFlightSegments(bookingId) {
    logger_1.default.debug({ layer: "repository", fn: "deleteFlightSegments", bookingId }, "Deleting old segments");
    try {
        await connection_1.default.query("DELETE FROM flight_booking_flights WHERE booking_id = ?", [bookingId]);
        logger_1.default.info({ layer: "repository", fn: "deleteFlightSegments", bookingId }, "Old segments deleted");
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "deleteFlightSegments", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to delete flight segments from database");
    }
}
async function insertFlightSegment(bookingId, segment, isReturn) {
    logger_1.default.debug({ layer: "repository", fn: "insertFlightSegment", bookingId, isReturn }, "Inserting segment");
    try {
        const isReturnVal = isReturn ? 1 : 0;
        const [result] = await connection_1.default.query(`INSERT INTO flight_booking_flights
        (booking_id, is_return, flight_name, flight_no, pnr_no,
         from_city, to_city, departure_datetime, arrival_datetime,
         seat_type, cabin_luggage, checked_in_luggage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            bookingId, isReturnVal, segment.flight_name, segment.flight_no, segment.pnr_no,
            segment.from_city, segment.to_city,
            segment.departure_datetime, segment.arrival_datetime,
            segment.seat_type, segment.cabin_bg, segment.checked_bg,
        ]);
        logger_1.default.info({ layer: "repository", fn: "insertFlightSegment", insertId: result.insertId }, "Segment inserted");
        return result.insertId;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "insertFlightSegment", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to insert flight segment into database");
    }
}
async function insertPassengerDetail(flightBookingFlightId, passenger, isReturn) {
    try {
        if (isReturn) {
            await connection_1.default.query(`INSERT INTO flight_passenger_details
          (flight_booking_flight_id, ticket_no, people_id, meal_include, seat_no, is_return)
         VALUES (?, ?, ?, ?, ?, 1)`, [flightBookingFlightId, passenger.ticket_no, passenger.people_id, passenger.meal_include, passenger.seat_no]);
        }
        else {
            await connection_1.default.query(`INSERT INTO flight_passenger_details
          (flight_booking_flight_id, ticket_no, people_id, meal_include, seat_no)
         VALUES (?, ?, ?, ?, ?)`, [flightBookingFlightId, passenger.ticket_no, passenger.people_id, passenger.meal_include, passenger.seat_no]);
        }
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "insertPassengerDetail", flightBookingFlightId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to insert passenger detail into database");
    }
}
// ─── Tracking ─────────────────────────────────────────────────────────────────
async function insertTrackingStatus(bookingId, userId) {
    try {
        await connection_1.default.query("INSERT INTO flight_booking_tracking_status (tracking_status, booking_id, user_id, status_date) VALUES ('', ?, ?, NOW())", [bookingId, userId]);
        logger_1.default.info({ layer: "repository", fn: "insertTrackingStatus", bookingId }, "Tracking status inserted");
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "insertTrackingStatus", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to insert tracking status into database");
    }
}
async function upsertFlightCharges(bookingId, charges) {
    logger_1.default.debug({ layer: "repository", fn: "upsertFlightCharges", bookingId }, "Upserting flight charges");
    try {
        const [rows] = await connection_1.default.query("SELECT id FROM flight_charges_paid_by_taxivaxi WHERE booking_id = ?", [bookingId]);
        if (rows.length > 0) {
            await connection_1.default.query(`UPDATE flight_charges_paid_by_taxivaxi SET
          date_change_charges = ?, meal_charges = ?, seat_charges = ?,
          extra_baggage_charges = ?, fast_forward_charges = ?, vip_service_charges = ?,
          modified = NOW()
         WHERE booking_id = ?`, [
                charges.date_change_charges, charges.meal_charges, charges.seat_charges,
                charges.extra_baggage_charges, charges.fast_forward_charges, charges.vip_service_charges,
                bookingId,
            ]);
        }
        else {
            await connection_1.default.query(`INSERT INTO flight_charges_paid_by_taxivaxi
          (booking_id, date_change_charges, meal_charges, seat_charges,
           extra_baggage_charges, fast_forward_charges, vip_service_charges)
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                bookingId,
                charges.date_change_charges, charges.meal_charges, charges.seat_charges,
                charges.extra_baggage_charges, charges.fast_forward_charges, charges.vip_service_charges,
            ]);
        }
        logger_1.default.info({ layer: "repository", fn: "upsertFlightCharges", bookingId }, "Flight charges upserted");
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "upsertFlightCharges", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to upsert flight charges in database");
    }
}
// ─── Invoice ──────────────────────────────────────────────────────────────────
async function getInvoiceByBookingId(bookingId) {
    logger_1.default.debug({ layer: "repository", fn: "getInvoiceByBookingId", bookingId }, "Fetching invoice");
    try {
        const [rows] = await connection_1.default.query("SELECT id FROM flight_invoice WHERE booking_id = ? LIMIT 1", [bookingId]);
        return rows[0] ?? null;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "getInvoiceByBookingId", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to fetch flight invoice from database");
    }
}
async function createInvoice(data) {
    logger_1.default.debug({ layer: "repository", fn: "createInvoice", bookingId: data.booking_id }, "Creating invoice");
    try {
        const [result] = await connection_1.default.query(`INSERT INTO flight_invoice
        (booking_id, total, taxivaxi_charge, taxivaxi_tax_rate,
         mgmt_fee_igst_rate, mgmt_fee_cgst_rate, mgmt_fee_sgst_rate,
         mgmt_fee_igst, mgmt_fee_cgst, mgmt_fee_sgst, taxivaxi_tax_charge,
         sub_total, created_by, paid_by_taxivaxi, tax_and_fees,
         total_ex_tax_fees, gst_k3, status, applied_markup, actual_markup, discount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            data.booking_id, data.total, data.taxivaxi_charge, data.taxivaxi_tax_rate,
            data.mgmt_fee_igst_rate, data.mgmt_fee_cgst_rate, data.mgmt_fee_sgst_rate,
            data.mgmt_fee_igst, data.mgmt_fee_cgst, data.mgmt_fee_sgst, data.taxivaxi_tax_charge,
            data.sub_total, data.created_by, data.paid_by_taxivaxi, data.tax_and_fees,
            data.total_ex_tax_fees, data.gst_k3, data.invoice_status,
            data.applied_markup, data.actual_markup, data.discount,
        ]);
        logger_1.default.info({ layer: "repository", fn: "createInvoice", insertId: result.insertId }, "Invoice created");
        return result.insertId;
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "createInvoice", err }, "DB query failed");
        throw new errors_1.InfraError("Failed to create flight invoice in database");
    }
}
async function updateInvoice(invoiceId, data) {
    logger_1.default.debug({ layer: "repository", fn: "updateInvoice", invoiceId }, "Updating invoice");
    try {
        await connection_1.default.query(`UPDATE flight_invoice SET
        total = ?, taxivaxi_charge = ?, taxivaxi_tax_rate = ?,
        mgmt_fee_igst_rate = ?, mgmt_fee_cgst_rate = ?, mgmt_fee_sgst_rate = ?,
        mgmt_fee_igst = ?, mgmt_fee_cgst = ?, mgmt_fee_sgst = ?,
        taxivaxi_tax_charge = ?, sub_total = ?, created_by = ?,
        paid_by_taxivaxi = ?, tax_and_fees = ?, total_ex_tax_fees = ?,
        gst_k3 = ?, applied_markup = ?, actual_markup = ?, discount = ?
       WHERE id = ?`, [
            data.total, data.taxivaxi_charge, data.taxivaxi_tax_rate,
            data.mgmt_fee_igst_rate, data.mgmt_fee_cgst_rate, data.mgmt_fee_sgst_rate,
            data.mgmt_fee_igst, data.mgmt_fee_cgst, data.mgmt_fee_sgst,
            data.taxivaxi_tax_charge, data.sub_total, data.created_by,
            data.paid_by_taxivaxi, data.tax_and_fees, data.total_ex_tax_fees,
            data.gst_k3, data.applied_markup, data.actual_markup, data.discount,
            invoiceId,
        ]);
        logger_1.default.info({ layer: "repository", fn: "updateInvoice", invoiceId }, "Invoice updated");
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "updateInvoice", invoiceId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to update flight invoice in database");
    }
}
async function markBookingInvoiced(bookingId, invoiceId) {
    try {
        await connection_1.default.query("UPDATE flight_bookings SET is_invoice = 1, invoice_id = ?, status = 'Invoice Created' WHERE id = ?", [invoiceId, bookingId]);
        logger_1.default.info({ layer: "repository", fn: "markBookingInvoiced", bookingId, invoiceId }, "Booking marked as invoiced");
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "markBookingInvoiced", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to mark booking as invoiced in database");
    }
}
async function insertInvoiceLog(bookingId, total, paidByTaxivaxi, createdBy) {
    try {
        await connection_1.default.query("INSERT INTO flight_invoice_log (booking_id, ticket_price, paid_by_taxivaxi, created_by) VALUES (?, ?, ?, ?)", [bookingId, total, paidByTaxivaxi, createdBy]);
    }
    catch (err) {
        logger_1.default.error({ layer: "repository", fn: "insertInvoiceLog", bookingId, err }, "DB query failed");
        throw new errors_1.InfraError("Failed to insert invoice log into database");
    }
}
//# sourceMappingURL=bookingRepository.js.map