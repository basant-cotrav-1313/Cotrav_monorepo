


// import React, { useState, useMemo } from 'react';
// import { ui, icons } from '@/index';

// interface TaxBreakup {
//   TaxType: string;
//   TaxPercentage: number;
//   TaxableAmount: number;
// }

// interface DayRate {
//   BasePrice: number;
//   Date?: string;
// }

// interface PriceBreakupItem {
//   TaxBreakup: TaxBreakup[];
// }

// interface Room {
//   TotalFare: number;
//   TotalTax: number;
//   DayRates?: DayRate[][];
//   PriceBreakUp?: PriceBreakupItem[];
// }

// // interface PriceSummaryProps {
// //   room: Room;
// //   nights: number;
// //   className?: string;
// //   pricing?: {
// //     clientPrice: number;
// //     totalFare: number;
// //     nights: number;
// //     markupPerNight: number;
// //     totalMarkup: number;
// //   } | null;
// // }

// interface PriceSummaryProps {
//   room: Room;
//   nights: number;
//   className?: string;
//   pricing?: {
//     clientPrice: number;
//     totalFare: number;      // ✅ already includes GST
//     nights: number;
//     markupPerNight: number;
//     totalMarkup: number;
//     totalTax: number;       // ✅ ADD - GST amount
//     gstRate: number;        // ✅ ADD - 0.05 or 0.18
//   } | null;
// }

// export const PriceSummary: React.FC<PriceSummaryProps> = ({
//   room,
//   nights,
//   className = '',
//   pricing = null,
// }) => {
//   const [showDayRates, setShowDayRates] = useState(false);
//   const [showMarkupBreakdown, setShowMarkupBreakdown] = useState(false);

//   // Calculate display base price from day rates (for tooltip)
//   const dayRatesTotal = room?.DayRates?.flat()?.reduce((total, rate) => {
//     return total + (rate?.BasePrice || 0);
//   }, 0) || 0;

//   // ✅ Base price = TotalFare - TotalTax (TotalFare includes tax)
//   const basePrice = (room?.TotalFare || 0) - (room?.TotalTax || 0);

//   const dayRates = room?.DayRates?.[0] || [];
//   const hasDayRates = dayRates.length > 0;

//   // ✅ Calculate final prices with markup
//   // const finalPricing = useMemo(() => {
//   //   if (!pricing) {
//   //     return {
//   //       basePrice: basePrice,
//   //       markup: 0,
//   //       clientPrice: basePrice,
//   //       totalWithTax: room.TotalFare,
//   //       hasMarkup: false,
//   //     };
//   //   }

//   //   // ✅ Use the totalMarkup directly from pricing (don't recalculate)
//   //   const roomMarkup = pricing.totalMarkup;
//   //   const roomClientPrice = basePrice + roomMarkup;
//   //   // ✅ Total = Original TotalFare + Markup (tax already included in TotalFare)
//   //   const totalWithTax = room.TotalFare + roomMarkup;

//   //   return {
//   //     basePrice: basePrice,
//   //     markup: roomMarkup,
//   //     clientPrice: roomClientPrice,
//   //     totalWithTax: totalWithTax,
//   //     hasMarkup: true,
//   //     markupPerNight: pricing.markupPerNight,
//   //     profitMargin: ((roomMarkup / basePrice) * 100).toFixed(1),
//   //   };
//   // }, [basePrice, pricing, room.TotalFare]);

//   const finalPricing = useMemo(() => {
//   if (!pricing) {
//     return {
//       basePrice: basePrice,
//       markup: 0,
//       totalTax: room.TotalTax,        // ✅ use room tax when no pricing
//       totalWithTax: room.TotalFare,   // ✅ use room total when no pricing
//       hasMarkup: false,
//     };
//   }

//   return {
//     basePrice: basePrice,
//     markup: pricing.totalMarkup,
//     markupPerNight: pricing.markupPerNight,
//     totalTax: pricing.totalTax,       // ✅ GST from completePricing
//     totalWithTax: pricing.totalFare,  // ✅ already GST included
//     hasMarkup: true,
//     profitMargin: ((pricing.totalMarkup / basePrice) * 100).toFixed(1),
//   };
// }, [basePrice, pricing, room.TotalFare, room.TotalTax]);

