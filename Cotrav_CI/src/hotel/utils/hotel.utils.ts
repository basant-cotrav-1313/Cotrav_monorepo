
// import { hotelTypes } from '@/index';
import * as hotelTypes from '@/hotel/types/hotel'

// ============================================================================
// DATA TRANSFORMATION UTILITIES
// ============================================================================

/**
 * Merges hotel details with city list and additional hotel data
 * @param hotelDetails - Base hotel details from API
 * @param hotelcityList - City-specific hotel list
 * @param hotelData - Additional hotel data keyed by HotelCode
 * @returns Merged hotel array
 */
export const mergeHotelData = (
  hotelDetails: hotelTypes.Hotel[],
  // hotelcityList: any[],
  hotelcityList: hotelTypes.HotelCityItem[],
  hotelData: Record<string, any>
): hotelTypes.Hotel[] => {
  return hotelDetails.map((hotel) => {
    const matchedHotelList = hotelcityList.find(
      (item) => item.HotelCode === hotel.HotelCode
    );
    const matchedHotelData = hotelData[hotel.HotelCode] || {};
    return { ...hotel, ...matchedHotelList, ...matchedHotelData };
  });
};

// ============================================================================
// ROOM ALLOCATION UTILITIES
// ============================================================================

interface RoomAllocation {
  Adults: number;
  Children: number;
  ChildrenAges: number[] | null;
}

/**
 * Allocates adults and children into rooms based on max capacity limits
 * @param totalAdults - Total number of adults
 * @param totalChildren - Total number of children
 * @param childrenAges - Array of children ages
 * @returns Array of room allocations
 */
export const allocateRooms = (
  totalAdults: number,
  totalChildren: number,
  childrenAges: number[]
): RoomAllocation[] => {
  const rooms: RoomAllocation[] = [];
  let remainingAdults = totalAdults;
  let remainingChildren = totalChildren;
  let remainingChildrenAges = [...childrenAges];

  const maxAdultsPerRoom = 8;
  const maxChildrenPerRoom = 4;

  while (remainingAdults > 0 || remainingChildren > 0) {
    const adultsInRoom = Math.min(remainingAdults, maxAdultsPerRoom);
    const childrenInRoom = Math.min(remainingChildren, maxChildrenPerRoom);
    const childrenAgesInRoom = remainingChildrenAges.slice(0, childrenInRoom);

    rooms.push({
      Adults: adultsInRoom,
      Children: childrenInRoom,
      ChildrenAges: childrenAgesInRoom.length ? childrenAgesInRoom : null,
    });

    remainingAdults -= adultsInRoom;
    remainingChildren -= childrenInRoom;
    remainingChildrenAges = remainingChildrenAges.slice(childrenInRoom);
  }

  return rooms;
};

// ============================================================================
// TEXT EXTRACTION UTILITIES
// ============================================================================

// ============================================================================
// TEXT EXTRACTION UTILITIES
// ============================================================================

/**
 * Extracts attraction information from hotel description
 * @param description - Hotel description string
 * @returns Extracted attraction or default message
 */
export const extractAttraction = (description?: string): string => {
  if (!description || typeof description !== 'string') {
    return 'No Location Available';
  }

  const match = description.match(/HeadLine\s*:\s*([^<]+)/);
  return match ? match[1].trim() : 'No Location Available';
};

// ============================================================================
// CANCELLATION POLICY UTILITIES
// ============================================================================

/**
 * Formats cancellation policies for display
 * @param policies - Array of cancellation policies
 * @returns Array of formatted policy strings
 */
