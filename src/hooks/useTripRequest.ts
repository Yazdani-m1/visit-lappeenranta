// src/hooks/useTripRequest.ts
'use client';

import { useState } from 'react';
import type { TripRequestPayload } from '@/types';

interface TripRequestState {
  submitting: boolean;
  success: boolean;
  error?: string;
}

export function useTripRequest() {
  const [state, setState] = useState<TripRequestState>({
    submitting: false,
    success: false,
    error: undefined,
  });

  async function submit(payload: TripRequestPayload) {
    setState({ submitting: true, success: false, error: undefined });

    try {
      const res = await fetch('/api/trip-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || 'Failed to submit request');
      }

      setState({ submitting: false, success: true, error: undefined });
      return true;
    } catch (err: any) {
      setState({
        submitting: false,
        success: false,
        error: err?.message ?? 'Something went wrong',
      });
      return false;
    }
  }

  return {
    submitting: state.submitting,
    success: state.success,
    error: state.error,
    submit,
  };
}
