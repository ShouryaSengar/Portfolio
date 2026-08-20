---
inclusion: always
---

# Design System — Direction A: Ledger

**Status: chosen and locked.** Approved by Shourya. Every visual decision derives from this
document. If something is not covered here, extend this file first, then write the code.

Implementation lives in `src/styles/theme.css`. This document is the reasoning; that file is
the source of values.

---

## The direction in one line

The visual language of insurance and fintech paperwork — greenbar ledger stock, blue-green
ruling, rubber stamps, carbon copies — rebuilt with the precision of a modern type specimen.

## Why this direction

The subject's world is enterprise insurance operations. That world has real physical
artifacts that no developer portfolio uses: ledger paper, ruled forms, stamps, filing. Every
alternative palette considered (slate-and-orange "precision tooling", monochrome editorial)
came from a generic idea of what a technical site looks like. This one comes from the domain
Shourya actually builds for.

Rejected defaults, explicitly:

| Default | Why rejected | Chosen instead |
|---|---|---|
| Near-black canvas + acid-green accent | The single most common AI/developer portfolio look | Light greenbar canvas, stamp-red accent |
| Cream `#F4F1EA` + serif + terracotta | The most common AI "editorial" default | Pale green-grey ledger stock, condensed grotesque |
| Inter + purple gradient + 3 rounded cards | Templated hero | Archivo condensed display, ruled grid, no gradients |
| Big-number stat grid hero | Template answer for a metrics-heavy subject | Metrics appear inline, attached to the project that earned them |
| Typed-text effect, particle field, carousel | Present on the old site; dated | An inspectable schema panel |

## Tokens

Names come from the domain. A reader who sees only these should be able to guess what the
site is for — that is the test in `.kiro/skills/tailwind-design-system`.

| Token | Value | Role |
|---|---|---|
| `--color-ledger` | `#E6E9E3` | page canvas — pale greenbar stock |
| `--color-leaf` | `#F2F4EF` | raised surface, cards |
| `--color-leaf-sunk` | `#DDE1D9` | inset surfaces, inputs (inset, so *darker*) |
| `--color-rule` | `oklch(from #A8B5A8 l c h / 0.45)` | the ruling grid, dividers |
| `--color-rule-strong` | `oklch(from #A8B5A8 l c h / 0.75)` | emphasis boundaries |
| `--color-ink` | `#14171A` | primary text |
| `--color-ink-muted` | `#3F464C` | supporting copy, labels |
| `--color-ink-faint` | `#5A6065` | metadata, captions |
| `--color-stamp` | `#B4321E` | THE accent — one only |
| `--color-carbon` | `#2B3A67` | links, interactive affordances |

Rules that hold this together:

- **One accent.** `--color-stamp` is it. `--color-carbon` is an interactive-state colour, not
  a second decorative accent — it appears on links and focus, nowhere else.
- **One hue family across surfaces.** `ledger`, `leaf`, `leaf-sunk` shift lightness only.
  Never introduce a differently-hued surface.
- **~60/30/10.** Ledger canvas dominates, leaf surfaces are secondary, stamp is ~10% at most.
- **No gradients.** Not on text, not on backgrounds, not on borders.
- **Four ink levels**, as tabled above. Two is too flat.

### Contrast — measured, not estimated

Computed with the WCAG 2.x relative-luminance formula during Phase 3. **Every text token
clears AA (4.5:1) for normal text on every surface it can appear on**, so any of them is safe
at caption size.

| Foreground | on `ledger` | on `leaf` | on `leaf-sunk` |
|---|---|---|---|
| `ink` | 14.68 AAA | 16.25 AAA | 13.58 AAA |
| `ink-muted` | 7.82 AAA | 8.66 AAA | 7.23 AAA |
| `ink-faint` | 5.20 AA | 5.75 AA | 4.81 AA |
| `stamp` | 5.01 AA | 5.55 AA | 4.63 AA |
| `carbon` | 9.00 AAA | 9.97 AAA | 8.32 AAA |

Button-specific: `leaf` on `stamp` (primary button label) measures **5.55 AA**. `leaf` on
`ink` (primary hover) measures **16.25 AAA**.

**Why these values changed.** The first draft used `ink-muted #4A5157` and
`ink-faint #6E767C`. `ink-faint` measured only 3.77:1 on ledger — it passed AA-large but
failed AA for normal text, and it was being used at 11px caption size. That would have
shipped unreadable metadata. Darkening it to `#5A6065` fixed the ratio but closed the gap to
`ink-muted` to just 6.4 L\*, which is too subtle to read as a separate tier, so `ink-muted`
was darkened to `#3F464C` in the same pass. Resulting perceptual gaps are 21.8 L\*
(ink → muted) and 11.1 L\* (muted → faint).

