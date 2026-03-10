
import {useEffect, useState, useRef  } from "react";
import { ui, icons, filterTypes, hotelUtils, components, hotelTypes} from "@/index";
import { GoogleMap, Marker} from '@react-google-maps/api';
import { useMapLoader } from '@/contexts/MapContext';
import { PriceFilter } from './PriceFilter'; // Import the separate component
import { AppliedFilters } from './AppliedFilters';

const PLACEHOLDER_TEXTS = [
  "Search by name...",
  "Search by location...",
  "Search by city..."
];

export const FilterSidebar: React.FC<filterTypes.FilterSidebarProps> = ({
  filters,
  allRatings,
  allFacilities,
  allMealTypes,
  ratingCounts,
  facilityCounts,
  mealTypeCounts,
  handleFilterChange,
  handleSearchChange,
  mapCenter,
  onMapClick,
  onClearAll,
  hotels = [],
  allHotels = [],
  minPrice,        
  maxPrice,        
  onRemoveFilter, 
}) => {



// const [searchInput, setSearchInput] = useState("");
// const [placeholder, setPlaceholder] = useState("");
// const [charIndex, setCharIndex] = useState(0);
// const [isDeleting, setIsDeleting] = useState(false);
// const [isTypingActive, setIsTypingActive] = useState(true);
// const [inputValue, setInputValue] = useState("");
// const [textIndex, setTextIndex] = useState(0);


// ✅ Search state
const [searchInput, setSearchInput] = useState("");
const [searchSuggestions, setSearchSuggestions] = useState<hotelTypes.SearchSuggestion[]>([]);
const [showSearchDropdown, setShowSearchDropdown] = useState(false);
const [searchDebounceTimeout, setSearchDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

// ✅ Placeholder animation state
const [placeholder, setPlaceholder] = useState("");
const [charIndex, setCharIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);
const [isTypingActive, setIsTypingActive] = useState(true);
const [textIndex, setTextIndex] = useState(0);


  const sidebarRef = useRef<HTMLDivElement>(null);
  const [selectedPriceBuckets, setSelectedPriceBuckets] = useState<string[]>([]);
  const [resetCustomInputs, setResetCustomInputs] = useState(false); 
  const [facilitiesOpen, setFacilitiesOpen] = useState(true);

  const { isLoaded, loadError } = useMapLoader();

//  useEffect(() => {
//   if (!isTypingActive) return;

//   const speed = isDeleting ? 40 : 90;

//   const timeout = setTimeout(() => {
//     if (!isDeleting) {
//       setPlaceholder(text.slice(0, charIndex + 1));
//       setCharIndex((prev) => prev + 1);

//       if (charIndex + 1 === text.length) {
//         setTimeout(() => setIsDeleting(true), 1200);
//       }
//     } else {
//       setPlaceholder(text.slice(0, charIndex - 1));
//       setCharIndex((prev) => prev - 1);

//       if (charIndex === 0) {
//         setIsDeleting(false);
//       }
//     }
//   }, speed);

//   return () => clearTimeout(timeout);
// }, [charIndex, isDeleting, isTypingActive]);

 useEffect(() => {
    if (!isTypingActive) return;

    const currentText = PLACEHOLDER_TEXTS[textIndex]; // ✅ Use the constant
    const speed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setPlaceholder(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isTypingActive, textIndex]);


// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value;
//   setInputValue(value);

//   if (value === "") {
//     // restart animation
//     setCharIndex(0);
//     setIsDeleting(false);
//     setIsTypingActive(true);
//   } else {
//     // stop animation
//     setIsTypingActive(false);
//   }

//   handleSearchChange(e);
// };


  // Calculate center from hotels or use provided mapCenter or default to Mumbai
  
  
  // ✅ Handle search input change with debounce + placeholder animation control




  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchInput(value);

  // Control placeholder animation
  if (value === "") {
    // Restart animation when input is cleared
    setCharIndex(0);
    setIsDeleting(false);
    setIsTypingActive(true);
  } else {
    // Stop animation when user is typing
    setIsTypingActive(false);
  }

  // Clear existing timeout
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout);

  // If input is empty or too short, hide dropdown
  if (!value || value.length < 2) {
    setShowSearchDropdown(false);
    setSearchSuggestions([]);
    return;
  }

  // Set new timeout for debounce (300ms)
  const timeout = setTimeout(() => {
    const suggestions = generateSearchSuggestions(value);
    setSearchSuggestions(suggestions);
    setShowSearchDropdown(suggestions.length > 0);
  }, 300);

  setSearchDebounceTimeout(timeout);
};


// Ref for click outside detection
const searchContainerRef = useRef<HTMLDivElement>(null);

const generateSearchSuggestions = (query: string): hotelTypes.SearchSuggestion[] => {
  if (!query || query.length < 2) return [];

    console.log('First hotel structure:', allHotels[0]);
  console.log('City field:', allHotels[0]?.CityName);

  const lowerQuery = query.toLowerCase();
  const suggestions: hotelTypes.SearchSuggestion[] = [];
  const cities = new Set<string>();
  const locations = new Set<string>();

  allHotels.forEach(hotel => {
    // Hotel name matches
    if (hotel.HotelName?.toLowerCase().includes(lowerQuery)) {
      suggestions.push({
        type: 'hotel',
        label: hotel.HotelName,
        hotelName: hotel.HotelName,
      });
    }

    // City matches
    if (hotel.CityName?.toLowerCase().includes(lowerQuery)) {
      console.log('Found city:', hotel.CityName);
      cities.add(hotel.CityName);
    }

    console.log('Cities found:', Array.from(cities)); 
    // Location/Address matches
    if (hotel.Address?.toLowerCase().includes(lowerQuery)) {
      locations.add(hotel.Address);
    }
  });

  // Add unique cities
  cities.forEach(city => {
    suggestions.push({
      type: 'city',
      label: city,
      cityName: city,
    });
  });

  // Add unique locations
  locations.forEach(location => {
    suggestions.push({
      type: 'location',
      label: location,
      address: location,
    });
  });

  return suggestions;
};

// Handle suggestion selection
const handleSuggestionSelect = (suggestion: hotelTypes.SearchSuggestion) => {
  // Set the search query filter
  handleFilterChange('search', suggestion.label);
  
  // Clear input and hide dropdown
  setSearchInput('');
  setShowSearchDropdown(false);
  setSearchSuggestions([]);
  
  // ✅ Restart placeholder animation
  setCharIndex(0);
  setIsDeleting(false);
  setIsTypingActive(true);
};

// Click outside handler
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowSearchDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// Handle suggestion selection
// const handleSuggestionSelect = (suggestion: hotelTypes.SearchSuggestion) => {
//   // Set the search query filter
//   handleFilterChange('search', suggestion.label);
  
//   // Clear input and hide dropdown
//   setSearchInput('');
//   setShowSearchDropdown(false);
//   setSearchSuggestions([]);
  
//   // ✅ Restart placeholder animation
//   setCharIndex(0);
//   setIsDeleting(false);
//   setIsTypingActive(true);
// };

// Click outside handler
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowSearchDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const calculateCenter = () => {
    if (mapCenter) return mapCenter;

    if (hotels && hotels.length > 0) {
      for (const hotel of hotels) {
        const coords = hotelUtils.parseCoordinates(hotel?.Map);
        if (coords) return coords;
      }
    }

    return { lat: 19.0760, lng: 72.8777 };
  };

  const center = calculateCenter();

  // ADD this line with other useState hooks:
// const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  return (
    <div ref={sidebarRef} className="hidden md:block bg-white rounded-lg w-1/3 p-4 sticky h-screen top-0 overflow-y-auto scrollbar-hide custom-scrollbar">
      {/* Map Preview Card */}
      <div className="mb-4">
        <div
          className="w-full bg-white shadow-lg rounded-lg border-2 border-[#0B5CAD]/20 cursor-pointer hover:shadow-xl hover:border-[#0B5CAD]/40 transition-all duration-300 overflow-hidden"
          onClick={onMapClick}
        >
          <div className="relative">
            {loadError ? (
              <div className="w-full h-37.5 bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
                <div className="text-center">
                  <icons.MapPin className="w-12 h-12 text-red-500 mb-2" />
                  <p className="text-xs text-gray-600">Map unavailable</p>
                </div>
              </div>
            ) : !isLoaded ? (
              <div className="w-full h-37.5 bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#0B5CAD] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs text-gray-600 font-medium">Loading map...</p>
                </div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "150px",
                }}
                center={center}
                zoom={13}
                options={{
                  disableDefaultUI: true,
                  zoomControl: false,
                  scrollwheel: false,
                  disableDoubleClickZoom: true,
                  draggable: false,
                  gestureHandling: "none",
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }]
                    }
                  ]
                }}
              >
                <Marker position={center} />
              </GoogleMap>

