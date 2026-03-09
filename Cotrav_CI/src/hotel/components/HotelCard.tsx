

// import React, { useState, useMemo, useCallback } from 'react';
// import { hotelTypes, ui, icons, hotelUtils, constants } from '@/index';

// interface HotelCardProps {
//   hotel: hotelTypes.Hotel;
//   booknow: string;
//   agent_portal: string;
//   onViewPrice: (hotel: hotelTypes.Hotel) => void;
//   onBookNow: (hotel: hotelTypes.Hotel) => void;
//   onViewImages: (images: string[]) => void;
//   onViewDetails?: (hotel: hotelTypes.Hotel) => void;
//   extractAttraction: (description: string) => string;
//   formatCancelPolicies: (policies: hotelTypes.CancellationPolicy[]) => string[];
// }

// export const HotelCard = React.memo<HotelCardProps>(({
//   hotel,
//   booknow,
//   agent_portal,
//   onViewPrice,
//   onBookNow,
//   onViewImages,
//   onViewDetails,
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
//   const lowestFareRoom = useMemo(() => hotelUtils.getLowestFareRoom(rooms), [rooms]);
//   const imageCount = useMemo(() => hotel.Images?.length || 0, [hotel.Images]);
//   const numberOfNights = useMemo(() => hotelUtils.getNumberOfNights(lowestFareRoom), [lowestFareRoom]);
  
//   const {
//     totalFare,
//     totalTax,
//     totalPrice,
//     perNightFare
//   } = useMemo(() => 
//     hotelUtils.getRoomPricing(lowestFareRoom, numberOfNights),
//     [lowestFareRoom, numberOfNights]
//   );

//   const facilities = useMemo(() => 
//     hotelUtils.getAvailableFacilities(hotel.HotelFacilities, constants.facilityIcons),
//     [hotel.HotelFacilities]
//   );

//   const cancellationStatus = useMemo(() => 
//     hotelUtils.getCancellationStatus(lowestFareRoom),
//     [lowestFareRoom]
//   );

//   const renderStars = useCallback((rating: number) =>
//     Array.from({ length: 5 }).map((_, index) => (
//       <icons.Star
//         key={index}
//         size={14}
//         className={
//           index < rating
//             ? 'fill-yellow-400 stroke-yellow-400'
//             : 'stroke-gray-300'
//         }
//       />
//     )), []);

//   const handlePrevImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleNextImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleViewAllPhotos = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (hotel.Images && hotel.Images.length > 0) {
//       onViewImages(hotel.Images);
//     }
//   }, [hotel.Images, onViewImages]);

//   const handleThumbnailClick = useCallback((e: React.MouseEvent, idx: number) => {
//     e.stopPropagation();
//     if (isTransitioning || idx === currentImageIndex) return;

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentImageIndex(idx);
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [currentImageIndex, isTransitioning]);

//   const handleViewPriceClick = useCallback(() => {
//     onViewPrice(hotel);
//   }, [hotel, onViewPrice]);

//   const handleBookNowClick = useCallback(() => {
//     onBookNow(hotel);
//   }, [hotel, onBookNow]);

//   const handleViewDetailsClick = useCallback(() => {
//     if (onViewDetails) {
//       onViewDetails(hotel);
//     }
//   }, [hotel, onViewDetails]);

//   return (
//     <div className="w-full mb-4 hover:-translate-y-1 transition-transform duration-200">
//       <ui.Card className="overflow-hidden py-0 border-2 border-[#0B5CAD]/20 hover:shadow-xl transition-all duration-300 bg-white">
//         <ui.CardContent className="p-0">
//           <div className="flex flex-col lg:flex-row">

//             {/* Image with Zoom + Fade */}
//             <div className="lg:w-80 aspect-4/3 relative group shrink-0 self-stretch overflow-hidden bg-gray-100">
//               <div className="relative h-full">
//                 {hotel.Images?.length ? (
//                   <>
//                     <img
//                       key={currentImageIndex}
//                       src={hotel.Images[currentImageIndex]}
//                       alt={hotel.HotelName}
//                       className={`
//                         absolute inset-0 w-full h-full object-cover
//                         transition-all duration-400 ease-out
//                         ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
//                       `}
//                       loading="lazy"
//                     />

//                     <ui.Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white shadow-lg border-0 rounded-md z-10">
//                       <span className="font-bold">{hotel.HotelRating}.0</span>
//                       <icons.Star size={12} className="fill-white ml-1" />
//                     </ui.Badge>

//                     <ui.Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white border-0 z-10">
//                       {currentImageIndex + 1}/{imageCount}
//                     </ui.Badge>

//                     {imageCount > 1 && (
//                       <>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handlePrevImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronLeft className="h-4 w-4" />
//                         </ui.Button>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handleNextImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronRight className="h-4 w-4" />
//                         </ui.Button>
//                       </>
//                     )}

//                     <ui.Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={handleViewAllPhotos}
//                       className="absolute bg-white/95 hover:bg-white bottom-3 left-1/2 -translate-x-1/2 shadow-lg hover:scale-105 transition-all z-10"
//                     >
//                       <icons.ImageIcon className="h-4 w-4 mr-1 text-[#0B5CAD]" />
//                       View All {imageCount} Photos
//                     </ui.Button>

//                     {imageCount > 1 && imageCount <= 5 && (
//                       <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
//                         {hotel.Images.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={(e) => handleThumbnailClick(e, idx)}
//                             disabled={isTransitioning}
//                             className={`h-1.5 rounded-full transition-all duration-300 ${
//                               idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
//                     <icons.Building2 size={48} className="text-[#0B5CAD]/40" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Rest of content - same as Option 1 */}
//             <div className="flex-1 flex flex-col lg:flex-row">
//               <div className="flex-1 p-5 lg:p-6">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 
//                         onClick={handleViewDetailsClick}
//                         className="text-xl font-bold text-gray-900 hover:text-[#0B5CAD] cursor-pointer transition-colors"
//                       >
//                         {hotel.HotelName}
//                       </h3>
//                       <div className="flex items-center gap-1">
//                         {renderStars(hotel.HotelRating)}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                       <icons.MapPin size={14} className="text-red-600" />
//                       <span className="font-medium">{hotel.CityName}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {facilities.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {facilities.map((facility, i) => (
//                       <ui.Badge key={i} variant="outline" className="bg-[#0B5CAD]/5 border-[#0B5CAD]/20 hover:bg-[#0B5CAD]/10 text-gray-700">
//                         <span className="text-[#0B5CAD] mr-1.5">{facility.icon}</span>
//                         {facility.label}
//                       </ui.Badge>
//                     ))}
//                   </div>
//                 )}

