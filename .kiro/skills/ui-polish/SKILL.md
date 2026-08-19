---
name: ui-polish
description: The small details that separate polished UI from generated UI. Use as a final pass before considering any component or section done, or when UI looks subtly wrong without an obvious cause. Covers concentric radius, tabular numbers, optical alignment, complete interactive states, hit areas, text wrapping, and image edges.
---

# UI Polish

A hundred small details compound into "this feels great." None of them is individually
impressive. Missing them is what makes otherwise well-structured UI read as unfinished.

Run this as an explicit pass. Do not assume it happened.

## Concentric radius

For nested rounded elements: `outerRadius = innerRadius + padding`.

```
card radius 12px, padding 8px  →  inner element radius 4px
```

Identical radius on parent and child is the most common single detail that makes UI feel off,
and almost nobody can name it when they see it.

## Tabular numbers

Any number that changes — counters, years, percentages, timers, table columns, stat blocks —
gets `font-variant-numeric: tabular-nums` (`tabular-nums` in Tailwind). Without it, digits have
different widths and the layout jitters as values change.

## Optical alignment

Geometric centering is often visually wrong.

- Icon-left buttons: icon-side padding roughly 2px less than text-side padding
- Play triangles: nudge ~2px right of center
- Quotation marks and punctuation at the start of a line: hang them into the margin
- Optically center capital-letter-only text by reducing bottom padding slightly

If it looks off, trust your eye over the math.

## Every interactive element needs every state

Missing states are the fastest tell of an unfinished interface.

Interactive: `default`, `hover`, `active`, `focus-visible`, `disabled`.
Data: `loading`, `empty`, `error`, plus success where an action completes.

Use `:focus-visible`, never `outline: none` without a replacement. The focus ring must be
visible against every surface it can appear on.

Empty states are an invitation to act, not an apology. Error states say what went wrong and how
to fix it, in the interface's voice.

## Hit areas

44×44px per WCAG 2.5.5, 40px as an absolute minimum. When the visible control is smaller — a
20px checkbox, a 16px close icon — extend the hit area with a pseudo-element or padding rather
than growing the visual. Two hit areas must never overlap.

On mobile, check that nothing interactive sits within 8px of a screen edge or another target.

## Text wrapping

- `text-wrap: balance` on headings — kills the one-word second line
- `text-wrap: pretty` on body copy and captions — kills orphans
- `max-width` of roughly 65ch on paragraphs. Full-viewport-width text is unreadable and is a
  common oversight on wide screens.
- `overflow-wrap: anywhere` on anything that can contain a long URL or identifier

## Font rendering

`-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on the root.
macOS renders type noticeably heavier without it.

Load fonts with `font-display: swap` and preload the display face. Subset to the characters
actually used. Self-host rather than pulling from a third-party CDN — it is faster and avoids a
render-blocking third-party connection.

## Images and media

- 1px inset outline at `oklch(0% 0 0 / 0.1)` light or `oklch(100% 0 0 / 0.1)` dark. Never a
  tinted near-black or near-white — it reads as dirt on the edge.
- Always set `width` and `height` (or `aspect-ratio`) to reserve space. Unreserved images are
  the number one cause of layout shift.
- `loading="lazy"` below the fold, `loading="eager"` plus `fetchpriority="high"` on the hero
  image only.
- Serve AVIF with a WebP fallback. Never ship a hero PNG.
- Every image needs `alt`. Decorative images get `alt=""`, not a missing attribute.

## Shadows versus borders

Use a layered transparent `box-shadow` for elements that lift — it adapts to any background.
Keep real borders for dividers and input outlines. Do not use both to do the same job on the
same element.

## Scrollbars and overscroll

- Style scrollbars to match the theme, but never hide them on a scrollable region.
- `overscroll-behavior: contain` on modals and drawers so scrolling does not chain to the page.
- Lock body scroll when an overlay is open, and restore the exact scroll position on close.

## Transitions on state, not on everything

`transition-colors` and `transition-opacity` on interactive elements. Never `transition: all` —
it animates properties you did not intend, including layout ones.

## Final pass checklist

Walk this before calling any section done:

- [ ] Concentric radius correct on all nesting
- [ ] Tabular nums on every dynamic number
- [ ] All five interactive states present and visible on every surface
- [ ] Focus ring visible, never suppressed
- [ ] Hit areas ≥ 40px, non-overlapping
- [ ] Headings balanced, body copy capped near 65ch
- [ ] Every image has dimensions, `alt`, and a modern format
- [ ] No layout shift on load — check CLS in Lighthouse, not by eye
- [ ] One depth strategy throughout
- [ ] No raw hex or arbitrary px in component files
- [ ] Reads correctly at 320px, 768px, 1440px, and 2560px
- [ ] Reads correctly at 200% browser zoom
- [ ] Works with JavaScript animations disabled via reduced-motion

---

Adapted for this project from the polish guidance in
[Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) and
[wilwaldon/Claude-Code-Frontend-Design-Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit).
Content was rephrased for compliance with licensing restrictions.
