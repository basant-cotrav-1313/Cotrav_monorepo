
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ui, icons, filterTypes } from '@/index';
import { PriceFilter } from '../PriceFilter';

// interface MobileFilterDrawerProps extends filterTypes.FilterSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   activeFilterCount: number;
// }
// interface MobileFilterDrawerProps
//   extends Omit<
//     filterTypes.FilterSidebarProps,
//     'ratingCounts' | 'facilityCounts' | 'mealTypeCounts'
//   > {
//   isOpen: boolean;
//   onClose: () => void;
//   activeFilterCount: number;
// }


interface MobileFilterDrawerProps extends filterTypes.FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilterCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  allRatings,
  allFacilities,
  allMealTypes,
   priceRange,           // ✅ ADD THIS
  ratingCounts,         // ✅ ADD THIS
  facilityCounts,       // ✅ ADD THIS
  mealTypeCounts,       // ✅ ADD THIS
  handleFilterChange,
  handleSearchChange,
  hotels = [],
  allHotels = [],
  activeFilterCount,
  minPrice,             // ✅ ADD THIS
  maxPrice,             // ✅ ADD THIS
  onClearAll,           // ✅ ADD THIS
  onRemoveFilter,       // ✅ ADD THIS
}) => {
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const [resetCustomInputs, setResetCustomInputs] = useState(false);

  const handleApplyFilters = () => {
    onClose();
  };

  // const handleClearAll = () => {
  //   // Reset all filters
  //   handleFilterChange('price', [0, 100000] as [number, number]);
  //   handleFilterChange('search', '');
  //   filters.selectedRatings.forEach(rating => handleFilterChange('rating', rating));
  //   filters.selectedFacilities.forEach(facility => handleFilterChange('facility', facility));
  //   if (filters.mealType) handleFilterChange('meal', '');
  //   if (filters.refundable !== null) handleFilterChange('refundable', null);
  //   handleFilterChange("priceBucket", []); // ✅ Clear price buckets
  // setResetCustomInputs(true);
  // setTimeout(() => setResetCustomInputs(false), 100);
  // onClearAll();
  // };

  const handleClearAll = () => {
  handleFilterChange("priceBucket", []); // ✅ Clear price buckets
  setResetCustomInputs(true);
  setTimeout(() => setResetCustomInputs(false), 100);
  onClearAll(); // Call the prop function
};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl overflow-hidden md:hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white px-4 py-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <h2 className="text-lg font-bold">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-[#0B5CAD] text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
              >
                <icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-[#0B5CAD] scrollbar-track-gray-100">
              
              {/* Search Filter */}
              <div className="space-y-2">
                <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <icons.Search className="w-4 h-4 text-[#0B5CAD]" />
                  Search Hotels
                </ui.Label>
                <div className="relative">
                  <ui.Input
                    type="text"
                    placeholder="Search by name..."
                    className="pl-10 border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]"
                    onChange={handleSearchChange}
                    defaultValue={filters.searchQuery}
                  />
                  <icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Price Filter */}
              {/* <PriceFilter
                hotels={allHotels.length > 0 ? allHotels : hotels}
                priceRange={filters.priceRange}
                onPriceChange={(range) => handleFilterChange('price', range as [number, number])}
              /> */}

              <PriceFilter
  hotels={allHotels.length > 0 ? allHotels : hotels}
  priceRange={filters.priceRange}
  selectedPriceBuckets={filters.selectedPriceBuckets}  // ✅ ADD THIS
  resetCustomInputs={resetCustomInputs}                 // ✅ ADD THIS
  onPriceChange={(range) => handleFilterChange('price', range as [number, number])}
  onBucketsChange={(buckets) => handleFilterChange("priceBucket", buckets)}  // ✅ ADD THIS
/>

              <div className="border-t border-gray-200" />

              {/* Star Rating Filter */}
              {/* <div className="space-y-3">
                <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <icons.Star className="w-4 h-4 text-[#0B5CAD]" />
                  Star Rating
                </ui.Label>
                <div className="space-y-2">
                  {allRatings.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                      <ui.Checkbox
                        id={`mobile-rating-${rating}`}
                        checked={filters.selectedRatings.includes(rating)}
                        onCheckedChange={() => handleFilterChange('rating', rating)}
                        className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD]"
                      />
                      <ui.Label
                        htmlFor={`mobile-rating-${rating}`}
                        className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
                      >
                        <span className="font-medium">{rating}</span>
                        <icons.Star className="w-3 h-3 fill-[#0B5CAD] text-[#0B5CAD]" />
                        {rating === 1 ? '' : <span className="text-gray-500">& above</span>}
                      </ui.Label>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Star Rating Filter */}
<div className="space-y-3">
  <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
    <icons.Star className="w-4 h-4 text-[#0B5CAD]" />
    Star Rating
  </ui.Label>
  <div className="space-y-2">
    {allRatings.map((rating) => (
      <div key={rating} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
        <ui.Checkbox
          id={`mobile-rating-${rating}`}
          checked={filters.selectedRatings.includes(rating)}
          onCheckedChange={() => handleFilterChange('rating', rating)}
          className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] data-[state=checked]:text-white cursor-pointer"
        />
        <ui.Label
          htmlFor={`mobile-rating-${rating}`}
          className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
        >
          <span className="font-medium">{rating}</span>
          <icons.Star className="w-3 h-3 fill-[#0B5CAD] text-[#0B5CAD]" />
          {rating === 1 ? '' : <span className="text-gray-500">& above</span>}
          <span className="ml-auto text-xs text-gray-500">({ratingCounts[rating] || 0})</span>  {/* ✅ ADD THIS */}
        </ui.Label>
      </div>
    ))}
  </div>
</div>

              <div className="border-t border-gray-200" />

              {/* Facilities Filter */}
              <ui.Collapsible open={facilitiesOpen} onOpenChange={setFacilitiesOpen}>
                <div className="space-y-3">
                  <ui.CollapsibleTrigger className="w-full">
                    <ui.Label className="text-sm font-semibold text-gray-700 flex items-center justify-between cursor-pointer hover:text-[#0B5CAD] transition-colors">
                      <span className="flex items-center gap-2">
                        <icons.Coffee className="w-4 h-4 text-[#0B5CAD]" />
                        Facilities
                        {filters.selectedFacilities.length > 0 && (
                          <span className="bg-[#0B5CAD] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {filters.selectedFacilities.length}
                          </span>
                        )}
                      </span>
                      {facilitiesOpen ? (
                        <icons.ChevronUp className="w-4 h-4 text-[#0B5CAD]" />
                      ) : (
                        <icons.ChevronDown className="w-4 h-4 text-[#0B5CAD]" />
                      )}
                    </ui.Label>
                  </ui.CollapsibleTrigger>
                  <ui.CollapsibleContent className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#0B5CAD] scrollbar-track-gray-100">
                    {/* {allFacilities.slice(0, 20).map((facility) => (
                      <div key={facility} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                        <ui.Checkbox
                          id={`mobile-facility-${facility}`}
                          checked={filters.selectedFacilities.includes(facility)}
                          onCheckedChange={() => handleFilterChange('facility', facility)}
                          className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD]"
                        />
                        <label
                          htmlFor={`mobile-facility-${facility}`}
                          className="text-sm text-gray-700 cursor-pointer flex-1 truncate"
                        >
                          {facility}
                        </label>
                      </div>
                    ))} */}

                    {allFacilities.slice(0, 20).map((facility) => (
  <div key={facility} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
    <ui.Checkbox
      id={`mobile-facility-${facility}`}
      checked={filters.selectedFacilities.includes(facility)}
      onCheckedChange={() => handleFilterChange('facility', facility)}
      className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] data-[state=checked]:text-white cursor-pointer"
    />
    <label
      htmlFor={`mobile-facility-${facility}`}
      className="text-sm text-gray-700 cursor-pointer flex items-center justify-between flex-1"
    >
      <span className="truncate">{facility}</span>
      <span className="ml-2 text-xs text-gray-500 shrink-0">({facilityCounts[facility] || 0})</span>  {/* ✅ ADD THIS */}
    </label>
  </div>
))}
                  </ui.CollapsibleContent>
                </div>
              </ui.Collapsible>

              <div className="border-t border-gray-200" />

              {/* Meal Type Filter */}
              <div className="space-y-2">
                <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <icons.Coffee className="w-4 h-4 text-[#0B5CAD]" />
                  Meal Type
                </ui.Label>
                <ui.Select value={filters.mealType || ""} onValueChange={(value) => handleFilterChange('meal', value)}>
                  <ui.SelectTrigger className="border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]">
                    <ui.SelectValue placeholder="All Meal Types" />
                  </ui.SelectTrigger>
                  {/* <ui.SelectContent>
                    <ui.SelectItem value="all">All Meal Types</ui.SelectItem>
                    {allMealTypes.map((type) => (
                      <ui.SelectItem key={type} value={type}>
                        {type}
                      </ui.SelectItem>
                    ))}
                  </ui.SelectContent> */}

                  <ui.SelectContent className="bg-white">
  <ui.SelectItem value="all">All Meal Types</ui.SelectItem>
  {allMealTypes.map((type) => (
    <ui.SelectItem key={type} value={type}>
      {type} ({mealTypeCounts[type] || 0})  {/* ✅ ADD COUNT */}
    </ui.SelectItem>
  ))}
