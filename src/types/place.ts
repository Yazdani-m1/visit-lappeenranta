// src/types/place.ts

export interface Place {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;

  // Optional extra classification fields
  subcategory?: string;
  shortLabel?: string;
  neighborhood?: string;
  address?: string;

  // Location
  latitude?: number;
  longitude?: number;

  // Visit details
  openingHours?: string;
  priceLevel?: string;
  typicalVisitDurationMinutes?: number;
  bestTimeOfDay?: string;

  // Tags and attributes
  tags?: string[];
  highlights?: string[];
  suitableFor?: string[];
  accessibility?: string;

  // Contact and links
  websiteUrl?: string | null;
  phone?: string | null;
  instagramHandle?: string | null;
  bookingRequired?: boolean;

  // Ratings
  ratingAverage?: number; // used by richer data
  ratingCount?: number;
  /**
   * Raw rating value used in demoPlaces.
   */
  rating?: number;

  // Extra info
  safetyNotes?: string | null;
  localTip?: string | null;

  // Images (both camelCase and snake_case to match demo data)
  imageUrl?: string | null;
  image_url?: string | null;
}
