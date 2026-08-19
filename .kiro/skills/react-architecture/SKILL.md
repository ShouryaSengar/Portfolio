---
name: react-architecture
description: Clean-code architecture and design patterns for React applications. Use when creating components, structuring folders, deciding where state lives, extracting hooks, or reviewing React code for maintainability. Enforces feature-sliced structure, composition over configuration, container/presentational separation, and strict rules about prop drilling, effects, and re-render cost.
---

# React Architecture

The code in this project is a work sample. Someone will read it. Structure it so a senior
engineer skimming the repo can tell within two minutes where anything lives and why.

## Folder structure: feature-sliced, not type-sliced

Group by domain, not by file kind. `components/`, `hooks/`, `utils/` at the top level stops
scaling the moment there are more than twenty files.

```
src/
├── app/                     # composition root
│   ├── App.tsx
│   ├── providers/           # theme, motion, router providers
│   └── routes.tsx
├── features/                # one folder per section of the site
│   └── projects/
│       ├── components/      # only used inside this feature
│       ├── hooks/
│       ├── data/            # content as typed constants
│       ├── types.ts
│       └── index.ts         # public surface — the ONLY import path
├── shared/
│   ├── ui/                  # design-system primitives (Button, Card, Section)
│   ├── hooks/               # cross-feature hooks
│   ├── lib/                 # pure helpers, no React
│   └── motion/              # shared variants, easings, transitions
├── styles/
│   └── theme.css            # tokens live here, nowhere else
└── main.tsx
```

Rules that make this hold:

- A feature exports through `index.ts`. Nothing imports from inside another feature's tree.
- `shared/` never imports from `features/`. One direction only.
- If two features need the same thing, it moves to `shared/`. It does not get copied.
- Barrel files only at feature boundaries. Not on every folder — they wreck tree-shaking.

## Component design

**One component, one reason to change.** If you cannot name a component in two words without
"and", it is doing two things.

**Composition over configuration.** A component with eight boolean props is a component that
should have been three components or a compound component.

```tsx
// Configuration — every new variant adds a prop and a branch
<Card hasImage hasFooter isCompact showBadge title="..." />

// Composition — variants come from arrangement, not flags
<Card>
  <Card.Media src={...} />
  <Card.Body>
    <Card.Title>...</Card.Title>
  </Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>
```

**Container / presentational split.** Presentational components take data as props and hold no
data-fetching or business logic. Containers own the wiring. This is what makes UI reviewable
and reusable.

**Variants belong in one place.** Use `class-variance-authority` for variant styling so a
component's visual API is declared once, typed, and impossible to drift.

```tsx
const button = cva('inline-flex items-center justify-center transition-colors', {
  variants: {
    intent: { primary: '...', ghost: '...' },
    size: { sm: '...', md: '...' },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});
```

**Never a `<div onClick>`.** Use `<button>`, `<a>`, `<input>`, `<dialog>`. Native elements ship
focus, keyboard, and semantics for free. For stateful controls that are hard to get right
(dialog, popover, tooltip, tabs, combobox), compose a headless primitive (Radix UI or React
Aria) and style it. "Build custom" means style a primitive, not reimplement keyboard nav.

## State: pick the smallest tool that works

Escalate only when the current level actually breaks:

1. **Local `useState`** — default. Most portfolio state is local.
2. **Lifted state + props** — two or three components deep.
3. **`useReducer`** — several values that change together under named transitions.
4. **Context** — genuinely global and rarely changing: theme, locale, reduced-motion.
   Split contexts by update frequency; one fat context re-renders the whole tree.
5. **Zustand store** — cross-cutting state read in many unrelated places.
6. **URL as state** — filters, active tab, selected project. Shareable and back-button
   correct. Reach for this before a store.

Rules:

- Never duplicate derived state. Compute it. `const visible = items.filter(...)` beats a
  `visibleItems` state that can go stale.
- Server/remote data is not UI state. This site has no backend, so there is no server state
  to model. Content is typed constants, not state.
- Prop drilling past two levels is a smell. Composition (`children`) usually fixes it more
  cleanly than context.

## Effects: the rule most React code gets wrong

`useEffect` is for synchronizing with something outside React. That is all.

- Deriving a value from props or state → compute during render.
- Responding to a user event → do it in the handler.
- Resetting state when a prop changes → change the `key` instead.
- Subscribing to `matchMedia`, an `IntersectionObserver`, or `scroll` → this is a correct
  effect. Always return the cleanup.

Every effect gets a complete dependency array and a cleanup function or a written reason why
neither is needed.

## Custom hooks

Extract a hook when logic is stateful *and* reused, or when a component's body has two
distinct concerns tangled together. Name for what it gives you, not how it works:
`useScrollProgress`, `useReducedMotion`, `useMediaQuery`.

A hook returns data and actions. It does not render. If it touches the DOM, it owns the
cleanup.

## Performance discipline

- Measure before optimizing. `React.memo` on everything is noise and hides real problems.
- Memoize when a prop is an object or function passed to a memoized child, or when a
  computation is genuinely expensive. Not by reflex.
- Never define components inside components. It remounts the subtree every render.
- Stable keys from stable ids. Array index as key is a bug waiting for a reorder.
- Route- and section-level `React.lazy` + `Suspense` for anything heavy (3D, charts).
- Animate `transform` and `opacity` only. See the `motion-craft` skill.

## TypeScript

- `strict: true`. No exceptions.
- No `any`. Use `unknown` and narrow.
- Type props with `interface`, unions for variants. Derive types from data where possible:
  `type Project = (typeof projects)[number]`.
- Prefer `satisfies` over `as` for content constants so you keep literal inference.
- Content files are typed. A typo in a project title becomes a compile error.

## Naming and hygiene

- Components `PascalCase`, hooks `useCamelCase`, constants `SCREAMING_SNAKE`, everything else
  `camelCase`. Files match their default export.
- Booleans read as assertions: `isOpen`, `hasImage`, `canSubmit`.
- Handlers are `handleX` inside a component, `onX` as a prop.
- No commented-out code. No `console.log` in committed code. Git is the history.
- Comments explain *why*. The code already says what.

## Review checklist

Before considering a component done:

- Single responsibility, nameable in two words
- No `any`, no non-null `!` assertions
- No unnecessary effect; every real effect has cleanup and full deps
- Semantic element or headless primitive, never `div onClick`
- All states handled: default, hover, focus-visible, active, disabled, empty, error
- Styling bound to semantic tokens, not raw hex or arbitrary px
- Keyboard reachable and operable; focus visible
- No layout shift on mount or image load

---

Adapted for this project from patterns in
[alirezarezvani/claude-skills senior-frontend](https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/senior-frontend/SKILL.md),
[ChrisWiles react-ui-patterns](https://github.com/ChrisWiles/claude-code-showcase/blob/main/.claude/skills/react-ui-patterns/SKILL.md),
and the React docs' own guidance on
[escaping effects](https://react.dev/learn/you-might-not-need-an-effect).
Content was rephrased for compliance with licensing restrictions.
