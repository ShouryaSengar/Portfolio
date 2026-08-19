---
name: web-performance
description: Performance budgets and optimization for a static React site on Vite. Use when adding a dependency, importing a heavy library, handling images or fonts, setting up code splitting, or investigating a slow Lighthouse score. Defines hard budgets for bundle size and Core Web Vitals and the specific techniques that hit them.
---

# Web Performance

A frontend engineer's portfolio that scores 70 on Lighthouse undermines its own claim. The
target is a site that feels instant on a mid-range Android over 4G, not just on a laptop over
fibre.

## Hard budgets

Treat these as failing conditions, not aspirations.

| Metric | Budget |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 |
| LCP | < 1.8s (mobile, throttled) |
| INP | < 150ms |
| CLS | < 0.05 |
| Initial JS (gzipped) | < 120KB |
| Total page weight | < 800KB |
| Fonts | ≤ 2 families, ≤ 3 weights total |
| Third-party scripts | 0 |

If a feature cannot fit the budget, the feature changes, not the budget.

## Before adding any dependency

Ask in order:

1. Can the platform do this? `IntersectionObserver`, `matchMedia`, `View Transitions`,
   `scroll-timeline`, CSS `:has()`, native `<dialog>` cover a lot that used to need a library.
2. What does it cost gzipped? Check [Bundlephobia](https://bundlephobia.com) first.
3. Is it tree-shakeable, and does the import path actually shake? A named import from a barrel
   that re-exports everything pulls the whole library.
4. Is it maintained? Last release within six months, no unpatched advisories.

Pin exact versions. Never a caret range on something that ships to production.

## Code splitting

- Route-level `React.lazy` + `Suspense`, always.
- Section-level lazy loading for anything heavy: 3D, charts, syntax highlighting, video.
- Lazy-load below-the-fold sections with `IntersectionObserver`, prefetching one viewport
  ahead so the swap is invisible.
- Inspect the graph with `rollup-plugin-visualizer` before shipping. Do not guess at what is
  large.

```ts
// vite.config.ts — verify against the visualizer, do not cargo-cult chunk names
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        motion: ['motion'],
      },
    },
  },
}
```

## Images

Images are almost always the largest thing on a portfolio and the biggest LCP risk.

- AVIF primary, WebP fallback, via `<picture>`. Never a raw PNG or JPEG hero.
- Always set `width`/`height` or `aspect-ratio`. This is the single fix for most CLS.
- `srcSet` + `sizes` so phones do not download desktop assets.
- Exactly one eager image — the LCP element — with `fetchpriority="high"`. Everything else
  `loading="lazy"` and `decoding="async"`.
- Target under 150KB per image after conversion. The existing `images/` folder has PNGs and a
  `.mp4`/`.gif` background; all of that needs reprocessing before reuse.
- Autoplaying video backgrounds are a performance liability. If one is genuinely the signature,
  it must be muted, `playsInline`, poster-backed, under 1MB, and disabled under reduced-motion
  and on slow connections.

## Fonts

- Self-host. `woff2` only.
- Preload the display face used above the fold: `<link rel="preload" as="font" crossorigin>`.
- `font-display: swap` plus `size-adjust`/fallback metric overrides to kill the layout shift
  when the webfont lands.
- Subset to Latin, or to the exact glyph set in use if the display face is only in a headline.
- Variable fonts count as one file — prefer them when you need multiple weights.

## Render performance

- Animate `transform` and `opacity` only. See the `motion-craft` skill.
- `content-visibility: auto` on long below-the-fold sections so the browser skips their layout.
- `will-change` sparingly and only immediately before an animation. Left on permanently it
  wastes GPU memory and can make things slower.
- No layout thrash: never read `offsetHeight` and write a style in the same loop.
- Debounce or `requestAnimationFrame` any resize/scroll work that is not already handled by an
  observer.

## React-side cost

- Measure with the Profiler before memoizing anything.
- Split contexts by update frequency. One context holding theme plus scroll position re-renders
  the whole tree on every scroll frame.
- Stable keys. Index keys break reconciliation on reorder.
- Never define a component inside a component.

## Build and deploy

- Vite production build with minification and Brotli.
- Verify the `dist` output size, do not trust the dev experience.
- On Vercel, enable compression and long-lived immutable caching on hashed assets.
- Preconnect only to origins actually used. Zero third-party analytics scripts; if analytics is
  needed, use a privacy-friendly, sub-2KB option and load it deferred.

## Verify, always

Claiming performance without measuring is not acceptable in this project.

```bash
npm run build
npx vite preview
# then: Lighthouse mobile run, and a WebPageTest run on 4G if possible
```

Report the actual numbers. If a metric was not measured, say it was not measured.

---

Assembled for this project from the
[web.dev Core Web Vitals guidance](https://web.dev/articles/vitals),
[Vite build optimization docs](https://vite.dev/guide/build), and performance practices in
[alirezarezvani/claude-skills senior-frontend](https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/senior-frontend/SKILL.md).
Content was rephrased for compliance with licensing restrictions.