//   return (
//     <div className={`w-full ${className}`}>
//       <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0 gap-0">
//         {/* Header */}
//         <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-2.5 pb-0">
//           <div className="flex items-center justify-between">
//             <h5 className="text-white text-lg font-bold flex items-center gap-2">
//               <icons.IndianRupee className="w-5 h-5" />
//               Price Summary
//             </h5>
//             <div className="flex items-center gap-2">
//               {/* ✅ Client Price Badge */}
//               {/* {finalPricing.hasMarkup && (
//                 <div className="bg-green-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
//                   <icons.TrendingUp className="w-3 h-3 text-white" />
//                   <span className="text-white text-[10px] font-bold uppercase">
//                     Client Price
//                   </span>
//                 </div>
//               )} */}
//             </div>
//           </div>
//         </ui.CardHeader>

//         <ui.CardContent className="p-6 space-y-4">
//           {/* Room Rate Card */}
//           <div className="bg-linear-to-br from-blue-50 to-blue-50 rounded-xl p-4 border-2 border-[#0B5CAD]/20 shadow-sm hover:shadow-md transition-all">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <div className="flex items-center gap-4 mb-2">
//                   <div className="w-8 h-8 bg-[#0B5CAD]/10 rounded-full flex items-center justify-center">
//                     <icons.Calendar className="w-4 h-4 text-[#0B5CAD]" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-gray-800">Room Charges</p>
//                     <p className="text-xs text-gray-600">
//                       1 Room × {nights} {nights === 1 ? 'Night' : 'Nights'}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="text-right">
//                   <div className="flex items-baseline gap-1">
//                     <icons.IndianRupee className="w-4 h-4 text-[#0B5CAD]" />
//                     <p data-testid="base-price" className="text-xl font-bold text-[#0B5CAD] m-0">
//                       {finalPricing.basePrice.toLocaleString('en-IN', { 
//                         minimumFractionDigits: 2, 
//                         maximumFractionDigits: 2 
//                       })}
//                     </p>
//                   </div>
//                   <p className="text-[10px] text-gray-500 mt-0.5">Base price</p>
//                 </div>

//                 {/* Day Rates Tooltip */}
//                 {hasDayRates && (
//                   <ui.TooltipProvider>
//                     <ui.Tooltip open={showDayRates} onOpenChange={setShowDayRates}>
//                       <ui.TooltipTrigger asChild>
//                         <button
//                           className="text-gray-400 hover:text-[#0B5CAD] transition-colors p-1"
//                           onMouseEnter={() => setShowDayRates(true)}
//                           onMouseLeave={() => setShowDayRates(false)}
//                         >
//                           <icons.Info size={16} />
//                         </button>
//                       </ui.TooltipTrigger>
//                       <ui.TooltipContent
//                         side="left"
//                         className="w-64 bg-white border-2 border-[#0B5CAD]/20 shadow-2xl p-4"
//                       >
//                         <h6 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                           <icons.Calendar className="w-4 h-4 text-[#0B5CAD]" />
//                           Daily Rate Breakdown
//                         </h6>
//                         <div className="space-y-2">
//                           {dayRates.map((rate, idx) => (
//                             <div
//                               key={idx}
//                               className="flex justify-between items-center text-sm bg-linear-to-r from-blue-50 to-blue-50 px-3 py-2 rounded-lg border border-[#0B5CAD]/10"
//                             >
//                               <span className="text-gray-700 font-medium">Night {idx + 1}</span>
//                               <span className="font-bold text-[#0B5CAD]">
//                                 ₹{rate.BasePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </ui.TooltipContent>
//                     </ui.Tooltip>
//                   </ui.TooltipProvider>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ✅ Markup Card - Only show if pricing exists */}
//           {/* Markup Breakdown Info */}
//           {/* {finalPricing.hasMarkup && (
//             <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200 shadow-sm hover:shadow-md transition-all relative">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-4">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                     <icons.TrendingUp className="w-4 h-4 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-gray-800">Your Markup</p>
//                     <p className="text-xs text-gray-600">
//                       ₹{finalPricing.markupPerNight?.toLocaleString('en-IN')} per night
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="text-right">
//                     <div className="flex items-baseline gap-1">
//                       <span className="text-green-600 font-bold text-sm">+</span>
//                       <icons.IndianRupee className="w-4 h-4 text-green-600" />
//                       <p className="text-xl font-bold text-green-600 m-0">
//                         {finalPricing.markup.toLocaleString('en-IN', { 
//                           minimumFractionDigits: 2, 
//                           maximumFractionDigits: 2 
//                         })}
//                       </p>
//                     </div>
//                     <p className="text-[10px] text-green-600 mt-0.5 font-semibold">
//                       {finalPricing.profitMargin}% profit
//                     </p>
//                   </div>

