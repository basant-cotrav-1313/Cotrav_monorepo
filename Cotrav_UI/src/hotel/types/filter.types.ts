// import * as hotelTypes from './hotel'

// export interface FilterSidebarProps {
//   // filters: any;
//   filters: hotelTypes.FilterState;
//   allRatings: number[];
//   allFacilities: string[];
//   allMealTypes: string[];
//   priceRange: { min: number; max: number };
//   handleFilterChange: <T extends hotelTypes.FilterType>(
//   filterType: T,
//   value: hotelTypes.FilterValueMap[T]
// ) => void;
//   handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   mapCenter?: { lat: number; lng: number };
//   onMapClick?: () => void;
// }


import * as hotelTypes from './hotel'

export interface FilterSidebarProps {
  filters: hotelTypes.FilterState;
  allRatings: number[];
  allFacilities: string[];
  allMealTypes: string[];
  ratingCounts: Record<number, number>;      
  facilityCounts: Record<string, number>;    
  mealTypeCounts: Record<string, number>;
  priceRange: { min: number; max: number };
  handleFilterChange: <T extends hotelTypes.FilterType>(
    filterType: T,
    value: hotelTypes.FilterValueMap[T]
  ) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mapCenter?: { lat: number; lng: number };
  onMapClick?: () => void;
  onClearAll: () => void;
  hotels?: hotelTypes.Hotel[];  // ADD THIS LINE
  allHotels?: hotelTypes.Hotel[];
  minPrice: number;           
  maxPrice: number;  
  onRemoveFilter: (filterType: string, value?: any) => void;

}

export interface PriceBucket {
  label: string;
  range: string;
  min: number;
  max: number;
  count?: number;
}

export interface PriceFilterProps {
  hotels: hotelTypes.Hotel[]; // from your hotelTypes
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onBucketsChange?: (buckets: string[]) => void;
  selectedPriceBuckets?: string[];
  resetCustomInputs?: boolean;
}

