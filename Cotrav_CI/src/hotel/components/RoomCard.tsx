
// // import React, { useState, useMemo } from 'react';

// // import { RoomCardProps } from '../types/hotelDetail.types';
// // import { icons } from '@/index';

// // const RoomCard: React.FC<RoomCardProps> = ({
// //   room,
// //   hotel,
// //   index,
// //   onSelectRoom,
// //   onShowDetails,
// //   pricing, // ✅ NEW: pricing data from ClientPriceModal
// // }) => {
// //   const [showBreakdown, setShowBreakdown] = useState(false);

// //   const facilities = hotel.HotelFacilities ?? [];

// //   // ✅ Calculate room-specific pricing with markup
// //   // const roomPricing = useMemo(() => {
// //   //   if (!pricing) {
// //   //     // No markup - show original price
// //   //     return {
// //   //       originalPrice: room.TotalFare,
// //   //       clientPrice: room.TotalFare,
// //   //       markup: 0,
// //   //       hasMarkup: false,
// //   //     };
// //   //   }

// //   //   // Calculate markup for this specific room
// //   //   const markupAmount = (room.TotalFare * pricing.totalMarkup) / pricing.totalFare;
// //   //   const clientPrice = room.TotalFare + markupAmount;

// //   //   return {
// //   //     originalPrice: room.TotalFare,
// //   //     clientPrice: clientPrice,
// //   //     markup: markupAmount,
// //   //     hasMarkup: true,
// //   //     markupPerNight: pricing.markupPerNight,
// //   //     nights: pricing.nights,
// //   //   };
// //   // }, [room.TotalFare, pricing]);

// // const roomPricing = useMemo(() => {
// //   if (!pricing) {
// //     return {
// //       originalPrice: room.TotalFare,
// //       clientPrice: room.TotalFare,
// //       markup: 0,
// //       hasMarkup: false,
// //     };
// //   }

// //   // ✅ Use fixed markup per night (same for all rooms)
// //   const markupAmount = pricing.markupPerNight * pricing.nights;
// //   const clientPrice = room.TotalFare + markupAmount;

// //   return {
// //     originalPrice: room.TotalFare,
// //     clientPrice: clientPrice,
// //     markup: markupAmount,
// //     hasMarkup: true,
// //     markupPerNight: pricing.markupPerNight,
// //     nights: pricing.nights,
// //   };
// // }, [room.TotalFare, pricing]);

// //   return (
// //     <div className="p-6 border-b last:border-b-0 border-gray-100 hover:bg-blue-50/30 transition-all duration-200">
// //       {/* Large Screen: Horizontal Layout */}
// //       <div className="hidden lg:flex justify-between items-start gap-6">
// //         {/* Left Section - Room Details */}
// //         <div className="flex-1">
// //           <div className="flex items-start gap-4 mb-4">
// //             {/* Icon Badge */}
// //             <div className="w-10 h-10 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-xl flex items-center justify-center shrink-0 shadow-md">
// //               <icons.BedDouble className="w-5 h-5 text-white" />
// //             </div>

// //             {/* Room Name & Meal Type */}
// //             <div className="flex-1">
// //               <h5 className="text-[#3b3f5c] text-lg font-bold mb-1 leading-tight">
// //                 {room?.Name?.[0] || 'No Room Info Available'}
// //               </h5>

// //               <div className="flex gap-2">
// //                 {/* <div className="text-gray-700">Meal: </div> */}
// //                 {room?.MealType && (
// //                   <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                    
// //                     <icons.Coffee className="w-3.5 h-3.5" />
// //                     {/* {room.MealType} */}
// //                     {`${room.MealType} Included`}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Facilities Grid */}
// //           {facilities.length > 0 && (
// //             <div className="mb-3">
// //               <div className="grid grid-cols-2 gap-2">
// //                 {facilities.slice(0, 6).map((facility, i) => (
// //                   <div
// //                     // key={i}
// //                     key={`facility-desktop-${index}-${i}`} 
// //                     className="flex items-center gap-2 text-sm text-gray-700"
// //                   >
// //                     <div className="w-1.5 h-1.5 bg-[#0B5CAD] rounded-full"></div>
// //                     {facility}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

         
// //           {/* More Details & Inclusion */}
// //           <div className="space-y-2 mt-4">
// //             <button
// //               className="text-[#0B5CAD] hover:text-[#073B6D] text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer"
// //               onClick={onShowDetails}
// //             >
// //               View Full Details
              
// //               <icons.ChevronRight className="w-4 h-4" />
// //             </button>

// //             {room?.Inclusion && (
// //               <div className="flex items-start gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                
// //                 <icons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
// //                 <span>{room.Inclusion}</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right Section - Price & Button */}
// //         <div className="text-right flex flex-col justify-between min-w-55 bg-gray-50 rounded-xl p-5 border border-gray-200 relative">
// //           <div className="mb-4">
// //             <div className="flex items-center justify-end gap-2 mb-1">
// //               <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
// //                 Total Price
// //               </p>
// //               {/* ✅ Markup Indicator */}
// //               {roomPricing.hasMarkup && (
// //                 <div
// //                   className="relative"
// //                   onMouseEnter={() => setShowBreakdown(true)}
// //                   onMouseLeave={() => setShowBreakdown(false)}
// //                 >
// //                   <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-help">
// //                     <icons.Info className="w-3 h-3" />
// //                     MARKUP
// //                   </div>

