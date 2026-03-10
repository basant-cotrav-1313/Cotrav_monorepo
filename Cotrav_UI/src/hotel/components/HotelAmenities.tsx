
// import React from 'react';
// import { icons } from '@/index';

// interface HotelAmenitiesProps {
//   facilities: string[];
//   onShowMore: () => void;
// }

// type AmenityIcon = React.ComponentType<{ className?: string }> | string;

// const HotelAmenities: React.FC<HotelAmenitiesProps> = ({
//   facilities,
//   onShowMore,
// }) => {
//   if (!facilities || facilities.length === 0) return null;

//   const predefinedAmenities: {
//     keyword: string;
//     label: string;
//     icon: AmenityIcon;
//   }[] = [
//     {
//       keyword: 'restaurant',
//       label: 'Restaurant',
//       icon: icons.Utensils,
//     },
//     {
//       keyword: 'parking',
//       label: 'Parking Available',
//       icon: icons.Car,
//     },
//     {
//       keyword: 'wifi',
//       label: 'Free WiFi',
//       icon: icons.Wifi,
//     },
//     {
//       keyword: 'conference',
//       label: 'Conference Space',
//       icon: icons.Presentation,
//     },
//   ];

//   // If less than 5 facilities, show all with checkmarks
//   if (facilities.length < 5) {
//     return (
//       <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
//         {facilities.map((facility, index) => (
//           <span key={index} className="flex items-center gap-2">
//             <span className="text-black">✓</span>
//             {facility}
//           </span>
//         ))}
//       </div>
//     );
//   }

//   // Find matching predefined amenities
//   const matchedFacilities = predefinedAmenities.filter(({ keyword }) =>
//     facilities.some((facility) =>
//       facility.toLowerCase().includes(keyword)
//     )
//   );

//   // If we have matches, show icons + "more" button
//   if (matchedFacilities.length > 0) {
//     return (
//       <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
        
//         {matchedFacilities.map(({ icon, label }, index) => {
//   const Icon = typeof icon === 'string' ? null : icon;

//   return (
//     <span key={index} className="flex items-center gap-2">
//       {Icon ? (
//         <Icon className="w-5 h-5 text-gray-700" />
//       ) : (
//         <img
//           src={icon as string}
//           alt={label}
//           className="w-5 h-5"
//         />
//       )}
//       {label}
//     </span>
//   );
// })}

//         {facilities.length > matchedFacilities.length && (
//           <span
//             className="information_button text-sm cursor-pointer"
//             onClick={onShowMore}
//           >
//             +{facilities.length - matchedFacilities.length} more
//           </span>
//         )}
//       </div>
//     );
//   }

//   // No matches, show first 4 with checkmarks
//   const displayedFacilities = facilities.slice(0, 4);
//   const remainingCount = facilities.length - displayedFacilities.length;

//   return (
//     <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
//       {displayedFacilities.map((facility, index) => (
//         <span key={index} className="flex items-center gap-2">
//           <span className="text-black">✓</span>
//           {facility}
//         </span>
//       ))}

//       {remainingCount > 0 && (
//         <span
//           className="information_button text-sm cursor-pointer"
//           onClick={onShowMore}
//         >
//           +{remainingCount} more
//         </span>
//       )}
//     </div>
//   );
// };

// export default HotelAmenities;


import React from 'react';
import { icons } from '@/index';

interface HotelAmenitiesProps {
  facilities: string[];
  onShowMore: () => void;
}

type AmenityIcon = React.ComponentType<{ className?: string }> | string;

const MAX_ICONS = 6;

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({
  facilities,
  onShowMore,
}) => {
  if (!facilities || facilities.length === 0) return null;

  // Deduplicate facilities
  const uniqueFacilities = Array.from(new Set(facilities.map(f => f.trim().toLowerCase())));

  const predefinedAmenities: {
    keyword: string;
    label: string;
    icon: AmenityIcon;
  }[] = [
    { keyword: 'restaurant', label: 'Restaurant', icon: icons.Utensils },
    { keyword: 'dining', label: 'Dining', icon: icons.Utensils },
    { keyword: 'cafe', label: 'Café', icon: icons.Coffee },
    { keyword: 'wifi', label: 'Free WiFi', icon: icons.Wifi },
    { keyword: 'internet', label: 'Internet', icon: icons.Wifi },
    { keyword: 'parking', label: 'Parking', icon: icons.Car },
    { keyword: 'valet', label: 'Valet Parking', icon: icons.Car },
    { keyword: 'gym', label: 'Fitness Center', icon: icons.Dumbbell },
    { keyword: 'fitness', label: 'Fitness Center', icon: icons.Dumbbell },
    { keyword: 'pool', label: 'Swimming Pool', icon: icons.Waves },
    { keyword: 'spa', label: 'Spa', icon: icons.Sparkles },
    { keyword: 'conference', label: 'Conference Space', icon: icons.Presentation },
    { keyword: 'meeting', label: 'Meeting Room', icon: icons.Presentation },
    { keyword: 'bar', label: 'Bar', icon: icons.GlassWater },
    { keyword: 'family', label: 'Family Friendly', icon: icons.Users },
    { keyword: 'business', label: 'Business Center', icon: icons.Building2 },
  ];

  // Small list → show all with checkmarks
  if (uniqueFacilities.length <= 4) {
    return (
      <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
        {uniqueFacilities.map((facility, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="text-black">✓</span>
            {facility}
          </span>
        ))}
      </div>
    );
  }

  // Match facilities to predefined amenities
  const matchedFacilities = predefinedAmenities.filter(({ keyword }) =>
    uniqueFacilities.some(facility => facility.includes(keyword))
  );

  const displayedAmenities = matchedFacilities.slice(0, MAX_ICONS);
  const remainingCount = uniqueFacilities.length - displayedAmenities.length;

  return (
    <div className="flex flex-wrap gap-3 text-xs mb-3 px-2 items-center">
      {displayedAmenities.map(({ icon, label }, index) => {
        const Icon = typeof icon === 'string' ? null : icon;
        return (
          <span key={index} className="flex items-center gap-2">
            {Icon ? (
              <Icon className="w-6 h-6 text-gray-700" />
            ) : (
              <img src={icon as string} alt={label} className="w-6 h-6" />
            )}
            {label}
          </span>
        );
      })}

      {remainingCount > 0 && (
        <button
          type="button"
          onClick={onShowMore}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-linear-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#6f56e6] hover:to-[#5b45c6] shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer"
        >
          +{remainingCount} more
          {icons.ChevronRight && <icons.ChevronRight className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
};

export default HotelAmenities;

