// src/lib/tripRequestsHandler.ts

import { tripRequestSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabaseClient';

export interface TripRequestHandlerResult {
  ok: boolean;
  status: number;
  error?: string;
}

export async function handleTripRequest(
  body: unknown,
): Promise<TripRequestHandlerResult> {
  const parsed = tripRequestSchema.safeParse(body);

  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: 'Invalid request payload',
    };
  }

  const payload = {
    name: parsed.data.name,
    email: parsed.data.email,
    arrival_date: parsed.data.arrivalDate,
    departure_date: parsed.data.departureDate,
    group_size: parsed.data.groupSize,
    interests: parsed.data.interests,
    message: parsed.data.message,
  };

  const { error } = await supabase
    .from('trip_requests')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    return {
      ok: false,
      status: 500,
      error: 'Failed to save trip request',
    };
  }

  return {
    ok: true,
    status: 201,
  };
}
