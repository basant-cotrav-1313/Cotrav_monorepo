import { InfraError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../connection";
import { FlightSegment, PassengerDetail } from "../../../domain/dtos/booking.dto";

// ─── Booking ──────────────────────────────────────────────────────────────────

export async function getFlightBookingById(bookingId: number): Promise<RowDataPacket | null> {
  logger.debug({ layer: "repository", fn: "getFlightBookingById", bookingId }, "Fetching booking");
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT b.*, a.flight_mgmt_fee, a.flight_mgmt_fee_international, a.flight_mgmt_fee_business,
              a.flight_mgmt_fee_web_checkin, a.billing_state_id, a.has_billing_spoc_auth_level,
              a.has_billing_admin_auth_level, a.notification_to_passengers,
              a.is_sms_sent, a.is_whatsapp_sent, ssi.sender_id AS sms_sender_id
       FROM flight_bookings b
       LEFT JOIN admins a ON b.admin_id = a.id
       LEFT JOIN sms_sender_ids ssi ON a.sms_sender_id = ssi.id
       WHERE b.id = ? LIMIT 1`,
      [bookingId]
    );
    const booking = rows[0] ?? null;
    logger.info({ layer: "repository", fn: "getFlightBookingById", bookingId, found: !!booking }, "Booking fetch done");
    return booking;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getFlightBookingById", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to fetch flight booking from database");
  }
}

export interface UpdateBookingData {
  seat_type: string;
  trip_type: string;
  universal_locator_code: string;
  flight_type: string;
  flight_name: string;
  flight_number: string;
  departure_datetime_taxivaxi: string;
  pnr_number: string;
  portal_used: string;
  departure_point_taxivaxi: string;
  no_of_stops: number;
  no_of_stops_return: number;
  fare_type: string;
  is_extra_baggage_included: string;
  extra_baggage: string;
  reservation_status: string;
  last_assigned_by: number;
  has_existing_invoice: boolean;
}

export async function updateFlightBooking(bookingId: number, data: UpdateBookingData): Promise<void> {
  logger.debug({ layer: "repository", fn: "updateFlightBooking", bookingId }, "Updating flight booking");

  const assignTimeField = data.has_existing_invoice ? "last_assign_time = NOW()" : "taxivaxi_assign_time = NOW()";

  try {
    await pool.query(
      `UPDATE flight_bookings SET
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
      WHERE id = ?`,
      [
        data.seat_type, data.trip_type, data.universal_locator_code, data.flight_type,
        data.flight_name, data.flight_number, data.departure_datetime_taxivaxi,
        data.pnr_number, data.portal_used, data.departure_point_taxivaxi,
        data.no_of_stops, data.no_of_stops_return,
        data.fare_type, data.is_extra_baggage_included, data.extra_baggage,
        data.last_assigned_by, data.last_assigned_by,
        data.reservation_status, bookingId,
      ]
    );
    logger.info({ layer: "repository", fn: "updateFlightBooking", bookingId }, "Flight booking updated");
  } catch (err) {
    logger.error({ layer: "repository", fn: "updateFlightBooking", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to update flight booking in database");
  }
}

// ─── Flight segments ──────────────────────────────────────────────────────────

export async function getFlightSegmentIds(bookingId: number): Promise<number[]> {
  logger.debug({ layer: "repository", fn: "getFlightSegmentIds", bookingId }, "Fetching segment IDs");
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM flight_booking_flights WHERE booking_id = ?",
      [bookingId]
    );
    return rows.map((r) => r.id as number);
  } catch (err) {
    logger.error({ layer: "repository", fn: "getFlightSegmentIds", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to fetch flight segment IDs from database");
  }
}

export async function deletePassengerDetails(flightBookingFlightId: number): Promise<void> {
  try {
    await pool.query(
      "DELETE FROM flight_passenger_details WHERE flight_booking_flight_id = ?",
      [flightBookingFlightId]
    );
  } catch (err) {
    logger.error({ layer: "repository", fn: "deletePassengerDetails", flightBookingFlightId, err }, "DB query failed");
    throw new InfraError("Failed to delete passenger details from database");
  }
}

export async function deleteFlightSegments(bookingId: number): Promise<void> {
  logger.debug({ layer: "repository", fn: "deleteFlightSegments", bookingId }, "Deleting old segments");
  try {
    await pool.query("DELETE FROM flight_booking_flights WHERE booking_id = ?", [bookingId]);
    logger.info({ layer: "repository", fn: "deleteFlightSegments", bookingId }, "Old segments deleted");
  } catch (err) {
    logger.error({ layer: "repository", fn: "deleteFlightSegments", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to delete flight segments from database");
  }
}

export async function insertFlightSegment(
  bookingId: number,
  segment: FlightSegment,
  isReturn: boolean
): Promise<number> {
  logger.debug({ layer: "repository", fn: "insertFlightSegment", bookingId, isReturn }, "Inserting segment");
  try {
    const isReturnVal = isReturn ? 1 : 0;
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO flight_booking_flights
        (booking_id, is_return, flight_name, flight_no, pnr_no,
         from_city, to_city, departure_datetime, arrival_datetime,
         seat_type, cabin_luggage, checked_in_luggage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingId, isReturnVal, segment.flight_name, segment.flight_no, segment.pnr_no,
        segment.from_city, segment.to_city,
        segment.departure_datetime, segment.arrival_datetime,
        segment.seat_type, segment.cabin_bg, segment.checked_bg,
      ]
    );
    logger.info({ layer: "repository", fn: "insertFlightSegment", insertId: result.insertId }, "Segment inserted");
    return result.insertId;
  } catch (err) {
    logger.error({ layer: "repository", fn: "insertFlightSegment", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to insert flight segment into database");
  }
}

export async function insertPassengerDetail(
  flightBookingFlightId: number,
  passenger: PassengerDetail,
  isReturn: boolean
): Promise<void> {
  try {
    if (isReturn) {
      await pool.query(
        `INSERT INTO flight_passenger_details
          (flight_booking_flight_id, ticket_no, people_id, meal_include, seat_no, is_return)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [flightBookingFlightId, passenger.ticket_no, passenger.people_id, passenger.meal_include, passenger.seat_no]
      );
    } else {
      await pool.query(
        `INSERT INTO flight_passenger_details
          (flight_booking_flight_id, ticket_no, people_id, meal_include, seat_no)
         VALUES (?, ?, ?, ?, ?)`,
        [flightBookingFlightId, passenger.ticket_no, passenger.people_id, passenger.meal_include, passenger.seat_no]
      );
    }
  } catch (err) {
    logger.error({ layer: "repository", fn: "insertPassengerDetail", flightBookingFlightId, err }, "DB query failed");
    throw new InfraError("Failed to insert passenger detail into database");
  }
}

