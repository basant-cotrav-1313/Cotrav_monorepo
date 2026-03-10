import React from 'react';
import { icons } from '@/index';
import * as hotelTypes from '@/hotel/types/hotel';

interface SearchDropdownProps {
  suggestions: hotelTypes.SearchSuggestion[];
  onSelect: (suggestion: hotelTypes.SearchSuggestion) => void;
  isVisible: boolean;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  suggestions,
  onSelect,
  isVisible,
}) => {
  if (!isVisible || suggestions.length === 0) return null;

  // Group suggestions by type
  const hotels = suggestions.filter(s => s.type === 'hotel').slice(0, 5);
  const cities = suggestions.filter(s => s.type === 'city').slice(0, 3);
  const locations = suggestions.filter(s => s.type === 'location').slice(0, 3);

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto custom-scrollbar">
      {/* Hotels Section */}
      {/* {hotels.length > 0 && (
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Hotels
          </div>
          {hotels.map((suggestion, index) => (
            <button
              key={`hotel-${index}`}
              onClick={() => onSelect(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-[#0B5CAD]/10 rounded-md transition-colors flex items-center gap-2"
            >
              <icons.Building2 className="w-4 h-4 text-[#0B5CAD] flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">{suggestion.label}</span>
            </button>
          ))}
        </div>
      )} */}

      {/* Cities Section */}
      {/* {cities.length > 0 && (
        <div className="p-2 border-t border-gray-100">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Cities
          </div>
          {cities.map((suggestion, index) => (
            <button
              key={`city-${index}`}
              onClick={() => onSelect(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-[#0B5CAD]/10 rounded-md transition-colors flex items-center gap-2"
            >
              <icons.MapPin className="w-4 h-4 text-[#0B5CAD] flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">{suggestion.label}</span>
            </button>
          ))}
        </div>
      )} */}

      {/* Locations Section */}
      {/* {locations.length > 0 && (
        <div className="p-2 border-t border-gray-100">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Locations
          </div>
          {locations.map((suggestion, index) => (
            <button
              key={`location-${index}`}
              onClick={() => onSelect(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-[#0B5CAD]/10 rounded-md transition-colors flex items-center gap-2"
            >
              <icons.Navigation className="w-4 h-4 text-[#0B5CAD] flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">{suggestion.label}</span>
            </button>
          ))}
        </div>
      )} */}

      {/* Hotels Section */}
{hotels.length > 0 && (
  <div className="p-2">
    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
      Hotels
    </div>
    {hotels.map((suggestion, index) => (
      <button
        key={`hotel-${index}`}
        onClick={() => onSelect(suggestion)}
        className="w-full text-left px-3 py-2 hover:bg-[#0B5CAD]/10 rounded-md transition-colors flex items-start gap-2"
      >
        <icons.Building2 className="w-4 h-4 text-[#0B5CAD] flex-shrink-0 mt-0.5" />
        <span className="text-sm text-gray-700 break-words">{suggestion.label}</span>
      </button>
    ))}
  </div>
)}

{/* Cities Section */}
{cities.length > 0 && (
  <div className="p-2 border-t border-gray-100">
    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
      Cities
    </div>
    {cities.map((suggestion, index) => (
      <button
        key={`city-${index}`}
        onClick={() => onSelect(suggestion)}
        className="w-full text-left px-3 py-2 hover:bg-[#0B5CAD]/10 rounded-md transition-colors flex items-start gap-2"
      >
        <icons.MapPin className="w-4 h-4 text-[#0B5CAD] flex-shrink-0 mt-0.5" />
        <span className="text-sm text-gray-700 break-words">{suggestion.label}</span>
      </button>
    ))}
  </div>
)}

{/* Locations Section */}
{locations.length > 0 && (
  <div className="p-2 border-t border-gray-100">
    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
      Locations
    </div>
    {locations.map((suggestion, index) => (
      <button
        key={`location-${index}`}
        onClick={() => onSelect(suggestion)}
        className="w-full text-left px-3 py-2 hover:bg-[#0B5CAD]/10 rounded-md transition-colors flex items-start gap-2"
      >
        <icons.Navigation className="w-4 h-4 text-[#0B5CAD] flex-shrink-0 mt-0.5" />
        <span className="text-sm text-gray-700 break-words">{suggestion.label}</span>
      </button>
    ))}
  </div>
)}
    </div>
  );
};
