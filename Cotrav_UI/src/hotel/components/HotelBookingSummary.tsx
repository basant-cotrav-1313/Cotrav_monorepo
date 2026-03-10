
// import React from 'react';      
// import {ui, icons, bookingTypes } from '@/index';

// export const HotelBookingSummary: React.FC<bookingTypes.HotelBookingSummaryProps> = ({
//   hotelName,
//   hotelRating,
//   address,
//   selectedRoom,
//   searchParams,
//   nights,
//   checkInTime = 'N/A',
//   checkOutTime = 'N/A',
//   onSeeInclusion,
// }) => {
  
//   console.log("Secrchyu: ", searchParams)
//   const formatDate = (date: string) => {
//     const d = new Date(date);
//     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
//   };

//   const formatTime = (date: string) => {
//   const d = new Date(date);
//   const hours = d.getHours();
//   const minutes = d.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const displayHours = hours % 12 || 12;
//   const displayMinutes = minutes.toString().padStart(2, '0');
//   return `${displayHours}:${displayMinutes} ${ampm}`;
// };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }).map((_, index) => (
//       <icons.Star
//         key={index}
//         size={14}
//         className={index < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}
//       />
//     ));
//   };

//   // const formatCancelPolicies = (policies: bookingTypes.CancellationPolicy[]) => {
//   //   if (!Array.isArray(policies) || policies.length === 0) {
//   //     return ['No cancellation policies available.'];
//   //   }

//   //   const today = new Date();
//   //   today.setHours(0, 0, 0, 0);

//   //   return policies
//   //     .filter((policy) => {
//   //       const policyDate = new Date(
//   //         policy.FromDate.split(' ')[0].split('-').reverse().join('-')
//   //       );
//   //       return policyDate >= today;
//   //     })
//   //     .map((policy) => {
//   //       const formattedDate = policy.FromDate.split(' ')[0];
//   //       if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
//   //         return 'Free Cancellation till check-in';
//   //       } else if (policy.ChargeType === 'Fixed') {
//   //         return `Booking will be cancelled from ${formattedDate} with a charge of ₹${policy.CancellationCharge}`;
//   //       } else if (policy.ChargeType === 'Percentage') {
//   //         return `From ${formattedDate}, the cancellation charge is ${policy.CancellationCharge}%`;
//   //       }
//   //       return `Policy starts from ${formattedDate}`;
//   //     });
//   // };


//   const formatCancelPolicies = (policies: bookingTypes.CancellationPolicy[]) => {
//   if (!Array.isArray(policies) || policies.length === 0) {
//     return ['No cancellation policies available.'];
//   }

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const formattedPolicies = policies
//     .filter((policy) => {
//       // Filter out past policies
//       const policyDate = new Date(
//         policy.FromDate.split(' ')[0].split('-').reverse().join('-')
//       );
//       return policyDate >= today;
//     })
//     .map((policy) => {
//       const formattedDate = policy.FromDate.split(' ')[0];
      
//       if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
//         return 'Free Cancellation till check-in';
//       } else if (policy.ChargeType === 'Fixed') {
//         return `Booking will be cancelled from ${formattedDate} with a charge of ₹${policy.CancellationCharge}`;
//       } else if (policy.ChargeType === 'Percentage') {
//         return `From ${formattedDate}, the cancellation charge is ${policy.CancellationCharge}%`;
//       }
//       return `Policy starts from ${formattedDate}`;
//     });

//   // If no future policies, show all policies without date filter
//   if (formattedPolicies.length === 0) {
//     return policies.map((policy) => {
//       const formattedDate = policy.FromDate.split(' ')[0];
      
//       if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
//         return 'Free Cancellation till check-in';
//       } else if (policy.ChargeType === 'Fixed') {
//         return `Cancellation from ${formattedDate} with charge of ₹${policy.CancellationCharge}`;
//       } else if (policy.ChargeType === 'Percentage') {
//         return `From ${formattedDate}, cancellation charge is ${policy.CancellationCharge}%`;
//       }
//       return `Policy from ${formattedDate}`;
//     });
//   }

//   return formattedPolicies;
// };

//   const getRoomName = () => {
//     const roomNames = selectedRoom.Name;
//     if (!roomNames || (Array.isArray(roomNames) && roomNames.length === 0)) {
//       return 'No Room Available';
//     }
//     if (Array.isArray(roomNames)) {
//       const allSame = roomNames.every((name) => name === roomNames[0]);
//       return allSame ? roomNames[0] : roomNames.join(' | ');
//     }
//     return roomNames;
//   };

