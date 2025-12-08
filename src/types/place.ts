// src/types/place.ts

export interface Place {
  id: string;
  slug: string; // برای URL مثل /places/lappeenranta-fortress
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
  websiteUrl?: string | null;
  phone?: string | null;
  instagramHandle?: string | null;
  bookingRequired: boolean;
  ratingAverage: number;
  ratingCount: number;
  safetyNotes?: string | null;
  localTip?: string | null;
  imageUrl?: string | null;
}
