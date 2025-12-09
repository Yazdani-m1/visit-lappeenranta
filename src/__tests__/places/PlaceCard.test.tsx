// src/__tests__/places/PlaceCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PlaceCard } from '@/components/places/PlaceCard';
import type { Place } from '@/types';

const basePlace: Place = {
  id: '1',
  slug: 'test-place',
  name: 'Test Place',
  category: 'Sightseeing & culture',
  subcategory: 'Museum',
  shortLabel: 'Short label for testing',
  description: 'This is a test place for unit testing the PlaceCard component.',
  neighborhood: 'Fortress area',
  address: 'Test street 1, 53900 Lappeenranta',
  latitude: 61.058,
  longitude: 28.188,
  openingHours: 'Daily 10–18',
  priceLevel: '€€',
  typicalVisitDurationMinutes: 60,
  bestTimeOfDay: 'Afternoon',
  tags: ['test', 'museum'],
  highlights: ['Highlight 1', 'Highlight 2'],
  suitableFor: ['Couples', 'Solo travellers'],
  accessibility: 'Easy walk, mostly flat',
  websiteUrl: null,
  phone: null,
  instagramHandle: null,
  bookingRequired: false,
  ratingAverage: 4.5,
  ratingCount: 120,
  safetyNotes: null,
  localTip: null,
  imageUrl: null,
};

describe('PlaceCard', () => {
  it('renders place name, category and rating', () => {
    render(<PlaceCard place={basePlace} />);

    // Name
    expect(screen.getByText('Test Place')).toBeInTheDocument();

    // Category badge
    expect(
      screen.getByText('Sightseeing & culture')
    ).toBeInTheDocument();

    // Rating pill – PlaceCard uses ratingAverage.toFixed(1)
    expect(screen.getByText('★ 4.5')).toBeInTheDocument();
  });

  it('shows neighborhood and shortLabel text', () => {
    render(<PlaceCard place={basePlace} />);

    expect(screen.getByText('Fortress area')).toBeInTheDocument();
    expect(
      screen.getByText('Short label for testing')
    ).toBeInTheDocument();
  });
});