//   const cancelPolicies = formatCancelPolicies(selectedRoom.CancelPolicies || []);
//   const hasFreeCancellation = cancelPolicies.some(policy => 
//     policy.toLowerCase().includes('free cancellation')
//   );

//   return (
//     <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 py-0">
//       <ui.CardContent className="p-0">
//         {/* Compact Header */}
//         <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] p-4 text-white">
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 mb-1 flex-wrap">
//   <h3 className="text-xl font-bold truncate">{hotelName}</h3>
//   <div className="flex items-center gap-0.5">
//     {renderStars(hotelRating)}
//   </div>
//   <span className="text-xs font-semibold bg-white/20 px-1.5 py-0.5 rounded">
//     {hotelRating}.0
//   </span>
// </div>
//               <div className="flex items-start gap-1.5 text-white/90">
//                 <icons.MapPin size={12} className="mt-0.5 shrink-0" />
//                 <p className="text-xs line-clamp-1">{address}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 space-y-3">
//           {/* Compact Check-in/Check-out & Guest Info - Flexbox Layout */}
//           <div className="flex flex-col md:flex-row gap-3">
//             {/* Check-in/Check-out */}
//             {/* <div className="flex-1 bg-linear-to-br from-blue-50 to-blue-50 rounded-lg p-3 border border-[#0B5CAD]/10">
//               <div className="flex items-center justify-between gap-3 text-xs">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-1 mb-1">
//                     <icons.Calendar size={12} className="text-[#0B5CAD]" />
//                     <span className="text-gray-600 font-semibold uppercase text-[10px]">Check In</span>
//                   </div>
//                   <p className="text-sm font-bold text-gray-900 mb-0.5">{formatDate(searchParams.checkIn)}</p>
//                   <p className="text-[10px] text-gray-600">{checkInTime}</p>
//                 </div>

//                 <ui.Badge className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] text-white border-0 px-2 py-1 text-xs">
//                   <icons.Moon size={12} className="mr-1" />
//                   {nights} Nights
//                 </ui.Badge>

//                 <div className="flex-1 text-right">
//                   <div className="flex items-center justify-end gap-1 mb-1">
//                     <span className="text-gray-600 font-semibold uppercase text-[10px]">Check Out</span>
//                     <icons.Calendar size={12} className="text-[#0B5CAD]" />
//                   </div>
//                   <p className="text-sm font-bold text-gray-900 mb-0.5">{formatDate(searchParams.checkOut)}</p>
//                   <p className="text-[10px] text-gray-600">{checkOutTime}</p>
//                 </div>
//               </div>
//             </div> */}


//             <div className="flex-1 bg-linear-to-br from-blue-50 to-blue-50 rounded-lg p-3 border border-[#0B5CAD]/10">
//   <div className="flex items-center justify-between gap-3 text-xs">
//     <div className="flex-1">
//       <div className="flex items-center gap-1 mb-1">
//         <icons.Calendar size={12} className="text-[#0B5CAD]" />
//         <span className="text-gray-600 font-semibold uppercase text-[10px]">Check In</span>
//       </div>
//       <p className="text-sm font-bold text-gray-900 mb-0.5">{formatDate(searchParams.checkIn)}</p>
//       <p className="text-[10px] text-gray-600">{formatTime(searchParams.checkIn)}</p>
//     </div>

//     <ui.Badge className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] text-white border-0 px-2 py-1 text-xs">
//       <icons.Moon size={12} className="mr-1" />
//       {nights} Nights
//     </ui.Badge>

//     <div className="flex-1 text-right">
//       <div className="flex items-center justify-end gap-1 mb-1">
//         <span className="text-gray-600 font-semibold uppercase text-[10px]">Check Out</span>
//         <icons.Calendar size={12} className="text-[#0B5CAD]" />
//       </div>
//       <p className="text-sm font-bold text-gray-900 mb-0.5">{formatDate(searchParams.checkOut)}</p>
//       <p className="text-[10px] text-gray-600">{formatTime(searchParams.checkOut)}</p>
//     </div>
//   </div>
// </div>

//             {/* Guest Info */}
//             <div className="flex-1 flex items-center justify-center gap-1 flex-wrap text-xs bg-linear-to-br from-blue-50/50 to-blue-50/50 py-2 px-3 rounded-lg border border-[#0B5CAD]/10">
//               <icons.Users size={12} className="text-[#0B5CAD]" />
//               <span className="font-bold text-gray-900">{searchParams.Adults}</span>
//               <span className="text-gray-600">Adult{searchParams.Adults > 1 ? 's' : ''}</span>
              
