// src/app/places/page.tsx
import { getAllPlaces, getAllCategories } from '@/lib/places';
import { PlaceCard } from '@/components/places/PlaceCard';

export default function PlacesPage() {
  const places = getAllPlaces();
  const categories = getAllCategories();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16 space-y-8">
      <header className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Explore Lappeenranta
        </h1>
        <p className="max-w-2xl text-sm text-slate-700">
          Find lakeside views, fortress cafés, cosy hotels and local everyday
          spots across Lappeenranta. Browse by category and open any place to
          see practical info, tips from locals and suggested visit times.
        </p>
      </header>

      <div className="space-y-10">
        {categories.map((category) => {
          const items = places.filter((p) => p.category === category);
          if (!items.length) return null;

          return (
            <section key={category} className="space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  {category}
                </h2>
                <p className="text-[11px] text-slate-500">
                  {items.length} places
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
