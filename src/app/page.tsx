// src/app/page.tsx
import Link from 'next/link';
import { getTopRatedPlaces } from '@/lib/places';
import { PlaceCard } from '@/components/places/PlaceCard';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const topPlaces = getTopRatedPlaces(3);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:py-16">
      {/* Hero */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.4fr)] lg:items-center">
        {/* Left */}
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            Visit Lappeenranta · Saimaa Lakeland
          </p>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-4xl">
            Plan a calm lakeside city break in{' '}
            <span className="text-sky-700">Lappeenranta</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-700">
            Explore the fortress hill, harbour promenade, saunas, cafés and
            quiet forest trails – all within a short walk or bus ride. This is a
            small, curated guide to places locals actually use every week.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/trip-plan">
              <Button size="md" variant="primary">
                Request a simple trip plan
              </Button>
            </Link>

            <Link href="/places">
              <Button size="md" variant="outline">
                Browse all places
              </Button>
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            60+ curated spots · cafés · saunas · nature · hotels
          </p>
        </div>

        {/* Right info card */}
        <aside className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900 p-5 text-sky-50 shadow-xl shadow-sky-200">
          <h2 className="text-sm font-semibold">What kind of city is Lappeenranta?</h2>
          <p className="mt-3 text-xs leading-relaxed text-sky-50/90">
            A lakeside border-city on Lake Saimaa where fortress streets,
            harbour ice-cream kiosks, student lakeside parks and quiet forests
            all sit within the same day&apos;s walk.
          </p>

          <ul className="mt-4 space-y-2 text-xs text-sky-50">
            <li>• Castle-like fortress hill with cafés and museums</li>
            <li>• Long harbour promenade with Saimaa lake views</li>
            <li>• City beaches, saunas and forest trails close by</li>
          </ul>

          <p className="mt-4 text-[11px] text-sky-100/80">
            Scroll down to see some of the most loved spots, from harbour
            sunsets to student barbecue rocks in Skinnarila.
          </p>
        </aside>
      </section>

      {/* Top places */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Top places to start with
            </h2>
            <p className="text-xs text-slate-500">
              High-rated spots that give you a good first taste of the city.
            </p>
          </div>

          <Link
            href="/places"
            className="text-xs font-medium text-sky-700 hover:text-sky-600"
          >
            View all places →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {topPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
}