// //                   {/* ✅ Detailed Breakdown on Hover */}
// //                   {showBreakdown && (
// //                     <div className="absolute right-0 top-full mt-2 bg-white border-2 border-[#0B5CAD]/20 rounded-lg shadow-xl p-4 w-64 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
// //                       <h6 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
// //                         Price Breakdown
// //                       </h6>
// //                       <div className="space-y-2 text-xs">
// //                         <div className="flex justify-between items-center">
// //                           <span className="text-gray-600">Original Price:</span>
// //                           <span className="font-semibold text-gray-800">
// //                             ₹{roomPricing.originalPrice.toLocaleString('en-IN', {
// //                               minimumFractionDigits: 2,
// //                               maximumFractionDigits: 2,
// //                             })}
// //                           </span>
// //                         </div>
// //                         <div className="flex justify-between items-center">
// //                           <span className="text-gray-600">Markup ({roomPricing.nights} nights):</span>
// //                           <span className="font-semibold text-green-600">
// //                             +₹{roomPricing.markup.toLocaleString('en-IN', {
// //                               minimumFractionDigits: 2,
// //                               maximumFractionDigits: 2,
// //                             })}
// //                           </span>
// //                         </div>
// //                         <div className="border-t border-gray-200 pt-2 mt-2">
// //                           <div className="flex justify-between items-center">
// //                             <span className="text-gray-700 font-semibold">Client Price:</span>
// //                             <span className="font-bold text-[#0B5CAD]">
// //                               ₹{roomPricing.clientPrice.toLocaleString('en-IN', {
// //                                 minimumFractionDigits: 2,
// //                                 maximumFractionDigits: 2,
// //                               })}
// //                             </span>
// //                           </div>
// //                         </div>
// //                         {roomPricing.markupPerNight && (
// //                           <div className="text-[10px] text-gray-500 italic mt-2 pt-2 border-t border-gray-100">
// //                             Markup: ₹{roomPricing.markupPerNight.toLocaleString('en-IN', {
// //                               minimumFractionDigits: 2,
// //                               maximumFractionDigits: 2,
// //                             })} per night
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="flex items-baseline justify-end gap-1">
// //               <span className="text-lg text-gray-600">₹</span>
// //               <h5 className="text-xl font-bold text-[#0B5CAD]">
// //                 {roomPricing.clientPrice.toLocaleString('en-IN', {
// //                   minimumFractionDigits: 2,
// //                   maximumFractionDigits: 2,
// //                 })}
// //               </h5>
// //             </div>

// //             {/* ✅ Show original price if markup exists */}
// //             {roomPricing.hasMarkup && (
// //               <p className="text-xs text-gray-400 line-through mt-1">
// //                 ₹{roomPricing.originalPrice.toLocaleString('en-IN')}
// //               </p>
// //             )}

// //             <p className="text-xs text-gray-500 mt-1">
// //               + ₹{room.TotalTax} taxes & fees
// //             </p>
// //           </div>

// //           <button
// //             className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#073B6D] hover:to-[#052A4F] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 w-full shadow-md hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
// //             onClick={() => onSelectRoom(room)}
// //           >
// //             SELECT ROOM
            
// //             <icons.ArrowRight className="w-4 h-4" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Medium & Small Screen: Vertical Layout */}
// //       <div className="lg:hidden">
// //         {/* Room Header with Icon */}
// //         <div className="flex items-start gap-3 mb-3">
// //           <div className="w-12 h-12 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-xl flex items-center justify-center shrink-0 shadow-md">
// //             <icons.BedDouble className="w-6 h-6 text-white" />
// //           </div>
// //           <div className="flex-1 min-w-0">
// //             <h5 className="text-[#3b3f5c] text-base md:text-lg font-bold mb-2 leading-tight">
// //               {room?.Name?.[0] || 'No Room Info Available'}
// //             </h5>
// //             <div className="flex items-center gap-2 flex-wrap">
// //               {/* <span className="text-xs md:text-sm text-gray-600">Meal:</span> */}
// //               {room?.MealType && (
// //                 <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
                 
// //                   <icons.Coffee className="w-3 h-3 md:w-3.5 md:h-3.5" />
// //                   {`${room.MealType} Included`}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Facilities */}
// //         {facilities.length > 0 && (
// //           <div className="mb-3">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
// //               {facilities.slice(0, 6).map((facility, i) => (
// //                 <div
// //                   // key={i}
// //                   key={`facility-desktop-${index}-${i}`} 
// //                   className="flex items-center gap-2 text-xs md:text-sm text-gray-700"
// //                 >
// //                   <div className="w-1.5 h-1.5 bg-[#0B5CAD] rounded-full shrink-0"></div>
// //                   {facility}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* View Details */}
// //         <button
// //           className="text-[#0B5CAD] hover:text-[#073B6D] text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors mb-3 cursor-pointer"
// //           onClick={onShowDetails}
// //         >
// //           View Full Details
          
// //           <icons.ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
// //         </button>

// //         {/* Inclusion */}
// //         {room?.Inclusion && (
// //           <div className="flex items-start gap-2 text-xs md:text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg mb-4">
            
// //             <icons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
// //             <span>{room.Inclusion}</span>
// //           </div>
// //         )}

// //         {/* Price & Button - Side by Side on Mobile */}
// //         <div className="flex items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 mb-1">
// //               <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
// //                 Total Price
// //               </p>
// //               {/* ✅ Mobile Markup Indicator */}
// //               {roomPricing.hasMarkup && (
// //                 <div
// //                   className="relative"
// //                   onClick={() => setShowBreakdown(!showBreakdown)}
// //                 >
// //                   <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[9px] font-semibold">
// //                     <icons.Info className="w-2.5 h-2.5" />
// //                     MARKUP
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="flex items-baseline gap-1">
// //               <span className="text-base text-gray-600">₹</span>
// //               <h5 className="text-lg md:text-xl font-bold text-[#0B5CAD]">
// //                 {roomPricing.clientPrice.toLocaleString('en-IN', {
// //                   minimumFractionDigits: 2,
// //                   maximumFractionDigits: 2,
// //                 })}
// //               </h5>
// //             </div>

