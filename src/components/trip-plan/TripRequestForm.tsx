// src/components/trip-plan/TripRequestForm.tsx
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';

type TripInterest =
  | 'harbour'
  | 'fortress'
  | 'cafes'
  | 'saunas'
  | 'nature'
  | 'student-life'
  | 'family';

interface FormState {
  name: string;
  email: string;
  arrivalDate: string;
  departureDate: string;
  groupSize: string;
  interests: TripInterest[];
  message: string;
}

const interestOptions: { value: TripInterest; label: string; hint: string }[] = [
  { value: 'harbour', label: 'Harbour & lake views', hint: 'Promenade, sunset walks' },
  { value: 'fortress', label: 'Fortress & history', hint: 'Old town, museums' },
  { value: 'cafes', label: 'Cafés & bakeries', hint: 'Coffee, cakes, local spots' },
  { value: 'saunas', label: 'Saunas & spa', hint: 'Lakeside saunas, spa time' },
  { value: 'nature', label: 'Nature & trails', hint: 'Forests, lakeside paths' },
  { value: 'student-life', label: 'Student life vibes', hint: 'Skinnarila, cheap eats' },
  { value: 'family', label: 'Family-friendly', hint: 'Playgrounds, easy walks' },
];

export function TripRequestForm() {
  const [form, setForm] = React.useState<FormState>({
    name: '',
    email: '',
    arrivalDate: '',
    departureDate: '',
    groupSize: '2',
    interests: [],
    message: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function toggleInterest(value: TripInterest) {
    setForm((prev) => {
      const exists = prev.interests.includes(value);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== value)
          : [...prev.interests, value],
      };
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateClient(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.arrivalDate) {
      newErrors.arrivalDate = 'Please select arrival date.';
    }
    if (!form.departureDate) {
      newErrors.departureDate = 'Please select departure date.';
    }
    if (form.arrivalDate && form.departureDate) {
      const a = new Date(form.arrivalDate);
      const d = new Date(form.departureDate);
      if (a > d) {
        newErrors.departureDate = 'Departure must be after arrival.';
      }
    }
    const groupSizeNumber = Number(form.groupSize || '0');
    if (!groupSizeNumber || groupSizeNumber < 1) {
      newErrors.groupSize = 'Group size must be at least 1.';
    }
    if (!form.interests.length) {
      newErrors.interests = 'Select at least one interest.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Please describe your trip in at least a few words.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setSuccess(false);

    const isValid = validateClient();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const groupSizeNumber = Number(form.groupSize || '0');

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        arrivalDate: form.arrivalDate,
        departureDate: form.departureDate,
        groupSize: groupSizeNumber,
        interests: form.interests,
        message: form.message.trim(),
      };

      const res = await fetch('/api/trip-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        if (json?.error) {
          setServerError(json.error);
        } else {
          setServerError('Something went wrong. Please try again.');
        }
        return;
      }

      setSuccess(true);
      setForm({
        name: '',
        email: '',
        arrivalDate: '',
        departureDate: '',
        groupSize: '2',
        interests: [],
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      setServerError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4 text-sm" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Dates + group size */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <label
            className="text-xs font-medium text-slate-700"
            htmlFor="arrivalDate"
          >
            Arrival date
          </label>
          <input
            id="arrivalDate"
            name="arrivalDate"
            type="date"
            value={form.arrivalDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 focus:bg-white focus:ring-2"
          />
          {errors.arrivalDate && (
            <p className="text-xs text-red-500">{errors.arrivalDate}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            className="text-xs font-medium text-slate-700"
            htmlFor="departureDate"
          >
            Departure date
          </label>
          <input
            id="departureDate"
            name="departureDate"
            type="date"
            value={form.departureDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 focus:bg-white focus:ring-2"
          />
          {errors.departureDate && (
            <p className="text-xs text-red-500">{errors.departureDate}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            className="text-xs font-medium text-slate-700"
            htmlFor="groupSize"
          >
            Group size
          </label>
          <input
            id="groupSize"
            name="groupSize"
            type="number"
            min={1}
            max={20}
            value={form.groupSize}
            onChange={handleChange}
            className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 focus:bg-white focus:ring-2"
          />
          {errors.groupSize && (
            <p className="text-xs text-red-500">{errors.groupSize}</p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <label className="text-xs font-medium text-slate-700">
            What kind of places do you enjoy?
          </label>
          <span className="text-[11px] text-slate-400">
            Choose 1–4 that sound like you
          </span>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {interestOptions.map((opt) => {
            const active = form.interests.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleInterest(opt.value)}
                className={
                  'flex flex-col items-start rounded-xl border px-3 py-2 text-left text-xs transition ' +
                  (active
                    ? 'border-sky-400 bg-sky-50 text-sky-800'
                    : 'border-sky-100 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50/60')
                }
              >
                <span className="font-medium">{opt.label}</span>
                <span className="mt-0.5 text-[11px] text-slate-500">
                  {opt.hint}
                </span>
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="text-xs text-red-500">{errors.interests}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label
          className="text-xs font-medium text-slate-700"
          htmlFor="message"
        >
          Tell us a bit more
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-xl border border-sky-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-100 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          placeholder="For example: first time in Finland, would love a calm day with lake views, cafés and 1–2 easy walks."
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Global error / success */}
      {serverError && (
        <p className="text-xs text-red-500">{serverError}</p>
      )}
      {success && (
        <p className="text-xs text-emerald-600">
          We received your request. In a real project, someone would reply with
          a suggested plan by email.
        </p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send trip plan request'}
        </Button>
      </div>
    </form>
  );
}