**Do not lighten any ink token without re-measuring against all three surfaces.** The
temptation to make metadata "quieter" by lightening it is exactly how this defect appeared.
Use size and weight to de-emphasise instead — that is the guidance in
`.kiro/skills/tailwind-design-system` and it costs no contrast.

Re-measure the whole table if `--color-ledger`, `--color-leaf`, or `--color-leaf-sunk` ever
changes.

## Typography

**Two families. One variable file plus one static weight.**

| Role | Face | Source |
|---|---|---|
| Display | Archivo Variable — condensed width, heavy weight | `public/fonts/archivo-var-latin.woff2` |
| Body | Archivo Variable — normal width, regular weight | same file |
| Mono / data | IBM Plex Mono 400 | `public/fonts/plex-mono-400-latin.woff2` |

Archivo Variable carries both `wght` (100–900) and `wdth` (62%–125%) axes in a single 88 KB
latin file. Using one face at two widths for display and body — rather than pairing two
unrelated families — is the deliberate move here: it echoes how a form uses one typeface at
several widths, and it keeps the font budget at two families.

Files are vendored into `public/fonts/` from `@fontsource-variable/archivo@5.3.0` and
`@fontsource/ibm-plex-mono@5.3.0` (kept as devDependencies for provenance and updates).
Vendored rather than imported so the filenames are stable and can be preloaded from
`index.html`.

**Cost, stated honestly:** 88 KB + 14.4 KB = ~102 KB of font. The width axis accounts for
54 KB of that (the weight-only build is 34 KB). If LCP misses its 1.8s budget in Phase 8, the
first thing to reconsider is dropping to `wght`-only and achieving the "form" feel through
tracking, weight, and case instead of true condensation.

**Scale** — ratio 1.25 from a 16px body:

```
caption  11px   mono, tracked, uppercase
sm       13px
base     16px   body
lg       20px
xl       25px
2xl      31px
3xl      39px
display  clamp(3rem, 8vw, 5.5rem)   condensed, 700+, tracking -0.03em
```

Hierarchy comes from **size + weight + colour together**, never size alone. A single 16px
size holds three tiers: `600/ink`, `500/ink-muted`, `400/ink-faint`.

Optical sizing: display sizes get negative tracking (−0.02em to −0.04em); body sits at
1.55–1.6 line-height.

## Layout

**The ruling grid is functional, not decorative.** This is what keeps the direction clear of
the "broadsheet hairlines" default — a known adjacency, flagged deliberately.

- Rules are blue-green (`--color-rule`), never black.
- Content aligns *to* rules. A rule marks a real boundary: a section edge, a field row, a
  record separator. A rule that divides nothing gets deleted.
- Key/value alignment is the recurring motif — label left, value right, rule between.
- Spacing base unit 4px. Section rhythm 96–160px. Component padding 12–20px.
- Density: tighter than a marketing site, looser than a dashboard. Ledger-like.

### Container widths

**Layout width and reading measure are separate problems.** Conflating them — applying a
prose measure to a whole page shell — is the most common way a wide-screen layout ends up
looking like a phone screenshot stretched onto a desktop.

| Token | Value | Use |
|---|---|---|
| `max-w-content` | 75rem / 1200px | **the shell width for every section.** Header and footer wrappers match it. |
| `max-w-feature` | 60rem / 960px | inner content blocks only — never a section shell |
| `max-w-page` | 90rem / 1440px | reserved; currently unused |
| `max-w-prose` | 65ch (Tailwind built-in) | **paragraphs only** |

### Every section shell is the same width

This is a hard rule, learned the hard way. The experience section was built with the
narrower `feature` shell, on the reasoning that one role does not need 1200px. It looked
broken.

The reason is that shells are centred with `mx-auto`, so a narrower shell moves **both**
edges inward — a 960px section inside a 1200px page starts 120px further right than its
neighbours. The left edge is the axis a reader tracks down the page, and breaking it
reads as a mistake, never as a decision.

`Section` therefore offers only `content` and `full`. `feature` and `page` were removed
from its variants so the error is impossible rather than merely documented.

**To make a section feel narrower, constrain its content, not its shell.** Inner blocks
are left-aligned within the shell, so `max-w-prose` on a paragraph or `max-w-feature` on
a column keeps the edge intact. This is the layout-width versus reading-measure
distinction below, and it is the same mistake in a different disguise.

