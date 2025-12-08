// src/app/places/page.tsx
import { Container } from '@/components/layout/Container';
import { getAllPlaces } from '@/lib/places';
import { PlaceCard } from '@/components/places/PlaceCard';

export default function PlacesPage() {
  const places = getAllPlaces();

  return (
    <Container>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
          ALL PLACES
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Explore Lappeenranta by category and mood.
        </h1>
        <p className="max-w-2xl text-sm text-slate-700">
          Historical fortress, lakeside promenades, cafés, saunas and trails.
          Data here is demo but structured for real filtering, maps and
          recommendations.
        </p>
      </header>

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </Container>
  );
}