// //             {roomPricing.hasMarkup && (
// //               <p className="text-[10px] text-gray-400 line-through">
// //                 ₹{roomPricing.originalPrice.toLocaleString('en-IN')}
// //               </p>
// //             )}

// //             <p className="text-xs text-gray-500">+ ₹{room.TotalTax} taxes</p>
// //           </div>

// //           <button
// //             className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#073B6D] hover:to-[#052A4F] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-xl whitespace-nowrap"
// //             onClick={() => onSelectRoom(room)}
// //           >
// //             SELECT
// //           </button>
// //         </div>

// //         {/* ✅ Mobile Breakdown (Toggle on Click) */}
// //         {showBreakdown && roomPricing.hasMarkup && (
// //           <div className="mt-3 bg-white border-2 border-[#0B5CAD]/20 rounded-lg shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200">
// //             <h6 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide border-b border-gray-200 pb-2">
// //               Price Breakdown
// //             </h6>
// //             <div className="space-y-2 text-xs">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-600">Original Price:</span>
// //                 <span className="font-semibold text-gray-800">
// //                   ₹{roomPricing.originalPrice.toLocaleString('en-IN', {
// //                     minimumFractionDigits: 2,
// //                     maximumFractionDigits: 2,
// //                   })}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-600">Markup ({roomPricing.nights} nights):</span>
// //                 <span className="font-semibold text-green-600">
// //                   +₹{roomPricing.markup.toLocaleString('en-IN', {
// //                     minimumFractionDigits: 2,
// //                     maximumFractionDigits: 2,
// //                   })}
// //                 </span>
// //               </div>
// //               <div className="border-t border-gray-200 pt-2 mt-2">
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-700 font-semibold">Client Price:</span>
// //                   <span className="font-bold text-[#0B5CAD]">
// //                     ₹{roomPricing.clientPrice.toLocaleString('en-IN', {
// //                       minimumFractionDigits: 2,
// //                       maximumFractionDigits: 2,
// //                     })}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RoomCard;


// import React, { useState, useMemo } from 'react';
// import { RoomCardProps } from '../types/hotelDetail.types';
// import { icons } from '@/index';

// const RoomCard: React.FC<RoomCardProps> = ({
//   room,
//   hotel,
//   index,
//   onSelectRoom,
//   onShowDetails,
//   // pricing,
// }) => {
//   const [showBreakdown, setShowBreakdown] = useState(false);
//   const [showCancellationDetails, setShowCancellationDetails] = useState(false);

//   // ✅ Parse room-specific inclusions
//   const roomInclusions = useMemo(() => {
//     return room.Inclusion?.split(',').map(i => i.trim()).filter(Boolean) ?? [];
//   }, [room.Inclusion]);

//   // ✅ Get all cancellation policies
//   // ✅ Get all cancellation policies
// const cancellationPolicies = useMemo(() => {
//   if (!room.CancelPolicies || room.CancelPolicies.length === 0) {
//     return [];
//   }
  
//   return room.CancelPolicies.map(policy => {
//     // Parse date from DD-MM-YYYY format (same as CancellationPolicyDisplay)
//     const [datePart] = policy.FromDate.split(' ');
//     const [day, month, year] = datePart.split('-');
//     const cancelDate = new Date(`${year}-${month}-${day}`);
    
//     const now = new Date();
//     const daysUntilCancel = Math.ceil((cancelDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
//     return {
//       ...policy,
//       daysUntilCancel,
//       isFreeCancel: policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0,
//       isFullCharge: policy.CancellationCharge === 100,
//     };
//   });
// }, [room.CancelPolicies]);

//   // ✅ Get primary cancellation policy (most relevant)
//   const primaryPolicy = useMemo(() => {
//     if (cancellationPolicies.length === 0) return null;
    
//     // Show the most restrictive or most immediate policy
//     const sortedPolicies = [...cancellationPolicies].sort((a, b) => 
//       new Date(a.FromDate).getTime() - new Date(b.FromDate).getTime()
//     );
    
//     return sortedPolicies[0];
//   }, [cancellationPolicies]);

//   // ✅ Room promotions
//   const promotions = room.RoomPromotion ?? [];

//   // ✅ Calculate pricing with markup
//   // const roomPricing = useMemo(() => {
//   //   if (!pricing || !pricing.markupPerNight || !pricing.nights) {
//   //     return {
//   //       originalPrice: room.TotalFare,
//   //       clientPrice: room.TotalFare,
//   //       markup: 0,
//   //       hasMarkup: false,
//   //       nights: 0,
//   //       markupPerNight: 0,
//   //     };
//   //   }

//     const totalMarkup = pricing.markupPerNight * pricing.nights;
//     const clientPrice = room.TotalFare + totalMarkup;

//     return {
//       originalPrice: room.TotalFare,
//       clientPrice: clientPrice,
//       markup: totalMarkup,
//       hasMarkup: totalMarkup > 0,
//       nights: pricing.nights,
//       markupPerNight: pricing.markupPerNight,
//     };
//   }, [room.TotalFare, pricing]);

//   // ✅ Icon mapping for inclusions
//   const getInclusionIcon = (inclusion: string) => {
//     const lower = inclusion.toLowerCase();
//     if (lower.includes('breakfast') || lower.includes('meal')) return icons.Coffee;
//     if (lower.includes('parking')) return icons.Car;
//     if (lower.includes('wifi') || lower.includes('internet')) return icons.Wifi;
//     if (lower.includes('airport') || lower.includes('shuttle')) return icons.Plane;
//     if (lower.includes('drink') || lower.includes('beverage')) return icons.Wine;
//     if (lower.includes('spa') || lower.includes('massage')) return icons.Sparkles;
//     return icons.Check;
//   };

