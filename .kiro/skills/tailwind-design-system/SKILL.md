---
name: tailwind-design-system
description: Build and enforce a token-based design system in Tailwind CSS v4. Use when defining colors, type scale, spacing, radius, shadows, or dark mode, when styling any component, or when reviewing UI for visual inconsistency. Bans raw hex and arbitrary values in components, defines a ratio-based type scale, and sets a single depth strategy.
---

# Tailwind Design System

Every visual value in this project traces back to a token in one file. A raw hex or an
arbitrary pixel value inside a component is the clearest signal that no system exists.

## Tokens live in one place

Tailwind v4 is CSS-first. Tokens are declared in `@theme` in `src/styles/theme.css`. Nothing
else defines a color, a font, a radius, or a shadow.

```css
@import 'tailwindcss';

@theme {
  /* ---- palette: named from the subject's world, not from a numeric scale ---- */
  --color-canvas:      #0b0c0e;
  --color-surface:     #121317;
  --color-surface-alt: #17181d;
  --color-line:        oklch(100% 0 0 / 0.08);
  --color-ink:         #f4f4f5;
  --color-ink-muted:   oklch(100% 0 0 / 0.62);
  --color-ink-faint:   oklch(100% 0 0 / 0.42);
  --color-signal:      #7bf1a8;   /* the single accent */

  /* ---- type ---- */
  --font-display: 'Instrument Serif', ui-serif, serif;
  --font-body:    'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono:    'Geist Mono', ui-monospace, monospace;

  /* ---- ratio-based scale, 1.25 from a 16px body ---- */
  --text-caption: 0.6875rem;  /* 11 */
  --text-sm:      0.8125rem;  /* 13 */
  --text-base:    1rem;       /* 16 */
  --text-lg:      1.25rem;    /* 20 */
  --text-xl:      1.5625rem;  /* 25 */
  --text-2xl:     1.953rem;   /* 31 */
  --text-3xl:     2.441rem;   /* 39 */
  --text-display: 4rem;       /* 64+, clamp in use */

  /* ---- motion ---- */
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-quint: cubic-bezier(0.77, 0, 0.175, 1);
}
```

Then in components you write `bg-surface text-ink-muted border-line font-display`. Never
`bg-[#121317]`, never `text-gray-400`, never `p-[13px]`.

## Semantic naming, not literal

`--color-ink` and `--color-canvas` describe a role. `--color-gray-700` describes a value.
Roles survive a redesign and a theme switch; values do not. A reader who sees only your token
names should be able to guess what the product is.

Four text levels, minimum:

| Role | Use |
|---|---|
| `ink` | primary content, headings |
| `ink-muted` | supporting copy, labels |
| `ink-faint` | metadata, timestamps, captions |
| `ink-disabled` | inactive controls |

Using only two levels means the hierarchy is too flat.

## Type scale is a ratio, and weight beats size

Pick a ratio and step it. ~1.2 for dense/calm UI, ~1.25 for most product UI, ~1.333 for
expressive editorial work. Round to whole pixels and to the spacing grid. A 15/16/17 scale is
mush.

The highest-leverage move: **weight and color carry more hierarchy than size does.** A single
16px size holds three tiers through weight and opacity alone:

```
value  →  16px / 600 / ink
label  →  16px / 500 / ink-muted
meta   →  16px / 400 / ink-faint
```

That separates more cleanly than two regular weights two points apart. Build hierarchy from
three levers together — size, weight, color — never size alone. Squint: if you cannot tell
headline from body from label, the hierarchy is too weak.

Optical sizing: tighten tracking as type grows (`-0.02em` to `-0.04em` on display sizes), keep
body line-height around 1.5 to 1.6. Default tracking on a 48px heading reads as a document,
not a design.

## Spacing: one base unit, multiples only

Base unit 4px. Use multiples. Scale by context:

- **micro** 4–8px — icon-to-label gaps
- **component** 12–20px — padding inside buttons and cards
- **section** 32–48px — between groups
- **major** 96–160px — between page sections

