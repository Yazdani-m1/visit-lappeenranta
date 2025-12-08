// src/app/places/page.tsx
import { getAllPlaces, getAllCategories } from '@/lib/places';
import { PlaceCard } from '@/components/places/PlaceCard';

export default function PlacesPage() {
  const places = getAllPlaces();
  const categories = getAllCategories();

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Explore Lappeenranta
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          Find lakeside views, fortress cafés, cosy hotels and local everyday spots across
          Lappeenranta. Browse by category and open any place to see practical info, tips from
          locals and suggested visit times.
        </p>
      </section>

      <section className="space-y-8">
        {categories.map((category) => {
          const items = places.filter((p) => p.category === category);
          if (!items.length) return null;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
                  {category}
                </h2>
                <span className="text-xs text-slate-500">
                  {items.length} place{items.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {items.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