export const formatCancelPolicies = (
  policies?: hotelTypes.CancellationPolicy[]
): string[] => {
  // Return empty array if no policies (will show "Non Cancellable")
  if (!Array.isArray(policies) || policies.length === 0) {
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validPolicies = policies
    .filter((policy) => {
      // Parse the date (format: DD-MM-YYYY HH:mm:ss)
      const [datePart] = policy.FromDate.split(' ');
      const [day, month, year] = datePart.split('-');
      const policyDate = new Date(`${year}-${month}-${day}`);
      policyDate.setHours(0, 0, 0, 0);
      
      return policyDate >= today;
    })
    .map((policy) => {
      const [datePart] = policy.FromDate.split(' ');
      const [day, month, year] = datePart.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      
      if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
        return `Free cancellation until ${formattedDate}`;
      }
      
      if (policy.ChargeType === 'Fixed') {
        return `From ${formattedDate}: ₹${policy.CancellationCharge} cancellation charge`;
      }
      
      if (policy.ChargeType === 'Percentage') {
        return `From ${formattedDate}: ${policy.CancellationCharge}% cancellation charge`;
      }
      
      return `Cancellation policy starts from ${formattedDate}`;
    });

  return validPolicies;
};

// ============================================================================
// EMAIL VALIDATION UTILITIES
// ============================================================================

/**
 * Cleans and deduplicates email string
 * @param emailString - Comma-separated email string
 * @returns Cleaned email string
 */
export const cleanEmails = (emailString?: string): string => {
  if (!emailString) return '';
  
  const emails = emailString
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email);
  
  const uniqueEmails = [...new Set(emails)];
  return uniqueEmails.join(', ');
};

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ============================================================================
// ROOM CALCULATION UTILITIES
// ============================================================================

/**
 * Calculates minimum required rooms based on adults and children
 * @param adults - Number of adults
 * @param children - Number of children
 * @returns Minimum number of rooms required
 */
// export const calculateRequiredRooms = (
//   adults: number,
//   children: number
// ): number => {
//   const roomsBasedOnAdults = Math.ceil(adults / 2);
//   const roomsBasedOnChildren = Math.ceil(children / 2);
//   const roomsBasedOnTotal = Math.ceil((adults + children) / 4);

//   return Math.max(roomsBasedOnAdults, roomsBasedOnChildren, roomsBasedOnTotal);
// };

export const getBasePrice = (room: hotelTypes.Room): number => {
  if (room.DayRates && room.DayRates.length > 0) {
    return room.DayRates.reduce(
      (sum, day) => sum + (day[0]?.BasePrice || 0),
      0
    );
  }
  return room.TotalFare - (room.TotalTax || 0);
};

/**
 * Gets the base price for the first day
 * @param room - Room object
 * @returns First day base price
 */
export const getFirstDayBasePrice = (room: hotelTypes.Room): number => {
  if (room.DayRates && room.DayRates.length > 0) {
    const firstDay = room.DayRates[0];
    if (Array.isArray(firstDay) && firstDay.length > 0) {
      return firstDay[0].BasePrice || 0;
    }
  }
  return 0;
};

/**
 * Flattens nested day rates array for easier processing
 * @param room - Room object
 * @returns Flattened array of day rates
 */
// export const getFlattenedDayRates = (room: hotelTypes.Room): hotelTypes.DayRate[] => {
//   if (!room.DayRates) return [];
  
//   return room.DayRates.map((dayArray) =>
//     Array.isArray(dayArray) && dayArray.length > 0 ? dayArray[0] : dayArray
//   );
// };


export const getFlattenedDayRates = (room: hotelTypes.Room): hotelTypes.DayRate[] => {
  if (!room.DayRates) return [];
  
  return room.DayRates.map((dayArray): hotelTypes.DayRate => {
    // If it's already a DayRate object, return it
    if (!Array.isArray(dayArray)) {
      return dayArray;
    }
    // If it's an array, return the first element or a default
    return dayArray.length > 0 ? dayArray[0] : { BasePrice: 0 };
  });
};

