// src/__tests__/lib/places.test.ts
import { getAllPlaces, getPlaceBySlug, getTopRatedPlaces } from '@/lib/places';
import type { Place } from '@/types';

describe('places lib', () => {
  it('getAllPlaces returns a non-empty list with unique ids', () => {
    const all = getAllPlaces();

    expect(all.length).toBeGreaterThan(0);

    const ids = all.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('getPlaceBySlug returns a place for a known slug', () => {
    // This slug is present in your dataset (SSG paths showed it)
    const slug = 'lappeenranta-fortress';

    const place = getPlaceBySlug(slug);

    expect(place).toBeDefined();
    expect(place?.slug).toBe(slug);
    expect(place?.name).toBeTruthy();
  });

  it('getTopRatedPlaces returns places sorted by ratingAverage', () => {
    const limit = 5;
    const top = getTopRatedPlaces(limit);

    // Should respect the limit (if we have at least "limit" places)
    expect(top.length).toBeGreaterThan(0);
    expect(top.length).toBeLessThanOrEqual(limit);

    // Should be sorted by ratingAverage desc
    for (let i = 0; i < top.length - 1; i++) {
      const current = top[i] as Place;
      const next = top[i + 1] as Place;

      // If either ratingAverage is missing, skip that comparison
      if (
        typeof current.ratingAverage !== 'number' ||
        typeof next.ratingAverage !== 'number'
      ) {
        continue;
      }

      expect(current.ratingAverage).toBeGreaterThanOrEqual(
        next.ratingAverage
      );
    }
  });
});
