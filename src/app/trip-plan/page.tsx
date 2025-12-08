// src/app/trip-plan/page.tsx
import { TripRequestForm } from '@/components/trip-plan/TripRequestForm';

export default function TripPlanPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-10 md:pb-24 md:pt-16 space-y-6">
      <header className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Request a simple trip plan
        </h1>
        <p className="text-sm text-slate-700">
          Tell us when you are visiting Lappeenranta and what kind of places
          you enjoy. We will use this guide&apos;s places to suggest a calm,
          realistic one– or two–day plan by email.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
        <TripRequestForm />
      </section>
    </main>
  );
}