export const calculateRequiredRooms = (
  adults: number,
  children: number
): number => {
  // Each room can have:
  // - Max 2 adults AND
  // - Max 2 children AND
  // - Max 4 total people

  const roomsBasedOnAdults = Math.ceil(adults / 2);
  const roomsBasedOnChildren = Math.ceil(children / 2);
  const roomsBasedOnTotal = Math.ceil((adults + children) / 4);

  return Math.max(
    roomsBasedOnAdults,
    roomsBasedOnChildren,
    roomsBasedOnTotal
  );
};



export const parseCoordinates = (
  mapStr?: string
): { lat: number; lng: number } | null => {
  if (!mapStr || typeof mapStr !== 'string') return null;

  const cleaned = mapStr
    .trim()
    .replace(/\s*,\s*/g, '|')
    .replace(/\s+/g, '|');
  
  const parts = cleaned
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length < 2) return null;

  const a = Number(parts[0]);
  const b = Number(parts[1]);

  if (
    Number.isFinite(a) &&
    Number.isFinite(b) &&
    Math.abs(a) <= 90 &&
    Math.abs(b) <= 180
  ) {
    return { lat: a, lng: b };
  }

  if (
    Number.isFinite(b) &&
    Number.isFinite(a) &&
    Math.abs(b) <= 90 &&
    Math.abs(a) <= 180
  ) {
    return { lat: b, lng: a };
  }

  return null;
};



// Filter Component
export const calculatePerNightPrice = (hotel: hotelTypes.Hotel): number => {
  const lowestFareRoom = hotel.Rooms?.[0];
  const numberOfNights = lowestFareRoom?.DayRates?.[0]?.length ?? 1;
  const totalFare = lowestFareRoom?.TotalFare ?? 0;
  return totalFare / numberOfNights;
};

// Cancellation Policies Utils

export const formatCancellationDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split(' ')[0].split('-');
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  });
};

export const getDaysUntilDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split(' ')[0].split('-');
  const targetDate = new Date(`${year}-${month}-${day}`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};



export const getLowestFareRoom = (rooms: hotelTypes.Room[] = []) => {
  if (!rooms.length) return null;

  return rooms.reduce(
    (min, room) => (room.TotalFare < min.TotalFare ? room : min),
    rooms[0]
  );
};

export const getNumberOfNights = (room: hotelTypes.Room | null) => {
  return room?.DayRates?.[0]?.length ?? 1;
};

export const getRoomPricing = (
  room: hotelTypes.Room | null,
  nights: number
) => {
  const totalFare = room?.TotalFare ?? 0;  // Already includes tax
  const totalTax = room?.TotalTax ?? 0;
  const baseFare = totalFare - totalTax;   // Calculate base fare

  return {
    totalFare,        // Total including tax (what customer pays)
    totalTax,         // Tax amount
    baseFare,         // Base fare excluding tax
    totalPrice: totalFare,  // ✅ CORRECT - just use TotalFare
    // perNightFare: nights ? baseFare / nights : 0  // Base fare per night
    perNightFare: nights ? totalFare / nights : 0
  };
};