//               <GoogleMap
//   mapContainerStyle={{
//     width: "100%",
//     height: "150px",
//   }}
//   center={center}
//   zoom={13}
//   onLoad={(map) => setMapInstance(map)} // ✅ ADD THIS LINE
//   options={{
//     disableDefaultUI: true,
//     zoomControl: false,
//     scrollwheel: false,
//     disableDoubleClickZoom: true,
//     draggable: false,
//     gestureHandling: "none",
//     mapId: "DEMO_MAP_ID", // ✅ ADD THIS LINE
//     // styles: [
//     //   {
//     //     featureType: "poi",
//     //     elementType: "labels",
//     //     stylers: [{ visibility: "off" }]
//     //   }
//     // ]
//   }}
// >
//   <Marker map={mapInstance} position={center} /> {/* ✅ REPLACE Marker */}
// </GoogleMap>
            )}

            {/* Overlay Button */}
            <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 z-10">
              <button className="bg-white text-[#0B5CAD] hover:bg-gray-50 shadow-lg font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 border border-[#0B5CAD]/20 cursor-pointer whitespace-nowrap">
                EXPLORE ON MAP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filters Card */}
      <ui.Card className="border-2 border-[#0B5CAD]/20 pt-0 overflow-hidden gap-0">
        {/* <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] text-white text-center">
          <ui.CardTitle className="text-xl flex items-center gap-2 text-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </ui.CardTitle>
        </ui.CardHeader> */}

        <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] text-white text-center pt-2">
  <ui.CardTitle className="text-xl flex items-center gap-2 ">
    <icons.SlidersHorizontal className="w-5 h-5" />
    Filters
  </ui.CardTitle>
