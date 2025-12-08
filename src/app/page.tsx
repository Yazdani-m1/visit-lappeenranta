// src/app/page.tsx
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { getTopRatedPlaces } from '@/lib/places';
import { PlaceCard } from '@/components/places/PlaceCard';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const topPlaces = getTopRatedPlaces(6);

  return (
    <Container>
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            LAPPEENRANTA · SAIMAA LAKESIDE
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Plan a calm, modern city escape by Lake Saimaa.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-700">
            Hand-picked places, lakeside walks, fortress viewpoints and cosy
            cafés. Explore the city like a local and send us a short trip
            request to get a curated day plan in your inbox.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/places">
              <Button variant="primary">Explore all places</Button>
            </Link>
            <Link href="/trip-plan">
              <Button variant="secondary">Plan my Lappeenranta day</Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 text-[11px] text-slate-500">
            <div>
              Built with{' '}
              <span className="font-medium text-slate-700">
                Next.js · TypeScript · Supabase
              </span>
            </div>
            <div>Data is synthetic but location-inspired.</div>
          </div>
        </div>

        {/* Right side hero card */}
        <div className="rounded-3xl border border-sky-100 bg-white/80 p-5 shadow-md shadow-sky-100/80">
          <h2 className="text-sm font-semibold text-slate-900">
            What this app can do
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Browse curated places by category and mood.</li>
            <li>• See practical info: opening hours, price level, tips.</li>
            <li>• Send a trip request with your dates and interests.</li>
          </ul>
          <p className="mt-3 text-[11px] text-slate-500">
            In a real project, a local guide or service team would reply with a
            personalised plan. Here we focus on app structure, data and UX.
          </p>
        </div>
      </section>

      {/* TOP PLACES */}
      <section className="mt-12 space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              Top picks
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              A few places that represent different sides of Lappeenranta.
            </p>
          </div>
          <Link
            href="/places"
            className="text-xs text-sky-700 hover:text-sky-600"
          >
            View all places →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </Container>
  );
}