//   // ✅ Format cancellation policy text
//   // ✅ Format cancellation policy text
// const formatPolicyText = (policy: typeof cancellationPolicies[0]) => {
//   // Parse date from DD-MM-YYYY format
//   const [datePart] = policy.FromDate.split(' ');
//   const [day, month, year] = datePart.split('-');
//   const date = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });

//   if (policy.isFreeCancel) {
//     return `Free cancellation until ${date}`;
//   }
  
//   if (policy.isFullCharge) {
//     return `No refund after ${date} (100% charge)`;
//   }
  
//   if (policy.ChargeType === 'Percentage') {
//     return `${policy.CancellationCharge}% cancellation fee from ${date}`;
//   }
  
//   return `Cancellation charge applies from ${date}`;
// };

//   return (
//     <div className="border-2 border-gray-200 rounded-xl mb-3 hover:border-[#0B5CAD]/30 hover:shadow-lg transition-all duration-200 bg-white relative overflow-hidden">
//       {/* ${promotions.length > 0 ? 'pb-0' : ''} */}
//       <div className={`px-6 py-4 `}>
//         {/* Large Screen: Horizontal Layout */}
//         <div className="hidden lg:flex justify-between items-start gap-6">
//           {/* Left Section - Room Details */}
//           <div className="flex-1">
//             {/* Room Header */}
//             <div className="flex items-start gap-4 mb-4">
//               <div className="w-10 h-10 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-xl flex items-center justify-center shrink-0 shadow-md">
//                 <icons.BedDouble className="w-5 h-5 text-white" />
//               </div>

//               <div className="flex-1">
//                 <h5 className="text-[#3b3f5c] text-lg font-bold leading-tight mb-2">
//                   {room.Name?.[0] || 'No Room Info Available'}
//                 </h5>

//                 {/* Meal Type */}
//                 {room.MealType && (
//                   <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
//                     <icons.Coffee className="w-3.5 h-3.5" />
//                     {room.MealType === 'Room_Only' ? 'Room Only' : `${room.MealType} Included`}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Inclusions */}
//             {roomInclusions.length > 0 && (
//               <div className="mb-4">
//                 <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
//                   <icons.Gift className="w-3.5 h-3.5" />
//                   What's Included
//                 </h6>
//                 <div className="grid grid-cols-2 gap-2.5">
//                   {roomInclusions.map((inclusion, i) => {
//                     const Icon = getInclusionIcon(inclusion);
//                     return (
//                       <div
//                         key={`inclusion-desktop-${index}-${i}`}
//                         className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-lg"
//                       >
//                         <Icon className="w-4 h-4 text-green-600 shrink-0" />
//                         <span className="line-clamp-1">{inclusion}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Cancellation Policy Accordion */}
//             {primaryPolicy && (
//               <div className="mb-4">
//                 <div
//                   className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
//                     primaryPolicy.isFreeCancel
//                       ? 'border-green-200'
//                       : primaryPolicy.isFullCharge
//                       ? 'border-red-200'
//                       : 'border-amber-200'
//                   }`}
//                 >
//                   {/* Primary Policy - Always Visible */}
//                   <div
//                     className={`flex items-start gap-2.5 px-4 py-3 cursor-pointer ${
//                       primaryPolicy.isFreeCancel
//                         ? 'bg-green-50 hover:bg-green-100'
//                         : primaryPolicy.isFullCharge
//                         ? 'bg-red-50 hover:bg-red-100'
//                         : 'bg-amber-50 hover:bg-amber-100'
//                     }`}
//                     onClick={() => cancellationPolicies.length > 1 && setShowCancellationDetails(!showCancellationDetails)}
//                   >
//                     {primaryPolicy.isFreeCancel ? (
//                       <icons.CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
//                     ) : primaryPolicy.isFullCharge ? (
//                       <icons.XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
//                     ) : (
//                       <icons.AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
//                     )}
//                     <div className="flex-1">
//                       <p className="text-xs font-bold text-gray-700 mb-0.5">
//                         {primaryPolicy.isFreeCancel
//                           ? 'Free Cancellation'
//                           : room.IsRefundable
//                           ? 'Partial Refund Available'
//                           : 'Non-Refundable'}
//                       </p>
//                       <p className="text-xs text-gray-600">
//                         {formatPolicyText(primaryPolicy)}
//                       </p>
//                     </div>
//                     {cancellationPolicies.length > 1 && (
//                       <div className="flex items-center gap-2">
//                         <span className="text-xs text-gray-500 font-medium">
//                           +{cancellationPolicies.length - 1} more
//                         </span>
//                         <icons.ChevronDown
//                           className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
//                             showCancellationDetails ? 'rotate-180' : ''
//                           }`}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* Additional Policies - Accordion */}
//                   {showCancellationDetails && cancellationPolicies.length > 1 && (
//                     <div className="bg-white border-t-2 border-gray-100 animate-in slide-in-from-top-2 duration-300">
//                       {cancellationPolicies.slice(1).map((policy, i) => (
//                         <div
//                           key={`cancel-policy-${index}-${i}`}
//                           className="flex items-start gap-2.5 px-4 py-3 border-b last:border-b-0 border-gray-100"
//                         >
//                           {policy.isFreeCancel ? (
//                             <icons.CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
//                           ) : policy.isFullCharge ? (
//                             <icons.XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
//                           ) : (
//                             <icons.AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
//                           )}
//                           <div className="flex-1">
//                             <p className="text-xs text-gray-700">
//                               {formatPolicyText(policy)}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* View Details Button */}
//             <button
//               className="text-[#0B5CAD] hover:text-[#073B6D] text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer mb-0"
//               onClick={onShowDetails}
//             >
//               View Full Details
//               <icons.ChevronRight className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Right Section - Price & Button */}
//           <div className="min-w-60 flex flex-col justify-center mb-6">
//             <div className="text-right flex flex-col justify-between bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm relative">
//               <div className="mb-4">
//                 <div className="flex items-center justify-end gap-1 mb-1">
//                   <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Price</p>
                  
