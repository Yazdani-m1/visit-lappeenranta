/* eslint-disable @typescript-eslint/no-explicit-any */

// src/__tests__/api/trip-requests.test.ts

const mockInsert = jest.fn();

// Mock Supabase client so that no real DB is called
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: mockInsert,
    })),
  },
}));

// Mock next/server fully so we don't depend on Node Request / Next internals
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

import { POST } from '@/app/api/trip-requests/route';

const basePayload = {
  name: 'Test User',
  email: 'test@example.com',
  arrivalDate: '2025-06-01',
  departureDate: '2025-06-05',
  groupSize: 2,
  interests: ['harbour'],
  message: 'We would love a calm weekend in Lappeenranta.',
};

function createRequest(body: unknown) {
  // Minimal shape the route expects: an object with a json() method
  return {
    json: async () => body,
  } as any;
}

describe('POST /api/trip-requests', () => {
  beforeEach(() => {
    mockInsert.mockReset();
    mockInsert.mockResolvedValue({ error: null });
  });

  it('returns 400 when validation fails (invalid email)', async () => {
    const req = createRequest({
      ...basePayload,
      email: 'not-an-email',
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBeDefined();
  });

  it('returns 400 when departure is before arrival', async () => {
    const req = createRequest({
      ...basePayload,
      arrivalDate: '2025-06-10',
      departureDate: '2025-06-05',
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBeDefined();
  });

  it('returns 2xx and success for a valid payload', async () => {
    const req = createRequest(basePayload);

    const res = await POST(req);

    // In your route you probably use 201, but 200 would also be fine.
    expect([200, 201]).toContain(res.status);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        name: basePayload.name,
        email: basePayload.email,
      }),
    );
  });
});
