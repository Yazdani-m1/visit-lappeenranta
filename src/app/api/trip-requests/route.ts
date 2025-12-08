// src/app/api/trip-requests/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { tripRequestSchema, validateTripDates } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Zod validation
    const parsed = tripRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Extra date logic
    const dateError = validateTripDates({
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
    });

    if (dateError) {
      return NextResponse.json(
        {
          success: false,
          error: dateError,
        },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { error } = await supabase.from('trip_requests').insert({
      name: data.name,
      email: data.email,
      arrival_date: data.arrivalDate,
      departure_date: data.departureDate,
      group_size: data.groupSize,
      interests: data.interests,
      message: data.message,
      source_page: '/trip-plan',
    });

    if (error) {
      console.error('Supabase insert error', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Database insert failed',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Trip request API error', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected server error',
      },
      { status: 500 },
    );
  }
}
