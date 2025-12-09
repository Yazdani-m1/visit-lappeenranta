// src/__tests__/api/trip-requests.test.ts

import { handleTripRequest } from '@/lib/tripRequestsHandler';

const insertMock = jest.fn().mockReturnThis();
const selectMock = jest.fn().mockReturnThis();
const singleMock = jest.fn().mockResolvedValue({ data: { id: 1 }, error: null });

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      insert: insertMock,
      select: selectMock,
      single: singleMock,
    }),
  },
}));

describe('handleTripRequest', () => {
  beforeEach(() => {
    insertMock.mockClear();
    selectMock.mockClear();
    singleMock.mockClear();
  });

  it('returns 400 for invalid payload', async () => {
    const result = await handleTripRequest({});

    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
    expect(result.error).toBeDefined();
  });

  it('returns 201 for valid payload', async () => {
    const validBody = {
      name: 'Test User',
      email: 'test@example.com',
      arrivalDate: '2026-05-05',
      departureDate: '2026-05-10',
      groupSize: 2,
      interests: ['harbour', 'cafes'],
      message: 'Short test message',
    };

    const result = await handleTripRequest(validBody);

    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(result.ok).toBe(true);
    expect(result.status).toBe(201);
    expect(result.error).toBeUndefined();
  });
});
