---
name: frontend-design-direction
description: Establish a deliberate visual direction before writing any UI code. Use when designing or reshaping a page, section, hero, or component, when choosing typography, palette, or layout, or when output risks looking like a generic AI-generated template. Produces a named token system covering color, type, layout, and a signature element that all subsequent code derives from.
---

# Frontend Design Direction

Act as the design lead at a studio whose reputation is that no two clients get a product
that looks the same. The brief here is a senior frontend engineer's portfolio: the site
itself is the work sample. A templated site fails the brief no matter how clean the code
underneath it is.

## The failure mode you must avoid

Left unguided, AI-generated frontends converge on a small number of looks:

- Warm cream background (near `#F4F1EA`), high-contrast serif display, terracotta accent
- Near-black background, one acid-green or violet accent, glassmorphism cards
- Broadsheet layout, hairline rules, zero border-radius, dense newspaper columns
- Inter everywhere, purple-to-blue gradient hero, three rounded feature cards in a row

Each is legitimate for *some* brief. None is a choice when it shows up regardless of
subject. Where the brief pins a direction, follow the brief exactly — the brief's own
words always win. Where it leaves an axis free, do not spend that freedom on a default.

**The bar:** if another agent, given a similar prompt, would produce substantially the
same output, the work has failed. Not different for novelty's sake — different because
the design emerged from *this* engineer, *this* body of work, *this* audience.

## Step 1 — Ground it in the subject

Before any visual thinking, state these:

- **Subject** — concretely. Not "a portfolio." A React and React Native engineer's
  proof-of-craft site, whose strongest work is server-driven UI: interfaces that generate
  themselves from JSON at runtime.
- **Audience** — hiring managers scanning for 60 to 90 seconds, and engineers on the
  interview panel who will open devtools, run Lighthouse, and tab through with a keyboard.
- **The page's single job** — convince a technical reader in under two minutes, then give
  them an obvious next step.

The subject's own world is where distinctive choices come from: its materials,
instruments, artifacts, vernacular. This subject's world is unusually rich and mostly
unexploited by portfolio sites:

- **Schema and metadata** — JSON trees, key/value pairs, type annotations, config objects
- **The render pipeline** — Strapi to S3 to runtime, config becoming interface
- **Rule engines** — conditional visibility, branching, predicates
- **Access control** — personas, permission matrices, gates
- **Cross-platform surfaces** — device frames, viewport boundaries, one system across three
  targets
- **Competitive programming** — problem counts, ratings, constraints, complexity bounds

There is a genuine conceptual hook available here: **a site whose own interface visibly
derives from a schema, the way the work it describes does.** That is the kind of idea that
cannot be lifted onto another subject. It is one candidate direction, not a mandate — but
it is the sort of thinking this step is for. Mine the subject; do not decorate with
generic tech imagery, terminal-green matrix effects, or floating code snippets.

## Step 2 — Produce a design plan before any code

Four artifacts, in this order. Work through them in thinking; surface only the conclusion
and the reasoning that matters.

**Color** — 4 to 6 named hex or oklch values. Name them from the subject's world, not from
a numeric scale. `--ink`, `--schema`, `--signal` reads as a product. `--gray-700`,
`--surface-2` reads as a template. Someone reading only your token names should be able to
guess what this site is for. Distribution roughly 60/30/10; one accent.

**Type** — typefaces for at least two roles: a characterful display face used with
restraint, and a complementary body face. A mono face earns its place here, since code and
data are part of the subject — but mono as the *body* face is itself a cliché for developer
portfolios. Set an explicit ratio-based scale. Do not reach for the pairing you would use
on any other project. Typography carries the personality; it is not a neutral delivery
vehicle for content.

**Layout** — a one-sentence prose concept plus an ASCII wireframe. Generate at least two
options and compare them before committing. Say why the winner won.

**Signature** — the single element this site is remembered by. One thing. It must be
impossible to lift onto a different subject without looking wrong. "A nice hero animation"
is not a signature. "The page's section structure is visibly rendered from a schema you can
inspect" is.

## Step 3 — Critique the plan, then build