//                   <ui.TooltipProvider>
//                     <ui.Tooltip open={showMarkupBreakdown} onOpenChange={setShowMarkupBreakdown}>
//                       <ui.TooltipTrigger asChild>
//                         <button
//                           className="text-green-400 hover:text-green-600 transition-colors p-1"
//                           onMouseEnter={() => setShowMarkupBreakdown(true)}
//                           onMouseLeave={() => setShowMarkupBreakdown(false)}
//                         >
//                           <icons.Info size={16} />
//                         </button>
//                       </ui.TooltipTrigger>
//                       <ui.TooltipContent
//                         side="left"
//                         className="w-64 bg-white border-2 border-green-200 shadow-2xl p-4"
//                       >
//                         <h6 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                           <icons.TrendingUp className="w-4 h-4 text-green-600" />
//                           Markup Breakdown
//                         </h6>
//                         <div className="space-y-2">
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-600">Original Price:</span>
//                             <span className="font-semibold">
//                               ₹{finalPricing.basePrice.toLocaleString('en-IN')}
//                             </span>
//                           </div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-600">Per Night Markup:</span>
//                             <span className="font-semibold text-green-600">
//                               ₹{finalPricing.markupPerNight?.toLocaleString('en-IN')}
//                             </span>
//                           </div>
//                           <div className="flex justify-between text-xs">
//                             <span className="text-gray-600">Total Nights:</span>
//                             <span className="font-semibold">{nights}</span>
//                           </div>
//                           <div className="border-t border-green-200 pt-2 mt-2">
//                             <div className="flex justify-between text-xs">
//                               <span className="text-gray-700 font-bold">Total Markup:</span>
//                               <span className="font-bold text-green-600">
//                                 ₹{finalPricing.markup.toLocaleString('en-IN')}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </ui.TooltipContent>
//                     </ui.Tooltip>
//                   </ui.TooltipProvider>
//                 </div>
//               </div>
//             </div>
//           )} */}

//           {/* ✅ Client Price Card - Only show if markup exists */}
//           {/* {finalPricing.hasMarkup && (
//             <div className="bg-linear-to-br from-[#0B5CAD]/10 to-[#094B8A]/10 rounded-xl p-4 border-2 border-[#0B5CAD]/30 shadow-sm">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-[#0B5CAD]/20 rounded-full flex items-center justify-center">
//                     <icons.IndianRupee className="w-4 h-4 text-[#0B5CAD]" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-gray-800">Client Price</p>
//                     <p className="text-xs text-gray-600">Before taxes</p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="flex items-baseline gap-1">
//                     <icons.IndianRupee className="w-5 h-5 text-[#0B5CAD]" />
//                     <p className="text-xl font-bold bg-linear-to-r from-[#0B5CAD] to-[#094B8A] bg-clip-text text-transparent m-0">
//                       {finalPricing.clientPrice.toLocaleString('en-IN', { 
//                         minimumFractionDigits: 2, 
//                         maximumFractionDigits: 2 
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )} */}

//           {/* Tax Amount Card */}
//           {/* <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-all">
//             <div className="flex justify-between items-start">
//               <div className="flex items-center gap-4">
//                 <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//                   <icons.CreditCard className="w-4 h-4 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-800">Taxes & Fees</p>
//                   <p className="text-xs text-gray-600">Inclusive of all charges</p>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <div className="flex items-baseline gap-1">
//                   <icons.IndianRupee className="w-4 h-4 text-orange-600" />
//                   <p data-testid="total-tax" className="text-xl font-bold text-orange-600 m-0">
//                     {room.TotalTax.toLocaleString('en-IN', { 
//                       minimumFractionDigits: 2, 
//                       maximumFractionDigits: 2 
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div> */}


