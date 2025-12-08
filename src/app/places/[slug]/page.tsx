// src/app/places/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPlaces, getPlaceBySlug } from '@/lib/places';
import Link from 'next/link';

type PlaceParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  const places = getAllPlaces();
  return places.map((place) => ({ slug: place.slug }));
}

export default async function PlacePage({
  params,
}: {
  params: PlaceParams;
}) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    return notFound();
  }

  const hasWebsite = !!place.websiteUrl;
  const hasPhone = !!place.phone;
  const hasLocalTip = !!place.localTip;
  const hasSafety = !!place.safetyNotes;

  // Safe rating values with sensible fallbacks
  const ratingValue = (place.ratingAverage ?? place.rating ?? 0).toFixed(1);
  const ratingCount = place.ratingCount ?? 0;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16">
      {/* Header */}
      <header className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {place.category} · {place.subcategory}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {place.name}
          </h1>
          <p className="text-sm text-slate-700">{place.shortLabel}</p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-amber-300">
              <span>★ {ratingValue}</span>
              <span className="text-[11px] text-slate-200">
                ({ratingCount} reviews)
              </span>
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-700">
              {place.neighborhood}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-700">
              {place.priceLevel} · ~{place.typicalVisitDurationMinutes} min visit
            </span>
          </div>
        </div>

        {/* Gradient block */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-5 flex flex-col justify-end text-sm text-slate-50">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                {place.neighborhood || 'Lappeenranta'}
              </p>
              <p className="mt-1 text-xs text-slate-100">
                A local spot in the Saimaa lakeside city of Lappeenranta.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content + practical info */}
      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
              Overview
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {place.description}
            </p>
          </div>

          {place.highlights?.length ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Highlights
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {place.highlights.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {place.tags?.length ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Themes & keywords
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {place.suitableFor?.length ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Good for</h3>
              <div className="flex flex-wrap gap-1.5">
                {place.suitableFor.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {hasLocalTip && (
            <div className="space-y-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Local tip
              </h3>
              <p>{place.localTip}</p>
            </div>
          )}
        </div>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Practical info
          </h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-xs font-medium text-slate-500">Address</dt>
              <dd className="text-sm text-slate-900">
                {place.address}
                {place.neighborhood ? `, ${place.neighborhood}` : null}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-slate-500">
                Opening hours
              </dt>
              <dd className="text-sm text-slate-900">
                {place.openingHours || 'Varies'}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-slate-500">
                Best time of day
              </dt>
              <dd className="text-sm text-slate-900">
                {place.bestTimeOfDay}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-slate-500">
                Price level
              </dt>
              <dd className="text-sm text-slate-900">{place.priceLevel}</dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-slate-500">
                Accessibility
              </dt>
              <dd className="text-sm text-slate-900">
                {place.accessibility}
              </dd>
            </div>

            {hasWebsite && (
              <div>
                <dt className="text-xs font-medium text-slate-500">Website</dt>
                <dd className="text-sm">
                  <Link
                    href={place.websiteUrl!}
                    target="_blank"
                    className="text-emerald-700 hover:text-emerald-600"
                  >
                    Open official website →
                  </Link>
                </dd>
              </div>
            )}

            {hasPhone && (
              <div>
                <dt className="text-xs font-medium text-slate-500">Phone</dt>
                <dd className="text-sm text-slate-900">{place.phone}</dd>
              </div>
            )}

            {hasSafety && (
              <div>
                <dt className="text-xs font-medium text-slate-500">
                  Safety notes
                </dt>
                <dd className="text-sm text-slate-900">
                  {place.safetyNotes}
                </dd>
              </div>
            )}
          </dl>

          <p className="pt-2 text-[11px] text-slate-500">
            Always check opening hours and seasonal changes from the official
            website or Lappeenranta Travel Info Centre before your visit.
          </p>

          <div className="pt-3 text-[11px] text-slate-500">
            <Link
              href="/places"
              className="text-emerald-700 hover:text-emerald-600"
            >
              ← Back to all places
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
