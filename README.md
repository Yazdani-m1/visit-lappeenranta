# Visit Lappeenranta

A modern, production-style web app that helps visitors explore Lappeenranta:  
carefully curated places (fortress, harbour, cafés, saunas, nature spots) plus a simple trip plan request form that stores requests to Supabase.

> Live demo: https://visit-lappeenranta.vercel.app/

---

## Overview

**Visit Lappeenranta** is a city guide and trip-planning helper built with a modern React/Next.js stack.

The app focuses on:

- A clean, minimal and “premium” UI (inspired by products like Linear / Vercel).
- A data-driven list of places with ratings and rich metadata.
- A simple, realistic backend flow using Supabase for storing trip plan requests.

This project is designed as a **portfolio-ready** example that could be used in a real product, not just a tutorial demo.

---

## Features

### 🗺️ Explore curated places

- List of places across different categories:
  - Fortress & history
  - Harbour & lake views
  - Cafés and bakeries
  - Saunas & spa
  - Nature & trails
  - Student-life spots
  - Family-friendly locations
- Each place includes:
  - Name, short label, category & subcategory
  - Neighborhood and address
  - Rating average & review count
  - Visit duration and best time of day
  - Tags, highlights, suitability (family, couples, students, etc.)
  - Accessibility, local tips and optional external links

### 🔍 Powerful yet simple place explorer

- Text search (name, area, tags, category).
- Mood-based filters:
  - Harbour & lake views
  - Fortress & history
  - Cafés & bakeries
  - Saunas & spa
  - Nature & trails
  - Student life vibes
  - Family-friendly
- Sorting:
  - Highest rating
  - Shortest visit duration

All filtering is done on the client, but the architecture is ready to be connected to a real API if needed.

### ✉️ Trip plan request form

- Simple, focused form for visitors:
  - Name and email
  - Arrival & departure dates
  - Group size
  - Selected interests (harbour, fortress, cafés, saunas, nature, etc.)
  - Free-text message with trip details
- Strong client-side validation (dates, email, message length, group size).
- On submit:
  - POSTs to `/api/trip-requests`.
  - Persists the request into a `trip_requests` table in Supabase.
- Designed as a realistic flow where a local travel advisor could later answer by email.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Language:** TypeScript + React 18
- **Styling:** Tailwind CSS
- **Data / Backend:**
  - Static curated place data on the server side
  - Supabase (Postgres) for persisting trip plan requests
- **Testing:** Jest + React Testing Library
- **CI/CD:**
  - GitHub Actions (lint, test, build on every push)
  - Deployed on Vercel

---

## Architecture

The app follows a clean, component-based folder structure:

```txt
src/
  app/
    page.tsx                   # Home: hero, featured places, trip plan CTA
    places/
      page.tsx                 # /places – list + filters + search
      [slug]/
        page.tsx               # /places/[slug] – place details
    trip-plan/
      page.tsx                 # /trip-plan – trip plan request form
    api/
      trip-requests/
        route.ts               # POST /api/trip-requests – Supabase insert

  components/
    layout/
      Container.tsx            # Layout wrapper with consistent max-width + padding
    places/
      PlaceCard.tsx            # Compact 3D-feel cards for place previews
      PlacesExplorer.tsx       # Search + filters + sorting + grid of PlaceCard
    trip-plan/
      TripRequestForm.tsx      # Client-side validated trip request form
    ui/
      Button.tsx               # Reusable button variations
      Input.tsx                # Reusable text input
      TextArea.tsx             # Reusable textarea
      Card.tsx                 # Generic card container

  lib/
    places.ts                  # Data access helpers for places (getAll, getBySlug, getTopRated)
    demoPlaces.ts              # Curated demo dataset for Lappeenranta places
    supabaseClient.ts          # Supabase client setup
    validations.ts             # Shared validation logic (e.g. for trip requests)

  types/
    place.ts                   # Place domain model
    tripRequest.ts             # Trip request domain model
    index.ts                   # Barrel file re-exporting types

  __tests__/
    places/
      PlaceCard.test.tsx       # Unit test for the place card component
    lib/
      places.test.tsx          # Tests for getAllPlaces / getPlaceBySlug / getTopRatedPlaces