Related: vertical rhythm may legitimately vary between sections — that is what `rhythm`
is for. Horizontal shell width may not. Experience had drifted on both axes at once,
which is why it stood out so plainly.

The first three come from `--container-*` tokens in `theme.css`. `max-w-prose` is the one
exception to "every value lives in theme.css": Tailwind v4 hardcodes it at 65ch and does
**not** derive it from `--container-*`, so declaring `--container-prose` has no effect at all.
65ch is inside our intended 65–70ch measure, so the built-in is used as-is rather than
shadowed by a near-duplicate token. Do not re-add `--container-prose` — it will look correct
and do nothing.

Rules for applying them:

- A section shell gets `max-w-content` or `max-w-page`. **Never `max-w-prose`.**
- `max-w-prose` goes on `<p>` and prose blocks, because ~68 characters is where reading
  comfort sits. It is a typographic constraint, not a layout one.
- Full-bleed rules are permitted and encouraged for major section breaks — a ruled sheet
  reads better when the ruling reaches the edge. Content stays within the container while
  the rule extends past it.
- **Widths vary by section on purpose.** Per the spatial-rhythm rule in
  `.kiro/skills/tailwind-design-system`, uniform width everywhere is the sound of nobody
  deciding. The Work section wants width for its diagrams; a lead paragraph wants
  constraint. Vary deliberately.
- Horizontal padding: 24px mobile, 40px tablet, 64px desktop. The gutter grows with the
  viewport rather than the content stretching to fill it.

Numbered markers (`01`, `02`, `03`) **are** permitted on the Work section, because the three
projects genuinely run oldest-to-newest with increasing architectural ownership. That is a
real sequence carrying real information. They are not permitted anywhere else.

## Depth strategy: borders only

**Committed. Do not mix.**

Structure comes from rules and tonal surface shifts. No drop shadows anywhere. On a paper
direction, shadows would break the metaphor and are the most common source of "looks off
but I can't say why."

Radius scale is small and restrained: inputs and buttons 3px, cards 5px, media 6px. Paper
has edges, not pillows. Concentric radius rule still applies where nesting occurs
(`outer = inner + padding`).

## The signature: an inspectable schema

One signature. Everything else stays quiet.

A persistent `inspect schema` affordance reveals the actual typed configuration object
behind each section — rendered as syntax-aware mono text on a `--color-leaf-sunk` panel.

Why it works and is not a gimmick:

- It is **true**. Content genuinely lives in `src/content/*.ts` as typed constants, and
  sections genuinely render from it. The panel shows real data, not a decorative mock.
- It dramatizes Shourya's strongest differentiator — server-driven UI, where interfaces
  generate themselves from JSON — using the site's own implementation as the proof.
- It cannot be lifted onto another subject. On a photographer's portfolio it would be
  meaningless.
- It rewards the technical half of the audience specifically, without getting in the way of
  the 90-second scanner.

Requirements: keyboard operable, `aria-expanded`, closed by default, and it must never be the
only route to information. Content must be fully legible with the panel shut.

The signature must be visible in at least five places when audited — per the signature test
in `.kiro/skills/frontend-design-direction`.

## Dark mode: not in v1, but not designed out

**Open question flagged for Shourya.** Direction A is a paper direction; a "dark greenbar
ledger" is conceptually strained. Recommendation is to ship light-only.

However, tokens are semantic (`--color-ink`, not `--color-near-black`), so a dark variant
stays additive rather than a rewrite. The `dark` class on `<html>` is left in place as a hook.

Do not build a dark palette until Shourya asks for one. If he does, it is a fresh direction
decision, not a token inversion.

## Quality floor

Not features. The floor, per `.kiro/skills/ui-polish` and `a11y-audit`:

- Responsive 320px → 2560px; readable at 200% zoom
- Visible `:focus-visible` on every interactive element
- `prefers-reduced-motion` respected
- Zero layout shift; every image dimensioned
- `tabular-nums` on every metric
- `text-wrap: balance` on headings, `pretty` on body
- All five interactive states on every control

## Motion

Restrained, per `.kiro/skills/motion-craft`. Ledger is a still, precise direction — it does
not want bounce or parallax.

Permitted: a page-load sequence that draws the rules in, scroll reveals at 400–600ms with
`once: true`, press feedback at `scale(0.97)`, and the schema panel expand at 150–250ms.

Not permitted: parallax, cursor followers, magnetic buttons, autoplay, scroll-jacking,
character-by-character text animation.
