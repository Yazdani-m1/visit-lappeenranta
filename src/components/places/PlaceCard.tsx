// src/components/places/PlaceCard.tsx
import Link from 'next/link';
import type { Place } from '@/types';
import { Card } from '@/components/ui/Card';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const href = `/places/${place.slug}`;
  const tags = place.tags?.slice(0, 3) ?? [];
  const totalTags = place.tags?.length ?? 0;
  const rating = place.ratingAverage ?? 4.6;
  const ratingCount = place.ratingCount ?? 32;

  return (
    <Link href={href} className="block">
      <Card className="h-full">
        {/* Gradient header */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="h-full w-full bg-gradient-to-br from-sky-800 via-sky-700 to-slate-900" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

          {/* Category pills */}
          <div className="absolute left-3 top-3 flex gap-1.5 text-[10px]">
            <span className="rounded-full bg-black/80 px-2.5 py-1 font-medium text-sky-50 shadow-sm shadow-black/40">
              {place.category}
            </span>
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-sky-100 shadow-sm shadow-black/30">
              {place.subcategory}
            </span>
          </div>

          {/* Rating pill */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[10px] text-amber-300 shadow-sm shadow-black/40">
            <span>★ {rating.toFixed(1)}</span>
            <span className="text-[9px] text-sky-100">({ratingCount})</span>
          </div>

          {/* Title area */}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.16em] text-sky-200">
              {place.neighborhood || 'Lappeenranta'}
            </p>
            <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-sky-50">
              {place.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-[11px] text-sky-50/90">
              {place.shortLabel}
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col justify-between gap-2.5 px-3 py-3 text-[11px] text-slate-700">
          {/* Price / duration */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] text-slate-700 shadow-sm shadow-sky-100">
              {place.priceLevel}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] text-slate-700 shadow-sm shadow-sky-100">
              ~{place.typicalVisitDurationMinutes} min visit
            </span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-2.5 py-1 text-[10px] text-slate-700 shadow-sm shadow-sky-100"
                >
                  {tag}
                </span>
              ))}
              {totalTags > 3 && (
                <span className="text-[10px] text-slate-400">
                  +{totalTags - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer row */}
          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
            <span>Click to see full details</span>
            <span className="text-sky-700 group-hover:text-sky-600">
              View place →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