</ui.CardHeader>

        <ui.CardContent className="p-4 space-y-5">

          {/* Search Filter */}
          {/* <div className="space-y-2">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.Search className="w-4 h-4 text-[#0B5CAD]" />
              Search Hotels
            </ui.Label>
            <div className="relative">
              <ui.Input
                type="text"
                placeholder="Search by name..."
                placeholder={placeholder}
                className="pl-10 border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]"
                onChange={handleSearchChange}
                onChange={handleInputChange}
              />

              <ui.Input
  type="text"
  value={inputValue}
  placeholder={placeholder}
  className="pl-10 border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]"
  onChange={handleInputChange}
/>

              <icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div> */}



          {/* Search Filter */}
<div className="space-y-2" ref={searchContainerRef}>
  {/* <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
    <icons.Search className="w-4 h-4 text-[#0B5CAD]" />
    Search Hotels
  </ui.Label> */}
  <div className="relative">
    <ui.Input
      type="text"
      value={searchInput}
      placeholder={placeholder}
      className="pl-10 border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]"
      onChange={handleSearchInputChange}
      onFocus={() => {
        if (searchInput.length >= 2 && searchSuggestions.length > 0) {
          setShowSearchDropdown(true);
        }
      }}
    />
    <icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    
    {/* ✅ Search Dropdown */}
    <components.SearchDropdown
      suggestions={searchSuggestions}
      onSelect={handleSuggestionSelect}
      isVisible={showSearchDropdown}
    />
  </div>
</div>

          <div className="border-t border-gray-200 pt-4 mb-0" />
          
           <AppliedFilters
  filters={filters}
  allRatings={allRatings}
  allFacilities={allFacilities}
  allMealTypes={allMealTypes}
  priceBuckets={[]} // You can pass empty array or get from usePriceFilter if needed
  priceRange={filters.priceRange}
  minPrice={minPrice}        // ✅ Use the prop passed to FilterSidebar
  maxPrice={maxPrice}        // ✅ Use the prop passed to FilterSidebar
  selectedPriceBuckets={selectedPriceBuckets}
  // onRemoveFilter={onRemoveFilter}  // ✅ Use the prop passed to FilterSidebar
  onRemoveFilter={(type, value) => {
    if (type === 'priceBucket') {
      // Remove specific bucket
      setSelectedPriceBuckets(prev => prev.filter(b => b !== value));
    }
     if (type === 'customPrice') { // ✅ ADD THIS
      setResetCustomInputs(true);
      setTimeout(() => setResetCustomInputs(false), 100);
    }
    onRemoveFilter(type, value);
  }}
  // onClearAll={onClearAll}
 onClearAll={() => {
    handleFilterChange("priceBucket", []); // ✅ ADD THIS - Clear price buckets
    setResetCustomInputs(true);
    setTimeout(() => setResetCustomInputs(false), 100);
    onClearAll(); // Then call the original clear all
  }}
