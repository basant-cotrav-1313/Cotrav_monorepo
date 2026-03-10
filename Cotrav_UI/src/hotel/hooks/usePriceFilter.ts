
import { useMemo } from "react";
import { Hotel } from "../types/hotel";
// import type { PriceBucket } from "../types/filter.types";
import { calculatePriceBuckets } from "../utils/filter.utils";

export const usePriceFilter = (hotels: Hotel[], priceRange: [number, number]) => {
  const { priceBuckets, minPrice, maxPrice } = useMemo(
    () => calculatePriceBuckets(hotels),
    [hotels]
  );

  const activeBucket = useMemo(() => {
    const matched = priceBuckets.find(
      bucket => bucket.min === priceRange[0] && bucket.max === priceRange[1]
    );
    return matched ? matched.label : null;
  }, [priceRange, priceBuckets]);

  return { priceBuckets, minPrice, maxPrice, activeBucket };
};

