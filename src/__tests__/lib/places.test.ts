// src/__tests__/lib/places.test.tsx
import {
  getAllPlaces,
  getPlaceBySlug,
  getTopRatedPlaces,
} from '@/lib/places';

describe('lib/places', () => {
  it('getAllPlaces returns a non-empty list with valid slugs', () => {
    const all = getAllPlaces();

    expect(all.length).toBeGreaterThan(0);

    for (const place of all) {
      expect(place.slug).toBeDefined();
      expect(place.slug.length).toBeGreaterThan(0);
    }
  });

  it('getPlaceBySlug finds a place by slug', () => {
    const all = getAllPlaces();
    const sample = all[0];

    const found = getPlaceBySlug(sample.slug);

    expect(found).toBeDefined();
    expect(found?.id).toBe(sample.id);
  });

  it('getTopRatedPlaces returns places sorted by rating desc', () => {
    const top = getTopRatedPlaces(5);

    expect(top.length).toBeGreaterThan(0);

    for (let i = 1; i < top.length; i++) {
      const prevRating =
        top[i - 1].ratingAverage ?? top[i - 1].rating ?? 0;
      const currentRating =
        top[i].ratingAverage ?? top[i].rating ?? 0;

      expect(prevRating).toBeGreaterThanOrEqual(currentRating);
    }
  });
});
