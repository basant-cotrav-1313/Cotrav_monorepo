
// import React, { memo, useMemo } from 'react';
// import { hotelTypes, icons, ui } from '@/index';

// interface SharePanelModalProps {
//   selectedRooms?: hotelTypes.SelectedRoom[];
//   onClose: () => void;
//   onShare: () => void;
//   onRemoveRoom: (bookingCode: string) => void;
//   extractAttraction: (description: string) => string;
// }

// // Wrap in memo
// export const SharePanelModal = memo<SharePanelModalProps>(({
//   selectedRooms = [],
//   onClose,
//   onShare,
//   onRemoveRoom,
//   extractAttraction: _extractAttraction
// }) => {
  

//   // Memoize grouped hotels calculation
//   const groupedHotels = useMemo(() => {
//     return Object.values(
//       selectedRooms.reduce<Record<string, hotelTypes.GroupedHotel>>((acc, room) => {
//         const key = room.HotelCode + "_" + room.HotelName + "_" + (room.CityName || "");
//         if (!acc[key]) {
//           acc[key] = {
//             HotelCode: room.HotelCode,
//             HotelName: room.HotelName,
//             CityName: room.CityName,
//             Description: room.Description,
//             rooms: []
//           };
//         }
//         acc[key].rooms.push(room);
//         return acc;
//       }, {})
//     );
//   }, [selectedRooms]);

//   if (!selectedRooms || selectedRooms.length === 0) return null;

//   return (
//     <div className="fixed bottom-0 right-0 m-2 bg-white rounded-lg shadow-xl border border-gray-200 sm:w-80 md:w-85 max-h-[60vh] flex flex-col overflow-hidden z-[9998]">
//       <div className="flex bg-[#0B5CAD] px-3 py-2 items-center justify-between">
//         <h3 className="text-xs font-semibold text-white">Selected Hotels / Rooms</h3>
//         <button
//           className="text-white/80 hover:text-white hover:bg-white/10 rounded p-1 cursor-pointer transition-all"
//           onClick={onClose}
//         >
//           <icons.X className="w-3.5 h-3.5" />
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
//         {groupedHotels.map((hotelGroup, index: number) => (
//           <div key={index} className="bg-gray-50 rounded-md border border-gray-200 p-2">
//             <div className="flex items-start gap-2 mb-2">
//               <div className="shrink-0 w-6 h-6 bg-[#0B5CAD] rounded flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h4 className="text-xs font-semibold text-gray-900 truncate">
//                   {hotelGroup.HotelName}
//                 </h4>
//                 <p className="text-xs text-gray-600 truncate mt-0.5">
//                   {hotelGroup.CityName || "No City Available"}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-1.5 pl-8">
//               {hotelGroup.rooms.map((room, rIndex: number) => (
//                 <div
//                   key={rIndex}
//                   className="flex items-center justify-between gap-2 bg-white rounded border border-gray-100 p-2 hover:border-[#0B5CAD] transition-colors"
//                 >
//                   <span className="text-xs font-medium text-gray-800 truncate flex-1">
//                     {room.Name}
//                   </span>

//                   <div className="flex items-center gap-1.5 shrink-0">
//                     <span className="text-xs font-semibold text-[#0B5CAD]">
//                       ₹{Number(room.TotalFare.toFixed(2) || 0).toLocaleString('en-IN')}
//                     </span>

//                     <button
//                       onClick={() => onRemoveRoom(room.BookingCode)}
//                       className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
//                     >
//                       <icons.X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-1.5 pl-8">
//               <span className="text-xs text-[#0B5CAD] font-medium">
//                 {hotelGroup.rooms.length} {hotelGroup.rooms.length === 1 ? 'room' : 'rooms'}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-gray-50 border-t border-gray-200 px-3 py-2">
//         <ui.Button
//           type="button"
//           className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#0A4F95] hover:from-[#0A4F95] hover:to-[#073B6D] text-white font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-xs h-auto"
//           onClick={onShare}
//         >
//           <icons.Share2 className="w-3.5 h-3.5" />
//           Share hotel options
//           {selectedRooms.length > 0 && (
//             <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full ml-1">
//               {selectedRooms.length}
//             </span>
//           )}
//         </ui.Button>
//       </div>
//     </div>
//   );
// });

// SharePanelModal.displayName = 'SharePanelModal';



