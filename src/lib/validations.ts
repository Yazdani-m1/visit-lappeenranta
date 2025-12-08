// src/lib/validations.ts
import type { TripRequestPayload } from '@/types';

export function validateTripRequest(input: TripRequestPayload): {
  valid: boolean;
  errors: Partial<Record<keyof TripRequestPayload, string>>;
} {
  const errors: Partial<Record<keyof TripRequestPayload, string>> = {};

  if (!input.name || !input.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!input.email || !input.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) {
    errors.email = 'Email is not valid';
  }

  if (!input.message || !input.message.trim()) {
    errors.message = 'Please tell us a bit about your trip';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