/>


          <PriceFilter
          // key={`price-filter-${filters.priceRange[0]}-${filters.priceRange[1]}`}
            hotels={allHotels.length > 0 ? allHotels : hotels}
            priceRange={filters.priceRange}
            selectedPriceBuckets={filters.selectedPriceBuckets}
            resetCustomInputs={resetCustomInputs} 
            onPriceChange={(range) => handleFilterChange("price", range as [number, number])}
             onBucketsChange={(buckets) => handleFilterChange("priceBucket", buckets)}
          />

          <div className="border-t border-gray-200 pt-4 mb-0" />

          {/* Star Rating Filter */}
          <div className="space-y-3">
            <ui.Label className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-0">
              <icons.Star className="w-4 h-4 text-[#0B5CAD]" />
              Star Rating
            </ui.Label>
            <div className="space-y-2">
              {/* {allRatings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                  <ui.Checkbox
                    id={`rating-${rating}`}
                    checked={filters.selectedRatings.includes(rating)}
                    onCheckedChange={() => handleFilterChange("rating", rating)}
                    className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD]"
                  />
                  <ui.Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
                  >
                    <span className="font-medium">{rating}</span>
                    <icons.Star className="w-3 h-3 fill-[#0B5CAD] text-[#0B5CAD]" />
                    {rating === 1 ? '' : <span className="text-gray-500">& above</span>}
                  </ui.Label>
                </div>
              ))} */}

              {allRatings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                  <ui.Checkbox
                    id={`rating-${rating}`}
                    checked={filters.selectedRatings.includes(rating)}
                    onCheckedChange={() => handleFilterChange("rating", rating)}
                    className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] data-[state=checked]:text-white cursor-pointer"
                  />

                
                  <ui.Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
                  >
                    <span className="font-medium">{rating}</span>
                    <icons.Star className="w-3 h-3 fill-[#0B5CAD] text-[#0B5CAD]" />
                    {rating === 1 ? '' : <span className="text-gray-500">& above</span>}
                    <span className="ml-auto text-xs text-gray-500">({ratingCounts[rating] || 0})</span>  {/* ← ADD THIS */}
                  </ui.Label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-0" />

          {/* Facilities Filter */}
          <ui.Collapsible open={facilitiesOpen} onOpenChange={setFacilitiesOpen}>
            <div className="space-y-3">
              <ui.CollapsibleTrigger className="w-full">
                <ui.Label className="text-md font-semibold text-gray-700 flex items-center justify-between cursor-pointer hover:text-[#0B5CAD] transition-colors mb-0">
                  <span className="flex items-center gap-2">
                    <icons.Building2 className="w-4 h-4 text-[#0B5CAD]" />
                    Facilities
                  </span>
                  {facilitiesOpen ? (
                    <icons.ChevronUp className="w-4 h-4 text-[#0B5CAD]" />
                  ) : (
                    <icons.ChevronDown className="w-4 h-4 text-[#0B5CAD]" />
                  )}
                </ui.Label>
              </ui.CollapsibleTrigger>
              <ui.CollapsibleContent className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#0B5CAD] scrollbar-track-gray-100 custom-scrollbar">
                {/* {allFacilities.slice(0, 20).map((facility) => (
                  <div key={facility} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                    <ui.Checkbox
                      id={`facility-${facility}`}
                      checked={filters.selectedFacilities.includes(facility)}
                      onCheckedChange={() => handleFilterChange("facility", facility)}
                      className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD]"
                    />
                    <label
                      htmlFor={`facility-${facility}`}
                      className="text-sm text-gray-700 cursor-pointer flex-1 truncate"
                    >
                      {facility}
                    </label>
                  </div>
                ))} */}

                {allFacilities.slice(0, 20).map((facility) => (
                  <div key={facility} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                    <ui.Checkbox
                      id={`facility-${facility}`}
                      checked={filters.selectedFacilities.includes(facility)}
                      onCheckedChange={() => handleFilterChange("facility", facility)}
                      className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] data-[state=checked]:text-white cursor-pointer"
                    />
                    <label
                      htmlFor={`facility-${facility}`}
                      className="text-sm text-gray-700 cursor-pointer flex items-center justify-between flex-1"
                    >
                      <span className="truncate">{facility}</span>
                      <span className="ml-2 text-xs text-gray-500 shrink-0">({facilityCounts[facility] || 0})</span>  {/* ← ADD THIS */}
                    </label>
                  </div>
                ))}
              </ui.CollapsibleContent>
            </div>
          </ui.Collapsible>

          <div className="border-t border-gray-200 pt-4 mb-0" />

          {/* Meal Type Filter */}
          {/* <div className="space-y-2">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.Coffee className="w-4 h-4 text-[#0B5CAD]" />
              Meal Type
            </ui.Label>
            <ui.Select value={filters.mealType || ""} onValueChange={(value) => handleFilterChange("meal", value)}>
              <ui.SelectTrigger className="border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]">
                <ui.SelectValue placeholder="All Meal Types" />
              </ui.SelectTrigger>
              <ui.SelectContent className="bg-white">
                <ui.SelectItem value="all">All Meal Types</ui.SelectItem>
                {allMealTypes.map((type) => (
                  <ui.SelectItem key={type} value={type}>
                    {type}
                  </ui.SelectItem>
                ))}
              </ui.SelectContent>

              <ui.SelectContent className="bg-white">
                <ui.SelectItem value="all">All Meal Types</ui.SelectItem>
                {allMealTypes.map((type) => (
                  <ui.SelectItem key={type} value={type}>
                    {type} ({mealTypeCounts[type] || 0})  
                  </ui.SelectItem>
                ))}
              </ui.SelectContent>
            </ui.Select>
          </div> */}


          {/* Meal Type Filter */}
