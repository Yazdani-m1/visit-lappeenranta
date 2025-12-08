// src/app/trip-plan/page.tsx
import { Container } from '@/components/layout/Container';
import { TripRequestForm } from '@/components/trip-plan/TripRequestForm';

export default function TripPlanPage() {
  return (
    <Container>
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
        {/* Left: copy */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            CUSTOM DAY PLAN
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Send us your dates and we sketch a calm day in Lappeenranta.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-700">
            Share when you are in town, who you are travelling with and what you
            enjoy. In a real service, a local planner would reply with a simple
            one–day or weekend outline and a few concrete places from this app.
          </p>

          <div className="space-y-2 rounded-2xl border border-sky-100 bg-white/80 p-4 text-xs text-slate-700">
            <h2 className="text-xs font-semibold text-slate-900">
              How this would work in production
            </h2>
            <ul className="mt-1 space-y-1">
              <li>• You submit this short form.</li>
              <li>• Request is stored in a database (Supabase).</li>
              <li>• A human or service workflow replies to you by email.</li>
            </ul>
          </div>
        </div>

        {/* Right: form card */}
        <div className="rounded-3xl border border-sky-100 bg-white/90 p-5 shadow-md shadow-sky-100/80">
          <h2 className="text-sm font-semibold text-slate-900">
            Trip plan request
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            We focus here on clean UX, validation and a realistic data model.
          </p>
          <div className="mt-4">
            <TripRequestForm />
          </div>
        </div>
      </section>
    </Container>
  );
}
