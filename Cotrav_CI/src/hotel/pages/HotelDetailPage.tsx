
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ui, icons, modals, hotelHooks, hotelDetailsTypes, components, dateFormatterUtils, hotelTypes, hotelUtils} from '@/index';
// import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
// import { useMapLoader } from '@/contexts/MapContext'; // Add this
// import { motion } from 'framer-motion';

// const HotelDetailPage: React.FC = () => {

//   // ADD this line with other useState hooks:
//   // const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
//   const location = useLocation();
//   const { pricing } = location.state || {};
//   const { hotel, taxivaxi, fromBookNow } = (location.state as hotelDetailsTypes.HotelDetailState) || {};


//   // ✅ ADD these BEFORE the hook call
//   const [localPricing, setLocalPricing] = useState(pricing || null);
//   const [showClientPriceModal, setShowClientPriceModal] = useState(false);
//   const [selectedRoomFromCard, setSelectedRoomFromCard] = useState<hotelTypes.Room | null>(null);

//   const {
//     // showModal2,
//     // setShowModal2,
//     showHeader,
//     activeSection,
//     showRates,
//     setShowRates,
//     showInfo,
//     setShowInfo,
//     overviewRef,
//     roomsRef,
//     // locationRef,
//     mapSectionRef,
//     displayRoom,
//     scrollToSection,
//     scrollToMap,
//     handleSelectRoom,
//     handleNavigateHome,
//     handleNavigateSearch,
//     getMapCenter,
//   // } = hotelHooks.useHotelDetail({ hotel, taxivaxi, fromBookNow, pricing });
//   } = hotelHooks.useHotelDetail({ hotel, taxivaxi, fromBookNow, pricing: localPricing });

//     const { isLoaded } = useMapLoader();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showAllImages, setShowAllImages] = useState(false);
//   const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
//   const [showInclusionModal, setShowInclusionModal] = useState(false);
//   const [selectedRoomForModal, setSelectedRoomForModal] = useState<any>(null);

//   console.log("PRICING : ", pricing)

//   useEffect(() => {
//     console.log('=== HOTEL DETAIL PAGE ===');
//     console.log('fromBookNow:', fromBookNow);
//     console.log('hotel:', hotel);
//     console.log('hotel.Rooms:', hotel?.Rooms);
//     console.log('hotel.Rooms.length:', hotel?.Rooms?.length);
//   }, [hotel, fromBookNow]);

//   const agentPortal = sessionStorage.getItem('agent_portal');
//   const bookingAccess = sessionStorage.getItem('has_search_access');

//   const handleClientPriceConfirm = (pricingData: {...}) => {
//   const { gstRate, totalTax } = calculateGST(pricingData.totalFare, pricingData.nights);
//   const completePricing = {
//     ...pricingData,
//     totalFare: pricingData.totalFare,
//     totalTax: totalTax,
//     gstRate: gstRate,
//   };

//   // ✅ Use selectedRoomFromCard if available, else displayRoom
//   const roomToBook = selectedRoomFromCard ?? displayRoom;
//   if (roomToBook) handleSelectRoom(roomToBook, completePricing);
//   setShowClientPriceModal(false);
//   setSelectedRoomFromCard(null);
// };

//   const { gstRate, totalTax } = hotelUtils.calculateGST(fare, nights);

// // ADD these states
// // const [showClientPriceModal, setShowClientPriceModal] = useState(false);
// // const [localPricing, setLocalPricing] = useState(pricing || null);

// // ADD this handler
// // const handleClientPriceConfirm = (pricingData: {
// //   clientPrice: number;
// //   totalFare: number;
// //   nights: number;
// //   markupPerNight: number;
// //   totalMarkup: number;
// // }) => {
// //   setLocalPricing(pricingData);
// //   setShowClientPriceModal(false);
// // };

// // const handleClientPriceConfirm = (pricingData: {
// //   clientPrice: number;
// //   totalFare: number;
// //   nights: number;
// //   markupPerNight: number;
// //   totalMarkup: number;
// // }) => {
// //   // Calculate GST on confirmed price
// //   const { gstRate, totalTax } = calculateGST(pricingData.totalFare, pricingData.nights);
// //   // const finalPrice = pricingData.totalFare + totalTax;
// //   const finalPrice = pricing
// //   ? pricing.totalFare + pricing.totalTax  // 8000 + GST ✅
// //   : null;

// //   const completePricing = {
// //     ...pricingData,
// //     // totalFare: finalPrice,      // ✅ GST included
// //     totalFare: pricingData.totalFare,  
// //     totalTax: totalTax,
// //     gstRate: gstRate,
// //   };

// //   // Navigate directly to HotelBooking — no need to set localPricing
// //   if (displayRoom) {
// //     handleSelectRoom(displayRoom, completePricing);
// //   }
// //   setShowClientPriceModal(false);
// // };




// // const handleBookNowClick = () => {
// //   if (!localPricing) {
// //     setShowClientPriceModal(true);
// //   } else {
// //     if (displayRoom) handleSelectRoom(displayRoom);
// //   }
// // };

