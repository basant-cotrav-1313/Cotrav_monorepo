
import { ui, icons, filterTypes, hotelTypes } from "@/index";

interface AppliedFiltersProps {
  filters: hotelTypes.FilterState;
  allRatings: number[];
  allFacilities: string[];
  allMealTypes: string[];
  priceBuckets: filterTypes.PriceBucket[];
  priceRange: [number, number];
  minPrice: number;
  maxPrice: number;
  selectedPriceBuckets?: string[];
  onRemoveFilter: (filterType: string, value?: any) => void;
  onClearAll: () => void;
}

export const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  filters,
  allRatings,
  allFacilities,
  allMealTypes,
  priceBuckets,
  priceRange,
  minPrice,
  maxPrice,
  onRemoveFilter,
  onClearAll,
}) => {
  // Calculate active filter count
  const activeFilters: { type: string; label: string; value?: any }[] = [];

  // Search Query
  // if (filters.searchQuery) {
  //   activeFilters.push({
  //     type: 'search',
  //     label: `Search: "${filters.searchQuery}"`,
  //   });
  // }

  if (filters.searchQuery) {
  const maxLength = 30; // Max characters to display
  const displayText = filters.searchQuery.length > maxLength 
    ? filters.searchQuery.substring(0, maxLength) + '...' 
    : filters.searchQuery;
    
  activeFilters.push({
    type: 'search',
    label: `"${displayText}"`,  // Removed "Search:" prefix to save space
  });
}

  // ✅ Price Buckets (selected checkboxes)
  if (filters.selectedPriceBuckets && filters.selectedPriceBuckets.length > 0) {
    filters.selectedPriceBuckets.forEach((bucket) => {
      activeFilters.push({
        type: 'priceBucket',
        label: bucket,
        value: bucket,
      });
    });
  }

  // ✅ Custom Price Range (only if not default AND not from buckets)
  // if (
  //   (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) &&
  //   (!filters.selectedPriceBuckets || filters.selectedPriceBuckets.length === 0)
  // ) {
  //   const formatPrice = (price: number) => {
  //     if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
  //     return `₹${price}`;
  //   };
  //   activeFilters.push({
  //     type: 'customPrice',
  //     label: `${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`,
  //   });
  // }

 // ✅ ADD THIS DEBUG CODE
// ✅ Custom Price Range - Don't show if essentially default
const hasBuckets = filters.selectedPriceBuckets && filters.selectedPriceBuckets.length > 0;

if (!hasBuckets) {
  // Consider it "default" if both values are within 100 of the actual min/max
  const isNearDefault = 
    Math.abs(priceRange[0] - minPrice) < 100 && 
    Math.abs(priceRange[1] - maxPrice) < 100;
  
  if (!isNearDefault) {
    const formatPrice = (price: number) => {
      if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
      return `₹${price}`;
    };
    activeFilters.push({
      type: 'customPrice',
      label: `${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`,
    });
  }
}

  // Star Ratings
  filters.selectedRatings.forEach((rating) => {
    activeFilters.push({
      type: 'rating',
      label: `${rating} Star`,
      value: rating,
    });
  });

  // Facilities
  filters.selectedFacilities.forEach((facility) => {
    activeFilters.push({
      type: 'facility',
      label: facility,
      value: facility,
    });
  });

  // Meal Type
  // if (filters.mealType && filters.mealType !== 'all') {
  //   activeFilters.push({
  //     type: 'meal',
  //     label: filters.mealType,
  //   });
  // }

  // Meal Types
filters.selectedMealTypes.forEach((mealType) => {
  activeFilters.push({
    type: 'meal',
    label: mealType,
    value: mealType,
  });
});

  // Cancellation Policy
  if (filters.refundable !== null) {
    activeFilters.push({
      type: 'refundable',
      label: filters.refundable ? 'Free Cancellation' : 'Non-Refundable',
    });
  }

  // Don't render if no filters applied
  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <icons.Filter className="w-4 h-4 text-[#0B5CAD]" />
          Applied Filters ({activeFilters.length})
        </h3>
        <ui.Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onRemoveFilter('priceBucket', null); // Clear price buckets first
            onClearAll(); // Then clear everything else
          }}
          className="text-[#0B5CAD] hover:text-[#094B8A] hover:bg-[#0B5CAD]/10 text-xs font-semibold"
        >
          Clear All
        </ui.Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${index}`}
            className="inline-flex items-center gap-2 bg-[#0B5CAD]/10 text-[#0B5CAD] px-3 py-1.5 rounded-full text-xs font-medium border border-[#0B5CAD]/20 hover:bg-[#0B5CAD]/20 transition-colors"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="hover:bg-[#0B5CAD]/30 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${filter.label}`}
            >
              <icons.X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

