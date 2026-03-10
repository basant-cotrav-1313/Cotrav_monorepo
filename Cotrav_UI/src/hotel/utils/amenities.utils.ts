import {
  AMENITY_CATEGORIES,
  AMENITY_KEYWORDS,
  AmenityCategory,
} from '@/hotel/constants/amenities.constants';

export const categorizeAmenities = (facilities: string[]) => {
  const categories: Record<string, AmenityCategory> = Object.fromEntries(
    Object.entries(AMENITY_CATEGORIES).map(([key, value]) => [
      key,
      { ...value, items: [] as string[] },
    ])
  );

  facilities.forEach((facility) => {
    const facilityLower = facility.toLowerCase();
    let matched = false;

    for (const [category, keywords] of Object.entries(AMENITY_KEYWORDS)) {
      if (keywords.some((k) => facilityLower.includes(k))) {
        categories[category].items.push(facility); 
        matched = true;
        break;
      }
    }

    if (!matched) {
      categories['Other Amenities'].items.push(facility); 
    }
  });

  return Object.entries(categories).filter(
    ([_, data]) => data.items.length > 0
  );
};

