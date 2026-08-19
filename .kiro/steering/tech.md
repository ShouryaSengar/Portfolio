---
inclusion: always
---

# Tech Stack

## Hard constraints

- **No backend.** No server runtime, no database, no API to maintain. Static output only.
- **Free hosting.** Deploys to Vercel (preferred) or GitHub Pages. Must build to plain
  static assets.
- **React + Tailwind are fixed.** Everything else is a choice that must justify its
  bundle cost.
- Pin exact dependency versions. No caret ranges.

## Core

| Concern | Choice | Why |
|---|---|---|
| Framework | **React 19** | Fixed requirement. 19 gives `useOptimistic`, ref-as-prop, and the compiler-friendly patterns. |
| Language | **TypeScript 5.x, `strict: true`** | The site is a code sample. Untyped JS undercuts a senior claim. |
| Build | **Vite 8** | Rolldown-based, fastest static build, zero-config static output. Latest stable is 8.1 (June 2026). |
| Styling | **Tailwind CSS v4** | Fixed requirement. v4 is CSS-first with `@theme`, so tokens live in CSS and there is no JS config to drift. |
| Variants | **class-variance-authority** + **tailwind-merge** | Type-safe component variant APIs, no className conflicts. ~2KB combined. |
| Animation | **Motion 13** (formerly Framer Motion) | The standard: ~3.6M weekly downloads. Use `LazyMotion` + `domAnimation` to cut runtime weight. |
| Icons | **lucide-react** | 1,600+ tree-shakeable line icons, the maintained Feather fork, consistent at 16px. Replaces Font Awesome. |
| Primitives | **Radix UI** (per-component imports only) | Accessible dialog, tooltip, tabs, dropdown. Import only what is used. |
| Routing | **react-router 7** *(only if multi-page)* | See below — v1 may not need it. |
| Lint/format | **ESLint 9 flat config** + **Prettier** + `eslint-plugin-jsx-a11y` | The a11y plugin catches a real class of bug at author time. |
| Deploy | **Vercel** | Zero-config Vite support, preview deploys per branch, free tier, automatic Brotli and immutable asset caching. |

## Why not Next.js

Next is the reflexive answer and it is the wrong one here. There is no backend, no data
fetching, no ISR, no server components doing useful work. Next would add a framework's
worth of concepts and a heavier client runtime to ship what is fundamentally a static
document. Vite + React is faster to build, faster to load, and easier for a reviewer to
read. If a blog with MDX and RSS is added later, revisit.

## State management: probably neither Redux nor Zustand

Be honest about what state exists on a static portfolio: theme, mobile nav open, active
filter, modal open. That is local state and URL state.

**Decision:** start with `useState` and the URL. Add **Zustand** only if a genuine
cross-cutting need appears (a command palette that several sections read from is the
realistic candidate).

Never Redux Toolkit here. It is 12KB+ and a large amount of ceremony for state that does
not exist. Reaching for Redux on a portfolio signals unfamiliarity with sizing a solution,
which is the opposite of the intended message.

Zustand if needed: ~1.2KB, hook-based, no provider, no boilerplate.

## Routing decision

Single-page with scroll sections is the right default — it is what the content wants and
it keeps the bundle minimal. Add `react-router` only when project case studies become
individual pages worth deep-linking and sharing. If that happens, each case study route
is lazy-loaded.

## Optional, only if they earn their place

Do not install these speculatively. Each needs a named reason.

| Library | Use case | Cost |
|---|---|---|
| `@studio-freight/lenis` | Smooth scroll | ~3KB. Only if smooth scroll is part of the design direction, and it must be disabled under reduced-motion. |
| `react-three-fiber` + `drei` | A 3D hero signature | 150KB+. Must be lazy-loaded behind an intersection observer with a static poster fallback. High risk to the LCP budget. |
| `shiki` | Syntax-highlighted code in case studies | Build-time only — highlight at build, ship HTML, zero runtime cost. Never `prism-react-renderer` at runtime. |
| `cmdk` | Command palette (a strong signature for an engineer's site) | ~5KB. Genuinely on-brand for the audience. |
| `@formspree/react` or Web3Forms | Working contact form with no backend | ~2KB. Free tier. The alternative is direct `mailto:` and social links. |
| `react-wrap-balancer` | Heading balance | Not needed — `text-wrap: balance` is natively supported. Skip. |

## Explicitly rejected

- **jQuery, Owl Carousel, Typed.js, particles.js, Waypoints** — the entire current stack.
- **Font Awesome** — heavier and less consistent than Lucide.
- **GSAP** — powerful, but Motion covers everything needed here and integrates with React
  properly.
- **AOS / animate-on-scroll** — Motion's `whileInView` does this with no extra dependency.
- **styled-components / Emotion** — runtime CSS-in-JS conflicts with Tailwind and costs
  render performance.
- **Any UI kit shipped whole** (MUI, Chakra, Ant) — a portfolio built from someone else's
  components is not a design portfolio. Compose Radix primitives instead.
- **Third-party analytics scripts** — zero third-party JS is a stated budget.

## Commands

```bash
npm install
npm run dev            # Vite dev server
npm run build          # production build to dist/
npm run preview        # serve the real build — always check here, not dev
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run format         # prettier --write
```

Run `npm run typecheck && npm run lint && npm run build` before declaring any task done.
A passing dev server is not evidence the build works.

## Budgets

These are enforced, not aspirational. Full detail in the `web-performance` skill.

- Lighthouse mobile Performance ≥ 95, Accessibility 100
- LCP < 1.8s, INP < 150ms, CLS < 0.05
- Initial JS < 120KB gzipped
- Total page weight < 800KB
- Zero third-party scripts
- Max 2 font families, 3 weights total

## Deployment

- Vercel, connected to the `main` branch of `github.com/ShouryaSengar/Portfolio`.
- Preview deploy on every branch; verify Lighthouse on the preview URL before merging.
- GitHub Pages is the fallback. It requires `base` set in `vite.config.ts` and a
  `404.html` copy of `index.html` if client-side routing is ever added.
- The existing single-file site should be preserved on a `legacy` branch before `main` is
  overwritten.
