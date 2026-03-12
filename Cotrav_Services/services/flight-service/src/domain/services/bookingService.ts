import { AppError } from "@cotrav/errors";
import logger from "@cotrav/logger";
import * as bookingRepository from "../../infrastructure/db/repositories/bookingRepository";
import { AssignBookingRequest, AssignBookingResponse, FlightSegment } from "../dtos/booking.dto";

// ─── Constants ────────────────────────────────────────────────────────────────

const TAX_RATE = 18;
const IGST_RATE = 18;
const CGST_RATE = 9;
const SGST_RATE = 9;
const MAHARASHTRA_STATE_ID = 35; // billing_state_id for CGST/SGST split

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeTotal(dto: AssignBookingRequest): number {
  return (
    dto.total_ex_tax_fees +
    dto.tax_and_fees +
    dto.gst_k3 +
    dto.date_change_charges +
    dto.seat_charges +
    dto.meal_charges +
    dto.extra_baggage_charges +
    dto.fast_forward_charges +
    dto.vip_service_charges +
    dto.applied_markup
  );
}

function computeMgmtFee(
  booking: Record<string, unknown>,
  dto: AssignBookingRequest,
  total: number
): number {
  let fee = Number(booking["flight_mgmt_fee"] ?? 0);

  if (dto.flight_type !== "Domestic") {
    const intlFeePercent = Number(booking["flight_mgmt_fee_international"] ?? 0);
    const adminId = Number(booking["admin_id"]);
    if (adminId === 1) {
      fee = ((total / dto.no_of_seats) * intlFeePercent) / 100;
    } else {
      fee = intlFeePercent;
    }
  }

  const baseFee = Number(booking["flight_mgmt_fee"] ?? 0);
  if (fee < baseFee) fee = baseFee;

  const seatType = dto.flight_details[0]?.seat_type ?? "";
  if (seatType === "Business") {
    fee = Number(booking["flight_mgmt_fee_business"] ?? fee);
  }

  if (String(booking["usage_type"]) === "Web Checkin") {
    fee = Number(booking["flight_mgmt_fee_web_checkin"] ?? fee);
  }

  if (dto.trip_type === "Round Trip") fee *= 2;

  return Math.round(fee * dto.no_of_seats * 100) / 100;
}

function computeInvoiceTax(
  flightMgmtFee: number,
  billingStateId: number
): {
  igstRate: number;
  cgstRate: number;
  sgstRate: number;
  igst: number;
  cgst: number;
  sgst: number;
  taxCharge: number;
} {
  if (billingStateId !== MAHARASHTRA_STATE_ID) {
    const igst = (flightMgmtFee * IGST_RATE) / 100;
    return { igstRate: IGST_RATE, cgstRate: 0, sgstRate: 0, igst, cgst: 0, sgst: 0, taxCharge: igst };
  }

  const cgst = (flightMgmtFee * CGST_RATE) / 100;
  const sgst = (flightMgmtFee * SGST_RATE) / 100;
  return { igstRate: 0, cgstRate: CGST_RATE, sgstRate: SGST_RATE, igst: 0, cgst, sgst, taxCharge: cgst + sgst };
}