import React, { memo, useMemo, useState } from 'react';
import { hotelTypes, icons, ui } from '@/index';

interface SharePanelModalProps {
  selectedRooms?: hotelTypes.SelectedRoom[];
  onClose: () => void;
  onShare: () => void;
  onRemoveRoom: (bookingCode: string) => void;
  extractAttraction: (description: string) => string;
}

// Wrap in memo
export const SharePanelModal = memo<SharePanelModalProps>(({
  selectedRooms = [],
  onClose,
  onShare,
  onRemoveRoom,
  extractAttraction: _extractAttraction
}) => {
  // State for collapse/expand
  const [isExpanded, setIsExpanded] = useState(true);

  // Memoize grouped hotels calculation
  const groupedHotels = useMemo(() => {
    return Object.values(
      selectedRooms.reduce<Record<string, hotelTypes.GroupedHotel>>((acc, room) => {
        const key = room.HotelCode + "_" + room.HotelName + "_" + (room.CityName || "");
        if (!acc[key]) {
          acc[key] = {
            HotelCode: room.HotelCode,
            HotelName: room.HotelName,
            CityName: room.CityName,
            Description: room.Description,
            rooms: []
          };
        }
        acc[key].rooms.push(room);
        return acc;
      }, {})
    );
  }, [selectedRooms]);

  if (!selectedRooms || selectedRooms.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 m-2 bg-white rounded-lg shadow-xl border border-gray-200 sm:w-80 md:w-85 flex flex-col overflow-hidden z-[9998] transition-all duration-300">
      {/* Header - Clickable to toggle */}
      <div 
        className="flex bg-[#0B5CAD] px-3 py-2 items-center justify-between cursor-pointer hover:bg-[#0A4F95] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-white">Selected Hotels / Rooms</h3>
          {selectedRooms.length > 0 && (
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {selectedRooms.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Chevron icon */}
          <button
            className="text-white/80 hover:text-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <icons.ChevronUp className="w-4 h-4" />
            ) : (
              <icons.ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {/* Close button */}
          <button
            className="text-white/80 hover:text-white hover:bg-white/10 rounded p-1 cursor-pointer transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <icons.X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      <div 
        className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'opacity-100 max-h-[60vh]' : 'opacity-0 max-h-0'
        }`}
      >
        {/* Scrollable room list with fixed max height */}
        <div 
          className="overflow-y-auto px-3 py-2 space-y-2 custom-scrollbar"
          style={{ maxHeight: 'calc(60vh - 100px)' }}
        >
            {groupedHotels.map((hotelGroup, index: number) => (
              <div key={index} className="bg-gray-50 rounded-md border border-gray-200 p-2">
                <div className="flex items-start gap-2 mb-2">
                  <div className="shrink-0 w-6 h-6 bg-[#0B5CAD] rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">
                      {hotelGroup.HotelName}
                    </h4>
                    <p className="text-xs text-gray-600 truncate mt-0.5">
                      {hotelGroup.CityName || "No City Available"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pl-8">
                  {hotelGroup.rooms.map((room, rIndex: number) => (
                    <div
                      key={rIndex}
                      className="flex items-center justify-between gap-2 bg-white rounded border border-gray-100 p-2 hover:border-[#0B5CAD] transition-colors"
                    >
                      <span className="text-xs font-medium text-gray-800 truncate flex-1">
                        {room.Name}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-semibold text-[#0B5CAD]">
                          ₹{Number(room.TotalFare.toFixed(2) || 0).toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => onRemoveRoom(room.BookingCode)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                        >
                          <icons.X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-1.5 pl-8">
                  <span className="text-xs text-[#0B5CAD] font-medium">
                    {hotelGroup.rooms.length} {hotelGroup.rooms.length === 1 ? 'room' : 'rooms'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with Share button */}
          <div className="bg-gray-50 border-t border-gray-200 px-3 py-2">
            <ui.Button
              type="button"
              className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#0A4F95] hover:from-[#0A4F95] hover:to-[#073B6D] text-white font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-xs h-auto cursor-pointer"
              onClick={onShare}
            >
              <icons.Share2 className="w-3.5 h-3.5" />
              Share hotel options
              {selectedRooms.length > 0 && (
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full ml-1">
                  {selectedRooms.length}
                </span>
              )}
            </ui.Button>
          </div>
        </div>
      </div>
    
  );
});

SharePanelModal.displayName = 'SharePanelModal';