//                 {/* {lowestFareRoom?.Inclusion && (
//                   <div className="mb-4">
//                     <div className="flex flex-wrap gap-x-4 gap-y-2">
//                       {lowestFareRoom.Inclusion.split(',').slice(0, 4).map((item, i) => (
//                         <div key={i} className="flex items-center gap-1.5 text-sm text-gray-700">
//                           <icons.Check size={14} className="text-green-600 shrink-0" />
//                           <span>{item.trim()}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )} */}

//                 <ui.Separator className="my-4" />

//                 {/* <div className="flex flex-col gap-2">
//                   <ui.Badge variant="outline" className={`
//                     ${cancellationStatus.color === 'green' ? 'bg-green-600 hover:bg-green-700 border-green-200' : ''}
//                     ${cancellationStatus.color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600 border-yellow-200' : ''}
//                     ${cancellationStatus.color === 'red' ? 'bg-red-600 hover:bg-red-700 border-red-200' : ''}
//                     text-white rounded-lg py-1.5 px-3
//                   `}>
//                     {cancellationStatus.icon === 'Check' && <icons.Check size={16} className="mr-2" />}
//                     {cancellationStatus.icon === 'X' && <icons.X size={16} className="mr-2" />}
//                     {cancellationStatus.icon === 'AlertCircle' && <icons.AlertCircle size={16} className="mr-2" />}
//                     {cancellationStatus.message}
//                   </ui.Badge>

//                   {cancellationStatus.details && cancellationStatus.details.length > 0 && (
//                     <div className="flex flex-col gap-1.5">
//                       {cancellationStatus.details.map((detail, index) => (
//                         <p key={index} className="text-xs text-gray-600 flex items-start gap-1.5">
//                           <icons.Info size={12} className="mt-0.5 shrink-0 text-gray-400" />
//                           <span>{detail}</span>
//                         </p>
//                       ))}
//                     </div>
//                   )}
//                 </div> */}
//               </div>

//               <div className="lg:w-56 bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5 p-5 lg:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#0B5CAD]/20 shrink-0">
//                 <div className="flex-1 flex flex-col justify-center">
//                   <div className="text-right mb-6">
//                     <p className="text-xs text-gray-600 mb-2 font-medium">Per Night Price</p>
//                     <div className="flex items-baseline justify-end gap-2 mb-2">
//                       <span className="text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//                         ₹{Math.round(perNightFare).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500">Excluding taxes & fees</p>