//           {/* Tax Amount Card */}
// <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-all">
//   <div className="flex justify-between items-start">
//     <div className="flex items-center gap-4">
//       <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//         <icons.CreditCard className="w-4 h-4 text-orange-600" />
//       </div>
//       <div>
//         <p className="text-sm font-bold text-gray-800">Taxes & Fees</p>
//         <p className="text-xs text-gray-600">
//           {/* ✅ Show GST rate if available */}
//           {pricing?.gstRate 
//             ? `GST @ ${pricing.gstRate * 100}%` 
//             : 'Inclusive of all charges'
//           }
//         </p>
//       </div>
//     </div>

//     <div className="text-right">
//       <div className="flex items-baseline gap-1">
//         <icons.IndianRupee className="w-4 h-4 text-orange-600" />
//         <p data-testid="total-tax" className="text-xl font-bold text-orange-600 m-0">
//           {/* ✅ Use finalPricing.totalTax instead of room.TotalTax */}
//           {finalPricing.totalTax.toLocaleString('en-IN', { 
//             minimumFractionDigits: 2, 
//             maximumFractionDigits: 2 
//           })}
//         </p>
//       </div>
//     </div>
//   </div>
// </div>

//           {/* Divider */}
//           <div className="relative py-2">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t-2 border-dashed border-gray-300"></div>
//             </div>
//           </div>

//           {/* Total Amount Card */}
//           <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all">
//             <div className="flex justify-between items-center mb-3">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//                   <icons.CheckCircle2 className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-white/90 font-medium m-0">
//                     {finalPricing.hasMarkup ? 'Total Client Amount' : 'Total Amount'}
//                   </p>
//                   <p className="text-xs text-white/70 mt-0.5">All inclusive</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="flex items-baseline gap-0">
//                   <icons.IndianRupee className="w-6 h-6 text-white" />
//                   <p data-testid="total-fare" className="text-2xl font-bold text-white m-0">
//                     {finalPricing.totalWithTax.toLocaleString('en-IN', { 
//                       minimumFractionDigits: 2, 
//                       maximumFractionDigits: 2 
//                     })}
//                   </p>
//                 </div>
//                 {/* ✅ Show original total if markup exists */}
//                 {/* {finalPricing.hasMarkup && (
//                   <p className="text-xs text-white/60 line-through mt-1">
//                     ₹{room.TotalFare.toLocaleString('en-IN')}
//                   </p>
//                 )} */}
//               </div>
//             </div>
            
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-4 justify-between">
//               <icons.CheckCircle2 className="w-6 h-6 text-white" />
//               <p className="text-xs text-white/90 m-0">
//                 You won't be charged until booking is confirmed
//               </p>
//             </div>
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// };

// export default PriceSummary;



import React, { useState } from 'react';
import { ui, icons } from '@/index';

interface DayRate {
  BasePrice: number;
  Date?: string;
}

interface Room {
  TotalFare: number;
  TotalTax: number;
  DayRates?: DayRate[][];
}