// Add this function inside your component, after the getAvailableFacilities function
 export const getCancellationStatus = (
  lowestFareRoom: hotelTypes.Room | null
) => {
  const policies = lowestFareRoom?.CancelPolicies ?? [];
  const isRefundable = lowestFareRoom?.IsRefundable ?? false;

  if (policies.length > 0) {
    const sortedPolicies = [...policies].sort((a, b) => {
      const dateA = new Date(a.FromDate.split(' ')[0].split('-').reverse().join('-'));
      const dateB = new Date(b.FromDate.split(' ')[0].split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

    const allNonRefundable = sortedPolicies.every(
      p => p.CancellationCharge >= 100
    );

    if (allNonRefundable) {
      return {
        isCancellable: false,
        message: 'Non-Refundable',
        details: ['100% cancellation charge applies from booking'],
        color: 'red',
        icon: 'X'
      };
    }

    const hasFreeCancellation = sortedPolicies.some(
      p => p.CancellationCharge === 0
    );

    if (hasFreeCancellation) {
      const policyDetails: string[] = [];

      sortedPolicies.forEach((policy, index) => {
        const date = formatCancellationDate(policy.FromDate);
        const charge = policy.CancellationCharge;

        if (charge === 0 && index === 0) {
          const nextPolicy = sortedPolicies[index + 1];
          if (nextPolicy) {
            const nextDate = formatCancellationDate(nextPolicy.FromDate);
            const daysUntil = getDaysUntilDate(nextPolicy.FromDate);
            policyDetails.push(
              daysUntil > 0
                ? `Free cancellation until ${nextDate} (${daysUntil} days left)`
                : `Free cancellation before ${nextDate}`
            );
          }
        } else {
          policyDetails.push(`${charge}% charge from ${date} onwards`);
        }
      });

      return {
        isCancellable: true,
        message: 'Free Cancellation',
        details: policyDetails,
        color: 'green',
        icon: 'Check'
      };
    }
  }

  if (isRefundable) {
    return {
      isCancellable: true,
      message: 'Refundable',
      details: ['Standard cancellation policy applies'],
      color: 'green',
      icon: 'Check'
    };
  }

  return {
    isCancellable: false,
    message: 'Non-Refundable',
    details: null,
    color: 'red',
    icon: 'X'
  };
};


export const getCancellationSummary = (
  policies: { FromDate: string; ChargeType: string; CancellationCharge: number }[]
): string[] => {
  if (!policies || policies.length === 0) return ['No cancellation policy available'];

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const formatDate = (fromDate: string): string => {
    if (!fromDate || typeof fromDate !== 'string') return 'N/A';

    const datePart = fromDate.split(' ')[0]; // "17-02-2026"
    const parts = datePart.split('-');

    if (parts.length !== 3) return fromDate; // fallback to raw if unexpected format

    const [day, month, year] = parts;
    const monthIndex = parseInt(month) - 1;

    if (monthIndex < 0 || monthIndex > 11) return fromDate; // invalid month fallback

    return `${day} ${months[monthIndex]} ${year}`;
  };

  // Sort by date ascending so output is chronological
  const sorted = [...policies].sort((a, b) => {
    const dateA = new Date(a.FromDate.split(' ')[0].split('-').reverse().join('-'));
    const dateB = new Date(b.FromDate.split(' ')[0].split('-').reverse().join('-'));
    return dateA.getTime() - dateB.getTime();
  });

  return sorted.map((policy) => {
    const readableDate = formatDate(policy.FromDate);

    if (policy.CancellationCharge === 0) {
      return `Free cancellation until ${readableDate}`;
    }

    if (policy.ChargeType === 'Percentage') {
      return `${policy.CancellationCharge}% cancellation charge from ${readableDate}`;
    }

    if (policy.ChargeType === 'Fixed') {
      return `₹${policy.CancellationCharge} flat cancellation charge from ${readableDate}`;
    }

    // Unknown ChargeType fallback
    return `${policy.CancellationCharge} cancellation charge from ${readableDate}`;
  });
};


export const getAvailableFacilities = (
  hotelFacilities: string[] = [],
  facilityIcons: Record<string, { icon: React.ReactNode; label: string }>
) => {
  const facilityList = hotelFacilities.map(f => f.toLowerCase());

  return Object.entries(facilityIcons)
    .filter(([key]) => facilityList.some(f => f.includes(key)))
    .map(([, value]) => value)
    .slice(0, 3);
};

// -------------------- GST Calculation --------------------
export const calculateGST = (fare: number, nights: number) => {
  if (!fare || !nights) return { gstRate: 0, totalTax: 0, perNightTax: 0 };
  const perNightPrice = fare / nights;
  const gstRate = perNightPrice <= 7500 ? 0.05 : 0.18;
  const perNightTax = perNightPrice * gstRate;
  const totalTax = perNightTax * nights;
  return { gstRate, totalTax, perNightTax };
};