//                     <ui.Badge variant="outline" className="mt-3 bg-[#0B5CAD]/10 border-[#0B5CAD]/20 px-3 py-2 h-auto rounded-xl">
//                       <div className="flex flex-col items-end">
//                         <p className="text-xs font-semibold text-gray-700">
//                           Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}): <span className="text-[#0B5CAD] text-base">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
//                         </p>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           ₹{Math.round(totalFare).toLocaleString('en-IN')} + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax
//                         </p>
//                       </div>
//                     </ui.Badge>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   {booknow === '0' && (
//                     <ui.Button
//                       onClick={handleViewPriceClick}
//                       variant="outline"
//                       className="w-full border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold"
//                     >
//                       View All Rooms
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   {agent_portal === '0' && booknow === '1' && (
//                     <ui.Button
//                       onClick={handleBookNowClick}
//                       className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
//                     >
//                       Book Now
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
//                     <icons.Building2 size={14} className="text-[#0B5CAD]" />
//                     <span className="font-medium text-gray-700">{rooms.length} room option{rooms.length > 1 ? 's' : ''} available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// }, (prevProps, nextProps) => {
//   return (
//     prevProps.hotel.HotelCode === nextProps.hotel.HotelCode &&
//     prevProps.hotel.Rooms === nextProps.hotel.Rooms &&
//     prevProps.booknow === nextProps.booknow &&
//     prevProps.agent_portal === nextProps.agent_portal &&
//     prevProps.onViewPrice === nextProps.onViewPrice &&
//     prevProps.onBookNow === nextProps.onBookNow &&
//     prevProps.onViewImages === nextProps.onViewImages &&
//     prevProps.onViewDetails === nextProps.onViewDetails
//   );
// });

// HotelCard.displayName = 'HotelCard';


// import React, { useState, useMemo, useCallback } from 'react';
// import { hotelTypes, ui, icons, hotelUtils, constants } from '@/index';

// interface HotelCardProps {
//   hotel: hotelTypes.Hotel;
//   booknow: string;
//   agent_portal: string;
//   onViewPrice: (hotel: hotelTypes.Hotel) => void;
//   onBookNow: (hotel: hotelTypes.Hotel) => void;
//   onViewImages: (images: string[]) => void;
//   onViewDetails?: (hotel: hotelTypes.Hotel) => void;
//   extractAttraction: (description: string) => string;
//   formatCancelPolicies: (policies: hotelTypes.CancellationPolicy[]) => string[];
// }

// export const HotelCard = React.memo<HotelCardProps>(({
//   hotel,
//   booknow,
//   agent_portal,
//   onViewPrice,
//   onBookNow,
//   onViewImages,
//   onViewDetails,
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
//   const lowestFareRoom = useMemo(() => hotelUtils.getLowestFareRoom(rooms), [rooms]);
//   const imageCount = useMemo(() => hotel.Images?.length || 0, [hotel.Images]);
//   const numberOfNights = useMemo(() => hotelUtils.getNumberOfNights(lowestFareRoom), [lowestFareRoom]);
  
//   const {
//     totalFare,
//     totalTax,
//     totalPrice,
//     perNightFare
//   } = useMemo(() => 
//     hotelUtils.getRoomPricing(lowestFareRoom, numberOfNights),
//     [lowestFareRoom, numberOfNights]
//   );

//   const facilities = useMemo(() => 
//     hotelUtils.getAvailableFacilities(hotel.HotelFacilities, constants.facilityIcons),
//     [hotel.HotelFacilities]
//   );

//   const topAttractions = useMemo(() => {
//     if (!hotel.Attractions) return [];
//     return Object.values(hotel.Attractions).slice(0, 4);
//   }, [hotel.Attractions]);

//   const renderStars = useCallback((rating: number) =>
//     Array.from({ length: 5 }).map((_, index) => (
//       <icons.Star
//         key={index}
//         size={14}
//         className={
//           index < rating
//             ? 'fill-yellow-400 stroke-yellow-400'
//             : 'stroke-gray-300'
//         }
//       />
//     )), []);

//   const handlePrevImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleNextImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleViewAllPhotos = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (hotel.Images && hotel.Images.length > 0) {
//       onViewImages(hotel.Images);
//     }
//   }, [hotel.Images, onViewImages]);

//   const handleThumbnailClick = useCallback((e: React.MouseEvent, idx: number) => {
//     e.stopPropagation();
//     if (isTransitioning || idx === currentImageIndex) return;

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentImageIndex(idx);
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [currentImageIndex, isTransitioning]);

//   const handleViewPriceClick = useCallback(() => {
//     onViewPrice(hotel);
//   }, [hotel, onViewPrice]);

//   const handleBookNowClick = useCallback(() => {
//     onBookNow(hotel);
//   }, [hotel, onBookNow]);

//   const handleViewDetailsClick = useCallback(() => {
//     if (onViewDetails) {
//       onViewDetails(hotel);
//     }
//   }, [hotel, onViewDetails]);

//   return (
//     <div className="w-full mb-3 hover:-translate-y-1 transition-transform duration-200">
//       <ui.Card className="overflow-hidden py-0 border-2 border-[#0B5CAD]/20 hover:shadow-xl transition-all duration-300 bg-white">
//         <ui.CardContent className="p-0">
//           <div className="flex flex-col lg:flex-row">

//             {/* Image with Zoom + Fade */}
//             <div className="lg:w-[18rem] aspect-4/3 relative group shrink-0 self-stretch overflow-hidden bg-gray-100">
//               <div className="relative h-full">
//                 {hotel.Images?.length ? (
//                   <>
//                     <img
//                       key={currentImageIndex}
//                       src={hotel.Images[currentImageIndex]}
//                       alt={hotel.HotelName}
//                       className={`
//                         absolute inset-0 w-full h-full object-cover
//                         transition-all duration-400 ease-out
//                         ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
//                       `}
//                       loading="lazy"
//                     />

//                     <ui.Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white shadow-lg border-0 rounded-md z-10">
//                       <span className="font-bold">{hotel.HotelRating}.0</span>
//                       <icons.Star size={12} className="fill-white ml-1" />
//                     </ui.Badge>

//                     <ui.Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white border-0 z-10">
//                       {currentImageIndex + 1}/{imageCount}
//                     </ui.Badge>

//                     {imageCount > 1 && (
//                       <>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handlePrevImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronLeft className="h-4 w-4" />
//                         </ui.Button>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handleNextImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronRight className="h-4 w-4" />
//                         </ui.Button>
//                       </>
//                     )}

//                     <ui.Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={handleViewAllPhotos}
//                       className="absolute bg-white/95 hover:bg-white bottom-3 left-1/2 -translate-x-1/2 shadow-lg hover:scale-105 transition-all z-10"
//                     >
//                       <icons.ImageIcon className="h-4 w-4 mr-1 text-[#0B5CAD]" />
//                       View All {imageCount} Photos
//                     </ui.Button>

//                     {imageCount > 1 && imageCount <= 5 && (
//                       <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
//                         {hotel.Images.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={(e) => handleThumbnailClick(e, idx)}
//                             disabled={isTransitioning}
//                             className={`h-1.5 rounded-full transition-all duration-300 ${
//                               idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
//                     <icons.Building2 size={48} className="text-[#0B5CAD]/40" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="flex-1 flex flex-col lg:flex-row">
//               <div className="flex-1 p-3">
//                 <div className="flex items-start justify-between mb-1.5">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-1.5">
//                       <h3 
//                         onClick={handleViewDetailsClick}
//                         className="text-lg lg:text-xl font-bold text-gray-900 hover:text-[#0B5CAD] cursor-pointer transition-colors"
//                       >
//                         {hotel.HotelName}
//                       </h3>
//                       <div className="flex items-center gap-1">
//                         {renderStars(hotel.HotelRating)}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                       <icons.MapPin size={14} className="text-red-600" />
//                       <span className="font-medium">{hotel.CityName}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {facilities.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     {facilities.map((facility, i) => (
//                       <ui.Badge key={i} variant="outline" className="bg-[#0B5CAD]/5 border-[#0B5CAD]/20 hover:bg-[#0B5CAD]/10 text-gray-700">
//                         <span className="text-[#0B5CAD] mr-1.5">{facility.icon}</span>
//                         {facility.label}
//                       </ui.Badge>
//                     ))}
//                   </div>
//                 )}

//                 {topAttractions.length > 0 && (
//   <div className="mt-2">
//     <div className="flex items-center gap-1 mb-1.5">
//       <icons.MapPin size={12} className="text-[#0B5CAD]" />
//       <span className="text-xs font-semibold text-gray-600">Nearby:</span>
//     </div>
//     <div className="flex flex-wrap gap-1.5">
//       {topAttractions.slice(0, 4).map((attraction, i) => (
//         <ui.Badge 
//           key={i} 
//           variant="outline" 
//           className="bg-gray-50 border-gray-200 text-gray-700 text-xs px-2 py-0.5"
//         >
//           {attraction}
//         </ui.Badge>
//       ))}
//     </div>
//   </div>
// )}
//               </div>

//               <div className="lg:w-56 bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5 p-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#0B5CAD]/20 shrink-0">
//                 <div className="flex-1 flex flex-col justify-center">
//                   <div className="text-right mb-3">
//                     <p className="text-xs text-gray-600 mb-1.5 font-medium">Per Night Price</p>
//                     <div className="flex items-baseline justify-end gap-2 mb-1.5">
//                       <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//                         ₹{Math.round(perNightFare).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500">Excluding taxes & fees</p>

//                     {/* <ui.Badge variant="outline" className="mt-2 bg-[#0B5CAD]/10 border-[#0B5CAD]/20 px-3 py-1.5 h-auto rounded-xl">
//                       <div className="flex flex-col items-end">
//                         <p className="text-xs font-semibold text-gray-700">
//                           Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}): <span className="text-[#0B5CAD] text-base">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
//                         </p>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           ₹{Math.round(totalFare).toLocaleString('en-IN')} + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax
//                         </p>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax
//                         </p>
//                       </div>
//                     </ui.Badge> */}

//                     <ui.Badge variant="outline" className="mt-2 bg-[#0B5CAD]/10 border-[#0B5CAD]/20 px-3 py-1.5 h-auto rounded-xl">
//   <div className="flex flex-col items-end">
//     <p className="text-xs font-semibold text-gray-700">
//       Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}): <span className="text-[#0B5CAD] text-base">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
//     </p>
//     <p className="text-xs text-gray-500 mt-0.5">
//       (Incl. ₹{Math.round(totalTax).toLocaleString('en-IN')} tax)
//     </p>
//   </div>
// </ui.Badge>
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   {booknow === '0' && (
//                     <ui.Button
//                       onClick={handleViewPriceClick}
//                       variant="outline"
//                       className="w-full border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold"
//                     >
//                       View All Rooms
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   {agent_portal === '0' && booknow === '1' && (
//                     <ui.Button
//                       onClick={handleBookNowClick}
//                       className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
//                     >
//                       Book Now
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
//                     <icons.Building2 size={14} className="text-[#0B5CAD]" />
//                     <span className="font-medium text-gray-700">{rooms.length} room option{rooms.length > 1 ? 's' : ''} available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// }, (prevProps, nextProps) => {
//   return (
//     prevProps.hotel.HotelCode === nextProps.hotel.HotelCode &&
//     prevProps.hotel.Rooms === nextProps.hotel.Rooms &&
//     prevProps.booknow === nextProps.booknow &&
//     prevProps.agent_portal === nextProps.agent_portal &&
//     prevProps.onViewPrice === nextProps.onViewPrice &&
//     prevProps.onBookNow === nextProps.onBookNow &&
//     prevProps.onViewImages === nextProps.onViewImages &&
//     prevProps.onViewDetails === nextProps.onViewDetails
//   );
// });

// HotelCard.displayName = 'HotelCard';




import React, { useState, useMemo, useCallback } from 'react';
import { hotelTypes, ui, icons, hotelUtils, constants } from '@/index';

interface HotelCardProps {
  hotel: hotelTypes.Hotel;
  booknow: string;
  agent_portal: string;
  onViewPrice: (hotel: hotelTypes.Hotel) => void;
  onBookNow: (hotel: hotelTypes.Hotel) => void;
  onViewImages: (images: string[]) => void;
  onViewDetails?: (hotel: hotelTypes.Hotel) => void;
  extractAttraction: (description: string) => string;
  formatCancelPolicies: (policies: hotelTypes.CancellationPolicy[]) => string[];
}

export const HotelCard = React.memo<HotelCardProps>(({
  hotel,
  booknow,
  agent_portal,
  onViewPrice,
  onBookNow,
  onViewImages,
  onViewDetails,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
  const lowestFareRoom = useMemo(() => hotelUtils.getLowestFareRoom(rooms), [rooms]);
  const imageCount = useMemo(() => hotel.Images?.length || 0, [hotel.Images]);
  const numberOfNights = useMemo(() => hotelUtils.getNumberOfNights(lowestFareRoom), [lowestFareRoom]);
  
  const {
    totalFare,
    totalTax,
    totalPrice,
    perNightFare
  } = useMemo(() => 
    hotelUtils.getRoomPricing(lowestFareRoom, numberOfNights),
    [lowestFareRoom, numberOfNights]
  );

  const facilities = useMemo(() => 
    hotelUtils.getAvailableFacilities(hotel.HotelFacilities, constants.facilityIcons),
    [hotel.HotelFacilities]
  );

  const topAttractions = useMemo(() => {
    if (!hotel.Attractions) return [];
    return Object.values(hotel.Attractions).slice(0, 4);
  }, [hotel.Attractions]);

  const renderStars = useCallback((rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={14}
        className={
          index < rating
            ? 'fill-yellow-400 stroke-yellow-400'
            : 'stroke-gray-300'
        }
      />
    )), []);

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 100);
    }, 250);
  }, [imageCount, isTransitioning]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 100);
    }, 250);
  }, [imageCount, isTransitioning]);

  const handleViewAllPhotos = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hotel.Images && hotel.Images.length > 0) {
      onViewImages(hotel.Images);
    }
  }, [hotel.Images, onViewImages]);

  const handleThumbnailClick = useCallback((e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (isTransitioning || idx === currentImageIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(idx);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 250);
  }, [currentImageIndex, isTransitioning]);

  const handleViewPriceClick = useCallback(() => {
    onViewPrice(hotel);
  }, [hotel, onViewPrice]);

  const handleBookNowClick = useCallback(() => {
    onBookNow(hotel);
  }, [hotel, onBookNow]);

  const handleViewDetailsClick = useCallback(() => {
    if (onViewDetails) {
      onViewDetails(hotel);
    }
  }, [hotel, onViewDetails]);

  return (
    <div className="w-full mb-3 hover:-translate-y-1 transition-transform duration-200">
      <ui.Card className="overflow-hidden py-0 border-2 border-[#0B5CAD]/20 hover:shadow-xl transition-all duration-300 bg-white">
        <ui.CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">

            {/* Image with Zoom + Fade */}
            <div className="lg:w-[14rem] aspect-video relative group shrink-0 self-stretch overflow-hidden bg-gray-100">
              <div className="relative h-full">
                {hotel.Images?.length ? (
                  <>
                    <img
                      key={currentImageIndex}
                      src={hotel.Images[currentImageIndex]}
                      alt={hotel.HotelName}
                      className={`
                        absolute inset-0 w-full h-full object-cover
                        transition-all duration-400 ease-out
                        ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
                      `}
                      loading="lazy"
                    />

                    <ui.Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white shadow-lg border-0 rounded-md z-10">
                      <span className="font-bold">{hotel.HotelRating}.0</span>
                      <icons.Star size={12} className="fill-white ml-1" />
                    </ui.Badge>

                    <ui.Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white border-0 z-10">
                      {currentImageIndex + 1}/{imageCount}
                    </ui.Badge>

                    {imageCount > 1 && (
                      <>
                        <ui.Button
                          size="icon"
                          variant="secondary"
                          onClick={handlePrevImage}
                          disabled={isTransitioning}
                          className="absolute bg-white/95 hover:bg-white left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
                        >
                          <icons.ChevronLeft className="h-4 w-4" />
                        </ui.Button>
                        <ui.Button
                          size="icon"
                          variant="secondary"
                          onClick={handleNextImage}
                          disabled={isTransitioning}
                          className="absolute bg-white/95 hover:bg-white right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
                        >
                          <icons.ChevronRight className="h-4 w-4" />
                        </ui.Button>
                      </>
                    )}

                    <ui.Button
                      variant="secondary"
                      size="sm"
                      onClick={handleViewAllPhotos}
                      className="absolute bg-white/95 hover:bg-white bottom-3 left-1/2 -translate-x-1/2 shadow-lg hover:scale-105 transition-all z-10"
                    >
                      <icons.ImageIcon className="h-4 w-4 mr-1 text-[#0B5CAD]" />
                      View All {imageCount} Photos
                    </ui.Button>

                    {imageCount > 1 && imageCount <= 5 && (
                      <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                        {hotel.Images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => handleThumbnailClick(e, idx)}
                            disabled={isTransitioning}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
                    <icons.Building2 size={48} className="text-[#0B5CAD]/40" />
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="flex-1 p-2.5 lg:pl-4">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 
                        onClick={handleViewDetailsClick}
                        className="text-base md:text-lg lg:text-xl font-bold text-gray-900 hover:text-[#0B5CAD] cursor-pointer transition-colors"
                      >
                        {hotel.HotelName}
                      </h3>
                      <div className="flex items-center gap-1">
                        {renderStars(hotel.HotelRating)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <icons.MapPin size={14} className="text-red-600" />
                      <span className="font-medium">{hotel.CityName}</span>
                    </div>
                  </div>
                </div>

                {facilities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {facilities.map((facility, i) => (
                      <ui.Badge key={i} variant="outline" className="bg-[#0B5CAD]/5 border-[#0B5CAD]/20 hover:bg-[#0B5CAD]/10 text-gray-700">
                        <span className="text-[#0B5CAD] mr-1.5">{facility.icon}</span>
                        {facility.label}
                      </ui.Badge>
                    ))}
                  </div>
                )}

                {/* {topAttractions.length > 0 && (
  <div className="mt-1.5">
    <div className="flex items-center gap-1 mb-1.5">
      <icons.MapPin size={12} className="text-[#0B5CAD]" />
      <span className="text-xs font-semibold text-gray-600">Nearby:</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {topAttractions.slice(0, 4).map((attraction, i) => (
        <ui.Badge 
          key={i} 
          variant="outline" 
          className="bg-gray-50 border-gray-200 text-gray-700 text-xs px-2 py-0.5"
        >
          {attraction}
        </ui.Badge>
      ))}
    </div>
  </div>
)} */}


{topAttractions.length > 0 && (
  <div className="mt-3">
    <div className="flex items-center gap-1 mb-1.5">
      <icons.MapPin size={12} className="text-[#0B5CAD]" />
      <span className="text-xs font-semibold text-gray-600">Nearby:</span>
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-0.5">
      {topAttractions.slice(0, 4).map((attraction, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
          <span className="text-[#0B5CAD]">•</span>
          {attraction}
        </div>
      ))}
    </div>
  </div>
)}
              </div>

              <div className="lg:w-56 bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5 p-2.5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#0B5CAD]/20 shrink-0">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-right mb-2">
                    <p className="text-xs text-gray-600 mb-1.5 font-medium">Per Night Price</p>
                    <div className="flex items-baseline justify-end gap-2 mb-1.5">
                      <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
                        ₹{Math.round(perNightFare).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {/* <p className="text-xs text-gray-500">Excluding taxes & fees</p> */}

                    {/* <ui.Badge variant="outline" className="mt-2 bg-[#0B5CAD]/10 border-[#0B5CAD]/20 px-3 py-1.5 h-auto rounded-xl">
                      <div className="flex flex-col items-end">
                        <p className="text-xs font-semibold text-gray-700">
                          Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}): <span className="text-[#0B5CAD] text-base">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ₹{Math.round(totalFare).toLocaleString('en-IN')} + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax
                        </p>
                      </div>
                    </ui.Badge> */}

                    <ui.Badge variant="outline" className="mt-2 bg-[#0B5CAD]/10 border-[#0B5CAD]/20 px-3 py-1.5 h-auto rounded-xl">
  <div className="flex flex-col items-end">
    <p className="text-xs font-semibold text-gray-700">
      Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}): <span className="text-[#0B5CAD] text-base">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
    </p>
    <p className="text-xs text-gray-500 mt-0.5">
      (Incl. + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax)
      {/* <span className="text-xs text-gray-500">Excluding taxes & fees</span> */}
    </p>
  </div>
</ui.Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {booknow === '0' && (
                    <ui.Button
                      onClick={handleViewPriceClick}
                      variant="outline"
                      className="w-full border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold cursor-pointer"
                    >
                      View All Rooms
                      <icons.ChevronRight className="ml-2 h-4 w-4" />
                    </ui.Button>
                  )}

                  {agent_portal === '0' && booknow === '1' && (
                    <ui.Button
                      onClick={handleBookNowClick}
                      className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                      Book Now
                      <icons.ChevronRight className="ml-2 h-4 w-4" />
                    </ui.Button>
                  )}

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                    <icons.Building2 size={14} className="text-[#0B5CAD]" />
                    <span className="font-medium text-gray-700">{rooms.length} room option{rooms.length > 1 ? 's' : ''} available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ui.CardContent>
      </ui.Card>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.hotel.HotelCode === nextProps.hotel.HotelCode &&
    prevProps.hotel.Rooms === nextProps.hotel.Rooms &&
    prevProps.booknow === nextProps.booknow &&
    prevProps.agent_portal === nextProps.agent_portal &&
    prevProps.onViewPrice === nextProps.onViewPrice &&
    prevProps.onBookNow === nextProps.onBookNow &&
    prevProps.onViewImages === nextProps.onViewImages &&
    prevProps.onViewDetails === nextProps.onViewDetails
  );
});

HotelCard.displayName = 'HotelCard';


// import React, { useState, useMemo, useCallback } from 'react';
// import { hotelTypes, ui, icons, hotelUtils, constants } from '@/index';

// interface HotelCardProps {
//   hotel: hotelTypes.Hotel;
//   booknow: string;
//   agent_portal: string;
//   onViewPrice: (hotel: hotelTypes.Hotel) => void;
//   onBookNow: (hotel: hotelTypes.Hotel) => void;
//   onViewImages: (images: string[]) => void;
//   onViewDetails?: (hotel: hotelTypes.Hotel) => void;
//   extractAttraction: (description: string) => string;
//   formatCancelPolicies: (policies: hotelTypes.CancellationPolicy[]) => string[];
// }

// export const HotelCard = React.memo<HotelCardProps>(({
//   hotel,
//   booknow,
//   agent_portal,
//   onViewPrice,
//   onBookNow,
//   onViewImages,
//   onViewDetails,
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
//   const lowestFareRoom = useMemo(() => hotelUtils.getLowestFareRoom(rooms), [rooms]);
//   const imageCount = useMemo(() => hotel.Images?.length || 0, [hotel.Images]);
//   const numberOfNights = useMemo(() => hotelUtils.getNumberOfNights(lowestFareRoom), [lowestFareRoom]);
  
//   const {
//     totalFare,
//     totalTax,
//     totalPrice,
//     perNightFare
//   } = useMemo(() => 
//     hotelUtils.getRoomPricing(lowestFareRoom, numberOfNights),
//     [lowestFareRoom, numberOfNights]
//   );

//   const facilities = useMemo(() => 
//     hotelUtils.getAvailableFacilities(hotel.HotelFacilities, constants.facilityIcons),
//     [hotel.HotelFacilities]
//   );

//   const topAttractions = useMemo(() => {
//     if (!hotel.Attractions) return [];
//     return Object.values(hotel.Attractions).slice(0, 4);
//   }, [hotel.Attractions]);

//   const renderStars = useCallback((rating: number) =>
//     Array.from({ length: 5 }).map((_, index) => (
//       <icons.Star
//         key={index}
//         size={14}
//         className={
//           index < rating
//             ? 'fill-yellow-400 stroke-yellow-400'
//             : 'stroke-gray-300'
//         }
//       />
//     )), []);

//   const handlePrevImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleNextImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleViewAllPhotos = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (hotel.Images && hotel.Images.length > 0) {
//       onViewImages(hotel.Images);
//     }
//   }, [hotel.Images, onViewImages]);

//   const handleThumbnailClick = useCallback((e: React.MouseEvent, idx: number) => {
//     e.stopPropagation();
//     if (isTransitioning || idx === currentImageIndex) return;

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentImageIndex(idx);
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [currentImageIndex, isTransitioning]);

