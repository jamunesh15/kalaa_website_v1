# Performance & Media, fast on every device

Every page must be fast on a mid-range phone, not just a desktop on fast wifi.
Performance is part of "done" and it's tied to SEO, Core Web Vitals are ranking
signals and they decide whether the page feels instant or sluggish. Build for the
slow case and the fast case takes care of itself.

## The targets (Core Web Vitals)

Aim for "good" thresholds, measured on mobile:

- **LCP (Largest Contentful Paint) ≤ 2.5s**, the main image/heading paints fast.
- **FCP (First Contentful Paint) ≤ 1.8s**, something meaningful shows quickly.
- **CLS (Cumulative Layout Shift) ≤ 0.1**, nothing jumps around as it loads.
- **INP (Interaction to Next Paint) ≤ 200ms**, taps/clicks feel immediate.
- **TTFB (Time to First Byte) ≤ 0.8s**, the server/CDN responds quickly.

If a change risks any of these, treat it as a bug to fix, not a nice-to-have.

## Protect LCP and FCP

The biggest wins are about the first screen:

- **Server-render the above-the-fold content** (SSR/SSG). Don't make users wait
  for a JS bundle to see the hero text and image.
- **The LCP element (usually the hero image) loads eagerly and prioritized:**
  `fetchpriority="high"`, no lazy-loading on it, and `<link rel="preload">` it if
  it's discovered late. Everything *below* the fold is `loading="lazy"`.
- **Preconnect** to required third-party origins (`<link rel="preconnect">`) and
  preload critical fonts.
- **Inline critical CSS** for the first paint where possible; defer the rest.
- **Ship less JavaScript.** Code-split by route, lazy-load heavy widgets, and
  avoid large client bundles for content pages. Prefer static/SSR over hydrating
  everything ("islands"/server components where the stack supports it).
- **Cache and compress:** long-cache static assets with hashed filenames, serve
  Brotli/gzip, serve from a CDN.

## Protect CLS (no layout jumps)

- **Always set `width` and `height` (or an `aspect-ratio`) on images, videos, and
  iframes** so the browser reserves space before they load. This is the number
  one cause of layout shift.
- Reserve space for anything async: ad slots, embeds, banners, dynamically
  injected content. Never insert content above existing content after load.
- **Fonts:** use `font-display: swap` and preload the primary font; keep fallback
  metrics close to avoid reflow. Self-host or use a fast font CDN.
- Give skeletons/placeholders the same dimensions as the real content.

## Protect INP (responsiveness)

- Keep main-thread work small: break up long tasks, avoid heavy synchronous work
  on click, debounce/throttle expensive handlers.
- Defer non-critical third-party scripts (analytics, chat) with `defer`/`async`
  or load them after interaction/idle.
- Don't block the main thread with large hydration; hydrate only what's
  interactive.

## Rendering: animation and graphics

A page can pass every weight budget and still feel bad, because smoothness is
decided by what the browser has to recompute per frame, not by how much you
shipped. There are 16ms in a frame at 60fps.

**Animate only `transform` and `opacity`.** These are handled by the compositor
and never touch layout. Everything else is expensive:

- `width`, `height`, `top`, `left`, `margin`, `padding` trigger **layout**, so
  the browser re-measures the page every frame.
- `background-color`, `box-shadow`, `border-radius`, `filter` trigger **paint**.
- Use `transform: translate()` instead of animating `top`/`left`, and
  `transform: scale()` instead of animating `width`/`height`.
- To animate an unknown height, animate a wrapper's `transform` or use
  `grid-template-rows: 0fr → 1fr`, not `height: auto`.

**`will-change` is a loan, not a hint.** It moves the element onto its own
compositor layer and keeps it there, using memory. Add it only to something
about to animate, remove it when the animation ends, and never apply it to a
long list. `will-change: transform` on fifty cards is slower than none at all.

**Do not thrash layout.** Reading a layout property (`offsetWidth`,
`getBoundingClientRect`, `scrollTop`, `clientHeight`) after writing a style
forces a synchronous reflow. In a loop that is a frame-killer. Batch all reads,
then all writes.

**Scroll and resize handlers run constantly.** Use `IntersectionObserver` rather
than a scroll listener for "is it visible", `ResizeObserver` rather than a resize
listener for element size, and `passive: true` on any scroll listener that does
not call `preventDefault`.

**Respect reduced motion.** Every animation needs a
`@media (prefers-reduced-motion: reduce)` branch. This is not optional politeness:
for some people motion causes nausea.

**Graphics choices, in order of cost:**

1. **CSS** (gradients, shadows, transforms, borders). Free, no request, scales
   to any size.
2. **Inline SVG** for icons and simple illustrations. No request, styleable with
   `currentColor`, sharp at every density.
3. **An SVG file** for larger or repeated artwork, so it can be cached.
4. **Raster** (`webp`/`avif`) only for photography.
5. **Canvas or WebGL** only when the others genuinely cannot do it, and then
   lazily and off the critical path.

