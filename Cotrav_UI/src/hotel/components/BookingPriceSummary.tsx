
import React, { useMemo } from 'react';
import { ui, icons, bookingTypes } from '@/index';

interface BookingPriceSummaryProps {
  basePrice: number;
  taxAmount: number;
  totalAmount: number;
  nights: number;
  showBreakdown?: boolean;
  className?: string;
  pricing?: {
    clientPrice: number;
    totalFare: number;
    nights: number;
    markupPerNight: number;
    totalMarkup: number;
    totalTax: number;   
    gstRate: number;    
  } | null;
}

export const BookingPriceSummary: React.FC<BookingPriceSummaryProps> = ({
  basePrice,
  taxAmount,
  totalAmount,
  nights,
  showBreakdown = true,
  className = '',
  pricing = null,
}) => {
  // ✅ Calculate final prices with markup
  // const finalPricing = useMemo(() => {
  //   if (!pricing) {
  //     return {
  //       basePrice: basePrice,
  //       markup: 0,
  //       clientPrice: basePrice,
  //       totalWithTax: totalAmount,
  //       hasMarkup: false,
  //     };
  //   }

  //   // ✅ Use the totalMarkup directly from pricing
  //   const roomMarkup = pricing.totalMarkup;
  //   const roomClientPrice = basePrice + roomMarkup;
  //   // ✅ Total = Original totalAmount + Markup
  //   const totalWithTax = totalAmount + roomMarkup;

  //   return {
  //     basePrice: basePrice,
  //     markup: roomMarkup,
  //     clientPrice: roomClientPrice,
  //     totalWithTax: totalWithTax,
  //     hasMarkup: true,
  //     markupPerNight: pricing.markupPerNight,
  //     profitMargin: ((roomMarkup / basePrice) * 100).toFixed(1),
  //   };
  // }, [basePrice, pricing, totalAmount]);

  const finalPricing = useMemo(() => {
  if (!pricing) {
    return {
      basePrice,
      markup: 0,
      clientPrice: basePrice,
      totalWithTax: totalAmount,
      hasMarkup: false,
    };
  }

  // ✅ Mirrors PriceSummary: Client Price + GST on client price
  const totalWithTax = pricing.totalFare + pricing.totalTax;

  return {
    basePrice,
    markup: pricing.totalMarkup,
    clientPrice: pricing.totalFare,
    totalWithTax,                        // ✅ Same as PriceSummary's finalPrice
    hasMarkup: true,
    markupPerNight: pricing.markupPerNight,
    profitMargin: ((pricing.totalMarkup / basePrice) * 100).toFixed(1),
  };
}, [basePrice, pricing, totalAmount]);

  return (
    <ui.Card className={`border-gray-200 gap-0 shadow-xl py-0 overflow-hidden ${className}`}>
      {/* Header */}
      <ui.CardHeader className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] px-4 py-2.5 pb-0">
        <div className="flex items-center justify-between">
          <h5 className="text-white text-base font-bold">Price Breakup</h5>
          {/* {finalPricing.hasMarkup && (
            <div className="bg-green-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
              <icons.TrendingUp className="w-3 h-3 text-white" />
              <span className="text-white text-[10px] font-bold uppercase">
                Client Price
              </span>
            </div>
          )} */}
        </div>
      </ui.CardHeader>

      <ui.CardContent className="p-4 space-y-3">
       {showBreakdown && (
  <>
    {/* 1. Vendor Price */}
    <div className="bg-blue-50 rounded-lg p-3 border border-purple-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <icons.Building2 className="w-3.5 h-3.5 text-[#0B5CAD]" />
          <div>
            <strong className="text-xs text-gray-800 block">Vendor Price</strong>
            <p className="text-[10px] text-gray-600 m-0">1 Room × {nights} {nights === 1 ? 'Night' : 'Nights'}</p>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <icons.IndianRupee className="w-4 h-4 text-[#0B5CAD]" />
          <p className="text-lg font-bold text-[#0B5CAD] m-0">{basePrice.toFixed(2)}</p>
        </div>
      </div>
    </div>

    {/* 2. Client Price — only if pricing exists */}
    {finalPricing.hasMarkup && (
      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <icons.TrendingUp className="w-3.5 h-3.5 text-green-600" />
            <div>
              <strong className="text-xs text-gray-800 block">Client Price</strong>
              <p className="text-[10px] text-gray-600 m-0">
                ₹{finalPricing.markupPerNight?.toFixed(2)} markup/night
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <icons.IndianRupee className="w-4 h-4 text-green-600" />
              <p className="text-lg font-bold text-green-600 m-0">{finalPricing.clientPrice.toFixed(2)}</p>
            </div>
            <p className="text-[10px] text-green-600 mt-0.5">Excluding taxes & fees</p>
          </div>
        </div>
      </div>
    )}

    {/* 3. GST — only if pricing exists */}
    {finalPricing.hasMarkup && pricing && (
      <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <icons.CreditCard className="w-3.5 h-3.5 text-orange-600" />
            <div>
              <strong className="text-xs text-gray-800 block">GST</strong>
              <p className="text-[10px] text-gray-600 m-0">@ {pricing.gstRate * 100}% on client price</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <icons.IndianRupee className="w-4 h-4 text-orange-600" />
            <p className="text-lg font-bold text-orange-600 m-0">{pricing.totalTax.toFixed(2)}</p>
          </div>
        </div>
      </div>
    )}

    {/* Fallback tax when no pricing */}
    {!finalPricing.hasMarkup && (
      <div className="bg-blue-50 rounded-lg p-3 border border-purple-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <icons.CreditCard className="w-3.5 h-3.5 text-[#0B5CAD]" />
            <strong className="text-xs text-gray-800">Tax Amount</strong>
          </div>
          <div className="flex items-baseline gap-1">
            <icons.IndianRupee className="w-4 h-4 text-[#0B5CAD]" />
            <p className="text-lg font-bold text-[#0B5CAD] m-0">{taxAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
    )}

    <div className="border-t border-dashed border-gray-300" />
  </>
)}

        {/* Total Amount */}
        <div className="bg-linear-to-r from-[#0B5CAD] to-[#073B6D] rounded-lg py-3 px-3 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <icons.IndianRupee className="w-4 h-4 text-white" />
              </div>
              <p className="text-md text-white/90 font-medium m-0">
                {/* {finalPricing.hasMarkup ? 'Total Client Amount' : 'Total Amount'} */}
                {finalPricing.hasMarkup ? 'Total Amount' : 'Total Amount'}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <icons.IndianRupee className="w-5 h-5 text-white" />
                <p className="text-2xl font-bold text-white m-0">
                  {finalPricing.totalWithTax.toFixed(2)}
                </p>
              </div>
              {/* ✅ Show original total if markup exists */}
              {/* {finalPricing.hasMarkup && (
                <p className="text-[10px] text-white/60 line-through mt-0.5 mb-0">
                  ₹{totalAmount.toFixed(2)}
                </p>
              )} */}
            </div>
          </div>
          <p className="text-[10px] text-white/70 mt-1.5 mb-0">
            Inclusive of all taxes and fees
          </p>
        </div>
      </ui.CardContent>
    </ui.Card>
  );
};

export default BookingPriceSummary;