//   const handleViewPriceClick = useCallback(() => {
//     onViewPrice(hotel);
//   }, [hotel, onViewPrice]);

//   const handleBookNowClick = useCallback(() => {
//     onBookNow(hotel);
//   }, [hotel, onBookNow]);

//   const handleViewDetailsClick = useCallback(() => {
//     if (onViewDetails) {
//       onViewDetails(hotel);
//     }
//   }, [hotel, onViewDetails]);

//   return (
//     <div className="w-full mb-3 hover:-translate-y-1 transition-transform duration-200">
//       <ui.Card className="overflow-hidden py-0 border-2 border-[#0B5CAD]/20 hover:shadow-xl transition-all duration-300 bg-white">
//         <ui.CardContent className="p-0">
//           <div className="flex flex-col lg:flex-row">

//             {/* Image with Zoom + Fade */}
//             <div className="lg:w-[14rem] aspect-video relative group shrink-0 self-stretch overflow-hidden bg-gray-100">
//               <div className="relative h-full">
//                 {hotel.Images?.length ? (
//                   <>
//                     <img
//                       key={currentImageIndex}
//                       src={hotel.Images[currentImageIndex]}
//                       alt={hotel.HotelName}
//                       className={`
//                         absolute inset-0 w-full h-full object-cover
//                         transition-all duration-400 ease-out
//                         ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
//                       `}
//                       loading="lazy"
//                     />