// // const handleBookNowClick = () => {
// //   if (fromBookNow) {
// //     // BookNow URL flow → go directly with GST included pricing
// //     if (displayRoom) handleSelectRoom(displayRoom, {
// //       ...localPricing,
// //       totalFare: finalClientPrice,  // ✅ includes GST
// //       totalTax: totalTax,
// //       gstRate: gstRate,
// //     });
// //   } else {
// //     // Search flow
// //     if (!localPricing) {
// //       setShowClientPriceModal(true);  // open modal first
// //     } else {
// //       // Pricing set → pass finalClientPrice (with GST) to booking
// //       if (displayRoom) handleSelectRoom(displayRoom, {
// //         ...localPricing,
// //         totalFare: finalClientPrice,  // ✅ includes GST
// //         totalTax: totalTax,
// //         gstRate: gstRate,
// //       });
// //     }
// //   }
// // };

// const handleBookNowClick = () => {
//   if (fromBookNow) {
//     // BookNow URL flow → calculate GST on existing pricing and go to booking
//     if (pricing && displayRoom) {
//       const { gstRate, totalTax } = calculateGST(pricing.totalFare, pricing.nights);
//       const completePricing = {
//         ...pricing,
//         totalFare: pricing.totalFare + totalTax,
//         totalTax: totalTax,
//         gstRate: gstRate,
//       };
//       handleSelectRoom(displayRoom, completePricing);
//     }
//   } else {
//     // Search flow → open ClientPriceModal
//     setShowClientPriceModal(true);
//   }
// };


//   if (!hotel) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-linear-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
//         <ui.Card className="p-8 text-center border-2 border-[#0B5CAD]/20">
//           <icons.Building2 size={48} className="text-[#0B5CAD] mx-auto mb-4" />
//           <p className="text-gray-500 text-lg">No hotel data available</p>
//         </ui.Card>
//       </div>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-linear-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
//         <ui.Card className="p-8 text-center border-2 border-[#0B5CAD]/20">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5CAD] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading Map...</p>
//         </ui.Card>
//       </div>
//     );
//   }

//   const center = getMapCenter();
//   const imageCount = hotel.Images?.length || 0;

//   const handlePrevImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
//   };

//   const handleNextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
//   };

//   const renderStars = (rating: number) =>
//     Array.from({ length: 5 }).map((_, index) => (
//       <icons.Star
//         key={index}
//         size={16}
//         className={index < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}
//       />
//     ));

// //     const finalTotalFare =
// //   pricing?.totalFare ?? displayRoom?.TotalFare;

// // const finalClientPrice =
// //   pricing
// //     ? pricing.totalFare + pricing.totalMarkup
// //     : displayRoom?.TotalFare;

// //     console.log("FInal PRICING: ",finalClientPrice)

// // const finalTotalFare =
// //   pricing?.totalFare ?? displayRoom?.TotalFare;


// // const nights = pricing?.nights ?? 1;
// // const baseFare = finalTotalFare ?? 0;
// // const { gstRate, totalTax } = calculateGST(baseFare, nights);
// // const finalClientPrice = baseFare + totalTax;


// // const finalTotalFare = localPricing?.totalFare ?? displayRoom?.TotalFare;
// // const nights = localPricing?.nights ?? 1;
// // const baseFare = finalTotalFare ?? 0;
// // const { gstRate, totalTax } = calculateGST(baseFare, nights);
// // const finalClientPrice = baseFare + totalTax;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
//       {/* Sticky Header */}
//       <components.StickyHeader
//         showHeader={showHeader}
//         activeSection={activeSection}
//         // hasMultipleRooms={fromBookNow && hotel.Rooms.length > 1}
//         hasMultipleRooms={Boolean(!fromBookNow && hotel.Rooms?.length && hotel.Rooms.length > 1)}
//         onNavigate={scrollToSection}
//       />

//       <div className="max-w-300 mx-auto px-4 py-6 space-y-6">
//         {/* Breadcrumb */}
//         {agentPortal !== null && String(agentPortal) === '0' && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <components.BreadcrumbNav
//               cityName={hotel.CityName}
//               hotelName={hotel.HotelName}
//               showHome={bookingAccess === '1'}
//               onNavigateHome={handleNavigateHome}
//               onNavigateSearch={handleNavigateSearch}
//             />
//           </motion.div>
//         )}

//         {/* Overview Section */}
//      <motion.div
//   ref={overviewRef}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.1 }}
// >


//   <ui.Card className="overflow-hidden border-2 border-[#0B5CAD]/20 shadow-xl py-0 gap-0">
//     {/* Header Section */}
//     <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] p-4 text-white">
//       <div className="flex items-center gap-3 mb-2 flex-wrap">
//         <h1 className="text-2xl font-bold">{hotel.HotelName}</h1>
//         <div className="flex gap-1">{renderStars(hotel.HotelRating)}</div>
//         <ui.Badge className="bg-white/20 border-white/30 hover:bg-white/30">
//           {hotel.HotelRating} Star
//         </ui.Badge>
//       </div>
//       <div className="flex gap-2 text-white/90 text-sm">
//         <icons.MapPin size={14} className="shrink-0 mt-0.5" />
//         <span>{hotel.Address}</span>
//       </div>
//     </div>

