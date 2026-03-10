// import { PriceBucket } from '../types/filter.types';
// import { Hotel } from '../types/hotel';

// export const formatPrice = (price: number) => {
//   if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
//   return `₹${price}`;
// };

// export const roundTo500 = (n: number) => Math.round(n / 500) * 500;

// export const calculatePriceBuckets = (hotels: Hotel[]): { priceBuckets: PriceBucket[], minPrice: number, maxPrice: number } => {
//   const perNightPrices = hotels
//     .map(hotel => {
//       const lowestFareRoom = hotel.Rooms?.[0];
//       const numberOfNights = lowestFareRoom?.DayRates?.[0]?.length ?? 1;
//       const totalFare = lowestFareRoom?.TotalFare ?? 0;
//       return totalFare / numberOfNights;
//     })
//     .filter(price => price > 0)
//     .sort((a, b) => a - b);

//   if (!perNightPrices.length) {
//     return {
//       priceBuckets: [
//         { label: 'Budget', range: '< ₹3K', min: 0, max: 3000 },
//         { label: 'Economy', range: '₹3K - ₹6K', min: 3000, max: 6000 },
//         { label: 'Mid-Range', range: '₹6K - ₹12K', min: 6000, max: 12000 },
//         { label: 'Premium', range: '₹12K - ₹25K', min: 12000, max: 25000 },
//         { label: 'Luxury', range: '₹25K+', min: 25000, max: 100000 }
//       ],
//       minPrice: 0,
//       maxPrice: 100000
//     };
//   }

//   const min = Math.floor(perNightPrices[0] / 100) * 100;
//   const max = Math.ceil(perNightPrices[perNightPrices.length - 1] / 100) * 100;

//   const getPercentile = (p: number) => perNightPrices[Math.floor(perNightPrices.length * p)] || 0;

//   const p20 = roundTo500(getPercentile(0.2));
//   const p40 = roundTo500(getPercentile(0.4));
//   const p60 = roundTo500(getPercentile(0.6));
//   const p80 = roundTo500(getPercentile(0.8));

  

//   return {
//     priceBuckets: [
//       { label: 'Budget', range: `< ${formatPrice(p20)}`, min, max: p20 },
//       { label: 'Economy', range: `${formatPrice(p20)} - ${formatPrice(p40)}`, min: p20, max: p40 },
//       { label: 'Mid-Range', range: `${formatPrice(p40)} - ${formatPrice(p60)}`, min: p40, max: p60 },
//       { label: 'Premium', range: `${formatPrice(p60)} - ${formatPrice(p80)}`, min: p60, max: p80 },
//       { label: 'Luxury', range: `${formatPrice(p80)}+`, min: p80, max }
//     ],
//     minPrice: min,
//     maxPrice: max
//   };
// };

// import { PriceBucket } from '../types/filter.types';
// import { Hotel } from '../types/hotel';
// import { calculatePerNightPrice } from './hotel.utils';  // ← ADD THIS IMPORT

// export const formatPrice = (price: number) => {
//   if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
//   return `₹${price}`;
// };

// export const roundTo500 = (n: number) => Math.round(n / 500) * 500;

// export const calculatePriceBuckets = (hotels: Hotel[]): { priceBuckets: PriceBucket[], minPrice: number, maxPrice: number } => {
//   const perNightPrices = hotels
//     .map(calculatePerNightPrice)  // ← USE THE IMPORTED FUNCTION
//     .filter(price => price > 0)
//     .sort((a, b) => a - b);

//   if (!perNightPrices.length) {
//     return {
//       priceBuckets: [
//         { label: 'Budget', range: '< ₹3K', min: 0, max: 3000, count: 0 },
//         { label: 'Economy', range: '₹3K - ₹6K', min: 3000, max: 6000, count: 0 },
//         { label: 'Mid-Range', range: '₹6K - ₹12K', min: 6000, max: 12000, count: 0 },
//         { label: 'Premium', range: '₹12K - ₹25K', min: 12000, max: 25000, count: 0 },
//         { label: 'Luxury', range: '₹25K+', min: 25000, max: 100000, count: 0 }
//       ],
//       minPrice: 0,
//       maxPrice: 100000
//     };
//   }

//   const min = Math.floor(perNightPrices[0] / 100) * 100;
//   const max = Math.ceil(perNightPrices[perNightPrices.length - 1] / 100) * 100;

