// src/lib/demoPlaces.ts
import type { Place } from '@/types';

export const demoPlaces: Place[] = [
  {
    id: '1',
    slug: 'lappeenranta-fortress',
    name: 'Lappeenranta Fortress',
    description:
      'Historic hill area with views over Lake Saimaa, old wooden houses and small museums.',
    category: 'Sightseeing',
    latitude: 61.058,
    longitude: 28.188,
    rating: 4.8,
    image_url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    tags: ['fortress', 'history', 'viewpoint'],
  },
  {
    id: '2',
    slug: 'saimaa-harbour',
    name: 'Saimaa Harbour',
    description:
      'Harbour area by Lake Saimaa with cruise boats, walking paths and summer cafés.',
    category: 'Lake & Harbour',
    latitude: 61.055,
    longitude: 28.204,
    rating: 4.6,
    image_url: 'https://images.pexels.com/photos/929382/pexels-photo-929382.jpeg',
    tags: ['lake', 'harbour', 'walk'],
  },
  {
    id: '3',
    slug: 'waterfront-cafe',
    name: 'Waterfront Café',
    description:
      'Cozy café near the lake with good coffee and warm atmosphere, popular with students.',
    category: 'Café',
    rating: 4.4,
    image_url: 'https://images.pexels.com/photos/3806435/pexels-photo-3806435.jpeg',
    tags: ['cafe', 'coffee', 'relax'],
  },
];
