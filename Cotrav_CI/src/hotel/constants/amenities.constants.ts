// import { icons } from '@/index';
import * as icons from '@/components/icons'

export type AmenityCategory = {
  items: string[];
  icon: any;
  color: string;
};

export const AMENITY_CATEGORIES: Record<string, AmenityCategory> = {
  'Dining & Restaurants': { items: [], icon: icons.Utensils, color: 'from-orange-500 to-red-500' },
  'Pools & Beach': { items: [], icon: icons.Waves, color: 'from-blue-500 to-cyan-500' },
  'Internet & WiFi': { items: [], icon: icons.Wifi, color: 'from-blue-500 to-indigo-500' },
  'Parking': { items: [], icon: icons.Car, color: 'from-gray-600 to-gray-700' },
  'Fitness & Wellness': { items: [], icon: icons.Dumbbell, color: 'from-green-500 to-emerald-500' },
  'Spa & Beauty': { items: [], icon: icons.Sparkles, color: 'from-pink-500 to-rose-500' },
  'Entertainment': { items: [], icon: icons.Music, color: 'from-blue-500 to-blue-500' },
  'Business Facilities': { items: [], icon: icons.Building2, color: 'from-slate-600 to-gray-600' },
  'Safety & Security': { items: [], icon: icons.Shield, color: 'from-red-600 to-orange-600' },
  'Front Desk Services': { items: [], icon: icons.Package, color: 'from-blue-600 to-indigo-600' },
  'Accessibility': { items: [], icon: icons.Accessibility, color: 'from-teal-500 to-cyan-500' },
  'Family & Kids': { items: [], icon: icons.Baby, color: 'from-yellow-500 to-amber-500' },
  'Outdoor Activities': { items: [], icon: icons.TreePine, color: 'from-green-600 to-lime-600' },
  'COVID-19 Safety': { items: [], icon: icons.Heart, color: 'from-red-500 to-pink-500' },
  'Room Features': { items: [], icon: icons.Wind, color: 'from-sky-500 to-blue-500' },
  'Other Amenities': { items: [], icon: icons.CheckCircle2, color: 'from-gray-500 to-slate-500' },
};

export const AMENITY_KEYWORDS: Record<string, string[]> = {
  'Dining & Restaurants': ['restaurant', 'dining', 'breakfast', 'coffee', 'bar', 'buffet'],
  'Pools & Beach': ['pool', 'swimming', 'beach'],
  'Internet & WiFi': ['wifi', 'internet', 'wi-fi'],
  'Parking': ['parking', 'valet', 'garage'],
  'Fitness & Wellness': ['gym', 'fitness', 'yoga', 'exercise'],
  'Spa & Beauty': ['spa', 'massage', 'sauna'],
  'Entertainment': ['music', 'karaoke', 'tv', 'game'],
  'Business Facilities': ['conference', 'meeting', 'business'],
  'Safety & Security': ['security', 'cctv', 'fire', 'alarm'],
  'Front Desk Services': ['reception', 'concierge', 'check-in'],
  'Accessibility': ['wheelchair', 'elevator', 'accessible'],
  'Family & Kids': ['kid', 'child', 'baby'],
  'Outdoor Activities': ['garden', 'bbq', 'terrace'],
  'COVID-19 Safety': ['sanitize', 'covid', 'mask'],
  'Room Features': ['air conditioning', 'laundry', 'room service'],
};

