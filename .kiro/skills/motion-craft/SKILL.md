---
name: motion-craft
description: Purposeful, performant animation for React interfaces using Motion (formerly Framer Motion). Use when adding transitions, scroll reveals, hover states, page transitions, staggered entrances, or any animated element. Sets duration and easing budgets, restricts animation to compositor-safe properties, and enforces prefers-reduced-motion support.
---

# Motion Craft

Motion should be felt, not watched. The goal is an interface that feels responsive and alive,
not one that performs for the visitor. Excess animation is one of the loudest signals that a
site was generated rather than designed.

## First question: should this animate at all?

- **Frequent actions** — nav links, theme toggle, anything used dozens of times: no animation
  or under 120ms. Animation makes repeated actions feel slow.
- **Occasional surfaces** — modals, drawers, section reveals, filters: standard animation.
- **Rare or first-run moments** — page load, hero entrance: this is where delight belongs.
  Spend the budget here.

If you cannot name what an animation communicates, delete it.

## Duration budget

Under 300ms for UI. Longer only for deliberate orchestrated moments.

| Element | Duration |
|---|---|
| Button / press feedback | 100–160ms |
| Tooltip, popover | 125–200ms |
| Dropdown, menu | 150–250ms |
| Modal, drawer | 200–400ms |
| Scroll reveal | 400–600ms |
| Hero load sequence | up to 1200ms total, staggered |

A 180ms dropdown feels more responsive than a 400ms one. When something feels sluggish, the fix
is almost always a shorter duration, not a different easing.

## Easing: custom ease-out, never ease-in

Built-in CSS curves are too weak to read as crafted.

```ts
export const easing = {
  out:   [0.23, 1, 0.32, 1],      // entering, interactive — the default
  inOut: [0.77, 0, 0.175, 1],     // movement across the screen
} as const;
```

`ease-in` delays the first frame — exactly the moment the visitor is watching — and always feels
sluggish. Reserve it for exits only.

Springs are for gestures, drags, and anything that should feel physical. Use
`{ type: 'spring', stiffness: 300, damping: 30 }` as a starting point, not the library default.

## Only animate transform and opacity

These are GPU-composited. Animating `width`, `height`, `margin`, `padding`, `top`, or `left`
triggers layout and paint on every frame and drops frames on mid-range phones.

- Size changes → `scale`
- Position changes → `x` / `y` / `translate`
- Reveals → `opacity` plus a small `y`
- Layout changes that genuinely need to animate → Motion's `layout` prop, which converts them
  to transforms for you

Never `transition: all`. Name the exact properties.

## Entrance rules

- **Never animate from `scale(0)`.** Nothing appears from nothing. Start at `scale(0.95)` and
  `opacity: 0`.
- **Never animate from a large offset.** 8–24px of `y` is enough. 100px reads as a slideshow.
- **Origin-aware popovers.** A popover scales from its trigger, not from its own center. Set
  `transform-origin` to match. Modals are the exception — they stay centered.
- **Stagger 30–80ms** between sibling items for a natural cascade. More than 100ms and the list
  feels like it is loading.
- **Exits are faster and subtler than entrances.** Roughly 60–70% of the enter duration.

## Press feedback

`scale(0.97)` on `:active` or `whileTap`. Never below 0.95 — it looks like a bug. This is the
tactile confirmation that the UI heard the click, and it is one of the cheapest ways to make an
interface feel finished.

## Scroll animation

- Use Motion's `whileInView` with `viewport={{ once: true, margin: '-15% 0px' }}`. Reveals that
  replay on every scroll-back are irritating.
- For scroll-linked effects use `useScroll` + `useTransform`. Never a raw `scroll` listener.
- Parallax must be subtle. Over ~15% differential and it reads as a template.
- Keep scroll-driven work off the main thread. If a scroll effect drops frames, cut it.
- Prefer native CSS scroll-driven animations (`animation-timeline: view()`) where support
  allows — zero JS cost.

## prefers-reduced-motion is not optional

```tsx
const shouldReduceMotion = useReducedMotion();

const reveal = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing.out },
  },
};
```

Keep opacity and color transitions. Drop movement, parallax, and autoplay. Never disable
animation entirely — that removes the feedback that tells people something happened.

## Shared variants, not inline objects

Define variants once in `shared/motion/` and import them. Inline animation objects scattered
across components are the same problem as scattered hex values: no system, guaranteed drift.

```ts
// shared/motion/variants.ts
export const fadeUp = { hidden: {...}, visible: {...} };
export const staggerChildren = (delay = 0.06) => ({ ... });
```

## Bundle cost

Import from `motion/react` and rely on tree-shaking. For a mostly-static site, prefer
`LazyMotion` with the `domAnimation` feature set to cut the runtime substantially:

```tsx
<LazyMotion features={domAnimation} strict>
  {/* use `m.div` instead of `motion.div` */}
</LazyMotion>
```

`strict` will error if a full `motion` component slips in, which keeps the saving real.

## Verify, do not assume

Open devtools Performance, record an interaction, and confirm 60fps with no layout or paint
work in the animation frames. An animation that looks smooth on a desktop can be unusable on a
mid-range Android. If you cannot verify, say so rather than claiming it is performant.

## Avoid

- Animation on every element on the page
- Long durations as a substitute for good easing
- Bouncy springs on utility UI
- Autoplaying carousels
- Text that animates in character by character on body copy
- Cursor followers and magnetic buttons unless they are the deliberate signature
- Scroll-jacking

---

Adapted for this project from motion guidance in
[Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) and the official
[Motion for React docs](https://motion.dev/docs/react).
Content was rephrased for compliance with licensing restrictions.
