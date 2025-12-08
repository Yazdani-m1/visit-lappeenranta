// src/app/api/trip-requests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { TripRequestPayload } from '@/types';
import { validateTripRequest } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TripRequestPayload;

    const validation = validateTripRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    // For now we just "accept" the request.
    // Later we will save this to Supabase/Postgres.
    console.log('[trip-requests] received', body);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[trip-requests] error', err);
    return NextResponse.json(
      { message: 'Unexpected server error' },
      { status: 500 },
    );
  }
}
