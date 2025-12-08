// src/types/tripRequest.ts
export interface TripRequestPayload {
  name: string;
  email: string;
  travel_start?: string; // 'YYYY-MM-DD'
  travel_end?: string;   // 'YYYY-MM-DD'
  interests?: string;
  message: string;
}

export interface TripRequest extends TripRequestPayload {
  id: string;
  created_at: string;
}
