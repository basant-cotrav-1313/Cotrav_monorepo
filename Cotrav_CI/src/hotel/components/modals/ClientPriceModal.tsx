
// import React, { useMemo, useState } from 'react';
// import {
//   MapPin,
//   Clock,
//   IndianRupee,
//   X,
//   TrendingUp,
// } from 'lucide-react';
// import { hotelUtils, hotelTypes, timeFormatter } from '@/index';

// interface ClientPriceModalProps {
//   isOpen: boolean;
//   hotel: hotelTypes.Hotel;
//   onClose: () => void;
//   onConfirm: (data: {
//     clientPrice: number;
//     totalFare: number;
//     nights: number;
//     markupPerNight: number;
//     totalMarkup: number;
//   }) => void;
// }

// export const ClientPriceModal: React.FC<ClientPriceModalProps> = ({
//   isOpen,
//   hotel,
//   onClose,
//   onConfirm,
// }) => {
//   const [clientPrice, setClientPrice] = useState('');

//   /* -------------------- DATA -------------------- */
//   const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
//   const lowestFareRoom = useMemo(
//     () => hotelUtils.getLowestFareRoom(rooms),
//     [rooms]
//   );
//   const nights = useMemo(
//     () => hotelUtils.getNumberOfNights(lowestFareRoom),
//     [lowestFareRoom]
//   );
//   const { totalFare } = useMemo(
//     () => hotelUtils.getRoomPricing(lowestFareRoom, nights),
//     [lowestFareRoom, nights]
//   );

//   const numericClientPrice = Number(clientPrice);
//   const isInvalid =
//     !numericClientPrice || numericClientPrice <= totalFare;

//   const totalMarkup = !isInvalid
//     ? numericClientPrice - totalFare
//     : 0;

//   const markupPerNight = !isInvalid && nights > 0
//     ? totalMarkup / nights
//     : 0;