async function processSegments(
  bookingId: number,
  segments: FlightSegment[],
  isReturn: boolean
): Promise<void> {
  for (const segment of segments) {
    // City labels come pre-resolved in the request body (from_city, to_city)
    const segmentId = await bookingRepository.insertFlightSegment(bookingId, segment, isReturn);

    for (const passenger of segment.passengers) {
      await bookingRepository.insertPassengerDetail(segmentId, passenger, isReturn);
    }
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function assignFlightBooking(
  rawBody: unknown,
  authId: number
): Promise<AssignBookingResponse> {
  logger.info({ layer: "service", fn: "assignFlightBooking" }, "Assigning flight booking");

  const dto = AssignBookingRequest.validate(rawBody);

  // 1. Verify booking exists
  const booking = await bookingRepository.getFlightBookingById(dto.booking_id);
  if (!booking) {
    throw new AppError("Booking not found", "APP_ERROR", 404);
  }

  const existingInvoice = await bookingRepository.getInvoiceByBookingId(dto.booking_id);

  // 2. Update flight_bookings
  const firstSegment = dto.flight_details[0];
  await bookingRepository.updateFlightBooking(dto.booking_id, {
    seat_type: firstSegment?.seat_type ?? "",
    trip_type: dto.trip_type,
    universal_locator_code: dto.universal_locator_code,
    flight_type: dto.flight_type,
    flight_name: firstSegment?.flight_name ?? "",
    flight_number: firstSegment?.flight_no ?? "",
    departure_datetime_taxivaxi: firstSegment?.departure_datetime ?? "",
    pnr_number: firstSegment?.pnr_no ?? "",
    portal_used: dto.portal_used,
    departure_point_taxivaxi: firstSegment?.from_city ?? "",
    no_of_stops: dto.no_of_stops,
    no_of_stops_return: dto.no_of_stops_return,
    fare_type: dto.fare_type,
    is_extra_baggage_included: dto.is_extra_baggage_included,
    extra_baggage: dto.extra_baggage,
    reservation_status: "",
    last_assigned_by: authId,
    has_existing_invoice: !!existingInvoice,
  });

  // 3. Remove old segments and re-insert
  const oldSegmentIds = await bookingRepository.getFlightSegmentIds(dto.booking_id);
  for (const id of oldSegmentIds) {
    await bookingRepository.deletePassengerDetails(id);
  }
  await bookingRepository.deleteFlightSegments(dto.booking_id);

  await processSegments(dto.booking_id, dto.flight_details, false);
  if (dto.trip_type === "Round Trip") {
    await processSegments(dto.booking_id, dto.return_flight_details, true);
  }

  // 4. Tracking status
  await bookingRepository.insertTrackingStatus(dto.booking_id, authId);

  // 5. Flight charges
  await bookingRepository.upsertFlightCharges(dto.booking_id, {
    date_change_charges: dto.date_change_charges,
    meal_charges: dto.meal_charges,
    seat_charges: dto.seat_charges,
    extra_baggage_charges: dto.extra_baggage_charges,
    fast_forward_charges: dto.fast_forward_charges,
    vip_service_charges: dto.vip_service_charges,
  });

  // 6. Compute invoice figures
  const total = computeTotal(dto);
  const paidByTaxivaxi = total - dto.applied_markup - dto.discount;
  const flightMgmtFee = computeMgmtFee(booking, dto, total);
  const billingStateId = Number(booking["billing_state_id"] ?? 0);
  const { igstRate, cgstRate, sgstRate, igst, cgst, sgst, taxCharge } =
    computeInvoiceTax(flightMgmtFee, billingStateId);
  const subTotal = total + flightMgmtFee + taxCharge;

  const invoicePayload = {
    booking_id: dto.booking_id,
    total,
    taxivaxi_charge: flightMgmtFee,
    taxivaxi_tax_rate: TAX_RATE,
    mgmt_fee_igst_rate: igstRate,
    mgmt_fee_cgst_rate: cgstRate,
    mgmt_fee_sgst_rate: sgstRate,
    mgmt_fee_igst: igst,
    mgmt_fee_cgst: cgst,
    mgmt_fee_sgst: sgst,
    taxivaxi_tax_charge: taxCharge,
    sub_total: subTotal,
    created_by: authId,
    paid_by_taxivaxi: paidByTaxivaxi,
    tax_and_fees: dto.tax_and_fees,
    total_ex_tax_fees: dto.total_ex_tax_fees,
    gst_k3: dto.gst_k3,
    invoice_status: 1,
    applied_markup: dto.applied_markup,
    actual_markup: dto.actual_markup,
    discount: dto.discount,
  };

  // 7. Create or update invoice
  let invoiceId: number;
  if (!existingInvoice) {
    invoiceId = await bookingRepository.createInvoice(invoicePayload);
  } else {
    invoiceId = existingInvoice.id as number;
    const { invoice_status: _s, booking_id: _b, ...updateData } = invoicePayload;
    await bookingRepository.updateInvoice(invoiceId, updateData);
  }

  await bookingRepository.markBookingInvoiced(dto.booking_id, invoiceId);
  await bookingRepository.insertInvoiceLog(dto.booking_id, total, paidByTaxivaxi, authId);

  logger.info(
    { layer: "service", fn: "assignFlightBooking", bookingId: dto.booking_id, invoiceId },
    "Flight booking assigned successfully"
  );

  return {
    success: true,
    booking_id: dto.booking_id,
    invoice_id: invoiceId,
    message: "Flight booking assigned successfully",
  };
}
