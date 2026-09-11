# Kalaa website

Marketing site for Kalaa, a creative social media agency in Surat. Next.js 16, React 19, Tailwind 4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

No configuration. The canonical origin is a constant in `src/site.ts`, because the site is static, has no backend and lives on one domain.

## Deploy

The site deploys on Vercel with the default Next.js settings and no environment variables.

## Where things live

- `DESIGN.md` the design system: colour, type, shape, layout, the paper devices, imagery, motion and the rules
- `src/app` routes, metadata, sitemap and robots
- `src/sections` the home and contact page sections
- `src/components` shared UI and layout
- `src/content` all copy and media manifests, one typed module per section
- `src/styles` design tokens, theme and utilities
- `public` web-ready images and video, committed as shipped