//   const handleConfirm = () => {
//     if (isInvalid) return;
//     onConfirm({
//       clientPrice: numericClientPrice,
//       totalFare,
//       nights,
//       markupPerNight,
//       totalMarkup,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideUp {
//           from { 
//             opacity: 0;
//             transform: translateY(40px) scale(0.95);
//           }
//           to { 
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .backdrop {
//           animation: fadeIn 0.15s ease-out;
//         }
        
//         .modal-container {
//           animation: slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1);
//         }
        
//         .stagger-1 { animation: slideInUp 0.3s ease-out 0.05s both; }
//         .stagger-2 { animation: slideInUp 0.3s ease-out 0.1s both; }
//         .stagger-3 { animation: slideInUp 0.3s ease-out 0.15s both; }
//         .stagger-4 { animation: slideInUp 0.3s ease-out 0.2s both; }
        
//         .markup-reveal {
//           animation: scaleIn 0.25s ease-out;
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         className="backdrop fixed inset-0 z-50 bg-black/40"
//         style={{ backdropFilter: 'blur(8px)' }}
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div
//           className="modal-container w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-2xl max-h-[90vh] flex flex-col"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="relative px-5 py-4 text-white bg-[#0B5CAD]">
//             <h2 className="text-lg font-semibold">
//               Client Price Configuration
//               {/* Markup Price Configuration */}
//             </h2>
//             {/* <p className="text-xs text-white/90 mt-0.5">
//               Final price visible to client
//             </p> */}

//             <button
//               onClick={onClose}
//               className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
            
//             {/* Hotel Info */}
//             <div className="stagger-1 rounded-lg border border-gray-200 p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
//               <p className="font-semibold text-sm text-gray-900">{hotel.HotelName}</p>
//               <div className="flex items-start gap-1.5 mt-1 text-xs text-gray-600">
//                 <MapPin size={12} className="mt-0.5 flex-shrink-0 text-[#0B5CAD]" />
//                 <span className="leading-relaxed">{hotel.Address}</span>
//               </div>
//             </div>

//             {/* Check-in/out */}
//             <div className="stagger-2 grid grid-cols-2 gap-2 text-xs">
//               <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white hover:border-[#0B5CAD] transition-colors duration-200">
//                 <Clock size={12} className="text-[#0B5CAD]" />
//                 <div>
//                   <p className="text-gray-500">Check-in</p>
//                   <p className="font-semibold text-gray-900">{timeFormatter.convertTo12Hour(hotel.CheckInTime) || 'Not specified'}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white hover:border-[#0B5CAD] transition-colors duration-200">
//                 <Clock size={12} className="text-[#0B5CAD]" />
//                 <div>
//                   <p className="text-gray-500">Check-out</p>
//                   <p className="font-semibold text-gray-900">{timeFormatter.convertTo12Hour(hotel.CheckOutTime) || 'Not specified'}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Base Price */}
//             {/* <div className="stagger-3 flex justify-between items-center p-3 rounded-lg bg-gray-900 text-white"> */}
//             <div className="stagger-3 flex justify-between items-center p-3 rounded-lg bg-[#0B5CAD] text-white">
//               <span className="text-xs font-medium">Base Fare ({nights} nights)</span>
//               <span className="text-lg font-bold">
//                 ₹{Math.round(totalFare).toLocaleString('en-IN')}
//               </span>
//             </div>

//             {/* Client Price Input */}
//             <div className="stagger-4">
//               <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
//                 Client Price
//                 {/* Markup Price */}
//               </label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                   <IndianRupee size={16} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="number"
//                   value={clientPrice}
//                   onChange={(e) => setClientPrice(e.target.value)}
//                   placeholder="Enter final price"
//                   className={`w-full h-10 rounded-lg border-2 pl-10 pr-3 text-sm font-semibold focus:outline-none focus:ring-3 transition-all duration-200 ${
//                     isInvalid && clientPrice
//                       ? 'border-red-400 focus:ring-red-200 bg-red-50'
//                       : 'border-gray-300 focus:ring-[#0B5CAD]/30 focus:border-[#0B5CAD] bg-white'
//                   }`}
//                 />
//               </div>
//               {isInvalid && clientPrice && (
//                 <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
//                   <span className="w-1 h-1 rounded-full bg-red-600" />
//                   {/* Client price must be higher than base fare */}
//                   New price must be higher than base fare
//                 </p>
//               )}
//             </div>

//             {/* Markup Display */}
//             {!isInvalid && clientPrice && (
//               <div className="markup-reveal rounded-lg bg-emerald-50 border-2 border-emerald-300 p-3 shadow-sm">
//                 <div className="flex items-center gap-1.5 mb-2 text-emerald-900">
//                   <TrendingUp size={16} />
//                   <span className="font-semibold text-sm">Your Markup</span>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs text-emerald-700">Per night</span>
//                     <span className="text-lg font-bold text-emerald-900">
//                       ₹{markupPerNight.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="h-px bg-emerald-300" />
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs text-emerald-700">Total ({nights} nights)</span>
//                     <span className="text-xl font-bold text-emerald-900">
//                       ₹{totalMarkup.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
//             <div className="flex gap-2">
//               <button
//                 onClick={onClose}
//                 className="w-1/2 h-10 rounded-lg border-2 border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all duration-200"
//               >
//                 Cancel
//               </button>
              
//               <button
//                 onClick={handleConfirm}
//                 disabled={isInvalid}
//                 className="w-1/2 h-10 rounded-lg bg-[#0B5CAD] hover:bg-[#0A4F95] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useMemo, useState } from 'react';
import {
  MapPin,
  Clock,
  IndianRupee,
  X,
  TrendingUp,
  BedDouble,
} from 'lucide-react';
import { hotelUtils, hotelTypes, timeFormatter } from '@/index';

interface ClientPriceModalProps {
  isOpen: boolean;
  hotel: hotelTypes.Hotel;
  room?: hotelTypes.Room; 
  onClose: () => void;
  onConfirm: (data: {
    clientPrice: number;
    totalFare: number;
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
  }) => void;
}

export const ClientPriceModal: React.FC<ClientPriceModalProps> = ({
  isOpen,
  hotel,
  room,
  onClose,
  onConfirm,
}) => {
  const [clientPricePerNight, setClientPricePerNight] = useState('');

  /* -------------------- DATA -------------------- */
  // const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
  // const lowestFareRoom = useMemo(
  //   () => hotelUtils.getLowestFareRoom(rooms),
  //   [rooms]
  // );
  // const nights = useMemo(
  //   () => hotelUtils.getNumberOfNights(lowestFareRoom),
  //   [lowestFareRoom]
  // );
  // const { totalFare } = useMemo(
  //   () => hotelUtils.getRoomPricing(lowestFareRoom, nights),
  //   [lowestFareRoom, nights]
  // );

  const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
const lowestFareRoom = useMemo(
  () => hotelUtils.getLowestFareRoom(rooms),
  [rooms]
);

// ✅ Use specific room if passed, otherwise lowestFareRoom
const activeRoom = room ?? lowestFareRoom;

const nights = useMemo(
  () => hotelUtils.getNumberOfNights(activeRoom),  // ✅ use activeRoom
  [activeRoom]
);
const { totalFare } = useMemo(
  () => hotelUtils.getRoomPricing(activeRoom, nights),  // ✅ use activeRoom
  [activeRoom, nights]
);

const roomName = useMemo(() => {
  if (!activeRoom) return null;  // ✅ use activeRoom
  if (Array.isArray(activeRoom.Name)) {
    return activeRoom.Name[0] || null;
  }
  return activeRoom.Name || null;
}, [activeRoom]);

  // Per night base fare
  const perNightFare = nights > 0 ? totalFare / nights : 0;

  // Room name
  // const roomName = useMemo(() => {
  //   if (!lowestFareRoom) return null;
  //   if (Array.isArray(lowestFareRoom.Name)) {
  //     return lowestFareRoom.Name[0] || null;
  //   }
  //   return lowestFareRoom.Name || null;
  // }, [lowestFareRoom]);

  /* -------------------- CALCULATIONS -------------------- */
  const numericClientPricePerNight = Number(clientPricePerNight);

  // Invalid if empty or not greater than perNightFare
  const isInvalid =
    !numericClientPricePerNight || numericClientPricePerNight <= perNightFare;

  // Markup per night = input - perNightFare
  const markupPerNight = !isInvalid
    ? numericClientPricePerNight - perNightFare
    : 0;

  // Total markup = markupPerNight * nights
  const totalMarkup = !isInvalid ? markupPerNight * nights : 0;

  // New total fare = input * nights  (same as totalFare + totalMarkup)
  const newTotalFare = !isInvalid ? numericClientPricePerNight * nights : 0;

  /* -------------------- HANDLERS -------------------- */
  const handleConfirm = () => {
    if (isInvalid) return;
    onConfirm({
      clientPrice: newTotalFare,
      totalFare: newTotalFare,
      nights,
      markupPerNight,
      totalMarkup,
    });
  };

  if (!isOpen) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  // Allow only digits and max one decimal point
  if (/^\d*\.?\d*$/.test(value)) {
    setClientPricePerNight(value);
  }
};

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .backdrop {
          animation: fadeIn 0.15s ease-out;
        }
        
        .modal-container {
          animation: slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .stagger-1 { animation: slideInUp 0.3s ease-out 0.05s both; }
        .stagger-2 { animation: slideInUp 0.3s ease-out 0.1s both; }
        .stagger-3 { animation: slideInUp 0.3s ease-out 0.15s both; }
        .stagger-4 { animation: slideInUp 0.3s ease-out 0.2s both; }
        
        .markup-reveal {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="backdrop fixed inset-0 z-50 bg-black/40"
        style={{ backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="modal-container w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-5 py-4 text-white bg-[#0B5CAD]">
            <h2 className="text-lg font-semibold">
              Client Price Configuration
            </h2>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">

            {/* Hotel Info */}
            <div className="stagger-1 rounded-lg border border-gray-200 p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <p className="font-semibold text-sm text-gray-900">{hotel.HotelName}</p>
              <div className="flex items-start gap-1.5 mt-1 text-xs text-gray-600">
                <MapPin size={12} className="mt-0.5 flex-shrink-0 text-[#0B5CAD]" />
                <span className="leading-relaxed">{hotel.Address}</span>
              </div>

              {/* Room Name */}
              {roomName && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
                  <BedDouble size={12} className="flex-shrink-0 text-[#0B5CAD]" />
                  <span className="leading-relaxed">{roomName}</span>
                </div>
              )}
            </div>

            {/* Check-in/out */}
            <div className="stagger-2 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white hover:border-[#0B5CAD] transition-colors duration-200">
                <Clock size={12} className="text-[#0B5CAD]" />
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-semibold text-gray-900">
                    {timeFormatter.convertTo12Hour(hotel.CheckInTime) || 'Not specified'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white hover:border-[#0B5CAD] transition-colors duration-200">
                <Clock size={12} className="text-[#0B5CAD]" />
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-semibold text-gray-900">
                    {timeFormatter.convertTo12Hour(hotel.CheckOutTime) || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Base Fare Card - shows total + per night */}
            <div className="stagger-3 rounded-lg bg-[#0B5CAD] text-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-white/80">Base Fare</p>
                  <p className="text-lg font-bold mt-0.5">
                    ₹{Math.round(totalFare).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-white/70 mt-0.5">{nights} night{nights > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right bg-white/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-white/80">Per Night</p>
                  <p className="text-lg font-bold mt-0.5">
                    ₹{perNightFare.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Client Price Per Night Input */}
            <div className="stagger-4">
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Client Price Per Night
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <IndianRupee size={16} className="text-gray-400" />
                </div>
                <input
                  // type="number"
                  type="text"
                  inputMode="decimal" 
                  value={clientPricePerNight}
                  // onChange={(e) => setClientPricePerNight(e.target.value)}
                  onChange={handlePriceChange}
                  placeholder={`Enter price > ₹${perNightFare.toFixed(2)}`}
                  className={`w-full h-10 rounded-lg border-2 pl-10 pr-3 text-sm font-semibold focus:outline-none focus:ring-3 transition-all duration-200 ${
                    isInvalid && clientPricePerNight
                      ? 'border-red-400 focus:ring-red-200 bg-red-50'
                      : 'border-gray-300 focus:ring-[#0B5CAD]/30 focus:border-[#0B5CAD] bg-white'
                  }`}
                />
              </div>
              {isInvalid && clientPricePerNight && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                  Price per night must be greater than ₹{perNightFare.toFixed(2)}
                </p>
              )}
            </div>

            {/* Markup Breakdown */}
            {!isInvalid && clientPricePerNight && (
              <div className="markup-reveal rounded-lg bg-emerald-50 border-2 border-emerald-300 p-3 shadow-sm">
                <div className="flex items-center gap-1.5 mb-2 text-emerald-900">
                  <TrendingUp size={16} />
                  <span className="font-semibold text-sm">Markup Breakdown</span>
                </div>

                <div className="space-y-2">
                  {/* Markup per night */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-700">Markup per night</span>
                    <span className="text-base font-bold text-emerald-900">
                      ₹{markupPerNight.toFixed(2)}
                    </span>
                  </div>

                  {/* Total markup */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-700">
                      Total Markup ({nights} night{nights > 1 ? 's' : ''})
                    </span>
                    <span className="text-base font-bold text-emerald-900">
                      ₹{totalMarkup.toFixed(2)}
                    </span>
                  </div>

                  <div className="h-px bg-emerald-300" />

                  {/* New total fare */}
                  <div className="flex justify-between items-center bg-emerald-100 rounded-lg p-2 border border-emerald-200">
                    <div>
                      <span className="text-xs text-emerald-700 font-semibold block">
                        New Total Fare
                      </span>
                      <span className="text-[10px] text-emerald-600">
                        ₹{numericClientPricePerNight.toFixed(2)} × {nights} night{nights > 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-emerald-900">
                      ₹{newTotalFare.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="w-1/2 h-10 rounded-lg border-2 border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isInvalid}
                className="w-1/2 h-10 rounded-lg bg-[#0B5CAD] hover:bg-[#0A4F95] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
