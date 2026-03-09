
import { useState, useMemo } from 'react';
// import { hotelTypes, hotelUtils } from '@/index';
import * as hotelTypes from '@/hotel/types/hotel'
import * as hotelUtils from '@/hotel/utils/hotel.utils'

export const useHotelFilters = (combinedHotels: hotelTypes.Hotel[]) => {
  // Extract unique values from hotels
  const allFacilities = useMemo(
    () => [
      ...new Set(
        combinedHotels.flatMap((hotel) => hotel.HotelFacilities || [])
      ),
    ],
    [combinedHotels]
  );

  const allRatings = useMemo(
    () =>
      [...new Set(combinedHotels.map((hotel) => hotel.HotelRating || 0))].sort(
        (a, b) => b - a
      ),
    [combinedHotels]
  );

  const allMealTypes = useMemo(
    () =>
      Array.from(
        new Set(
          combinedHotels
            .flatMap((hotel) => hotel.Rooms || [])
            .map((room) => room.MealType)
            .filter((meal): meal is string => Boolean(meal))
        )
      ),
    [combinedHotels]
  );

  // Calculate price range based on PER-NIGHT prices
  const priceRange = useMemo(() => {
    const perNightPrices = combinedHotels
      .map(hotel => hotelUtils.calculatePerNightPrice(hotel))
      .filter((price) => price > 0);

    return {
      min: perNightPrices.length > 0 ? Math.floor(Math.min(...perNightPrices)) : 0,
      max: perNightPrices.length > 0 ? Math.ceil(Math.max(...perNightPrices)) : 10000,
    };
  }, [combinedHotels]);

  //  COUNT: Hotels per Star Rating
  const ratingCounts = useMemo(() => {
  const counts: Record<number, number> = {};
  allRatings.forEach(rating => {
    counts[rating] = combinedHotels.filter(
      hotel => hotel.HotelRating === rating
    ).length;
  });
  return counts;
}, [combinedHotels, allRatings]);


// COUNT: Hotels per Facility
const facilityCounts = useMemo(() => {
  const counts: Record<string, number> = {};
  allFacilities.forEach(facility => {
    counts[facility] = combinedHotels.filter(
      hotel => hotel.HotelFacilities?.includes(facility)
    ).length;
  });
  return counts;
}, [combinedHotels, allFacilities]);

// COUNT: Hotels per Meal Type
const mealTypeCounts = useMemo(() => {
  const counts: Record<string, number> = {};
  allMealTypes.forEach(mealType => {
    counts[mealType] = combinedHotels.filter(
      hotel => hotel.Rooms?.some(room => room.MealType === mealType)
    ).length;
  });
  return counts;
}, [combinedHotels, allMealTypes]);

  // State for filters
  const [filters, setFilters] = useState<hotelTypes.FilterState>({
    priceRange: [priceRange.min, priceRange.max],
    selectedRatings: [],
    selectedFacilities: [],
    selectedMealTypes: [], 
    mealType: '',
    refundable: null,
    searchQuery: '',
    selectedPriceBuckets: [],
  });

  const filteredHotels = useMemo(() => {
    return combinedHotels.filter((hotel) => {
      if (!hotel.Rooms || hotel.Rooms.length === 0) return false;

      //  FIXED: Price filter - now checks PER-NIGHT price
      const perNightPrice = hotelUtils.calculatePerNightPrice(hotel);
      if (
        perNightPrice < filters.priceRange[0] ||
        perNightPrice > filters.priceRange[1]
      ) {
        return false;
      }

      // Rating filter
      if (
        filters.selectedRatings.length > 0 &&
        !filters.selectedRatings.includes(hotel.HotelRating || 0)
      ) {
        return false;
      }

      // Facilities filter
      if (filters.selectedFacilities.length > 0) {
        const hotelFacilities = hotel.HotelFacilities || [];
        if (
          !filters.selectedFacilities.every((fac) =>
            hotelFacilities.includes(fac)
          )
        ) {
          return false;
        }
      }

      // Meal filter
      // if (
      //   filters.mealType &&
      //   !hotel.Rooms.some((room) => room.MealType === filters.mealType)
      // ) {
      //   return false;
      // }

       if (filters.selectedMealTypes.length > 0) {
        if (!hotel.Rooms.some(room => 
          filters.selectedMealTypes.includes(room.MealType || '')
        )) {
          return false;
        }
      }

      // Refundable filter
      if (filters.refundable !== null) {
        const now = new Date();
        const match = hotel.Rooms.some((room) => {
          const hasActivePolicy =
            room.CancelPolicies?.some(
              (p) => new Date(p.ToDate) > now
            ) ?? false;

          return filters.refundable ? hasActivePolicy : !hasActivePolicy;
        });

        if (!match) return false;
      }

      // Search filter
      // if (
      //   filters.searchQuery &&
      //   !hotel.HotelName?.toLowerCase().includes(
      //     filters.searchQuery.toLowerCase()
      //   )
      // ) {
      //   return false;
      // }

      // Search filter - UPDATE THIS SECTION
if (filters.searchQuery) {
  const searchLower = filters.searchQuery.toLowerCase();
  const matchesName = hotel.HotelName?.toLowerCase().includes(searchLower);
  const matchesCity = hotel.CityName?.toLowerCase().includes(searchLower);
  const matchesAddress = hotel.Address?.toLowerCase().includes(searchLower);
  
  // Return false if none of the fields match
  if (!matchesName && !matchesCity && !matchesAddress) {
    return false;
  }
}

      return true;
    });
  }, [combinedHotels, filters]);

  const handleFilterChange = <T extends hotelTypes.FilterType>(
    filterType: T,
    value: hotelTypes.FilterValueMap[T]
  ) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      switch (filterType) {
        case 'price':
          newFilters.priceRange = value as [number, number];
          break;

          case 'priceBucket': // ✅ ADD THIS CASE
        newFilters.selectedPriceBuckets = value as string[];
        break;

        case 'rating':
          newFilters.selectedRatings = newFilters.selectedRatings.includes(value as number)
            ? newFilters.selectedRatings.filter((r) => r !== value)
            : [...newFilters.selectedRatings, value as number];
          break;

        case 'facility':
          newFilters.selectedFacilities = newFilters.selectedFacilities.includes(value as string)
            ? newFilters.selectedFacilities.filter((f) => f !== value)
            : [...newFilters.selectedFacilities, value as string];
          break;

        case 'meal':
          // newFilters.mealType = value as string;
          newFilters.selectedMealTypes = newFilters.selectedMealTypes.includes(value as string)
            ? newFilters.selectedMealTypes.filter((m) => m !== value)
            : [...newFilters.selectedMealTypes, value as string];
          break;

        case 'refundable':
          newFilters.refundable = value as boolean | null;
          break;

        case 'search':
          newFilters.searchQuery = value as string;
          break;
      }

      return newFilters;
    });
  };

