// src/app/places/page.tsx
import { Metadata } from 'next';
import { getAllPlaces, getTopRatedPlaces } from '@/lib/places';
import { Container } from '@/components/layout/Container';
import { PlaceCard } from '@/components/places/PlaceCard';
import { PlacesExplorer } from '@/components/places/PlacesExplorer';

export const metadata: Metadata = {
  title: 'Places in Lappeenranta',
  description:
    'Curated places in Lappeenranta – harbour walks, fortress views, saunas, cafés and nature spots.',
};

export default function PlacesPage() {
  const places = getAllPlaces();
  const topPlaces = getTopRatedPlaces(3);

  return (
    <Container className="py-10 md:py-16">
      {/* Header */}
      <header className="space-y-4 md:space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Places in Lappeenranta
        </p>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Browse carefully curated spots around the city
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            From fortress hill and harbour promenade to student cafés and quiet
            forest trails – this mini guide is meant to feel like a local friend
            pointing out their favourite places.
          </p>
        </div>
      </header>

      {/* Featured row */}
      <section className="mt-8 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          A few highlights to start with
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {topPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Main explorer (filters + list) */}
      <section className="mt-10 border-t border-slate-100 pt-8 md:mt-12 md:pt-10">
        <div className="mb-4 flex items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Explore all places
          </h2>
          <p className="text-[11px] text-slate-400">
            Filter by mood, search by name, sort by rating or visit length.
          </p>
        </div>

        <PlacesExplorer places={places} />
      </section>
    </Container>
  );
}
