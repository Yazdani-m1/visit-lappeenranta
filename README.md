# Visit Lappeenranta

A calm, Nordic-style mini city guide and simple trip planner for Lappeenranta, built with **Next.js, React 18, TypeScript and Tailwind CSS**.

Visitors can explore curated places around the Saimaa lake area (harbour, fortress, cafés, saunas, nature trails) and send a short message to request a custom trip plan by email.

## Tech stack

- Next.js (App Router)
- React 18 + TypeScript
- Tailwind CSS (utility-first, custom 3D card design)
- Node.js API routes
- (Planned) Supabase/Postgres for persisting trip requests

## Features

- Landing page with:
  - hero section introducing Lappeenranta
  - primary call-to-action to **request a simple trip plan**
  - highlight cards for top-rated places
- Places index page (`/places`) with:
  - structured cards per place (category, rating, tags, price level, duration)
- Dynamic place detail page (`/places/[slug]`) with:
  - overview, highlights and practical info
  - CTA to request a plan including this place
- Trip-plan request page (`/trip-plan`) with:
  - clean form for name, email, travel dates, interests and free message
  - API endpoint to accept and validate requests (ready to plug into Supabase)

## Project structure

```txt
src/
  app/
    layout.tsx          # Root layout with header/footer shell
    page.tsx            # Landing page
    places/
      page.tsx          # /places – list view
      [slug]/
        page.tsx        # /places/[slug] – detail view
    trip-plan/
      page.tsx          # /trip-plan – trip request form
    api/
      trip-requests/
        route.ts        # POST /api/trip-requests

  components/
    layout/
      Header.tsx
      Footer.tsx
      Shell.tsx
    ui/
      Button.tsx
    places/
      PlaceCard.tsx
    trip-plan/
      TripRequestForm.tsx

  lib/
    places.ts           # data & helpers for places
    utils.ts            # small helpers (e.g. cn)

  types/
    place.ts
    tripRequest.ts
    index.ts            # re-exports