//                   {/* Markup Indicator */}
//                   {/* Breakdown Tooltip */}
//                   {roomPricing.hasMarkup && (
//                     <div
//                       className="relative"
//                       onMouseEnter={() => setShowBreakdown(true)}
//                       onMouseLeave={() => setShowBreakdown(false)}
//                     >
//                       {/* <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-help">
//                         <icons.Info className="w-3 h-3" />
//                         MARKUP
//                       </div> */}
//                       <div className="flex items-center py-0.5 text-gray-500 rounded-full text-[10px] font-semibold">
//                         <icons.Info className="w-3 h-3" />
//                         {/* MARKUP */}
//                       </div>

//                       {showBreakdown && (
//                         <div className="absolute right-0 top-full mt-2 bg-white border-2 border-[#0B5CAD]/20 rounded-lg shadow-xl p-4 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                           <h6 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
//                             Price Breakdown
//                           </h6>
//                           <div className="space-y-2 text-xs">
//                             <div className="flex justify-between items-center">
//                               <span className="text-gray-600">Original Price:</span>
//                               <span className="font-semibold text-gray-800">
//                                 ₹{roomPricing.originalPrice.toLocaleString('en-IN', {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 })}
//                               </span>
//                             </div>

//                             <div className="flex justify-between items-center">
//                               <span className="text-gray-600">Total Tax:</span>
//                               <span className="font-semibold text-gray-800">
                                
//                                 ₹{room.TotalTax.toLocaleString('en-IN', {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 })}
//                               </span>
//                             </div>
//                             {/* <div className="flex justify-between items-center">
//                               <span className="text-gray-600">Markup ({roomPricing.nights} nights):</span>
//                               <span className="font-semibold text-green-600">
//                                 +₹{roomPricing.markup.toLocaleString('en-IN', {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2,
//                                 })}
//                               </span>
//                             </div> */}
//                             <div className="border-t border-gray-200 pt-2 mt-2">
//                               <div className="flex justify-between items-center">
//                                 <span className="text-gray-700 font-semibold">Client Price:</span>
//                                 <span className="font-bold text-[#0B5CAD]">
//                                   ₹{roomPricing.clientPrice.toLocaleString('en-IN', {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}
//                                 </span>
//                               </div>
//                             </div>
//                             {/* <div className="text-[10px] text-gray-500 italic mt-2 pt-2 border-t border-gray-100">
//                               Markup: ₹{roomPricing.markupPerNight.toLocaleString('en-IN', {
//                                 minimumFractionDigits: 2,
//                                 maximumFractionDigits: 2,
//                               })}{' '}
//                               per night
//                             </div> */}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-baseline justify-end gap-1">
//                   <span className="text-lg text-gray-600">₹</span>
//                   <h5 className="text-2xl font-bold text-[#0B5CAD]">
//                     {roomPricing.clientPrice.toLocaleString('en-IN', {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </h5>
//                 </div>

//                 {/* {roomPricing.hasMarkup && (
//                   <p className="text-xs text-gray-400 line-through mt-1">
//                     ₹{roomPricing.originalPrice.toLocaleString('en-IN')}
//                   </p>
//                 )} */}

//                 {/* <p className="text-xs text-gray-500 mt-1">+ ₹{room.TotalTax.toLocaleString('en-IN')} taxes & fees</p> */}
//                 <p className="text-xs text-gray-500 mt-1">(Incl. ₹{room.TotalTax.toLocaleString('en-IN')} taxes & fees)</p>
//               </div>

//               <button
//                 className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#073B6D] hover:to-[#052A4F] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 w-full shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
//                 onClick={() => onSelectRoom(room)}
//               >
//                 BOOK NOW
//                 <icons.ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile & Tablet: Vertical Layout */}
//         <div className="lg:hidden">
//           {/* Room Header */}
//           <div className="flex items-start gap-3 mb-3">
//             <div className="w-12 h-12 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-xl flex items-center justify-center shrink-0 shadow-md">
//               <icons.BedDouble className="w-6 h-6 text-white" />
//             </div>
            
//             <div className="flex-1 min-w-0">
//               <h5 className="text-[#3b3f5c] text-base md:text-lg font-bold mb-2 leading-tight">
//                 {room.Name?.[0] || 'No Room Info Available'}
//               </h5>
              