//     {/* Check-in/Check-out Banner */}
//     <div className="bg-[#0B5CAD]/10 border-b border-[#0B5CAD]/20 px-4 py-3">
//       <div className="flex items-center gap-4 flex-wrap text-sm">
//         <div className="flex items-center gap-2">
//           <icons.Calendar size={16} className="text-[#0B5CAD]" />
//           <div>
//             <p className="text-xs text-gray-600">Check-in</p>
//             <p className="font-semibold">{dateFormatterUtils.formatDateTime(taxivaxi?.checkindate)}</p>
//           </div>
//         </div>
//         <icons.ChevronRight size={18} className="text-gray-400" />
//         <div className="flex items-center gap-2">
//           <icons.Calendar size={16} className="text-[#0B5CAD]" />
//           <div>
//             <p className="text-xs text-gray-600">Check-out</p>
//             <p className="font-semibold">{dateFormatterUtils.formatDateTime(taxivaxi?.checkoutdate)}</p>
//           </div>
//         </div>
//       </div>
//     </div>

//     <ui.CardContent className="p-4">
//       <div className="grid lg:grid-cols-3 gap-4">
//         {/* Left Column - Images & Details */}
//         <div className="lg:col-span-2 space-y-4">
//           {/* Image Gallery */}
//           {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
//             <div className="relative group rounded-lg overflow-hidden shadow-md">
//               <div className="relative h-80">
//                 <motion.img
//                   key={currentImageIndex}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   src={hotel.Images[currentImageIndex]}
//                   alt="Hotel"
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />

//                 {/* Navigation & Controls */}
//                 {imageCount > 1 && (
//                   <>
//                     <ui.Button
//                       size="icon"
//                       onClick={handlePrevImage}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all h-8 w-8 rounded-full"
//                     >
//                       <icons.ChevronLeft size={18} className="text-gray-900" />
//                     </ui.Button>
//                     <ui.Button
//                       size="icon"
//                       onClick={handleNextImage}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all h-8 w-8 rounded-full"
//                     >
//                       <icons.ChevronRight size={18} className="text-gray-900" />
//                     </ui.Button>
//                   </>
//                 )}

//                 <ui.Badge className="absolute top-3 right-3 bg-black/70 text-white border-0 text-xs">
//                   {currentImageIndex + 1} / {imageCount}
//                 </ui.Badge>

//                 <ui.Button
//                   size="sm"
//                   onClick={() => setShowAllImages(true)}
//                   className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 text-gray-900 shadow-md text-xs h-8"
//                 >
//                   <icons.ImageIcon size={14} className="mr-1" />
//                   View All {imageCount} Photos
//                 </ui.Button>

//                 {/* Thumbnail Dots */}
//                 {imageCount > 1 && imageCount <= 5 && (
//                   <div className="absolute bottom-3 left-3 flex gap-1.5">
//                     {hotel.Images.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setCurrentImageIndex(idx);
//                         }}
//                         className={`h-1.5 rounded-full transition-all ${
//                           idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="rounded-lg bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 h-80 flex items-center justify-center">
//               <div className="text-center">
//                 <icons.Building2 size={48} className="text-[#0B5CAD]/40 mx-auto mb-3" />
//                 <p className="text-gray-500 text-sm">No images available</p>
//               </div>
//             </div>
//           )}

//           {/* Amenities */}
//           {hotel?.HotelFacilities && (
//             <ui.Card className="border border-[#0B5CAD]/20 py-0">
//               <div className="p-4">
//                 <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
//                   <icons.Building2 size={20} className="text-[#0B5CAD]" />
//                   Hotel Amenities
//                 </h2>
//                 <components.HotelAmenities
//                   facilities={hotel.HotelFacilities}
//                   onShowMore={() => setShowAmenitiesModal(true)}
//                 />
//               </div>
//             </ui.Card>
//           )}
//         </div>

//         {/* Right Column - Booking Card */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-6">
//             <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-lg py-0 gap-0">
//               {/* Room Details */}
//               <div className="bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 p-4 border-b border-[#0B5CAD]/20">
//                 <h3 className="font-bold text-lg text-base mb-3 text-gray-900">
//                   {(() => {
//                     if (!displayRoom?.Name) return 'Room Details';
//                     if (Array.isArray(displayRoom.Name)) {
//                       return displayRoom.Name.length === 1 ? displayRoom.Name[0] : displayRoom.Name.join(' • ');
//                     }
//                     return displayRoom.Name;
//                   })()}
//                 </h3>

//                 {/* Inclusions */}
//                 {displayRoom?.Inclusion && (
//                   <div className="space-y-1.5 mb-3">
//                     {displayRoom.Inclusion.split(',').slice(0, 3).map((item, i) => (
//                       <div key={i} className="flex items-start gap-1.5 text-xs">
//                         <icons.Check size={14} className="text-green-600 shrink-0 mt-0.5" />
//                         <span className="text-gray-700">{item.trim()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Meal Type */}
//                 <ui.Badge className="bg-[#0B5CAD]/20 text-[#0B5CAD] border-[#0B5CAD]/30 hover:bg-[#0B5CAD]/30 mb-3 text-xs">
//                   <icons.Coffee size={12} className="mr-1" />
//                   {displayRoom?.MealType?.replace(/_/g, ' ') || 'No Meal Info'}
//                 </ui.Badge>

//                 {/* Cancellation Policy */}
//                 <components.CancellationPolicyDisplay
//                   policies={displayRoom?.CancelPolicies || []}
//                   mealType={displayRoom?.MealType}
//                   isRefundable={displayRoom?.IsRefundable}
//                 />
//               </div>

//               {/* Price Section */}
//               <div className="p-4">
//                 <div
//                   className="relative mb-4 text-center"
//                   onMouseEnter={() => setShowRates(true)}
//                   onMouseLeave={() => setShowRates(false)}
//                 >
//                   <p className="text-xs text-gray-600 mb-1.5 font-medium">Total Price</p>