//                     <ui.Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white shadow-lg border-0 rounded-md z-10">
//                       <span className="font-bold">{hotel.HotelRating}.0</span>
//                       <icons.Star size={12} className="fill-white ml-1" />
//                     </ui.Badge>

//                     <ui.Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white border-0 z-10">
//                       {currentImageIndex + 1}/{imageCount}
//                     </ui.Badge>

//                     {imageCount > 1 && (
//                       <>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handlePrevImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronLeft className="h-4 w-4" />
//                         </ui.Button>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handleNextImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronRight className="h-4 w-4" />
//                         </ui.Button>
//                       </>
//                     )}

//                     <ui.Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={handleViewAllPhotos}
//                       className="absolute bg-white/95 hover:bg-white bottom-3 left-1/2 -translate-x-1/2 shadow-lg hover:scale-105 transition-all z-10"
//                     >
//                       <icons.ImageIcon className="h-4 w-4 mr-1 text-[#0B5CAD]" />
//                       View All {imageCount} Photos
//                     </ui.Button>

//                     {imageCount > 1 && imageCount <= 5 && (
//                       <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
//                         {hotel.Images.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={(e) => handleThumbnailClick(e, idx)}
//                             disabled={isTransitioning}
//                             className={`h-1.5 rounded-full transition-all duration-300 ${
//                               idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
//                     <icons.Building2 size={48} className="text-[#0B5CAD]/40" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="flex-1 flex flex-col lg:flex-row">
//               <div className="flex-1 p-2.5">
//                 <div className="flex items-start justify-between mb-1.5">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-1.5">
//                       <h3 
//                         onClick={handleViewDetailsClick}
//                         className="text-base md:text-lg lg:text-xl font-bold text-gray-900 hover:text-[#0B5CAD] cursor-pointer transition-colors"
//                       >
//                         {hotel.HotelName}
//                       </h3>
//                       <div className="flex items-center gap-1">
//                         {renderStars(hotel.HotelRating)}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                       <icons.MapPin size={14} className="text-red-600" />
//                       <span className="font-medium">{hotel.CityName}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {facilities.length > 0 && (
//                   <div className="flex flex-wrap gap-1.5 mb-1.5">
//                     {facilities.map((facility, i) => (
//                       <ui.Badge key={i} variant="outline" className="bg-[#0B5CAD]/5 border-[#0B5CAD]/20 hover:bg-[#0B5CAD]/10 text-gray-700">
//                         <span className="text-[#0B5CAD] mr-1.5">{facility.icon}</span>
//                         {facility.label}
//                       </ui.Badge>
//                     ))}
//                   </div>
//                 )}

