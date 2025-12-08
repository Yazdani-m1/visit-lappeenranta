// src/lib/places.ts
import rawPlaces from '@/data/places.json';
import type { Place } from '@/types';

type RawPlace = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  shortLabel: string;
  description: string;
  neighborhood: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  priceLevel: string;
  typicalVisitDurationMinutes: number;
  bestTimeOfDay: string;
  tags: string[];
  highlights: string[];
  suitableFor: string[];
  accessibility: string;
  websiteUrl: string | null;
  phone: string | null;
  instagramHandle: string | null;
  bookingRequired: boolean;
  ratingAverage: number;
  ratingCount: number;
  safetyNotes: string | null;
  localTip: string | null;
  imageUrl: string | null;
};

// "[https://...](https://...)"  →  "https://..."
function extractUrl(value: string | null): string | null {
  if (!value) return null;

  const markdownMatch = value.match(/\((https?:\/\/[^)]+)\)/);
  if (markdownMatch && markdownMatch[1]) {
    return markdownMatch[1];
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return null;
}

// "Lappeenranta Harbour Promenade" → "lappeenranta-harbour-promenade"
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const places: Place[] = (rawPlaces as RawPlace[]).map((p) => ({
  ...p,
  slug: slugify(p.name),
  websiteUrl: extractUrl(p.websiteUrl),
  imageUrl: extractUrl(p.imageUrl),
}));

export function getAllPlaces(): Place[] {
  return places;
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}

export function getTopRatedPlaces(limit = 6): Place[] {
  return [...places]
    .sort((a, b) => b.ratingAverage - a.ratingAverage)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(places.map((p) => p.category))).sort();
}

export function getPlacesByCategory(category: string): Place[] {
  return places.filter((p) => p.category === category);
}