//               {/* Meal Type */}
//               {room.MealType && (
//                 <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
//                   <icons.Coffee className="w-3 h-3 md:w-3.5 md:h-3.5" />
//                   {room.MealType === 'Room_Only' ? 'Room Only' : `${room.MealType} Included`}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Inclusions */}
//           {roomInclusions.length > 0 && (
//             <div className="mb-3">
//               <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
//                 <icons.Gift className="w-3 h-3" />
//                 What's Included
//               </h6>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {roomInclusions.map((inclusion, i) => {
//                   const Icon = getInclusionIcon(inclusion);
//                   return (
//                     <div
//                       key={`inclusion-mobile-${index}-${i}`}
//                       className="flex items-center gap-2 text-xs md:text-sm text-gray-700 bg-green-50 px-2.5 py-1.5 rounded-lg"
//                     >
//                       <Icon className="w-3.5 h-3.5 text-green-600 shrink-0" />
//                       <span className="line-clamp-1">{inclusion}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Cancellation Policy Accordion - Mobile */}
//           {primaryPolicy && (
//             <div className="mb-3">
//               <div
//                 className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
//                   primaryPolicy.isFreeCancel
//                     ? 'border-green-200'
//                     : primaryPolicy.isFullCharge
//                     ? 'border-red-200'
//                     : 'border-amber-200'
//                 }`}
//               >
//                 <div
//                   className={`flex items-start gap-2 px-3 py-2.5 cursor-pointer ${
//                     primaryPolicy.isFreeCancel
//                       ? 'bg-green-50 active:bg-green-100'
//                       : primaryPolicy.isFullCharge
//                       ? 'bg-red-50 active:bg-red-100'
//                       : 'bg-amber-50 active:bg-amber-100'
//                   }`}
//                   onClick={() => cancellationPolicies.length > 1 && setShowCancellationDetails(!showCancellationDetails)}
//                 >
//                   {primaryPolicy.isFreeCancel ? (
//                     <icons.CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
//                   ) : primaryPolicy.isFullCharge ? (
//                     <icons.XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
//                   ) : (
//                     <icons.AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
//                   )}
//                   <div className="flex-1">
//                     <p className="text-xs font-bold text-gray-700 mb-0.5">
//                       {primaryPolicy.isFreeCancel
//                         ? 'Free Cancellation'
//                         : room.IsRefundable
//                         ? 'Partial Refund'
//                         : 'Non-Refundable'}
//                     </p>
//                     <p className="text-[10px] md:text-xs text-gray-600">
//                       {formatPolicyText(primaryPolicy)}
//                     </p>
//                   </div>
//                   {cancellationPolicies.length > 1 && (
//                     <div className="flex items-center gap-1">
//                       <span className="text-[10px] text-gray-500 font-medium">
//                         +{cancellationPolicies.length - 1}
//                       </span>
//                       <icons.ChevronDown
//                         className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${
//                           showCancellationDetails ? 'rotate-180' : ''
//                         }`}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {showCancellationDetails && cancellationPolicies.length > 1 && (
//                   <div className="bg-white border-t-2 border-gray-100 animate-in slide-in-from-top-2 duration-300">
//                     {cancellationPolicies.slice(1).map((policy, i) => (
//                       <div
//                         key={`cancel-policy-mobile-${index}-${i}`}
//                         className="flex items-start gap-2 px-3 py-2.5 border-b last:border-b-0 border-gray-100"
//                       >
//                         {policy.isFreeCancel ? (
//                           <icons.CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
//                         ) : policy.isFullCharge ? (
//                           <icons.XCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
//                         ) : (
//                           <icons.AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
//                         )}
//                         <div className="flex-1">
//                           <p className="text-[10px] md:text-xs text-gray-700">
//                             {formatPolicyText(policy)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* View Details */}
//           <button
//             className="text-[#0B5CAD] hover:text-[#073B6D] text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors mb-4 cursor-pointer"
//             onClick={onShowDetails}
//           >
//             View Full Details
//             <icons.ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
//           </button>

//           {/* Price & Button */}
//           <div className="flex items-center justify-between gap-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Price</p>
                
//                 {roomPricing.hasMarkup && (
//                   <div
//                     className="relative"
//                     onClick={() => setShowBreakdown(!showBreakdown)}
//                   >
//                     <div className="flex items-center gap-1 bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[9px] font-semibold">
//                       <icons.Info className="w-2.5 h-2.5" />
//                       MARKUP
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-baseline gap-1">
//                 <span className="text-base text-gray-600">₹</span>
//                 <h5 className="text-lg md:text-xl font-bold text-[#0B5CAD]">
//                   {roomPricing.clientPrice.toLocaleString('en-IN', {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </h5>
//               </div>

//               {roomPricing.hasMarkup && (
//                 <p className="text-[10px] text-gray-400 line-through">
//                   ₹{roomPricing.originalPrice.toLocaleString('en-IN')}
//                 </p>
//               )}

//               <p className="text-xs text-gray-500">+ ₹{room.TotalTax.toLocaleString('en-IN')} taxes</p>
//             </div>

//             <button
//               className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#073B6D] hover:to-[#052A4F] text-white px-4 md:px-5 py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
//               onClick={() => onSelectRoom(room)}
//             >
//               {/* SELECT */}
//               BOOK NOW
//             </button>
//           </div>

//           {/* Mobile Breakdown */}
//           {showBreakdown && roomPricing.hasMarkup && (
//             <div className="mb-6 bg-white border-2 border-[#0B5CAD]/20 rounded-lg shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200">
//               <h6 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide border-b border-gray-200 pb-2">
//                 Price Breakdown
//               </h6>
//               <div className="space-y-2 text-xs">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Original Price:</span>
//                   <span className="font-semibold text-gray-800">
//                     ₹{roomPricing.originalPrice.toLocaleString('en-IN', {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Markup ({roomPricing.nights} nights):</span>
//                   <span className="font-semibold text-green-600">
//                     +₹{roomPricing.markup.toLocaleString('en-IN', {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-2 mt-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-700 font-semibold">Client Price:</span>
//                     <span className="font-bold text-[#0B5CAD]">
//                       ₹{roomPricing.clientPrice.toLocaleString('en-IN', {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Promotions Footer - Full Width at Bottom */}
//       {/* {promotions.length > 0 && (
//         <div className="bg-linear-to-r from-amber-400 to-orange-500 py-3 px-6 rounded-b-xl">
//           <div className="flex flex-wrap gap-2 justify-start items-center">
//             {promotions.map((promo, i) => (
//               <div
//                 key={`promo-footer-${index}-${i}`}
//                 className="flex items-center gap-2 text-white text-xs md:text-sm font-bold"
//               >
//                 <icons.Zap className="w-4 h-4" />
//                 <span>{promo}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default RoomCard;

