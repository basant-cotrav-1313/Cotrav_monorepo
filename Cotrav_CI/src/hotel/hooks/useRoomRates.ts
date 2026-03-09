import { useCallback } from 'react';
// import { hotelTypes } from '@/index';
import * as hotelTypes from '@/hotel/types/hotel'

// export const useRoomRates = () => {
//   const getFirstDayBasePrice = useCallback((room: hotelTypes.Room): number => {
//     return room.DayRates?.[0]?.[0]?.BasePrice ?? 0;
//   }, []);

//   const getFlattenedDayRates = useCallback(
//     (room: hotelTypes.Room): hotelTypes.DayRate[] =>
//       room.DayRates?.map(d => d[0]).filter(Boolean) ?? [],
//     []
//   );

//   return {
//     getFirstDayBasePrice,
//     getFlattenedDayRates,
//   };
// };

export const useRoomRates = () => {
  const getFirstDayBasePrice = useCallback((room: hotelTypes.Room): number => {
    if (!room.DayRates?.length) return 0;
    
    const firstDayRate = room.DayRates[0]?.[0];
    if (!firstDayRate || typeof firstDayRate.BasePrice !== 'number') {
      console.warn('Invalid DayRates structure for room:', room.BookingCode);
      return 0;
    }
    
    return firstDayRate.BasePrice;
  }, []);

  const getFlattenedDayRates = useCallback(
    (room: hotelTypes.Room): hotelTypes.DayRate[] => {
      if (!room.DayRates?.length) return [];
      
      // Handle nested structure
      const dayRates = room.DayRates[0];
      
      if (!Array.isArray(dayRates)) {
        console.warn('Unexpected DayRates format for room:', room.BookingCode);
        return [];
      }
      
      return dayRates;
    },
    []
  );

  return {
    getFirstDayBasePrice,
    getFlattenedDayRates,
  };
};

