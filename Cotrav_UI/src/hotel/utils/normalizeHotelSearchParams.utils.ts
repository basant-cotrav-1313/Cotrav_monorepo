
// import * as hotelTypes from '@/hotel/types/hotel'

// export function normalizeHotelSearchParams(
//   raw: hotelTypes.ExternalHotelSearchPayload
// ): hotelTypes.HotelSearchParams {
//   return {
//     /* ------------------ Dates ------------------ */
//     checkIn: raw.checkIn || raw.checkindate || '',
//     checkOut: raw.checkOut || raw.checkoutdate || '',

//     /* ------------------ Occupancy ------------------ */
//     Rooms: Number(raw.Rooms ?? raw.room_count ?? 1),
//     Adults: Number(raw.Adults ?? raw.PassengerADT ?? 1),
//     Children: Number(raw.Children ?? raw.Passengerchild ?? 0),

//     ChildAge:
//       Array.isArray(raw.ChildAge)
//         ? raw.ChildAge
//         : raw.Passengerchildage && raw.Passengerchildage !== 'null'
//         ? raw.Passengerchildage
//             .split(',')
//             .map((a) => Number(a))
//             .filter(Number.isFinite)
//         : [],

//     /* ------------------ Location ------------------ */
//     CityCode: raw.CityCode ?? raw.city,
//     city_name: raw.city_name || '',
//     country_code: raw.country_code ?? 'IN',
//     state: raw.state ?? '',

//     /* ------------------ Corporate / Booking ------------------ */
//     corporate_name: raw.corporate_name ?? null,
//     admin_id: raw.admin_id,
//     booking_id: raw.booking_id,
//     reference_no: raw.reference_no ?? '',
//     booknow: raw.booknow,
//     is_self_payment: raw.is_self_payment === '1',

//     /* ------------------ Pricing / Rate ------------------ */
//     meal_type: raw.meal_type ?? null,

//     /* ------------------ People / Approvals ------------------ */
//     spoc_name: raw.spoc_name,
//     approver1: raw.approver1_email ?? raw.approver1,
//     approver2: raw.approver2_email ?? raw.approver2,
//     cc_emails: raw.cc_emails ?? '',  

//     /* ------------------ Raw passenger container ------------------ */
//     passengerDetailsArray: raw.passengerDetailsArray ?? '',
//   };
// }

import * as hotelTypes from '@/hotel/types/hotel'

// Add this helper function at the top
function parseCustomDate(dateString: string): string {
  if (!dateString || dateString === 'null') {
    throw new Error('Invalid date provided');
  }
  
  // Check if already in ISO format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // ✅ Handle YYYY-MM-DD HH:mm:ss format (e.g., "2026-06-10 10:45:00")
  // Extract only the date part
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(dateString)) {
    return dateString.split(' ')[0]; // Return only "2026-06-10"
  }
  
  // ✅ Handle YYYY-MM-DD HH:mm format (e.g., "2026-06-10 10:45")
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(dateString)) {
    return dateString.split(' ')[0];
  }
  
  // ✅ Handle ISO 8601 datetime with T separator (e.g., "2026-06-10T10:45:00")
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString)) {
    return dateString.split('T')[0];
  }
  
  // Handle YY-MM-DD format (e.g., "26-02-28")
  if (/^\d{2}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    const fullYear = `20${year}`; // Convert YY to 20YY
    return `${fullYear}-${month}-${day}`;
  }
  
  // Handle DD-MM-YYYY format (e.g., "28-02-2026")
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
  
  // ✅ Handle DD-MM-YYYY HH:mm:ss format (e.g., "28-02-2026 10:45:00")
  if (/^\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}:\d{2}$/.test(dateString)) {
    const [datePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    return `${year}-${month}-${day}`;
  }
  
  throw new Error(`Unsupported date format: ${dateString}`);
}

export function normalizeHotelSearchParams(
  raw: hotelTypes.ExternalHotelSearchPayload
): hotelTypes.HotelSearchParams {
  return {
    /* ------------------ Dates ------------------ */
    checkIn: parseCustomDate(raw.checkIn || raw.checkindate || ''),
    checkOut: parseCustomDate(raw.checkOut || raw.checkoutdate || ''),

    /* ------------------ Occupancy ------------------ */
    Rooms: Number(raw.Rooms ?? raw.room_count ?? 1),
    Adults: Number(raw.Adults ?? raw.PassengerADT ?? 1),
    Children: Number(raw.Children ?? raw.Passengerchild ?? 0),

    ChildAge:
      Array.isArray(raw.ChildAge)
        ? raw.ChildAge
        : raw.Passengerchildage && raw.Passengerchildage !== 'null'
        ? raw.Passengerchildage
            .split(',')
            .map((a) => Number(a))
            .filter(Number.isFinite)
        : [],

    /* ------------------ Location ------------------ */
    CityCode: raw.CityCode ?? raw.city,
    city_name: raw.city_name || '',
    country_code: raw.country_code ?? 'IN',
    state: raw.state ?? '',

    /* ------------------ Corporate / Booking ------------------ */
    corporate_name: raw.corporate_name ?? null,
    admin_id: raw.admin_id,
    booking_id: raw.booking_id,
    reference_no: raw.reference_no ?? '',
    booknow: raw.booknow,
    is_self_payment: raw.is_self_payment === '1',

    /* ------------------ Pricing / Rate ------------------ */
    meal_type: raw.meal_type ?? null,

    /* ------------------ People / Approvals ------------------ */
    spoc_name: raw.spoc_name,
    approver1: raw.approver1_email ?? raw.approver1,
    approver2: raw.approver2_email ?? raw.approver2,
    cc_emails: raw.cc_emails ?? '',  

    /* ------------------ Raw passenger container ------------------ */
    passengerDetailsArray: raw.passengerDetailsArray ?? '',
  };
}
