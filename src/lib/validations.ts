// src/lib/validations.ts
import { z } from 'zod';
import type { TripInterest, TripRequestInput } from '@/types/tripRequest';

export const tripInterestEnum = z.enum([
  'harbour',
  'fortress',
  'cafes',
  'saunas',
  'nature',
  'student-life',
  'family',
] satisfies TripInterest[]);

export const tripRequestSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  groupSize: z.number().int().min(1).max(20),
  interests: z.array(tripInterestEnum).min(1).max(6),
  message: z.string().min(10).max(1000),
});

export type TripRequestSchemaInput = z.infer<typeof tripRequestSchema>;

// Optional extra check: arrival <= departure
export function validateTripDates(input: Pick<TripRequestInput, 'arrivalDate' | 'departureDate'>) {
  const arrival = new Date(input.arrivalDate);
  const departure = new Date(input.departureDate);

  if (Number.isNaN(arrival.getTime()) || Number.isNaN(departure.getTime())) {
    return 'Invalid dates';
  }

  if (arrival > departure) {
    return 'Departure date must be after arrival date';
  }

  return null;
}