//   const getPercentile = (p: number) => perNightPrices[Math.floor(perNightPrices.length * p)] || 0;

//   const p20 = roundTo500(getPercentile(0.2));
//   const p40 = roundTo500(getPercentile(0.4));
//   const p60 = roundTo500(getPercentile(0.6));
//   const p80 = roundTo500(getPercentile(0.8));

//   // ✅ CREATE BUCKETS FIRST
//   const buckets: PriceBucket[] = [
//     { label: 'Budget', range: `< ${formatPrice(p20)}`, min, max: p20 },
//     { label: 'Economy', range: `${formatPrice(p20)} - ${formatPrice(p40)}`, min: p20, max: p40 },
//     { label: 'Mid-Range', range: `${formatPrice(p40)} - ${formatPrice(p60)}`, min: p40, max: p60 },
//     { label: 'Premium', range: `${formatPrice(p60)} - ${formatPrice(p80)}`, min: p60, max: p80 },
//     { label: 'Luxury', range: `${formatPrice(p80)}+`, min: p80, max }
//   ];

//   // ✅ ADD COUNT TO EACH BUCKET
//   const bucketsWithCount = buckets.map(bucket => ({
//     ...bucket,
//     count: hotels.filter(hotel => {
//       const price = calculatePerNightPrice(hotel);  // ← USE THE IMPORTED FUNCTION
//       return price >= bucket.min && price <= bucket.max;
//     }).length
//   }));

//   return {
//     priceBuckets: bucketsWithCount,
//     minPrice: min,
//     maxPrice: max
//   };
// };


import { PriceBucket } from '../types/filter.types';
import { Hotel } from '../types/hotel';
import { calculatePerNightPrice } from './hotel.utils';

export const formatPrice = (price: number) => {
  if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
  return `₹${price}`;
};

// ✅ INDUSTRY STANDARD: Fixed Price Slabs
export const FIXED_PRICE_SLABS = [
  { label: 'Budget', min: 0, max: 1500 },
  { label: 'Economy', min: 1500, max: 3000 },
  { label: 'Mid-Range', min: 3000, max: 6000 },
  { label: 'Premium', min: 6000, max: 12000 },
  { label: 'Luxury', min: 12000, max: Infinity },  // Will be adjusted to actual max
] as const;

export const calculatePriceBuckets = (hotels: Hotel[]): { 
  priceBuckets: PriceBucket[], 
  minPrice: number, 
  maxPrice: number 
} => {
  // Calculate all per-night prices
  const perNightPrices = hotels
    .map(calculatePerNightPrice)
    .filter(price => price > 0);

  if (!perNightPrices.length) {
    // Fallback if no hotels
    return {
      priceBuckets: FIXED_PRICE_SLABS.map(slab => ({
        label: slab.label,
        range: slab.max === Infinity 
          ? `${formatPrice(slab.min)}+`
          : `${formatPrice(slab.min)} - ${formatPrice(slab.max)}`,
        min: slab.min,
        max: slab.max === Infinity ? 100000 : slab.max,
        count: 0
      })),
      minPrice: 0,
      maxPrice: 100000
    };
  }

  // Find actual min and max from data
  const actualMin = Math.floor(Math.min(...perNightPrices) / 100) * 100;
  const actualMax = Math.ceil(Math.max(...perNightPrices) / 100) * 100;

  // ✅ Create buckets with counts, adjusting Luxury max to actual max
  const priceBuckets: PriceBucket[] = FIXED_PRICE_SLABS.map(slab => {
    const bucketMax = slab.max === Infinity ? actualMax : slab.max;
    
    // Count hotels in this price range
    const count = hotels.filter(hotel => {
      const price = calculatePerNightPrice(hotel);
      return price >= slab.min && price < bucketMax;
    }).length;

    // Format range display
    const range = slab.max === Infinity
      ? `${formatPrice(slab.min)}+`
      : `${formatPrice(slab.min)} - ${formatPrice(slab.max)}`;

    return {
      label: slab.label,
      range,
      min: slab.min,
      max: bucketMax,
      count
    };
  }).filter(bucket => bucket.count > 0);  // ✅ Only show slabs with hotels

  return {
    priceBuckets,
    minPrice: actualMin,
    maxPrice: actualMax
  };
};
