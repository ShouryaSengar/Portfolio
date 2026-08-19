import { cn } from '@shared/lib/cn';

/**
 * PHASE 0 SMOKE TEST ONLY.
 *
 * This exists to prove the toolchain renders React, resolves path aliases, and
 * compiles Tailwind v4 tokens. It is not design work and carries no visual
 * direction — that comes from Phase 1.
 *
 * Delete this body entirely when the real sections land.
 */
export function App() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="max-w-prose space-y-4 text-center">
        <p className="text-ink-faint font-mono text-xs tracking-widest uppercase">
          Phase 0 — toolchain verified
        </p>
        <h1 className="text-ink text-3xl font-semibold tracking-tight">
          Scaffold is live
        </h1>
        <p className="text-ink-muted">
          React 19, Vite 8, TypeScript strict, and Tailwind v4 are wired together. Design
          direction and real content have not been built yet.
        </p>
        <p className={cn('text-signal font-mono text-sm')}>
          tokens + path aliases + cn() resolving
        </p>
      </div>
    </main>
  );
}