**SVG specifics that matter:**

- Always keep the `viewBox`, drop the hardcoded `width`/`height`, and size it in
  CSS. Without a `viewBox` it will not scale.
- Use `fill="currentColor"` so an icon inherits text colour instead of needing a
  variant per theme.
- Strip editor metadata. Figma and Illustrator exports routinely carry more
  bytes of comments and ids than actual path data.
- Give a meaningful `<title>`, or `aria-hidden="true"` when purely decorative.
- Many copies of one icon inline is bytes repeated per instance. Past a handful,
  use a sprite or a component.

## Images, the biggest weight, do them right

- **Modern formats:** serve WebP/AVIF with a fallback. They're far smaller than
  JPEG/PNG at the same quality.
- **Responsive images:** use `srcset` + `sizes` (or a framework `<Image>`
  component) so phones download phone-sized images, not desktop ones.
- **Dimensions always set** (`width`/`height` or `aspect-ratio`) to prevent CLS.
- **Lazy-load below the fold** (`loading="lazy"`), eager + `fetchpriority="high"`
  for the LCP image.
- **`decoding="async"`** on non-critical images.
- **Meaningful `alt`** on every content image (SEO + accessibility); `alt=""` for
  purely decorative ones.
- Compress and right-size, never ship a 3000px image into a 400px slot.
- **Keep the URL stable.** The domain and path an image is served from are
  indexed by Google Images. Re-hosting them resets that history, so never change
  the image domain, CDN or path as a side effect of a styling or refactor task.
  If a move is genuinely needed, follow the image-URL rule in `seo.md`, which
  covers the redirects, the config, and the impact summary the user needs before
  it ships.
- **A separate image origin costs a handshake.** Images on a different domain to
  the page need a DNS lookup and TLS negotiation before the first byte, which
  lands directly on LCP when the hero lives there. `preconnect` to the origin, or
  keep the hero image same-origin.

```html
<img src="/img/hero-800.avif"
     srcset="/img/hero-400.avif 400w, /img/hero-800.avif 800w, /img/hero-1600.avif 1600w"
     sizes="(max-width: 768px) 100vw, 800px"
     width="1600" height="900"
     fetchpriority="high" decoding="async"
     alt="Team reviewing a dashboard on a laptop">
```

## Video & embeds

- Set dimensions/`aspect-ratio`; wrap responsive iframes in an aspect-ratio box.
- Don't autoplay with sound. If autoplay is needed, it must be `muted`,
  `playsinline`, and `loop` for background video, with a lightweight poster.
- Provide a **`poster`** image so something shows before the video loads.
- **Lazy-load** heavy embeds (YouTube, maps), load a light placeholder/facade
  and swap in the real embed on interaction.
- Provide captions/tracks for accessibility where there's speech.
- Prefer compressed formats and adaptive streaming for long video.

## HTML attribute best practices (every element)

Get the small attributes right, they affect performance, SEO, and accessibility:

- **`<img>`:** `src`, `srcset`, `sizes`, `width`, `height`, `alt`, `loading`,
  `decoding`, `fetchpriority` (hero only).
- **`<a>`:** descriptive text; `rel="noopener"` (and usually `noreferrer`) on
  `target="_blank"`; `rel="nofollow"`/`ugc`/`sponsored` where appropriate.
- **`<button>`:** real `type` (`button`/`submit`), `aria-label` if icon-only,
  `disabled`/`aria-busy` states.
- **Inputs:** `label`+`for`/`id`, correct `type` (email/tel/number/url),
  `autocomplete`, `inputmode`, `name`, and `required`/`aria-invalid` for
  validation, these improve UX, mobile keyboards, and form conversion.
- **`<script>`:** `defer` for non-critical scripts, `async` for independent ones;
  never block the parser with sync scripts in `<head>`.
- **`<link>`:** `preload`/`preconnect`/`dns-prefetch` for critical resources;
  `media` for conditional CSS.
- **`<html lang>`**, meta viewport, and `theme-color` set on every page.
- Set the right MIME/format and never leave `alt`, dimensions, or `lang` missing.

## Responsive performance for every screen

- Don't send desktop-weight assets to phones, responsive images, and
  conditionally load heavy desktop-only widgets.
- Respect data/motion preferences: honor `prefers-reduced-motion`; consider
  `prefers-reduced-data` / Save-Data for lighter payloads.
- Test on throttled mobile (Lighthouse mobile, ~4x CPU slowdown, Slow 4G). A page
  that's green on desktop can be red on a real phone.

## Quick performance checklist (done = all true)

Above-the-fold is server-rendered. LCP image is prioritized and not lazy; other
media is lazy. Every image/video/iframe has dimensions or aspect-ratio (no CLS).
Images are modern-format, responsive (`srcset`/`sizes`), compressed, with alt.
Fonts use `swap` + preload. JS is code-split and non-critical scripts deferred.
Third parties are lazy/after-idle. Assets are cached, compressed, CDN-served.
Verified on throttled mobile against the CWV targets above.