//                   {/* <div className="text-2xl font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent mb-1.5">
//                     ₹{finalClientPrice?.toLocaleString('en-IN', {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </div>

//                   <p className="text-xs text-gray-500 mb-3">
//   (Incl. ₹{totalTax.toLocaleString('en-IN', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })} GST @ {gstRate * 100}%)
// </p> */}

// <div className="text-2xl font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent mb-1">
//   ₹{displayRoom?.TotalFare?.toLocaleString('en-IN', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}
// </div>

// <p className="text-xs text-gray-500 mb-3">
//   + Incl. Tax ₹{displayRoom?.TotalTax?.toLocaleString('en-IN', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}
// </p>

//                     {/* + ₹{displayRoom?.TotalTax?.toLocaleString('en-IN')} taxes & fees */}
//                   {/* <p className="text-xs text-gray-500 mb-3">
//                     (Incl. ₹{displayRoom?.TotalTax?.toLocaleString('en-IN')} taxes & fees)
//                   </p> */}

                  

//                   {/* Compact Breakdown on Hover */}
//                   {/* {pricing && showRates && (
//                     <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-1 bg-white border border-[#0B5CAD]/20 rounded-lg shadow-xl p-2.5 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                       <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-200">
//                         <h6 className="text-[10px] font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1">
//                           <icons.Receipt size={12} className="text-[#0B5CAD]" />
//                           Pricing Breakdown
//                         </h6>
//                         <span className="text-[9px] bg-[#0B5CAD]/10 text-[#0B5CAD] px-1.5 py-0.5 rounded-full font-semibold">
//                           {pricing.nights} {pricing.nights > 1 ? 'Nights' : 'Night'}
//                         </span>
//                       </div>

//                       <div className="space-y-1.5">
//                         <div className="flex justify-between items-center text-[10px]">
//                           <span className="text-gray-600">Base Fare</span>
//                           <span className="font-semibold text-gray-800">
//                             ₹{finalTotalFare?.toLocaleString('en-IN')}
//                           </span>
//                         </div>

//                         <div className="flex justify-between items-center text-[10px]">
//                           <span className="text-gray-600">Total Tax</span>
//                           <span className="font-semibold text-gray-800">
                            
//                             ₹{displayRoom?.TotalTax?.toLocaleString('en-IN')}
//                           </span>
//                         </div>

//                         <div className="border-t border-dashed border-gray-300"></div>

//                         <div className="bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 rounded p-1.5 border border-[#0B5CAD]/20">
//                           <div className="flex justify-between items-center">
                            
//                             <span className="text-[10px] text-gray-700 font-bold">Total Client Price</span>
//                             <span className="text-sm font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//                               ₹{finalClientPrice?.toLocaleString('en-IN')}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )} */}


//                     {localPricing && showRates && (
//   <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-1 bg-white border border-[#0B5CAD]/20 rounded-lg shadow-xl p-2.5 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//     <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-200">
//       <h6 className="text-[10px] font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1">
//         <icons.Receipt size={12} className="text-[#0B5CAD]" />
//         Pricing Breakdown
//       </h6>
//       <span className="text-[9px] bg-[#0B5CAD]/10 text-[#0B5CAD] px-1.5 py-0.5 rounded-full font-semibold">
//         {pricing.nights} {pricing.nights > 1 ? 'Nights' : 'Night'}
//       </span>
//     </div>

//     <div className="space-y-1.5">
//       {/* Base Fare */}
//       <div className="flex justify-between items-center text-[10px]">
//         <span className="text-gray-600">Base Fare</span>
//         <span className="font-semibold text-gray-800">
//           ₹{baseFare?.toLocaleString('en-IN')}
//         </span>
//       </div>

//       {/* GST */}
//       <div className="flex justify-between items-center text-[10px]">
//         <span className="text-gray-600">
//           GST ({gstRate * 100}%)
//         </span>
//         <span className="font-semibold text-gray-800">
//           ₹{totalTax?.toLocaleString('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })}
//         </span>
//       </div>

//       <div className="border-t border-dashed border-gray-300" />

//       {/* Final Total */}
//       <div className="bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 rounded p-1.5 border border-[#0B5CAD]/20">
//         <div className="flex justify-between items-center">
//           <span className="text-[10px] text-gray-700 font-bold">
//             Total Client Price
//           </span>
//           <span className="text-sm font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//             ₹{finalClientPrice?.toLocaleString('en-IN', {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// )}


//                   {/* Standard Breakdown */}
//                   {!pricing && <components.PriceBreakdown room={displayRoom!} show={showRates} />}
//                 </div>

//                 {/* <ui.Button
//                   className="w-full bg-linear-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white shadow-lg hover:shadow-xl transition-all py-5 text-md font-bold"
//                   onClick={() => displayRoom && handleSelectRoom(displayRoom)}
//                 >
//                   Book Now
//                 </ui.Button> */}

//                <ui.Button
//   className="w-full bg-linear-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white shadow-lg hover:shadow-xl transition-all py-5 text-md font-bold"
//   onClick={handleBookNowClick}
// >
//   Book Now
// </ui.Button>

//                 <p className="text-[10px] text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
//                   <icons.Info size={10} />
//                   You won't be charged yet
//                 </p>
//               </div>
//             </ui.Card>
//           </div>
//         </div>
//       </div>
//     </ui.CardContent>
//   </ui.Card>
// </motion.div>