//                 {topAttractions.length > 0 && (
//                   <div className="mt-1.5">
//                     <div className="flex items-center gap-1 mb-1.5">
//                       <icons.MapPin size={12} className="text-[#0B5CAD]" />
//                       <span className="text-xs font-semibold text-gray-600">Nearby:</span>
//                     </div>
//                     <div className="flex flex-wrap gap-x-4 gap-y-0.5">
//                       {topAttractions.slice(0, 4).map((attraction, i) => (
//                         <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
//                           <span className="text-[#0B5CAD]">•</span>
//                           {attraction}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="lg:w-56 bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5 p-2.5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#0B5CAD]/20 shrink-0">
//                 <div className="flex-1 flex flex-col justify-center">
//                   <div className="text-right mb-2">
//                     <div className="flex items-center justify-end gap-1.5 mb-1.5">
//                       <p className="text-xs text-gray-600 font-medium">Per Night Price</p>
                     
//                      <ui.Tooltip>
//   <ui.TooltipTrigger asChild>
//     <icons.Info
//       size={14}
//       className="text-gray-400 hover:text-[#0B5CAD] cursor-help transition-colors"
//     />
//   </ui.TooltipTrigger>

//   <ui.TooltipContent
//     side="left"
//     className="bg-white border-2 border-[#0B5CAD]/20 shadow-lg
//                [&_[data-radix-popper-arrow]]:hidden
//                [&_[data-radix-tooltip-arrow]]:hidden"
//   >
//     <div className="text-left space-y-1">
//       <p className="text-xs font-semibold text-gray-700">
//         Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}):
//         <span className="text-[#0B5CAD] ml-1">
//           ₹{Math.round(totalPrice).toLocaleString('en-IN')}
//         </span>
//       </p>
//       <p className="text-xs text-gray-500">
//         (Incl. ₹{Math.round(totalTax).toLocaleString('en-IN')} tax)
//       </p>
//     </div>
//   </ui.TooltipContent>
// </ui.Tooltip>


