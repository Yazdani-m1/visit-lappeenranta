// src/types/tripRequest.ts

export type TripInterest =
  | 'harbour'
  | 'fortress'
  | 'cafes'
  | 'saunas'
  | 'nature'
  | 'student-life'
  | 'family';

export interface TripRequestInput {
  name: string;
  email: string;
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  groupSize: number;
  interests: TripInterest[];
  message: string;
}

export interface TripRequestRecord extends TripRequestInput {
  id: string;
  created_at: string;
  source_page?: string | null;
}