// ─── Tracking ─────────────────────────────────────────────────────────────────

export async function insertTrackingStatus(bookingId: number, userId: number): Promise<void> {
  try {
    await pool.query(
      "INSERT INTO flight_booking_tracking_status (tracking_status, booking_id, user_id, status_date) VALUES ('', ?, ?, NOW())",
      [bookingId, userId]
    );
    logger.info({ layer: "repository", fn: "insertTrackingStatus", bookingId }, "Tracking status inserted");
  } catch (err) {
    logger.error({ layer: "repository", fn: "insertTrackingStatus", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to insert tracking status into database");
  }
}

// ─── Charges ─────────────────────────────────────────────────────────────────

export interface BookingCharges {
  date_change_charges: number;
  meal_charges: number;
  seat_charges: number;
  extra_baggage_charges: number;
  fast_forward_charges: number;
  vip_service_charges: number;
}

export async function upsertFlightCharges(bookingId: number, charges: BookingCharges): Promise<void> {
  logger.debug({ layer: "repository", fn: "upsertFlightCharges", bookingId }, "Upserting flight charges");
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM flight_charges_paid_by_taxivaxi WHERE booking_id = ?",
      [bookingId]
    );

    if (rows.length > 0) {
      await pool.query(
        `UPDATE flight_charges_paid_by_taxivaxi SET
          date_change_charges = ?, meal_charges = ?, seat_charges = ?,
          extra_baggage_charges = ?, fast_forward_charges = ?, vip_service_charges = ?,
          modified = NOW()
         WHERE booking_id = ?`,
        [
          charges.date_change_charges, charges.meal_charges, charges.seat_charges,
          charges.extra_baggage_charges, charges.fast_forward_charges, charges.vip_service_charges,
          bookingId,
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO flight_charges_paid_by_taxivaxi
          (booking_id, date_change_charges, meal_charges, seat_charges,
           extra_baggage_charges, fast_forward_charges, vip_service_charges)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          bookingId,
          charges.date_change_charges, charges.meal_charges, charges.seat_charges,
          charges.extra_baggage_charges, charges.fast_forward_charges, charges.vip_service_charges,
        ]
      );
    }
    logger.info({ layer: "repository", fn: "upsertFlightCharges", bookingId }, "Flight charges upserted");
  } catch (err) {
    logger.error({ layer: "repository", fn: "upsertFlightCharges", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to upsert flight charges in database");
  }
}

// ─── Invoice ──────────────────────────────────────────────────────────────────

export async function getInvoiceByBookingId(bookingId: number): Promise<RowDataPacket | null> {
  logger.debug({ layer: "repository", fn: "getInvoiceByBookingId", bookingId }, "Fetching invoice");
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM flight_invoice WHERE booking_id = ? LIMIT 1",
      [bookingId]
    );
    return rows[0] ?? null;
  } catch (err) {
    logger.error({ layer: "repository", fn: "getInvoiceByBookingId", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to fetch flight invoice from database");
  }
}

export interface InvoiceData {
  booking_id: number;
  total: number;
  taxivaxi_charge: number;
  taxivaxi_tax_rate: number;
  mgmt_fee_igst_rate: number;
  mgmt_fee_cgst_rate: number;
  mgmt_fee_sgst_rate: number;
  mgmt_fee_igst: number;
  mgmt_fee_cgst: number;
  mgmt_fee_sgst: number;
  taxivaxi_tax_charge: number;
  sub_total: number;
  created_by: number;
  paid_by_taxivaxi: number;
  tax_and_fees: number;
  total_ex_tax_fees: number;
  gst_k3: number;
  invoice_status: number;
  applied_markup: number;
  actual_markup: number;
  discount: number;
}

export async function createInvoice(data: InvoiceData): Promise<number> {
  logger.debug({ layer: "repository", fn: "createInvoice", bookingId: data.booking_id }, "Creating invoice");
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO flight_invoice
        (booking_id, total, taxivaxi_charge, taxivaxi_tax_rate,
         mgmt_fee_igst_rate, mgmt_fee_cgst_rate, mgmt_fee_sgst_rate,
         mgmt_fee_igst, mgmt_fee_cgst, mgmt_fee_sgst, taxivaxi_tax_charge,
         sub_total, created_by, paid_by_taxivaxi, tax_and_fees,
         total_ex_tax_fees, gst_k3, status, applied_markup, actual_markup, discount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.booking_id, data.total, data.taxivaxi_charge, data.taxivaxi_tax_rate,
        data.mgmt_fee_igst_rate, data.mgmt_fee_cgst_rate, data.mgmt_fee_sgst_rate,
        data.mgmt_fee_igst, data.mgmt_fee_cgst, data.mgmt_fee_sgst, data.taxivaxi_tax_charge,
        data.sub_total, data.created_by, data.paid_by_taxivaxi, data.tax_and_fees,
        data.total_ex_tax_fees, data.gst_k3, data.invoice_status,
        data.applied_markup, data.actual_markup, data.discount,
      ]
    );
    logger.info({ layer: "repository", fn: "createInvoice", insertId: result.insertId }, "Invoice created");
    return result.insertId;
  } catch (err) {
    logger.error({ layer: "repository", fn: "createInvoice", err }, "DB query failed");
    throw new InfraError("Failed to create flight invoice in database");
  }
}