//                     </div>
//                     <div className="flex items-baseline justify-end gap-2 mb-1.5">
//                       <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//                         ₹{Math.round(perNightFare).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500">Excluding taxes & fees</p>
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   {booknow === '0' && (
//                     <ui.Button
//                       onClick={handleViewPriceClick}
//                       variant="outline"
//                       className="w-full border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold"
//                     >
//                       View All Rooms
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   {agent_portal === '0' && booknow === '1' && (
//                     <ui.Button
//                       onClick={handleBookNowClick}
//                       className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
//                     >
//                       Book Now
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
//                     <icons.Building2 size={14} className="text-[#0B5CAD]" />
//                     <span className="font-medium text-gray-700">{rooms.length} room option{rooms.length > 1 ? 's' : ''} available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// }, (prevProps, nextProps) => {
//   return (
//     prevProps.hotel.HotelCode === nextProps.hotel.HotelCode &&
//     prevProps.hotel.Rooms === nextProps.hotel.Rooms &&
//     prevProps.booknow === nextProps.booknow &&
//     prevProps.agent_portal === nextProps.agent_portal &&
//     prevProps.onViewPrice === nextProps.onViewPrice &&
//     prevProps.onBookNow === nextProps.onBookNow &&
//     prevProps.onViewImages === nextProps.onViewImages &&
//     prevProps.onViewDetails === nextProps.onViewDetails
//   );
// });

// HotelCard.displayName = 'HotelCard';


// import React, { useState, useMemo, useCallback } from 'react';
// import { hotelTypes, ui, icons, hotelUtils, constants } from '@/index';

// interface HotelCardProps {
//   hotel: hotelTypes.Hotel;
//   booknow: string;
//   agent_portal: string;
//   onViewPrice: (hotel: hotelTypes.Hotel) => void;
//   onBookNow: (hotel: hotelTypes.Hotel) => void;
//   onViewImages: (images: string[]) => void;
//   onViewDetails?: (hotel: hotelTypes.Hotel) => void;
//   extractAttraction: (description: string) => string;
//   formatCancelPolicies: (policies: hotelTypes.CancellationPolicy[]) => string[];
// }

// export const HotelCard = React.memo<HotelCardProps>(({
//   hotel,
//   booknow,
//   agent_portal,
//   onViewPrice,
//   onBookNow,
//   onViewImages,
//   onViewDetails,
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
//   const lowestFareRoom = useMemo(() => hotelUtils.getLowestFareRoom(rooms), [rooms]);
//   const imageCount = useMemo(() => hotel.Images?.length || 0, [hotel.Images]);
//   const numberOfNights = useMemo(() => hotelUtils.getNumberOfNights(lowestFareRoom), [lowestFareRoom]);
  
//   const {
//     totalFare,
//     totalTax,
//     totalPrice,
//     perNightFare
//   } = useMemo(() => 
//     hotelUtils.getRoomPricing(lowestFareRoom, numberOfNights),
//     [lowestFareRoom, numberOfNights]
//   );

//   const facilities = useMemo(() => 
//     hotelUtils.getAvailableFacilities(hotel.HotelFacilities, constants.facilityIcons),
//     [hotel.HotelFacilities]
//   );

//   const topAttractions = useMemo(() => {
//     if (!hotel.Attractions) return [];
//     return Object.values(hotel.Attractions).slice(0, 4);
//   }, [hotel.Attractions]);

//   const renderStars = useCallback((rating: number) =>
//     Array.from({ length: 5 }).map((_, index) => (
//       <icons.Star
//         key={index}
//         size={14}
//         className={
//           index < rating
//             ? 'fill-yellow-400 stroke-yellow-400'
//             : 'stroke-gray-300'
//         }
//       />
//     )), []);

//   const handlePrevImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleNextImage = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTransitioning) return;

//     setIsTransitioning(true);
    
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [imageCount, isTransitioning]);

//   const handleViewAllPhotos = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (hotel.Images && hotel.Images.length > 0) {
//       onViewImages(hotel.Images);
//     }
//   }, [hotel.Images, onViewImages]);

//   const handleThumbnailClick = useCallback((e: React.MouseEvent, idx: number) => {
//     e.stopPropagation();
//     if (isTransitioning || idx === currentImageIndex) return;

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentImageIndex(idx);
//       setTimeout(() => setIsTransitioning(false), 100);
//     }, 250);
//   }, [currentImageIndex, isTransitioning]);

//   const handleViewPriceClick = useCallback(() => {
//     onViewPrice(hotel);
//   }, [hotel, onViewPrice]);

//   const handleBookNowClick = useCallback(() => {
//     onBookNow(hotel);
//   }, [hotel, onBookNow]);

//   const handleViewDetailsClick = useCallback(() => {
//     if (onViewDetails) {
//       onViewDetails(hotel);
//     }
//   }, [hotel, onViewDetails]);

//   return (
//     <div className="w-full mb-3 hover:-translate-y-1 transition-transform duration-200">
//       <ui.Card className="overflow-hidden py-0 border-2 border-[#0B5CAD]/20 hover:shadow-xl transition-all duration-300 bg-white">
//         <ui.CardContent className="p-0">
//           <div className="flex flex-col lg:flex-row">

//             {/* Image with Zoom + Fade */}
//             <div className="lg:w-[14rem] aspect-video relative group shrink-0 self-stretch overflow-hidden bg-gray-100">
//               <div className="relative h-full">
//                 {hotel.Images?.length ? (
//                   <>
//                     <img
//                       key={currentImageIndex}
//                       src={hotel.Images[currentImageIndex]}
//                       alt={hotel.HotelName}
//                       className={`
//                         absolute inset-0 w-full h-full object-cover
//                         transition-all duration-400 ease-out
//                         ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
//                       `}
//                       loading="lazy"
//                     />

//                     <ui.Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] text-white shadow-lg border-0 rounded-md z-10">
//                       <span className="font-bold">{hotel.HotelRating}.0</span>
//                       <icons.Star size={12} className="fill-white ml-1" />
//                     </ui.Badge>

//                     <ui.Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white border-0 z-10">
//                       {currentImageIndex + 1}/{imageCount}
//                     </ui.Badge>

//                     {imageCount > 1 && (
//                       <>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handlePrevImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronLeft className="h-4 w-4" />
//                         </ui.Button>
//                         <ui.Button
//                           size="icon"
//                           variant="secondary"
//                           onClick={handleNextImage}
//                           disabled={isTransitioning}
//                           className="absolute bg-white/95 hover:bg-white right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 z-10"
//                         >
//                           <icons.ChevronRight className="h-4 w-4" />
//                         </ui.Button>
//                       </>
//                     )}

//                     <ui.Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={handleViewAllPhotos}
//                       className="absolute bg-white/95 hover:bg-white bottom-3 left-1/2 -translate-x-1/2 shadow-lg hover:scale-105 transition-all z-10"
//                     >
//                       <icons.ImageIcon className="h-4 w-4 mr-1 text-[#0B5CAD]" />
//                       View All {imageCount} Photos
//                     </ui.Button>

//                     {imageCount > 1 && imageCount <= 5 && (
//                       <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
//                         {hotel.Images.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={(e) => handleThumbnailClick(e, idx)}
//                             disabled={isTransitioning}
//                             className={`h-1.5 rounded-full transition-all duration-300 ${
//                               idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80 w-1.5'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 flex items-center justify-center">
//                     <icons.Building2 size={48} className="text-[#0B5CAD]/40" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="flex-1 flex flex-col lg:flex-row">
//               <div className="flex-1 p-2.5">
//                 <div className="flex items-start justify-between mb-1.5">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-1.5">
//                       <h3 
//                         onClick={handleViewDetailsClick}
//                         className="text-base md:text-lg lg:text-xl font-bold text-gray-900 hover:text-[#0B5CAD] cursor-pointer transition-colors"
//                       >
//                         {hotel.HotelName}
//                       </h3>
//                       <div className="flex items-center gap-1">
//                         {renderStars(hotel.HotelRating)}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
//                       <icons.MapPin size={14} className="text-red-600" />
//                       <span className="font-medium">{hotel.CityName}</span>
//                       {topAttractions.length > 0 && (
//                         <>
//                           <span className="text-gray-300">|</span>
//                              <span className="text-xs text-gray-500 font-medium">Nearby:</span>
//                           <div className="flex items-center gap-1.5">
//                             {topAttractions.slice(0, 2).map((attraction, i) => (
//                               <div key={i} className="flex items-center gap-1 text-xs">
//                                 <span className="w-1 h-1 rounded-full bg-[#0B5CAD]"></span>
//                                 <span className="text-gray-600 font-medium">{attraction}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>

                      
//                 {facilities.length > 0 && (
//                   <div className="flex flex-wrap gap-1.5 mb-1.5 lg:mt-6">
//                     {facilities.map((facility, i) => (
//                       <ui.Badge key={i} variant="outline" className="bg-[#0B5CAD]/5 border-[#0B5CAD]/20 hover:bg-[#0B5CAD]/10 text-gray-700">
//                         <span className="text-[#0B5CAD] mr-1.5">{facility.icon}</span>
//                         {facility.label}
//                       </ui.Badge>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="lg:w-56 bg-gradient-to-br from-[#0B5CAD]/5 to-[#094B8A]/5 p-2.5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#0B5CAD]/20 shrink-0">
//                 <div className="flex-1 flex flex-col justify-center">
//                   <div className="text-right mb-2">
//                     <div className="flex items-center justify-end gap-1.5 mb-1.5">
//                       <p className="text-xs text-gray-600 font-medium">Per Night Price</p>
                     
//                      <ui.Tooltip>
//   <ui.TooltipTrigger asChild>
//     <icons.Info
//       size={14}
//       className="text-gray-400 hover:text-[#0B5CAD] transition-colors"
//     />
//   </ui.TooltipTrigger>

//   <ui.TooltipContent
//     side="left"
//     className="bg-white border-2 border-[#0B5CAD]/20 shadow-lg
//                [&_[data-radix-popper-arrow]]:hidden
//                [&_[data-radix-tooltip-arrow]]:hidden"
//   >
//     <div className="text-left space-y-1">
//       <p className="text-xs font-semibold text-gray-700">
//         Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}):
//         <span className="text-[#0B5CAD] ml-1">
//           ₹{Math.round(totalPrice).toLocaleString('en-IN')}
//         </span>
//       </p>
//       <p className="text-xs text-gray-500">
//         (Incl. ₹{Math.round(totalTax).toLocaleString('en-IN')} tax)
//       </p>
//     </div>
//   </ui.TooltipContent>
// </ui.Tooltip>


//                     </div>
//                     <div className="flex items-baseline justify-end gap-2 mb-1.5">
//                       <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent">
//                         ₹{Math.round(perNightFare).toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500">Excluding taxes & fees</p>
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   {booknow === '0' && (
//                     <ui.Button
//                       onClick={handleViewPriceClick}
//                       variant="outline"
//                       className="w-full border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold"
//                     >
//                       View All Rooms
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   {agent_portal === '0' && booknow === '1' && (
//                     <ui.Button
//                       onClick={handleBookNowClick}
//                       className="w-full bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] hover:from-[#094B8A] hover:to-[#0B5CAD] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
//                     >
//                       Book Now
//                       <icons.ChevronRight className="ml-2 h-4 w-4" />
//                     </ui.Button>
//                   )}

//                   <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
//                     <icons.Building2 size={14} className="text-[#0B5CAD]" />
//                     <span className="font-medium text-gray-700">{rooms.length} room option{rooms.length > 1 ? 's' : ''} available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// }, (prevProps, nextProps) => {
//   return (
//     prevProps.hotel.HotelCode === nextProps.hotel.HotelCode &&
//     prevProps.hotel.Rooms === nextProps.hotel.Rooms &&
//     prevProps.booknow === nextProps.booknow &&
//     prevProps.agent_portal === nextProps.agent_portal &&
//     prevProps.onViewPrice === nextProps.onViewPrice &&
//     prevProps.onBookNow === nextProps.onBookNow &&
//     prevProps.onViewImages === nextProps.onViewImages &&
//     prevProps.onViewDetails === nextProps.onViewDetails
//   );
// });

// HotelCard.displayName = 'HotelCard';
