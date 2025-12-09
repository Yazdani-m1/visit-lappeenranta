// src/lib/tripRequestsHandler.ts
import type { TripRequestInput } from '@/types';
import { tripRequestSchema } from './validations';
import { supabase } from './supabaseClient';

export interface TripRequestHandlerResult {
  ok: boolean;
  status: number;
  data?: { id: string } & TripRequestInput;
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
      error: 'Invalid trip request payload',
    };
  }

  const parsedData = parsed.data;

  const dbPayload = {
    name: parsedData.name,
    email: parsedData.email,
    arrival_date: parsedData.arrivalDate,
    departure_date: parsedData.departureDate,
    group_size: parsedData.groupSize,
    interests: parsedData.interests,
    message: parsedData.message,
  };

  try {
    const { data, error } = await supabase
      .from('trip_requests')
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error('[trip_requests] Supabase insert error:', error);

      return {
        ok: false,
        status: 500,
        error: 'Failed to save trip request',
      };
    }

    if (!data || !('id' in data)) {
      console.error(
        '[trip_requests] Insert succeeded but no row with id returned:',
        data,
      );

      return {
        ok: false,
        status: 500,
        error: 'Trip request saved, but response was unexpected',
      };
    }

    return {
      ok: true,
      status: 201,
      data: {
        id: String((data as { id: unknown }).id),
        ...parsedData,
      },
    };
  } catch (error) {
    console.error('[trip_requests] Unexpected error while inserting:', error);

    return {
      ok: false,
      status: 500,
      error: 'Failed to save trip request',
    };
  }
}