interface PriceSummaryProps {
  room: Room;
  nights: number;
  className?: string;
  pricing?: {
    clientPrice: number;
    totalFare: number;       // client price before GST (input × nights)
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
    totalTax: number;        // GST amount
    gstRate: number;         // 0.05 or 0.18
  } | null;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  room,
  nights,
  className = '',
  pricing = null,
}) => {
  const [showDayRates, setShowDayRates] = useState(false);

  const dayRates = room?.DayRates?.[0] || [];
  const hasDayRates = dayRates.length > 0;

  // Final price = client price + GST
  const finalPrice = pricing
    ? pricing.totalFare + pricing.totalTax
    : null;

  return (
    <div className={`w-full ${className}`}>
      <ui.Card className="border-2 border-[#0B5CAD]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0 gap-0">
        
        {/* Header */}
        <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] px-6 py-3 pb-0">
          <h5 className="text-white text-lg font-bold flex items-center gap-2">
            <icons.IndianRupee className="w-5 h-5" />
            Price Summary
          </h5>
        </ui.CardHeader>

        <ui.CardContent className="p-6 space-y-4">

          {/* 1. Vendor Price - Always show */}
          <div className="bg-linear-to-br from-blue-50 to-blue-50 rounded-xl p-4 border-2 border-[#0B5CAD]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0B5CAD]/10 rounded-full flex items-center justify-center">
                  <icons.Building2 className="w-4 h-4 text-[#0B5CAD]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Vendor Price</p>
                  <p className="text-xs text-gray-500">
                    1 Room × {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <icons.IndianRupee className="w-4 h-4 text-[#0B5CAD]" />
                    <p className="text-xl font-bold text-[#0B5CAD] m-0">
                      {room.TotalFare.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Incl. taxes</p>
                </div>

                {/* Day Rates Tooltip */}
                {hasDayRates && (
                  <ui.TooltipProvider>
                    <ui.Tooltip open={showDayRates} onOpenChange={setShowDayRates}>
                      <ui.TooltipTrigger asChild>
                        <button
                          className="text-gray-400 hover:text-[#0B5CAD] transition-colors p-1"
                          onMouseEnter={() => setShowDayRates(true)}
                          onMouseLeave={() => setShowDayRates(false)}
                        >
                          <icons.Info size={16} />
                        </button>
                      </ui.TooltipTrigger>
                      <ui.TooltipContent
                        side="left"
                        className="w-64 bg-white border-2 border-[#0B5CAD]/20 shadow-2xl p-4"
                      >
                        <h6 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <icons.Calendar className="w-4 h-4 text-[#0B5CAD]" />
                          Daily Rate Breakdown
                        </h6>
                        <div className="space-y-2">
                          {dayRates.map((rate, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center text-sm bg-linear-to-r from-blue-50 to-blue-50 px-3 py-2 rounded-lg border border-[#0B5CAD]/10"
                            >
                              <span className="text-gray-700 font-medium">Night {idx + 1}</span>
                              <span className="font-bold text-[#0B5CAD]">
                                ₹{rate.BasePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </ui.TooltipContent>
                    </ui.Tooltip>
                  </ui.TooltipProvider>
                )}
              </div>
            </div>
          </div>

          {/* 2, 3, 4 — Only show when pricing exists */}
          {pricing && (
            <>
              {/* 2. Client Price */}
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <icons.TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Client Price</p>
                      <p className="text-xs text-gray-500">
                        ₹{pricing.markupPerNight.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} markup/night
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <icons.IndianRupee className="w-4 h-4 text-green-600" />
                      <p className="text-xl font-bold text-green-600 m-0">
                        {pricing.totalFare.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    {/* <p className="text-[10px] text-green-600 mt-0.5">Before GST</p> */}
                    <p className="text-[10px] text-green-600 mt-0.5">Excluding taxes & fees</p>
                  </div>
                </div>
              </div>

              {/* 3. GST */}
              <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <icons.CreditCard className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">GST</p>
                      <p className="text-xs text-gray-500">
                        @ {pricing.gstRate * 100}% on client price
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <icons.IndianRupee className="w-4 h-4 text-orange-600" />
                      <p className="text-xl font-bold text-orange-600 m-0">
                        {pricing.totalTax.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-300" />
                </div>
              </div>

              {/* 4. Final Price */}
              <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <icons.CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-bold m-0">Final Price</p>
                      <p className="text-xs text-white/70 mt-0.5">
                        Client Price + GST
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-0">
                      <icons.IndianRupee className="w-6 h-6 text-white" />
                      <p className="text-2xl font-bold text-white m-0">
                        {finalPrice?.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-3">
                  <icons.CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <p className="text-xs text-white/90 m-0">
                    You won't be charged until booking is confirmed
                  </p>
                </div>
              </div>
            </>
          )}

          {/* When no pricing - show simple total */}
          {!pricing && (
            <div className="bg-linear-to-r from-[#0B5CAD] to-[#094B8A] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <icons.CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold m-0">Total Amount</p>
                    <p className="text-xs text-white/70 mt-0.5">All inclusive</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-0">
                    <icons.IndianRupee className="w-6 h-6 text-white" />
                    <p className="text-2xl font-bold text-white m-0">
                      {room.TotalFare.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-3">
                <icons.CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <p className="text-xs text-white/90 m-0">
                  You won't be charged until booking is confirmed
                </p>
              </div>
            </div>
          )}

        </ui.CardContent>
      </ui.Card>
    </div>
  );
};

export default PriceSummary;
