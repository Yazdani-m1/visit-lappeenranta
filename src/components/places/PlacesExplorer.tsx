// src/components/places/PlacesExplorer.tsx
'use client';

import * as React from 'react';
import type { Place } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PlaceCard } from './PlaceCard';

type MoodFilterId =
  | 'all'
  | 'harbour-lake'
  | 'history'
  | 'cafes'
  | 'saunas'
  | 'nature'
  | 'student'
  | 'family';

interface MoodFilter {
  id: MoodFilterId;
  label: string;
  hint: string;
  match: (place: Place) => boolean;
}

const moodFilters: MoodFilter[] = [
  {
    id: 'all',
    label: 'All places',
    hint: 'Everything in the guide',
    match: () => true,
  },
  {
    id: 'harbour-lake',
    label: 'Harbour & lake views',
    hint: 'Promenade, sunset walks',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.name} ${place.shortLabel} ${place.subcategory}`.toLowerCase();
      return (
        tags.some((t) =>
          ['harbour', 'harbor', 'lake', 'lakeside', 'lake view'].some((k) =>
            t.includes(k),
          ),
        ) ||
        text.includes('harbour') ||
        text.includes('harbor') ||
        text.includes('lake')
      );
    },
  },
  {
    id: 'history',
    label: 'Fortress & history',
    hint: 'Old town, museums',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.category} ${place.subcategory} ${place.shortLabel}`.toLowerCase();
      return (
        tags.some((t) =>
          ['history', 'fortress', 'museum'].some((k) => t.includes(k)),
        ) ||
        text.includes('fortress') ||
        text.includes('museum') ||
        text.includes('history')
      );
    },
  },
  {
    id: 'cafes',
    label: 'Cafés & bakeries',
    hint: 'Coffee, cakes, cosy spots',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.category} ${place.subcategory}`.toLowerCase();
      return (
        tags.some((t) =>
          ['cafe', 'café', 'coffee', 'bakery'].some((k) => t.includes(k)),
        ) ||
        text.includes('cafe') ||
        text.includes('café') ||
        text.includes('bakery')
      );
    },
  },
  {
    id: 'saunas',
    label: 'Saunas & spa',
    hint: 'Lakeside saunas, spa time',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.category} ${place.subcategory} ${place.shortLabel}`.toLowerCase();
      return (
        tags.some((t) => ['sauna', 'spa'].some((k) => t.includes(k))) ||
        text.includes('sauna') ||
        text.includes('spa')
      );
    },
  },
  {
    id: 'nature',
    label: 'Nature & trails',
    hint: 'Forests, lakeside paths',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.category} ${place.subcategory}`.toLowerCase();
      return (
        tags.some((t) =>
          ['nature', 'trail', 'hiking', 'park', 'forest'].some((k) =>
            t.includes(k),
          ),
        ) ||
        text.includes('trail') ||
        text.includes('hiking') ||
        text.includes('park') ||
        text.includes('nature')
      );
    },
  },
  {
    id: 'student',
    label: 'Student life vibes',
    hint: 'Skinnarila, cheap eats',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.neighborhood} ${place.shortLabel}`.toLowerCase();
      return (
        tags.some((t) =>
          ['student', 'campus', 'pub', 'bar'].some((k) => t.includes(k)),
        ) ||
        text.includes('student') ||
        text.includes('campus') ||
        text.includes('skinnarila')
      );
    },
  },
  {
    id: 'family',
    label: 'Family-friendly',
    hint: 'Playgrounds, easy walks',
    match: (place) => {
      const tags = (place.tags ?? []).map((t) => t.toLowerCase());
      const text = `${place.shortLabel}`.toLowerCase();
      return (
        tags.some((t) =>
          ['family', 'kids', 'playground'].some((k) => t.includes(k)),
        ) || text.includes('family') || text.includes('kids')
      );
    },
  },
];

type SortBy = 'rating' | 'shortest-visit';

interface PlacesExplorerProps {
  places: Place[];
}

export function PlacesExplorer({ places }: PlacesExplorerProps) {
  const [query, setQuery] = React.useState('');
  const [moodFilterId, setMoodFilterId] = React.useState<MoodFilterId>('all');
  const [sortBy, setSortBy] = React.useState<SortBy>('rating');

  const activeFilter = React.useMemo(() => {
    return moodFilters.find((f) => f.id === moodFilterId) ?? moodFilters[0];
  }, [moodFilterId]);

  const filteredPlaces = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...places]
      .filter((place) => activeFilter.match(place))
      .filter((place) => {
        if (!normalizedQuery) return true;
        const haystack = (
          place.name +
          ' ' +
          place.shortLabel +
          ' ' +
          place.neighborhood +
          ' ' +
          place.category +
          ' ' +
          place.subcategory +
          ' ' +
          (place.tags ?? []).join(' ')
        ).toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          const ratingB = b.ratingAverage ?? 0;
          const ratingA = a.ratingAverage ?? 0;
          return ratingB - ratingA;
        }
        // shortest-visit
        return (
          (a.typicalVisitDurationMinutes ?? 0) -
          (b.typicalVisitDurationMinutes ?? 0)
        );
      });
  }, [places, activeFilter, query, sortBy]);

  return (
    <section className="space-y-4 md:space-y-5">
      {/* Controls row */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="w-full md:max-w-sm">
          <Input
            type="search"
            placeholder="Search by name, area or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
          >
            <option value="rating">Highest rating</option>
            <option value="shortest-visit">Shortest visit first</option>
          </select>
        </div>
      </div>

      {/* Mood filter pills */}
      <div className="flex flex-wrap gap-2">
        {moodFilters.map((filter) => {
          const active = filter.id === moodFilterId;
          return (
            <Button
              key={filter.id}
              type="button"
              variant={active ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setMoodFilterId(filter.id)}
            >
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium">
                  {filter.label}
                </span>
                <span className="text-[10px] font-normal text-slate-200 md:text-slate-100">
                  {filter.hint}
                </span>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="text-[11px] text-slate-500">
        Showing {filteredPlaces.length} of {places.length} places
      </p>

      {/* Cards grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {/* Empty state */}
      {filteredPlaces.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-600">
          No places match your filters. Try clearing the search or choosing a
          different mood.
        </div>
      )}
    </section>
  );
}