//         {/* Rooms Section */}
//         {/* {fromBookNow && hotel?.Rooms && hotel.Rooms.length > 0 && ( */}
//         {!fromBookNow && hotel?.Rooms && hotel.Rooms.length > 1 && (
//           <motion.section
//             ref={roomsRef}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <ui.Card className="border-2 border-[#0B5CAD]/20 overflow-hidden shadow-xl py-0">
//               <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-2.5">
//                 <h2 className="text-xl font-bold text-white">Available Rooms</h2>
//                 {/* <p className="text-sm text-white/80 mt-1">
//                   {hotel.Rooms.length} room options for your stay
//                 </p> */}

//                 <p className="text-sm text-white/80">
//           {hotel.Rooms.filter(room => room !== displayRoom).length} more room options for your stay
//         </p>
//               </div>

//               <div className="divide-y divide-gray-200 px-3">
//                 {hotel.Rooms
//                 .filter(room => room !== displayRoom)
//                 .map((room, index) => (
                 
//                   <components.RoomCard
//                     key={index}
//                     room={room}
//                     hotel={hotel}
//                     index={index}
//                     // onSelectRoom={handleSelectRoom}
//                      onSelectRoom={(room) => {
//     setSelectedRoomFromCard(room);   // ✅ store which room was selected
//     setShowClientPriceModal(true);   // ✅ open modal
//   }}
                   
//                     // onShowDetails={() => setShowAmenitiesModal(true)}
//   //                   onShowDetails={() => {
//   //   setSelectedRoomForModal(room);
//   //   setShowInclusionModal(true);
//   // }}

//   onShowDetails={() => {
//     setSelectedRoomForModal(room);
//     setShowInclusionModal(true);
//   }}
//                     // pricing={pricing}
//                   />
//                 ))}
//               </div>
//             </ui.Card>
//           </motion.section>
//         )}

//         {/* Map Section */}
//         <motion.div
//           ref={mapSectionRef}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           <ui.Card className="border-2 border-[#0B5CAD]/20 overflow-hidden shadow-xl py-0">
//             <div className="bg-linear-to-r from-[#0B5CAD]/10 to-[#094B8A]/10 px-6 py-4 border-b-2 border-[#0B5CAD]/20 flex items-center justify-between">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <icons.MapPin size={24} className="text-[#0B5CAD]" />
//                 Hotel Location
//               </h2>
//               <ui.Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={scrollToMap}
//                 className="text-[#0B5CAD] hover:text-[#094B8A] hover:bg-[#0B5CAD]/10"
//               >
//                 Scroll to Map
//               </ui.Button>
//             </div>

//             <div className="w-full h-100 ">
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={center}
//                 zoom={14}
//                 onClick={() => setShowInfo(false)}
//               >
//                 <Marker
//                   position={center}
//                   animation={window.google.maps.Animation.DROP}
//                   onClick={() => setShowInfo(true)}
//                 />

//                 {showInfo && (
//                   <InfoWindowF position={center}>
//                     <div className="w-67.5 p-2 flex gap-2 items-start bg-white">
//                       <img
//                         src={hotel.Image}
//                         alt="hotel"
//                         className="w-20 h-20 rounded-md object-cover shadow-sm"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             'https://via.placeholder.com/150x100?text=No+Image';
//                         }}
//                       />
//                       <div className="flex flex-col w-full">
//                         <h2 className="font-semibold text-sm text-gray-800 leading-tight">
//                           {hotel.HotelName}
//                         </h2>
//                         <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
//                           {hotel.Address}
//                         </p>
//                         <div className="flex justify-end mt-1">
//                           <span className="text-xs bg-linear-to-r from-[#0B5CAD] to-[#094B8A] text-white px-2 py-1 rounded-md">
//                             ₹{hotel.Rooms?.[0]?.TotalFare?.toFixed(0) || 'N/A'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </InfoWindowF>
//                 )}
//               </GoogleMap>

  
//             </div>
//           </ui.Card>
//         </motion.div>
//       </div>

//       {/* Image Gallery Modal */}
//       {showAllImages && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setShowAllImages(false)}
//         >
//           <ui.Button
//             size="icon"
//             onClick={() => setShowAllImages(false)}
//             className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
//           >
//             <icons.X size={24} className="rotate-180" />
//           </ui.Button>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl max-h-[90vh] overflow-auto p-4 custom-scrollbar">
//             {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
//               hotel.Images.map((img, idx) => (
//                 <motion.img
//                   key={idx}
//                   loading="lazy"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: idx * 0.05 }}
//                   src={img}
//                   alt={`Hotel ${idx + 1}`}
//                   className="rounded-lg w-full h-64 object-cover hover:scale-105 transition-transform cursor-pointer shadow-lg"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500">
//                 No images available
//               </div>
//             )}
//           </div>

//         </motion.div>
//       )}


//       {showClientPriceModal && (
//   <modals.ClientPriceModal
//     isOpen={showClientPriceModal}
//     hotel={hotel}
//     onClose={() => setShowClientPriceModal(false)}
//     onConfirm={handleClientPriceConfirm}
//   />
// )}

//       <modals.AmenitiesModal
//   isOpen={showAmenitiesModal}
//   onClose={() => setShowAmenitiesModal(false)}
//   facilities={hotel.HotelFacilities || []}
//   hotelName={hotel.HotelName}
// />

