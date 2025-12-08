// src/components/trip-plan/TripRequestForm.tsx
'use client';

import { useState } from 'react';
import type { TripRequestPayload } from '@/types';
import { validateTripRequest } from '@/lib/validations';
import { useTripRequest } from '@/hooks/useTripRequest';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { FormField } from '@/components/ui/FormField';

const initialForm: TripRequestPayload = {
  name: '',
  email: '',
  travel_start: '',
  travel_end: '',
  interests: '',
  message: '',
};

export function TripRequestForm() {
  const [form, setForm] = useState<TripRequestPayload>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof TripRequestPayload, string>>
  >({});
  const { submitting, success, error, submit } = useTripRequest();

  function updateField<K extends keyof TripRequestPayload>(
    key: K,
    value: TripRequestPayload[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validation = validateTripRequest(form);
    setFieldErrors(validation.errors);

    if (!validation.valid) {
      return;
    }

    const ok = await submit(form);

    if (ok) {
      setForm(initialForm);
      setFieldErrors({});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Name"
        htmlFor="name"
        error={fieldErrors.name}
      >
        <Input
          id="name"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Your full name"
        />
      </FormField>

      <FormField
        label="Email"
        htmlFor="email"
        error={fieldErrors.email}
      >
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Arrival date" htmlFor="travel_start">
          <Input
            id="travel_start"
            type="date"
            value={form.travel_start ?? ''}
            onChange={(e) => updateField('travel_start', e.target.value)}
          />
        </FormField>

        <FormField label="Departure date" htmlFor="travel_end">
          <Input
            id="travel_end"
            type="date"
            value={form.travel_end ?? ''}
            onChange={(e) => updateField('travel_end', e.target.value)}
          />
        </FormField>
      </div>

      <FormField
        label="What are you interested in?"
        htmlFor="interests"
        description="For example: lakeside cafés, fortress history, local food, saunas…"
      >
        <Input
          id="interests"
          value={form.interests ?? ''}
          onChange={(e) => updateField('interests', e.target.value)}
          placeholder="Short list of interests"
        />
      </FormField>

      <FormField
        label="Tell us about your trip"
        htmlFor="message"
        error={fieldErrors.message}
        description="Write a few sentences about who is travelling and what kind of feeling you want from the trip."
      >
        <TextArea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Example: We are two friends visiting Lappeenranta for the first time..."
        />
      </FormField>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Request a simple trip plan'}
        </Button>

        {success && (
          <p className="text-xs text-emerald-300">
            Thank you! We will email you a plan soon.
          </p>
        )}

        {error && !success && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>

      <p className="text-[11px] text-slate-500">
        We usually reply within a couple of days. Your details are only used to
        prepare your trip plan.
      </p>
    </form>
  );
}
