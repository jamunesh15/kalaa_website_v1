# Kalaa website

Marketing site for Kalaa, a creative social media agency in Surat. Next.js 16, React 19, Tailwind 4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local`. The only variable is `NEXT_PUBLIC_SITE_URL`, the canonical origin used for absolute links, the sitemap and social cards. It defaults to `https://kalaa.io` when unset.

## Deploy

The site deploys on Vercel with the default Next.js settings. Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables: the production domain for Production, and leave it unset for Previews so they use the default.

## Where things live

- `src/app` routes, metadata, sitemap and robots
- `src/sections` the home and contact page sections
- `src/components` shared UI and layout
- `src/content` all copy and media manifests, one typed module per section
- `src/styles` design tokens, theme and utilities
- `public` web-ready images and video, committed as shipped