Padding is symmetrical unless content genuinely demands otherwise. Random values are the
clearest sign of no system.

**Density is a decision, expressed in numbers.** A card at 16px padding feels like a tool;
the same card at 32px feels like a brochure. Neither is default. Pick, name the value, hold it
everywhere.

**Breathe unevenly.** Group tightly-related things, then put real air between groups. Same card
size, same gap, same density everywhere is the sound of nobody deciding.

## Color distribution

- **~60/30/10** — dominant neutral surface, secondary tone, ~10% accent.
- **One accent.** Five colors used without thought lose to one used with intention. Gray builds
  structure; color communicates status, action, identity. Unmotivated color is noise.
- **One hue across surfaces.** Shift lightness, not hue. Different hues for different surfaces
  fragment the page.
- **Gradients must mean something.** A gradient as decoration is the most recognizable AI tell
  on the web right now.

## Surface elevation

Surfaces stack: a popover above a card above the page. Each step is only a few percentage
points of lightness — you should barely see one step in isolation, but stacked, the hierarchy
emerges.

- Dark mode: base → +7% → +9% → +12% lightness. Lean on borders; shadows barely read.
- Light mode: keep surfaces light and add shadow instead of darkening.
- Inputs are *inset* — slightly darker than their surroundings, not lighter. A darker fill says
  "type here" without a heavy border.
- A sidebar or nav shares the canvas background. A different color splits the page into two
  worlds.

## Borders

Borders should disappear when you are not looking for them and be findable when you need
structure. Use low-opacity rgba/oklch, not solid hex — a solid border reads harsh against any
background.

- Dark mode: roughly `oklch(100% 0 0 / 0.06)` to `/ 0.12`
- Light mode: slightly higher opacity of black

Build a progression: standard divider, softer separation, emphasis, focus ring. Match intensity
to the importance of the boundary.

## Depth: choose one strategy and commit

1. **Borders only** — clean, technical, dense
2. **Subtle shadows** — approachable
3. **Layered shadows** — premium, dimensional
4. **Surface-color shifts** — tints, no shadows

Do not mix. Mixed depth strategies are why UI looks "off" without an obvious cause.

For light-mode lift, stack three layers rather than one big blur:

```css
box-shadow:
  0 0 0 1px oklch(0% 0 0 / 0.06),
  0 1px 2px -1px oklch(0% 0 0 / 0.06),
  0 2px 4px oklch(0% 0 0 / 0.04);
```

Dark mode collapses to a single ring: `0 0 0 1px oklch(100% 0 0 / 0.08)`.

## Radius is a scale

Small for inputs and buttons, medium for cards, large for modals and media. Do not mix sharp
and soft arbitrarily.

**Concentric radius:** for nested rounded elements, `outerRadius = innerRadius + padding`.
Identical radius on parent and child is the single most common detail that makes UI feel wrong.

## The squint test

Blur your eyes at the interface. You should still perceive hierarchy — what is above what,
where sections divide — but nothing should jump out. No harsh lines, no jarring shifts. Get
this wrong and no other detail matters.

## Component styling order

1. Use the existing design-system component or variant.
2. When a styled element repeats a second time, extract a component or a `cva` variant.
3. Bind to semantic tokens: `bg-surface border-line text-ink-muted`.
4. Inline utilities only for genuine one-offs.

The tell of slop is the same long `className` string sprayed across nine call sites. That is a
missing component, not styling.

## Avoid

- Harsh borders — if borders are the first thing you see, they are too strong
- Dramatic surface jumps or drop shadows
- Flat hierarchy — everything one size and weight, no focal point
- Monotone layout — identical card size, gap, and density throughout
- Multiple accent colors
- Large radius on small elements; thick decorative borders
- Default typography where a direction was set
- Negative margins undoing parent padding, `calc()` escape hatches, absolute positioning to
  dodge layout flow

---

Adapted for this project from
[Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) and
[nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
against the [Tailwind CSS v4 theme docs](https://tailwindcss.com/docs/theme).
Content was rephrased for compliance with licensing restrictions.