Review the plan against the brief. Mentally run a similar prompt from scratch and see where
you land. Any part of the plan that matches that generic arrival point gets revised, and
you state what changed and why.

Only then write code, deriving every color and type value from the revised plan. No value
gets invented at implementation time. If the plan is missing something, the plan gets
amended first.

Watch CSS specificity while building. Class sets that cancel each other out — a
`.section` type selector fighting an element-scoped rule — most often show up as
inconsistent vertical spacing between sections. Structure selectors so this cannot happen.

## Hero is a thesis

Open with the most characteristic thing in the subject's world, in whatever form fits: a
headline, a live demo, an orchestrated load sequence, an interactive moment. A big number
with a small label, three supporting stats, and a gradient accent is the template answer.
Use it only if it genuinely beats the alternatives here.

This subject has real numbers (100,000+ DAU, 3 production apps, 80% release-cycle
reduction) and the pull toward a stat grid will be strong. Resist it as a reflex. If stats
lead, they should lead because a specific reason was identified, and they should be
expressed in a form that is not a row of cards.

## Structure is information

Numbering, eyebrows, dividers, labels should encode something true about the content, not
decorate it. `01 / 02 / 03` markers are appropriate only when the content actually is a
sequence — and here it can be, since the three projects run oldest to newest with
increasing architectural ownership. That is a real progression, so the device is earned.
Interrogate every other structural element the same way before keeping it.

## Motion serves the subject

Think about where animation genuinely helps: a page-load sequence, a scroll-triggered
reveal, hover micro-interactions, ambient atmosphere. One orchestrated moment usually lands
harder than effects scattered across every element. Sometimes less is more — excess
animation is itself a strong tell of AI generation. Budgets and technique live in the
`motion-craft` skill.

## Match complexity to the vision

Maximalist directions need elaborate execution. Minimal directions need precision in
spacing, type, and detail. Elegance is executing the chosen vision well, not choosing the
safest vision. Not taking a risk is itself a risk on a portfolio — a competent, forgettable
site is a worse outcome than an opinionated one.

## Restraint

Spend boldness in one place. Let the signature be the memorable thing and keep everything
around it quiet and disciplined. Cut any decoration that does not serve the brief.

Build to a quality floor without announcing it: responsive to 320px, visible keyboard
focus, `prefers-reduced-motion` respected, no layout shift. These are the floor, not
features to mention.

## Copy is design material

Generic copy makes a design feel as templated as generic visuals.

- Write from the visitor's side of the screen. Name things by what people recognize.
- Active voice, sentence case, plain verbs, no filler. Specific beats clever.
- A control says exactly what happens: "Download resume," not "Learn more."
- Keep vocabulary consistent across a flow. The button that says "Download resume"
  produces a resume.
- Treat empty and error states as direction, not mood. Say what happened and what to do.
  Errors do not apologise and are never vague.
- Let each element do one job. A label labels. An example demonstrates. Nothing quietly
  does double duty.
- Every claim keeps its context. "80% faster releases" alone is meaningless; "cut release
  cycle time 80% by moving schema authoring out of the codebase" is the actual point.

Facts and figures come from `.kiro/steering/content.md`. Never invent a number to make a
layout work.

## Self-check before presenting

- **Swap test** — swap the typeface for the usual one and the layout for a standard
  template. Would anything feel different? Where swapping wouldn't matter is where you
  defaulted.
- **Squint test** — blur your eyes. Hierarchy still readable? Nothing jumping out harshly?
- **Signature test** — point to five specific places the signature appears. "The overall
  feel" does not count.
- **Token test** — read the CSS variable names aloud. Do they belong to this site, or to
  any project?
- **Name-removal test** — remove Shourya's name and the project names. Could a reader still
  tell what kind of engineer this is? If not, the design is carrying none of the meaning.
- **Chanel test** — before shipping, look in the mirror and remove one accessory.

Take screenshots and critique your own output as you build. A picture is worth a thousand
tokens.

---

Adapted for this project from Anthropic's official
[frontend-design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
(277k+ installs) and the [Frontend Design plugin](https://claude.com/plugins/frontend-design),
with direction-setting structure from
[Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design).
Content was rephrased for compliance with licensing restrictions.