// <modals.InclusionModal
//   isOpen={showInclusionModal}
//   onClose={() => {
//     setShowInclusionModal(false);
//     setSelectedRoomForModal(null);
//   }}
//   selectedRoom={selectedRoomForModal}
//   hotel={hotel}
// />
//     </div>
//   );
// };

// export default HotelDetailPage;




import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ui, icons, modals, hotelHooks, hotelDetailsTypes, components, dateFormatterUtils, hotelTypes, hotelUtils } from '@/index';
import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import { useMapLoader } from '@/contexts/MapContext';
import { motion } from 'framer-motion';

const HotelDetailPage: React.FC = () => {

  const location = useLocation();
  const { pricing } = location.state || {};
  const { hotel, taxivaxi, fromBookNow } = (location.state as hotelDetailsTypes.HotelDetailState) || {};

  // ✅ 1. States BEFORE hook call
  const [localPricing, setLocalPricing] = useState(pricing || null);
  const [showClientPriceModal, setShowClientPriceModal] = useState(false);
  const [selectedRoomFromCard, setSelectedRoomFromCard] = useState<hotelTypes.Room | null>(null);

  // ✅ 2. Hook call
  const {
    showHeader,
    activeSection,
    showRates,
    setShowRates,
    showInfo,
    setShowInfo,
    overviewRef,
    roomsRef,
    mapSectionRef,
    displayRoom,
    scrollToSection,
    scrollToMap,
    handleSelectRoom,
    handleNavigateHome,
    handleNavigateSearch,
    getMapCenter,
  } = hotelHooks.useHotelDetail({ hotel, taxivaxi, fromBookNow, pricing: localPricing });

  // ✅ 3. Rest of states AFTER hook
  const { isLoaded } = useMapLoader();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showInclusionModal, setShowInclusionModal] = useState(false);
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<any>(null);

  // ✅ 4. useEffect
  useEffect(() => {
    console.log('=== HOTEL DETAIL PAGE ===');
    console.log('fromBookNow:', fromBookNow);
    console.log('hotel:', hotel);
    console.log('hotel.Rooms:', hotel?.Rooms);
    console.log('hotel.Rooms.length:', hotel?.Rooms?.length);
  }, [hotel, fromBookNow]);

  const agentPortal = sessionStorage.getItem('agent_portal');
  const bookingAccess = sessionStorage.getItem('has_search_access');

  // ✅ 5. Handlers
  const handleClientPriceConfirm = (pricingData: {
    clientPrice: number;
    totalFare: number;
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
  }) => {
    const { gstRate, totalTax } = hotelUtils.calculateGST(pricingData.totalFare, pricingData.nights);
    const completePricing = {
      ...pricingData,
      totalFare: pricingData.totalFare,
      totalTax: totalTax,
      gstRate: gstRate,
    };
    const roomToBook = selectedRoomFromCard ?? displayRoom;
    if (roomToBook) handleSelectRoom(roomToBook, completePricing);
    setShowClientPriceModal(false);
    setSelectedRoomFromCard(null);
  };

  const handleBookNowClick = () => {
    if (fromBookNow) {
      if (pricing && displayRoom) {
        const { gstRate, totalTax } = hotelUtils.calculateGST(pricing.totalFare, pricing.nights);
        const completePricing = {
          ...pricing,
          totalFare: pricing.totalFare,
          totalTax: totalTax,
          gstRate: gstRate,
        };
        handleSelectRoom(displayRoom, completePricing);
      }
    } else {
      setShowClientPriceModal(true);
    }
  };

  // ✅ 6. Early returns AFTER all hooks/handlers
  if (!hotel) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
        <ui.Card className="p-8 text-center border-2 border-[#0B5CAD]/20">
          <icons.Building2 size={48} className="text-[#0B5CAD] mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hotel data available</p>
        </ui.Card>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
        <ui.Card className="p-8 text-center border-2 border-[#0B5CAD]/20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5CAD] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Map...</p>
        </ui.Card>
      </div>
    );
  }

  // ✅ 7. Derived values AFTER early returns
  const center = getMapCenter();
  const imageCount = hotel.Images?.length || 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}
      />
    ));

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B5CAD]/5 to-[#094B8A]/5">
      {/* Sticky Header */}
      <components.StickyHeader
        showHeader={showHeader}
        activeSection={activeSection}
        hasMultipleRooms={Boolean(!fromBookNow && hotel.Rooms?.length && hotel.Rooms.length > 1)}
        onNavigate={scrollToSection}
      />

      <div className="max-w-300 mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        {agentPortal !== null && String(agentPortal) === '0' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <components.BreadcrumbNav
              cityName={hotel.CityName}
              hotelName={hotel.HotelName}
              showHome={bookingAccess === '1'}
              onNavigateHome={handleNavigateHome}
              onNavigateSearch={handleNavigateSearch}
            />
          </motion.div>
        )}

        {/* Overview Section */}
        <motion.div
          ref={overviewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ui.Card className="overflow-hidden border-2 border-[#0B5CAD]/20 shadow-xl py-0 gap-0">
            {/* Header Section */}
            <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] p-4 text-white">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl font-bold">{hotel.HotelName}</h1>
                <div className="flex gap-1">{renderStars(hotel.HotelRating)}</div>
                <ui.Badge className="bg-white/20 border-white/30 hover:bg-white/30">
                  {hotel.HotelRating} Star
                </ui.Badge>
              </div>
              <div className="flex gap-2 text-white/90 text-sm">
                <icons.MapPin size={14} className="shrink-0 mt-0.5" />
                <span>{hotel.Address}</span>
              </div>
            </div>

            {/* Check-in/Check-out Banner */}
            <div className="bg-[#0B5CAD]/10 border-b border-[#0B5CAD]/20 px-4 py-3">
              <div className="flex items-center gap-4 flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <icons.Calendar size={16} className="text-[#0B5CAD]" />
                  <div>
                    <p className="text-xs text-gray-600">Check-in</p>
                    <p className="font-semibold">{dateFormatterUtils.formatDateTime(taxivaxi?.checkindate)}</p>
                  </div>
                </div>
                <icons.ChevronRight size={18} className="text-gray-400" />
                <div className="flex items-center gap-2">
                  <icons.Calendar size={16} className="text-[#0B5CAD]" />
                  <div>
                    <p className="text-xs text-gray-600">Check-out</p>
                    <p className="font-semibold">{dateFormatterUtils.formatDateTime(taxivaxi?.checkoutdate)}</p>
                  </div>
                </div>
              </div>
            </div>

            <ui.CardContent className="p-4">
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Left Column - Images & Details */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Image Gallery */}
                  {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
                    <div className="relative group rounded-lg overflow-hidden shadow-md">
                      <div className="relative h-80">
                        <motion.img
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          src={hotel.Images[currentImageIndex]}
                          alt="Hotel"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        {imageCount > 1 && (
                          <>
                            <ui.Button
                              size="icon"
                              onClick={handlePrevImage}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all h-8 w-8 rounded-full"
                            >
                              <icons.ChevronLeft size={18} className="text-gray-900" />
                            </ui.Button>
                            <ui.Button
                              size="icon"
                              onClick={handleNextImage}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all h-8 w-8 rounded-full"
                            >
                              <icons.ChevronRight size={18} className="text-gray-900" />
                            </ui.Button>
                          </>
                        )}

                        <ui.Badge className="absolute top-3 right-3 bg-black/70 text-white border-0 text-xs">
                          {currentImageIndex + 1} / {imageCount}
                        </ui.Badge>

                        <ui.Button
                          size="sm"
                          onClick={() => setShowAllImages(true)}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 text-gray-900 shadow-md text-xs h-8"
                        >
                          <icons.ImageIcon size={14} className="mr-1" />
                          View All {imageCount} Photos
                        </ui.Button>

                        {imageCount > 1 && imageCount <= 5 && (
                          <div className="absolute bottom-3 left-3 flex gap-1.5">
                            {hotel.Images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(idx);
                                }}
                                className={`h-1.5 rounded-full transition-all ${
                                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <icons.Building2 size={48} className="text-[#0B5CAD]/40 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No images available</p>
                      </div>
                    </div>
                  )}

                  {/* Amenities */}
                  {hotel?.HotelFacilities && (
                    <ui.Card className="border border-[#0B5CAD]/20 py-0">
                      <div className="p-4">
                        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                          <icons.Building2 size={20} className="text-[#0B5CAD]" />
                          Hotel Amenities
                        </h2>
                        <components.HotelAmenities
                          facilities={hotel.HotelFacilities}
                          onShowMore={() => setShowAmenitiesModal(true)}
                        />
                      </div>
                    </ui.Card>
                  )}
                </div>

                {/* Right Column - Booking Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-lg py-0 gap-0">
                      {/* Room Details */}
                      <div className="bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 p-4 border-b border-[#0B5CAD]/20">
                        <h3 className="font-bold text-lg text-base mb-3 text-gray-900">
                          {(() => {
                            if (!displayRoom?.Name) return 'Room Details';
                            if (Array.isArray(displayRoom.Name)) {
                              return displayRoom.Name.length === 1 ? displayRoom.Name[0] : displayRoom.Name.join(' • ');
                            }
                            return displayRoom.Name;
                          })()}
                        </h3>

                        {/* Inclusions */}
                        {displayRoom?.Inclusion && (
                          <div className="space-y-1.5 mb-3">
                            {displayRoom.Inclusion.split(',').slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-xs">
                                <icons.Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                                <span className="text-gray-700">{item.trim()}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Meal Type */}
                        <ui.Badge className="bg-[#0B5CAD]/20 text-[#0B5CAD] border-[#0B5CAD]/30 hover:bg-[#0B5CAD]/30 mb-3 text-xs">
                          <icons.Coffee size={12} className="mr-1" />
                          {displayRoom?.MealType?.replace(/_/g, ' ') || 'No Meal Info'}
                        </ui.Badge>

                        {/* Cancellation Policy */}
                        <components.CancellationPolicyDisplay
                          policies={displayRoom?.CancelPolicies || []}
                          mealType={displayRoom?.MealType}
                          isRefundable={displayRoom?.IsRefundable}
                        />
                      </div>

                      {/* Price Section */}
                      <div className="p-4">
                        <div
                          className="relative mb-4 text-center"
                          onMouseEnter={() => setShowRates(true)}
                          onMouseLeave={() => setShowRates(false)}
                        >
                          <p className="text-xs text-gray-600 mb-1.5 font-medium">Total Price</p>

                          {/* ✅ Always show raw API price from displayRoom */}
                          <div className="text-2xl font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent mb-1">
                            ₹{displayRoom?.TotalFare?.toLocaleString('en-IN', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>

                          <p className="text-xs text-gray-500 mb-3">
                            + Incl. Tax ₹{displayRoom?.TotalTax?.toLocaleString('en-IN', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>

                          {/* Standard Breakdown - only when no localPricing */}
                          {!localPricing && (
                            <components.PriceBreakdown room={displayRoom!} show={showRates} />
                          )}

                        </div>

                        <ui.Button
                          className="w-full bg-linear-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white shadow-lg hover:shadow-xl transition-all py-5 text-md font-bold"
                          onClick={handleBookNowClick}
                        >
                          Book Now
                        </ui.Button>

                        <p className="text-[10px] text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                          <icons.Info size={10} />
                          You won't be charged yet
                        </p>
                      </div>
                    </ui.Card>
                  </div>
                </div>
              </div>
            </ui.CardContent>
          </ui.Card>
        </motion.div>

        {/* Rooms Section */}
        {!fromBookNow && hotel?.Rooms && hotel.Rooms.length > 1 && (
          <motion.section
            ref={roomsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ui.Card className="border-2 border-[#0B5CAD]/20 overflow-hidden shadow-xl py-0">
              <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-2.5">
                <h2 className="text-xl font-bold text-white">Available Rooms</h2>
                <p className="text-sm text-white/80">
                  {hotel.Rooms.filter(room => room !== displayRoom).length} more room options for your stay
                </p>
              </div>

              <div className="divide-y divide-gray-200 px-3">
                {hotel.Rooms
                  .filter(room => room !== displayRoom)
                  .map((room, index) => (
                    <components.RoomCard
                      key={index}
                      room={room}
                      hotel={hotel}
                      index={index}
                      onSelectRoom={(room) => {
                        setSelectedRoomFromCard(room);
                        setShowClientPriceModal(true);
                      }}
                      onShowDetails={() => {
                        setSelectedRoomForModal(room);
                        setShowInclusionModal(true);
                      }}
                    />
                  ))}
              </div>
            </ui.Card>
          </motion.section>
        )}

        {/* Map Section */}
        <motion.div
          ref={mapSectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ui.Card className="border-2 border-[#0B5CAD]/20 overflow-hidden shadow-xl py-0">
            <div className="bg-linear-to-r from-[#0B5CAD]/10 to-[#094B8A]/10 px-6 py-4 border-b-2 border-[#0B5CAD]/20 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <icons.MapPin size={24} className="text-[#0B5CAD]" />
                Hotel Location
              </h2>
              <ui.Button
                variant="ghost"
                size="sm"
                onClick={scrollToMap}
                className="text-[#0B5CAD] hover:text-[#094B8A] hover:bg-[#0B5CAD]/10"
              >
                Scroll to Map
              </ui.Button>
            </div>

            <div className="w-full h-100">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={14}
                onClick={() => setShowInfo(false)}
              >
                <Marker
                  position={center}
                  animation={window.google.maps.Animation.DROP}
                  onClick={() => setShowInfo(true)}
                />

                {showInfo && (
                  <InfoWindowF position={center}>
                    <div className="w-67.5 p-2 flex gap-2 items-start bg-white">
                      <img
                        src={hotel.Image}
                        alt="hotel"
                        className="w-20 h-20 rounded-md object-cover shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/150x100?text=No+Image';
                        }}
                      />
                      <div className="flex flex-col w-full">
                        <h2 className="font-semibold text-sm text-gray-800 leading-tight">
                          {hotel.HotelName}
                        </h2>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                          {hotel.Address}
                        </p>
                        <div className="flex justify-end mt-1">
                          <span className="text-xs bg-linear-to-r from-[#0B5CAD] to-[#094B8A] text-white px-2 py-1 rounded-md">
                            ₹{hotel.Rooms?.[0]?.TotalFare?.toFixed(0) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            </div>
          </ui.Card>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      {showAllImages && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAllImages(false)}
        >
          <ui.Button
            size="icon"
            onClick={() => setShowAllImages(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
          >
            <icons.X size={24} className="rotate-180" />
          </ui.Button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl max-h-[90vh] overflow-auto p-4 custom-scrollbar">
            {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
              hotel.Images.map((img, idx) => (
                <motion.img
                  key={idx}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  src={img}
                  alt={`Hotel ${idx + 1}`}
                  className="rounded-lg w-full h-64 object-cover hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No images available
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Client Price Modal */}
      {showClientPriceModal && (
        <modals.ClientPriceModal
          isOpen={showClientPriceModal}
          hotel={hotel}
          room={selectedRoomFromCard ?? displayRoom}
          onClose={() => {
            setShowClientPriceModal(false);
            setSelectedRoomFromCard(null);
          }}
          onConfirm={handleClientPriceConfirm}
        />
      )}

      {/* Amenities Modal */}
      <modals.AmenitiesModal
        isOpen={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
        facilities={hotel.HotelFacilities || []}
        hotelName={hotel.HotelName}
      />

      {/* Inclusion Modal */}
      <modals.InclusionModal
        isOpen={showInclusionModal}
        onClose={() => {
          setShowInclusionModal(false);
          setSelectedRoomForModal(null);
        }}
        selectedRoom={selectedRoomForModal}
        hotel={hotel}
      />
    </div>
  );
};

export default HotelDetailPage;

