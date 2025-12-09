// src/app/api/trip-requests/route.ts

import { NextResponse } from 'next/server';
import { handleTripRequest } from '@/lib/tripRequestsHandler';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await handleTripRequest(body);

  if (result.ok) {
    return NextResponse.json({ ok: true }, { status: result.status });
  }

  return NextResponse.json(
    { error: result.error ?? 'Something went wrong' },
    { status: result.status },
  );
}
