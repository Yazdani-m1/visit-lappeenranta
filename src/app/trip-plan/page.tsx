// src/app/trip-plan/page.tsx
import { TripRequestForm } from '@/components/trip-plan/TripRequestForm';

export default function TripPlanPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Trip plan request
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Request a simple trip plan
        </h1>
        <p className="text-sm leading-relaxed text-slate-700 md:text-base">
          Tell us when you are visiting Lappeenranta and what kind of places you enjoy. We will
          use this guide&apos;s places to suggest a calm, realistic one– or two–day plan by email.
        </p>
        <p className="text-xs text-slate-500">
          This is a demo form – in a real project your request would be stored securely and a
          person would reply by email.
        </p>
      </div>

      <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-lg shadow-sky-100/80">
        <TripRequestForm />
      </div>
    </div>
  );
}