//   const removeSpecificFilter = (filterType: string, value?: any) => {
//   setFilters((prevFilters) => {
//     const newFilters = { ...prevFilters };

//     switch (filterType) {
//       case 'search':
//         newFilters.searchQuery = '';
//         break;

//       case 'price':
//         newFilters.priceRange = [priceRange.min, priceRange.max];
//         newFilters.selectedPriceBuckets = [];
//         break;

//         case 'priceBucket': // ✅ ADD THIS CASE
//         newFilters.selectedPriceBuckets = [];
//         newFilters.selectedPriceBuckets = newFilters.selectedPriceBuckets?.filter(
//           (b) => b !== value
//         ) || [];
//         // If no buckets left, reset price range
//         if (newFilters.selectedPriceBuckets.length === 0) {
//           newFilters.priceRange = [priceRange.min, priceRange.max];
//         }
//         break;

//       case 'rating':
//         newFilters.selectedRatings = newFilters.selectedRatings.filter(
//           (r) => r !== value
//         );
//         break;

//       case 'facility':
//         newFilters.selectedFacilities = newFilters.selectedFacilities.filter(
//           (f) => f !== value
//         );
//         break;

//       case 'meal':
//         newFilters.mealType = '';
//         break;

//       case 'refundable':
//         newFilters.refundable = null;
//         break;
//     }

//     return newFilters;
//   });
// };

  const removeSpecificFilter = (filterType: string, value?: any) => {
  setFilters((prevFilters) => {
    const newFilters = { ...prevFilters };

    switch (filterType) {
      case 'search':
        newFilters.searchQuery = '';
        break;

      case 'price':
      case 'customPrice':
        newFilters.priceRange = [priceRange.min, priceRange.max];
        newFilters.selectedPriceBuckets = [];
        break;

      case 'priceBucket':
        if (value === null) {
          // ✅ Clear ALL buckets (when Clear All is clicked)
          newFilters.selectedPriceBuckets = [];
          newFilters.priceRange = [priceRange.min, priceRange.max];
        } else {
          // ✅ Remove SPECIFIC bucket (when X is clicked on individual chip)
          newFilters.selectedPriceBuckets = (newFilters.selectedPriceBuckets || []).filter(
            (b) => b !== value
          );
          
          // ✅ Recalculate price range from remaining buckets
          if (newFilters.selectedPriceBuckets.length === 0) {
            newFilters.priceRange = [priceRange.min, priceRange.max];
          } else {
            // Import usePriceFilter logic here or recalculate based on remaining buckets
            // For now, keep the current range - the PriceFilter will handle it
          }
        }
        break;

      case 'rating':
        newFilters.selectedRatings = newFilters.selectedRatings.filter(
          (r) => r !== value
        );
        break;

      case 'facility':
        newFilters.selectedFacilities = newFilters.selectedFacilities.filter(
          (f) => f !== value
        );
        break;

      case 'meal':
        // newFilters.mealType = '';
        newFilters.selectedMealTypes = newFilters.selectedMealTypes.filter(
            (m) => m !== value
          );
        break;

      case 'refundable':
        newFilters.refundable = null;
        break;
    }

    return newFilters;
  });
};

const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout> | null
  >(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      handleFilterChange('search', value);
    }, 300);

    setSearchTimeout(timeout);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      priceRange: [priceRange.min, priceRange.max],
      selectedRatings: [],
      selectedFacilities: [],
      selectedMealTypes: [],
      mealType: '',
      refundable: null,
      searchQuery: '',
      selectedPriceBuckets: [],
    });
  };

  return {
    filters,
    filteredHotels,
    allFacilities,
    allRatings,
    allMealTypes,
    priceRange,
     ratingCounts,
    facilityCounts,      
    mealTypeCounts,  
    handleFilterChange,
    handleSearchChange,
    resetFilters,
    removeSpecificFilter,
  };
};