export async function updateInvoice(
  invoiceId: number,
  data: Omit<InvoiceData, "booking_id" | "invoice_status">
): Promise<void> {
  logger.debug({ layer: "repository", fn: "updateInvoice", invoiceId }, "Updating invoice");
  try {
    await pool.query(
      `UPDATE flight_invoice SET
        total = ?, taxivaxi_charge = ?, taxivaxi_tax_rate = ?,
        mgmt_fee_igst_rate = ?, mgmt_fee_cgst_rate = ?, mgmt_fee_sgst_rate = ?,
        mgmt_fee_igst = ?, mgmt_fee_cgst = ?, mgmt_fee_sgst = ?,
        taxivaxi_tax_charge = ?, sub_total = ?, created_by = ?,
        paid_by_taxivaxi = ?, tax_and_fees = ?, total_ex_tax_fees = ?,
        gst_k3 = ?, applied_markup = ?, actual_markup = ?, discount = ?
       WHERE id = ?`,
      [
        data.total, data.taxivaxi_charge, data.taxivaxi_tax_rate,
        data.mgmt_fee_igst_rate, data.mgmt_fee_cgst_rate, data.mgmt_fee_sgst_rate,
        data.mgmt_fee_igst, data.mgmt_fee_cgst, data.mgmt_fee_sgst,
        data.taxivaxi_tax_charge, data.sub_total, data.created_by,
        data.paid_by_taxivaxi, data.tax_and_fees, data.total_ex_tax_fees,
        data.gst_k3, data.applied_markup, data.actual_markup, data.discount,
        invoiceId,
      ]
    );
    logger.info({ layer: "repository", fn: "updateInvoice", invoiceId }, "Invoice updated");
  } catch (err) {
    logger.error({ layer: "repository", fn: "updateInvoice", invoiceId, err }, "DB query failed");
    throw new InfraError("Failed to update flight invoice in database");
  }
}

export async function markBookingInvoiced(bookingId: number, invoiceId: number): Promise<void> {
  try {
    await pool.query(
      "UPDATE flight_bookings SET is_invoice = 1, invoice_id = ?, status = 'Invoice Created' WHERE id = ?",
      [invoiceId, bookingId]
    );
    logger.info({ layer: "repository", fn: "markBookingInvoiced", bookingId, invoiceId }, "Booking marked as invoiced");
  } catch (err) {
    logger.error({ layer: "repository", fn: "markBookingInvoiced", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to mark booking as invoiced in database");
  }
}

export async function insertInvoiceLog(
  bookingId: number,
  total: number,
  paidByTaxivaxi: number,
  createdBy: number
): Promise<void> {
  try {
    await pool.query(
      "INSERT INTO flight_invoice_log (booking_id, ticket_price, paid_by_taxivaxi, created_by) VALUES (?, ?, ?, ?)",
      [bookingId, total, paidByTaxivaxi, createdBy]
    );
  } catch (err) {
    logger.error({ layer: "repository", fn: "insertInvoiceLog", bookingId, err }, "DB query failed");
    throw new InfraError("Failed to insert invoice log into database");
  }
}