//               {searchParams.Children > 0 && (
//                 <>
//                   <span className="text-gray-400 mx-0.5">•</span>
//                   <span className="font-bold text-gray-900">{searchParams.Children}</span>
//                   <span className="text-gray-600">Child{searchParams.Children > 1 ? 'ren' : ''}</span>
//                 </>
//               )}
              
//               <span className="text-gray-400 mx-0.5">•</span>
//               <span className="font-bold text-gray-900">{searchParams.Rooms}</span>
//               <span className="text-gray-600">Room{searchParams.Rooms > 1 ? 's' : ''}</span>
//             </div>
//           </div>

//           <ui.Separator className="my-2" />

//           {/* Compact Room Details */}
//           <div className="flex items-center justify-between gap-2">
//             <h4 className="text-sm font-bold text-gray-900 flex-1 truncate">{getRoomName()}</h4>
//             <ui.Button
//               variant="ghost"
//               size="sm"
//               className="text-[#0B5CAD] hover:text-[#094B8A] hover:bg-blue-50 font-semibold text-xs h-7 px-2 cursor-pointer"
//               onClick={onSeeInclusion}
//             >
//               View Details
//             </ui.Button>
//           </div>

//           {/* Compact Amenities */}
//           <div className="space-y-1.5">
//             {selectedRoom.Inclusion && (
//               <div className="flex items-start gap-2 text-xs text-gray-700 bg-green-50 p-2 rounded border border-green-100">
//                 <icons.Check size={12} className="text-green-600 mt-0.5 shrink-0" />
//                 <span className="line-clamp-2">{selectedRoom.Inclusion}</span>
//               </div>
//             )}
//             {/* <div className="flex items-start gap-2 text-xs text-gray-700 bg-blue-50 p-2 rounded border border-blue-100">
//               <icons.Check size={12} className="text-blue-600 mt-0.5 shrink-0" />
//               <span>
//                 {selectedRoom.MealType === 'Room_Only'
//                   ? 'No Meals Included'
//                   : selectedRoom.MealType === 'BreakFast'
//                   ? 'Breakfast Included'
//                   : selectedRoom.MealType}
//               </span>
//             </div> */}
//             <div className="flex items-start gap-2 text-xs text-gray-700 bg-blue-50 p-2 rounded border border-blue-100">
//   <icons.Coffee size={12} className="text-blue-600 mt-0.5 shrink-0" />
//   <span>
//     {selectedRoom.MealType?.replace(/_/g, ' ') || 'No Meal Info'}
//   </span>
// </div>
//           </div>

//           {/* Compact Cancellation */}
//           <div className="bg-linear-to-br from-red-50 to-rose-50 rounded-lg p-2.5 border border-red-100">
//             <div className="flex items-center gap-2 mb-1.5">
//               {hasFreeCancellation ? (
//                 <ui.Badge className="bg-green-600 hover:bg-green-700 text-white border-0 text-xs h-5">
//                   <icons.Check size={10} className="mr-1" />
//                   Free Cancellation
//                 </ui.Badge>
//               ) : (
//                 <ui.Badge variant="outline" className="bg-orange-100 border-orange-200 text-orange-800 text-xs h-5">
//                   Cancellation Policy
//                 </ui.Badge>
//               )}
//             </div>
            
//             <div className="space-y-1">
//               {cancelPolicies.slice(0, 2).map((policy, idx) => (
//                 <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-700">
//                   <icons.Check size={10} className="text-green-600 mt-0.5 shrink-0" />
//                   <span className="line-clamp-1">{policy}</span>
//                 </div>
//               ))}
//               {cancelPolicies.length > 2 && (
//                 <p className="text-[10px] text-gray-500 pl-4">+{cancelPolicies.length - 2} more</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </ui.CardContent>
//     </ui.Card>
//   );
// };

// export default HotelBookingSummary;


import React from 'react';      
import {ui, icons, bookingTypes } from '@/index';

