// import React from 'react';
// import { hotelDetailsTypes } from '@/index';

// interface StickyHeaderProps {
//   showHeader: boolean;
//   activeSection: hotelDetailsTypes.SectionKey;
//   hasMultipleRooms: boolean;
//   onNavigate: (section: hotelDetailsTypes.SectionKey) => void;
// }

// const StickyHeader: React.FC<StickyHeaderProps> = ({
//   showHeader,
//   activeSection,
//   hasMultipleRooms,
//   onNavigate,
// }) => {
//   if (!showHeader) return null;

//   const sections: { id: hotelDetailsTypes.SectionKey; label: string }[] = [
//   { id: 'overview', label: 'Overview' },
//   ...(hasMultipleRooms ? [{ id: 'rooms', label: 'Rooms' } as { id: hotelDetailsTypes.SectionKey; label: string }] : []),
//   { id: 'location', label: 'Location' },
// ];


//   return (
//     <div
//       className="fixed w-full bg-[#e8e4ff] shadow-md z-50 flex h-10 top-0"
      
//     >
//       <div className="flex gap-5">
//         {sections.map((section) => (
//           <button
//             key={section.id}
//             onClick={() => onNavigate(section.id)}
//             className={`${
//               activeSection === section.id
//                 ? 'font-bold text-[#0B5CAD]'
//                 : 'text-white-600'
//             } transition-colors duration-200 hover:text-[#0B5CAD]`}
//             style={{ marginLeft: '17%' }}
//           >
//             {section.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StickyHeader;


import React from 'react';
import { hotelDetailsTypes } from '@/index';

interface StickyHeaderProps {
  showHeader: boolean;
  activeSection: hotelDetailsTypes.SectionKey;
  hasMultipleRooms: boolean;
  onNavigate: (section: hotelDetailsTypes.SectionKey) => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  showHeader,
  activeSection,
  hasMultipleRooms,
  onNavigate,
}) => {
  if (!showHeader) return null;

  const sections: { id: hotelDetailsTypes.SectionKey; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    ...(hasMultipleRooms ? [{ id: 'rooms', label: 'Rooms' } as { id: hotelDetailsTypes.SectionKey; label: string }] : []),
    { id: 'location', label: 'Location' },
  ];

  return (
    <div className="fixed w-full bg-[#e8e4ff] shadow-md z-50 flex justify-center items-center h-10 top-0">
      <div className="flex gap-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`px-4 py-2 font-semibold transition-all duration-200 ${
              activeSection === section.id
                ? 'text-[#0B5CAD] border-b-2 border-[#0B5CAD]'
                : 'text-gray-600 hover:text-[#0B5CAD]'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickyHeader;
