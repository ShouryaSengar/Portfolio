---
inclusion: always
---

# Project Structure

Feature-sliced. Grouped by domain, not by file type. Full rationale and the component
patterns that go with it are in the `react-architecture` skill.

```
Portfolio/
├── public/
│   ├── fonts/                    # self-hosted woff2 only
│   ├── og/                       # social preview images
│   └── resume.pdf                # single canonical resume path
├── src/
│   ├── app/
│   │   ├── App.tsx               # composition root — sections assembled here
│   │   ├── providers/            # ThemeProvider, MotionProvider
│   │   └── routes.tsx            # only if/when routing is added
│   ├── features/
│   │   ├── hero/
│   │   ├── work/                 # projects / case studies
│   │   ├── craft/                # skills & stack, evidence-based
│   │   ├── experience/
│   │   └── contact/
│   ├── shared/
│   │   ├── ui/                   # Button, Card, Section, Tag, Marquee…
│   │   ├── hooks/                # useMediaQuery, useScrollProgress…
│   │   ├── lib/                  # cn(), formatters — pure, no React
│   │   └── motion/               # easings.ts, variants.ts
│   ├── content/                  # ALL copy and data, typed
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── stack.ts
│   ├── styles/
│   │   └── theme.css             # @theme tokens — the only place values are defined
│   └── main.tsx
├── .kiro/
│   ├── skills/                   # design + engineering skills for this project
│   └── steering/                 # product, tech, structure
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── package.json
```

## Feature folder shape

```
features/work/
├── components/          # only used within this feature
│   ├── ProjectCard.tsx
│   └── ProjectGrid.tsx
├── hooks/
│   └── useProjectFilter.ts
├── types.ts
├── WorkSection.tsx      # the feature's container
└── index.ts             # public surface — the only legal import path
```

## Dependency rules

Enforced by review, and by an ESLint import boundary rule where practical.

- `app/` may import from `features/`, `shared/`, `content/`
- `features/` may import from `shared/`, `content/` — **never from another feature**
- `shared/` may import from `shared/` only — **never from `features/` or `content/`**
- `content/` imports nothing but types
- Cross-feature reuse means the code moves to `shared/`, not that it gets copied

## Content is separate from presentation

Every string, project entry, and job entry lives in `src/content/` as a typed constant.
No copy is hardcoded in JSX.

```ts
// content/projects.ts
export const projects = [
  {
    slug: 'shoekart',
    title: 'ShoeKart',
    role: 'Frontend',
    summary: '...',
    problem: '...',
    decisions: ['...'],
    outcome: '...',
    stack: ['React', 'Tailwind'],
    links: { live: '...', repo: '...' },
    media: { src: '...', alt: '...', width: 1600, height: 1000 },
  },
] as const satisfies readonly Project[];
```

This makes copy edits a one-file change, keeps components genuinely presentational, and
turns a typo in a project title into a compile error. `satisfies` rather than `as`
preserves literal inference.

## Naming

- Components and their files: `PascalCase.tsx`, filename matches the default export
- Hooks: `useCamelCase.ts`
- Everything else: `camelCase.ts`
- One component per file. Small, tightly-coupled subcomponents may share a file if they
  are never used independently.
- Tokens are the only place raw values live. A hex code or arbitrary px in a component
  file is a review failure.

## Migration of the legacy site

- Push the current single-file site to a `legacy` branch before touching `main`.
- `images/` and `images_home/` are not carried over as-is. Any reused asset is
  reprocessed to AVIF/WebP at correct dimensions and moved under `public/` or imported
  through Vite for hashing.
- `Shourya SinghSengar_Resume.pdf` is renamed to `public/resume.pdf` — no spaces in
  deployed asset paths.
- The old `script.js` and `style.css` are deleted, not ported.