export const HotelBookingSummary: React.FC<bookingTypes.HotelBookingSummaryProps> = ({
  hotelName,
  hotelRating,
  address,
  selectedRoom,
  searchParams,
  nights,
  checkInTime = 'N/A',
  checkOutTime = 'N/A',
  onSeeInclusion,
}) => {
  
  console.log("Secrchyu: ", searchParams)
  const formatDate = (date: string) => {
    const d = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 stroke-yellow-500 drop-shadow-sm' : 'stroke-gray-300'}
      />
    ));
  };

  const formatCancelPolicies = (policies: bookingTypes.CancellationPolicy[]) => {
    if (!Array.isArray(policies) || policies.length === 0) {
      return ['No cancellation policies available.'];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formattedPolicies = policies
      .filter((policy) => {
        const policyDate = new Date(
          policy.FromDate.split(' ')[0].split('-').reverse().join('-')
        );
        return policyDate >= today;
      })
      .map((policy) => {
        const formattedDate = policy.FromDate.split(' ')[0];
        
        if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
          return 'Free Cancellation till check-in';
        } else if (policy.ChargeType === 'Fixed') {
          return `Booking will be cancelled from ${formattedDate} with a charge of ₹${policy.CancellationCharge}`;
        } else if (policy.ChargeType === 'Percentage') {
          return `From ${formattedDate}, the cancellation charge is ${policy.CancellationCharge}%`;
        }
        return `Policy starts from ${formattedDate}`;
      });

    if (formattedPolicies.length === 0) {
      return policies.map((policy) => {
        const formattedDate = policy.FromDate.split(' ')[0];
        
        if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
          return 'Free Cancellation till check-in';
        } else if (policy.ChargeType === 'Fixed') {
          return `Cancellation from ${formattedDate} with charge of ₹${policy.CancellationCharge}`;
        } else if (policy.ChargeType === 'Percentage') {
          return `From ${formattedDate}, cancellation charge is ${policy.CancellationCharge}%`;
        }
        return `Policy from ${formattedDate}`;
      });
    }

    return formattedPolicies;
  };

  const getRoomName = () => {
    const roomNames = selectedRoom.Name;
    if (!roomNames || (Array.isArray(roomNames) && roomNames.length === 0)) {
      return 'No Room Available';
    }
    if (Array.isArray(roomNames)) {
      const allSame = roomNames.every((name) => name === roomNames[0]);
      return allSame ? roomNames[0] : roomNames.join(' | ');
    }
    return roomNames;
  };

  const cancelPolicies = formatCancelPolicies(selectedRoom.CancelPolicies || []);
  const hasFreeCancellation = cancelPolicies.some(policy => 
    policy.toLowerCase().includes('free cancellation')
  );

  return (
    <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0 bg-white">
      <ui.CardContent className="p-0">
        {/* Enhanced Gradient Header with Decorative Elements */}
        <div className="bg-linear-to-r from-[#0B5CAD] via-[#6a4fd9] to-[#094B8A] p-4 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl font-bold truncate drop-shadow-sm">{hotelName}</h3>
                <div className="flex items-center gap-0.5">
                  {renderStars(hotelRating)}
                </div>
                <span className="text-xs font-bold bg-white/25 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
                  {hotelRating}.0
                </span>
              </div>
              <div className="flex items-start gap-2 text-white/95">
                <icons.MapPin size={14} className="mt-0.5 shrink-0 drop-shadow-sm" />
                <p className="text-sm line-clamp-2 drop-shadow-sm">{address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
          {/* Enhanced Check-in/Check-out Timeline */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Check-in/Check-out Card */}
            <div className="flex-1 bg-white rounded-xl p-4 border-2 border-[#0B5CAD]/10 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between gap-4 text-xs">
                {/* Check In */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="p-1.5 bg-[#0B5CAD]/10 rounded-lg">
                      <icons.Calendar size={14} className="text-[#0B5CAD]" />
                    </div>
                    <span className="text-gray-600 font-bold uppercase text-[10px] tracking-wider">Check In</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{formatDate(searchParams.checkIn)}</p>
                  <p className="text-[11px] text-gray-500 font-medium">{formatTime(searchParams.checkIn)}</p>
                </div>

                {/* Nights Badge */}
                <div className="flex flex-col items-center">
                  <div className="bg-linear-to-br from-[#0B5CAD] to-[#094B8A] text-white rounded-xl px-3 py-2 shadow-md">
                    <div className="text-center">
                      <p className="text-xl font-bold leading-none">{nights}</p>
                      <p className="text-[9px] uppercase font-semibold tracking-wide mt-0.5">
                        {nights === 1 ? 'Night' : 'Nights'}
                      </p>
                    </div>
                  </div>
                  <icons.ArrowRight size={14} className="text-[#0B5CAD] mt-1" />
                </div>

                {/* Check Out */}
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-1.5 mb-2">
                    <span className="text-gray-600 font-bold uppercase text-[10px] tracking-wider">Check Out</span>
                    <div className="p-1.5 bg-[#0B5CAD]/10 rounded-lg">
                      <icons.Calendar size={14} className="text-[#0B5CAD]" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{formatDate(searchParams.checkOut)}</p>
                  <p className="text-[11px] text-gray-500 font-medium">{formatTime(searchParams.checkOut)}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Guest Info Card */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs bg-linear-to-br from-blue-50 to-blue-50 py-3 px-4 rounded-xl border-2 border-[#0B5CAD]/10 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-1.5 bg-[#0B5CAD]/10 rounded-lg">
                <icons.Users size={14} className="text-[#0B5CAD]" />
              </div>
              <span className="font-bold text-gray-900 text-sm">{searchParams.Adults}</span>
              <span className="text-gray-600 font-medium">Adult{searchParams.Adults > 1 ? 's' : ''}</span>
              
              {searchParams.Children > 0 && (
                <>
                  <span className="text-gray-300 mx-1">•</span>
                  <span className="font-bold text-gray-900 text-sm">{searchParams.Children}</span>
                  <span className="text-gray-600 font-medium">Child{searchParams.Children > 1 ? 'ren' : ''}</span>
                </>
              )}
              
              <span className="text-gray-300 mx-1">•</span>
              <span className="font-bold text-gray-900 text-sm">{searchParams.Rooms}</span>
              <span className="text-gray-600 font-medium">Room{searchParams.Rooms > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* <ui.Separator className="my-3" /> */}

          {/* Enhanced Room Details Header */}
          <div className="flex items-center justify-between gap-3 bg-white rounded-xl p-3 border border-[#0B5CAD]/10 shadow-sm">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="p-2 bg-[#0B5CAD]/10 rounded-lg shrink-0">
                <icons.Bed size={18} className="text-[#0B5CAD]" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 truncate">{getRoomName()}</h4>
            </div>
            <ui.Button
              variant="ghost"
              size="sm"
              className="text-[#0B5CAD] hover:text-white hover:bg-[#0B5CAD] font-semibold text-xs h-8 px-3 rounded-lg transition-all duration-300 shrink-0"
              onClick={onSeeInclusion}
            >
              View Details
              <icons.ChevronRight size={14} className="ml-1" />
            </ui.Button>
          </div>

          {/* Enhanced Amenities Cards */}
          <div className="space-y-2.5">
            {selectedRoom.Inclusion && (
              <div className="flex items-start gap-3 text-xs text-gray-700 bg-linear-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-1 bg-green-500 rounded-md shrink-0">
                  <icons.Check size={12} className="text-white" />
                </div>
                <span className="line-clamp-2 font-medium">{selectedRoom.Inclusion}</span>
              </div>
            )}
            
            <div className="flex items-start gap-3 text-xs text-gray-700 bg-linear-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-1 bg-blue-500 rounded-md shrink-0">
                <icons.Coffee size={12} className="text-white" />
              </div>
              <span className="font-medium">
                {selectedRoom.MealType?.replace(/_/g, ' ') || 'No Meal Info'}
              </span>
            </div>
          </div>

          {/* Enhanced Cancellation Policy Card */}
          <div className="bg-linear-to-br from-rose-50 via-pink-50 to-red-50 rounded-xl p-4 border-2 border-red-100 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              {hasFreeCancellation ? (
                <ui.Badge className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 text-xs px-3 py-1 shadow-md">
                  <icons.Check size={12} className="mr-1.5" />
                  Free Cancellation
                </ui.Badge>
              ) : (
                <ui.Badge className="bg-linear-to-r from-orange-100 to-amber-100 border-orange-300 text-orange-900 text-xs px-3 py-1 shadow-sm font-bold">
                  <icons.AlertCircle size={12} className="mr-1.5" />
                  Cancellation Policy
                </ui.Badge>
              )}
            </div>
            
            <div className="space-y-2">
              {cancelPolicies.slice(0, 2).map((policy, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-white/60 backdrop-blur-sm p-2.5 rounded-lg">
                  <div className="p-0.5 bg-green-500 rounded-full shrink-0 mt-0.5">
                    <icons.Check size={10} className="text-white" />
                  </div>
                  <span className="line-clamp-2 font-medium leading-relaxed">{policy}</span>
                </div>
              ))}
              {cancelPolicies.length > 2 && (
                <p className="text-[11px] text-gray-600 pl-5 font-semibold flex items-center gap-1">
                  <icons.Plus size={10} className="text-[#0B5CAD]" />
                  {cancelPolicies.length - 2} more policies
                </p>
              )}
            </div>
          </div>
        </div>
      </ui.CardContent>
    </ui.Card>
  );
};

export default HotelBookingSummary;