</ui.SelectContent>
                </ui.Select>
              </div>

              <div className="border-t border-gray-200" />

              {/* Cancellation Filter */}
              <div className="space-y-3">
                <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <icons.RefreshCw className="w-4 h-4 text-[#0B5CAD]" />
                  Cancellation Policy
                </ui.Label>
                <ui.RadioGroup
                  value={
                    filters.refundable === null
                      ? "all"
                      : filters.refundable
                        ? "refundable"
                        : "non-refundable"
                  }
                  onValueChange={(value) => {
                    if (value === "all") handleFilterChange("refundable", null);
                    else if (value === "refundable") handleFilterChange("refundable", true);
                    else handleFilterChange("refundable", false);
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                    <ui.RadioGroupItem value="all" id="mobile-refundable-all" className="border-[#0B5CAD] text-[#0B5CAD]" />
                    <ui.Label htmlFor="mobile-refundable-all" className="text-sm cursor-pointer flex-1">
                      All Options
                    </ui.Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                    <ui.RadioGroupItem value="refundable" id="mobile-refundable-yes" className="border-[#0B5CAD] text-[#0B5CAD]" />
                    <ui.Label htmlFor="mobile-refundable-yes" className="text-sm cursor-pointer flex-1">
                      Free Cancellation
                    </ui.Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                    <ui.RadioGroupItem value="non-refundable" id="mobile-refundable-no" className="border-[#0B5CAD] text-[#0B5CAD]" />
                    <ui.Label htmlFor="mobile-refundable-no" className="text-sm cursor-pointer flex-1">
                      Non-Refundable
                    </ui.Label>
                  </div>
                </ui.RadioGroup>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-2">
              <ui.Button
                onClick={handleApplyFilters}
                className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-lg"
              >
                Apply Filters
              </ui.Button>
              <ui.Button
                onClick={handleClearAll}
                variant="outline"
                className="w-full border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white transition-colors"
              >
                Clear All Filters
              </ui.Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
