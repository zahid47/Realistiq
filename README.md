### Overview

A home renting platform built with Next.js 13 app router and React server components.

- Uses [Tanstack Query](https://tanstack.com/query/latest/docs/react/guides/ssr#using-the-app-directory-in-nextjs-13) for data (pre) fetching and optimistic mutations.
- Uses [Mapbox](https://visgl.github.io/react-map-gl) for maps.
- [PostGIS](https://supabase.com/docs/guides/database/extensions/postgis) for querying geo data.
- [Interceptiong routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) for all modals.

### Running locally

1. Clone the repo.
2. Install dependencies: `pnpm install`
3. Copy `.env.example` file and rename it to `.env`. Then fill those entries as your needs.
4. Run prisma migrate: `pnpm prisma migrate dev --name init`
5. Start the dev server: `pnpm dev`

### Misc.
System status: https://realistiq.openstatus.dev

US states geojson data by [KATE GALLO](https://www.kaggle.com/datasets/pompelmo/usa-states-geojson) on kaggle.