import React, { useState, useMemo } from 'react';
import { RoomCardProps } from '../types/hotelDetail.types';
import { icons } from '@/index';

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  hotel,
  index,
  onSelectRoom,
  onShowDetails,
}) => {
  const [showCancellationDetails, setShowCancellationDetails] = useState(false);

  // ✅ Parse room-specific inclusions
  const roomInclusions = useMemo(() => {
    return room.Inclusion?.split(',').map(i => i.trim()).filter(Boolean) ?? [];
  }, [room.Inclusion]);

  // ✅ Get all cancellation policies
  const cancellationPolicies = useMemo(() => {
    if (!room.CancelPolicies || room.CancelPolicies.length === 0) {
      return [];
    }

    return room.CancelPolicies.map(policy => {
      const [datePart] = policy.FromDate.split(' ');
      const [day, month, year] = datePart.split('-');
      const cancelDate = new Date(`${year}-${month}-${day}`);
      const now = new Date();
      const daysUntilCancel = Math.ceil((cancelDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      return {
        ...policy,
        daysUntilCancel,
        isFreeCancel: policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0,
        isFullCharge: policy.CancellationCharge === 100,
      };
    });
  }, [room.CancelPolicies]);

  // ✅ Get primary cancellation policy
  const primaryPolicy = useMemo(() => {
    if (cancellationPolicies.length === 0) return null;
    const sortedPolicies = [...cancellationPolicies].sort((a, b) =>
      new Date(a.FromDate).getTime() - new Date(b.FromDate).getTime()
    );
    return sortedPolicies[0];
  }, [cancellationPolicies]);

  // ✅ Icon mapping for inclusions
  const getInclusionIcon = (inclusion: string) => {
    const lower = inclusion.toLowerCase();
    if (lower.includes('breakfast') || lower.includes('meal')) return icons.Coffee;
    if (lower.includes('parking')) return icons.Car;
    if (lower.includes('wifi') || lower.includes('internet')) return icons.Wifi;
    if (lower.includes('airport') || lower.includes('shuttle')) return icons.Plane;
    if (lower.includes('drink') || lower.includes('beverage')) return icons.Wine;
    if (lower.includes('spa') || lower.includes('massage')) return icons.Sparkles;
    return icons.Check;
  };

  // ✅ Format cancellation policy text
  const formatPolicyText = (policy: typeof cancellationPolicies[0]) => {
    const [datePart] = policy.FromDate.split(' ');
    const [day, month, year] = datePart.split('-');
    const date = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    if (policy.isFreeCancel) return `Free cancellation until ${date}`;
    if (policy.isFullCharge) return `No refund after ${date} (100% charge)`;
    if (policy.ChargeType === 'Percentage') return `${policy.CancellationCharge}% cancellation fee from ${date}`;
    return `Cancellation charge applies from ${date}`;
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl mb-3 hover:border-[#0B5CAD]/30 hover:shadow-lg transition-all duration-200 bg-white relative overflow-hidden">
      <div className="px-6 py-4">

        {/* Large Screen: Horizontal Layout */}
        <div className="hidden lg:flex justify-between items-start gap-6">
          {/* Left Section - Room Details */}
          <div className="flex-1">
            {/* Room Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                <icons.BedDouble className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h5 className="text-[#3b3f5c] text-lg font-bold leading-tight mb-2">
                  {room.Name?.[0] || 'No Room Info Available'}
                </h5>
                {room.MealType && (
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                    <icons.Coffee className="w-3.5 h-3.5" />
                    {room.MealType === 'Room_Only' ? 'Room Only' : `${room.MealType} Included`}
                  </div>
                )}
              </div>
            </div>

            {/* Inclusions */}
            {roomInclusions.length > 0 && (
              <div className="mb-4">
                <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                  <icons.Gift className="w-3.5 h-3.5" />
                  What's Included
                </h6>
                <div className="grid grid-cols-2 gap-2.5">
                  {roomInclusions.map((inclusion, i) => {
                    const Icon = getInclusionIcon(inclusion);
                    return (
                      <div
                        key={`inclusion-desktop-${index}-${i}`}
                        className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-lg"
                      >
                        <Icon className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="line-clamp-1">{inclusion}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {primaryPolicy && (
              <div className="mb-4">
                <div
                  className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                    primaryPolicy.isFreeCancel
                      ? 'border-green-200'
                      : primaryPolicy.isFullCharge
                      ? 'border-red-200'
                      : 'border-amber-200'
                  }`}
                >
                  <div
                    className={`flex items-start gap-2.5 px-4 py-3 cursor-pointer ${
                      primaryPolicy.isFreeCancel
                        ? 'bg-green-50 hover:bg-green-100'
                        : primaryPolicy.isFullCharge
                        ? 'bg-red-50 hover:bg-red-100'
                        : 'bg-amber-50 hover:bg-amber-100'
                    }`}
                    onClick={() => cancellationPolicies.length > 1 && setShowCancellationDetails(!showCancellationDetails)}
                  >
                    {primaryPolicy.isFreeCancel ? (
                      <icons.CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    ) : primaryPolicy.isFullCharge ? (
                      <icons.XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    ) : (
                      <icons.AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700 mb-0.5">
                        {primaryPolicy.isFreeCancel
                          ? 'Free Cancellation'
                          : room.IsRefundable
                          ? 'Partial Refund Available'
                          : 'Non-Refundable'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatPolicyText(primaryPolicy)}
                      </p>
                    </div>
                    {cancellationPolicies.length > 1 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">
                          +{cancellationPolicies.length - 1} more
                        </span>
                        <icons.ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                            showCancellationDetails ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  {showCancellationDetails && cancellationPolicies.length > 1 && (
                    <div className="bg-white border-t-2 border-gray-100 animate-in slide-in-from-top-2 duration-300">
                      {cancellationPolicies.slice(1).map((policy, i) => (
                        <div
                          key={`cancel-policy-${index}-${i}`}
                          className="flex items-start gap-2.5 px-4 py-3 border-b last:border-b-0 border-gray-100"
                        >
                          {policy.isFreeCancel ? (
                            <icons.CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          ) : policy.isFullCharge ? (
                            <icons.XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          ) : (
                            <icons.AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-xs text-gray-700">
                              {formatPolicyText(policy)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* View Details Button */}
            <button
              className="text-[#0B5CAD] hover:text-[#073B6D] text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer mb-0"
              onClick={onShowDetails}
            >
              View Full Details
              <icons.ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Section - Price & Button */}
          <div className="min-w-60 flex flex-col justify-center mb-6">
            <div className="text-right flex flex-col justify-between bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm relative">
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  Total Price
                </p>

                {/* ✅ Show raw API price directly */}
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-lg text-gray-600">₹</span>
                  <h5 className="text-2xl font-bold text-[#0B5CAD]">
                    {room.TotalFare.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h5>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  + Incl. Tax ₹{room.TotalTax.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              {/* ✅ BOOK NOW opens ClientPriceModal via parent */}
              <button
                className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#073B6D] hover:to-[#052A4F] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 w-full shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => onSelectRoom(room)}
              >
                BOOK NOW
                <icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Layout */}
        <div className="lg:hidden">
          {/* Room Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-[#0B5CAD] to-[#073B6D] rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <icons.BedDouble className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[#3b3f5c] text-base md:text-lg font-bold mb-2 leading-tight">
                {room.Name?.[0] || 'No Room Info Available'}
              </h5>
              {room.MealType && (
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
                  <icons.Coffee className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {room.MealType === 'Room_Only' ? 'Room Only' : `${room.MealType} Included`}
                </div>
              )}
            </div>
          </div>

          {/* Inclusions */}
          {roomInclusions.length > 0 && (
            <div className="mb-3">
              <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <icons.Gift className="w-3 h-3" />
                What's Included
              </h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roomInclusions.map((inclusion, i) => {
                  const Icon = getInclusionIcon(inclusion);
                  return (
                    <div
                      key={`inclusion-mobile-${index}-${i}`}
                      className="flex items-center gap-2 text-xs md:text-sm text-gray-700 bg-green-50 px-2.5 py-1.5 rounded-lg"
                    >
                      <Icon className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span className="line-clamp-1">{inclusion}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cancellation Policy - Mobile */}
          {primaryPolicy && (
            <div className="mb-3">
              <div
                className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                  primaryPolicy.isFreeCancel
                    ? 'border-green-200'
                    : primaryPolicy.isFullCharge
                    ? 'border-red-200'
                    : 'border-amber-200'
                }`}
              >
                <div
                  className={`flex items-start gap-2 px-3 py-2.5 cursor-pointer ${
                    primaryPolicy.isFreeCancel
                      ? 'bg-green-50 active:bg-green-100'
                      : primaryPolicy.isFullCharge
                      ? 'bg-red-50 active:bg-red-100'
                      : 'bg-amber-50 active:bg-amber-100'
                  }`}
                  onClick={() => cancellationPolicies.length > 1 && setShowCancellationDetails(!showCancellationDetails)}
                >
                  {primaryPolicy.isFreeCancel ? (
                    <icons.CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  ) : primaryPolicy.isFullCharge ? (
                    <icons.XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <icons.AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-700 mb-0.5">
                      {primaryPolicy.isFreeCancel
                        ? 'Free Cancellation'
                        : room.IsRefundable
                        ? 'Partial Refund'
                        : 'Non-Refundable'}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-600">
                      {formatPolicyText(primaryPolicy)}
                    </p>
                  </div>
                  {cancellationPolicies.length > 1 && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-500 font-medium">
                        +{cancellationPolicies.length - 1}
                      </span>
                      <icons.ChevronDown
                        className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${
                          showCancellationDetails ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  )}
                </div>

                {showCancellationDetails && cancellationPolicies.length > 1 && (
                  <div className="bg-white border-t-2 border-gray-100 animate-in slide-in-from-top-2 duration-300">
                    {cancellationPolicies.slice(1).map((policy, i) => (
                      <div
                        key={`cancel-policy-mobile-${index}-${i}`}
                        className="flex items-start gap-2 px-3 py-2.5 border-b last:border-b-0 border-gray-100"
                      >
                        {policy.isFreeCancel ? (
                          <icons.CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        ) : policy.isFullCharge ? (
                          <icons.XCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        ) : (
                          <icons.AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-[10px] md:text-xs text-gray-700">
                            {formatPolicyText(policy)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Details */}
          <button
            className="text-[#0B5CAD] hover:text-[#073B6D] text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors mb-4 cursor-pointer"
            onClick={onShowDetails}
          >
            View Full Details
            <icons.ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>

          {/* Price & Button */}
          <div className="flex items-center justify-between gap-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                Total Price
              </p>

              {/* ✅ Show raw API price directly */}
              <div className="flex items-baseline gap-1">
                <span className="text-base text-gray-600">₹</span>
                <h5 className="text-lg md:text-xl font-bold text-[#0B5CAD]">
                  {room.TotalFare.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h5>
              </div>

              <p className="text-xs text-gray-500 mt-0.5">
                + Incl. Tax ₹{room.TotalTax.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            {/* ✅ BOOK NOW opens ClientPriceModal via parent */}
            <button
              className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] hover:from-[#073B6D] hover:to-[#052A4F] text-white px-4 md:px-5 py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
              onClick={() => onSelectRoom(room)}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