<div className="space-y-3">
  <ui.Label className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-0">
    <icons.Coffee className="w-4 h-4 text-[#0B5CAD]" />
    Meal Type
  </ui.Label>
  <div className="space-y-2">
    {allMealTypes.map((type) => (
      <div key={type} className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
        <ui.Checkbox
          id={`meal-${type}`}
          checked={filters.selectedMealTypes.includes(type)}
          onCheckedChange={() => handleFilterChange("meal", type)}
          className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] data-[state=checked]:text-white cursor-pointer"
        />
        <ui.Label
          htmlFor={`meal-${type}`}
          className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
        >
          <span className="truncate">{type}</span>
          <span className="ml-auto text-xs text-gray-500">({mealTypeCounts[type] || 0})</span>
        </ui.Label>
      </div>
    ))}
  </div>
</div>

          {/* <div className="border-t border-gray-200 pt-4" /> */}

          {/* Cancellation Filter */}
          {/* <div className="space-y-3">
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
              className="space-y-2 gap-0"
            >
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                <ui.RadioGroupItem value="all" id="refundable-all" className="border-[#0B5CAD] text-[#0B5CAD]" />
                <ui.Label htmlFor="refundable-all" className="text-sm cursor-pointer flex-1">
                  All Options
                </ui.Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                <ui.RadioGroupItem value="refundable" id="refundable-yes" className="border-[#0B5CAD] text-[#0B5CAD]" />
                <ui.Label htmlFor="refundable-yes" className="text-sm cursor-pointer flex-1">
                  Free Cancellation
                </ui.Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors">
                <ui.RadioGroupItem value="non-refundable" id="refundable-no" className="border-[#0B5CAD] text-[#0B5CAD]" />
                <ui.Label htmlFor="refundable-no" className="text-sm cursor-pointer flex-1">
                  Non-Refundable
                </ui.Label>
              </div>
            </ui.RadioGroup>
          </div> */}

          
          <div className="pt-4">
            <ui.Button
              variant="outline"
              className="w-full border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white transition-colors"
              onClick={() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  sidebarRef.current?.scrollTo({ top: 0, behavior: "smooth" });
}}

            >
              <icons.ChevronUp className="w-4 h-4 mr-2" />
              Back To Top
            </ui.Button >
          </div>
        </ui.CardContent>
      </ui.Card>
    </div>
  );
};
