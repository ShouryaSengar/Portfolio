/**
 * PHASE 2 TOKEN SPECIMEN — not final UI.
 *
 * This renders the Direction A token system so it can be inspected in a browser:
 * both Archivo width axes, the four ink levels, the surface ladder, the ruling
 * grid, and the accent. It is a specimen sheet, not a design.
 *
 * Sections replace this entirely from Phase 5. Delete the body then.
 */

const inkLevels = [
  { token: '--color-ink', label: 'ink', use: 'primary text', cls: 'text-ink' },
  {
    token: '--color-ink-muted',
    label: 'ink-muted',
    use: 'supporting copy',
    cls: 'text-ink-muted',
  },
  {
    token: '--color-ink-faint',
    label: 'ink-faint',
    use: 'metadata, large text only',
    cls: 'text-ink-faint',
  },
] as const;

const surfaces = [
  { token: '--color-ledger', label: 'ledger', use: 'canvas', cls: 'bg-ledger' },
  { token: '--color-leaf', label: 'leaf', use: 'raised', cls: 'bg-leaf' },
  { token: '--color-leaf-sunk', label: 'leaf-sunk', use: 'inset', cls: 'bg-leaf-sunk' },
] as const;

export function App() {
  return (
    // Shell takes a CONTAINER width, never a prose measure. Gutter grows with
    // the viewport instead of letting content stretch to fill it.
    <main className="mx-auto max-w-content px-6 py-16 md:px-10 lg:px-16">
      <p className="text-ink-faint font-mono text-[length:var(--text-caption)] tracking-[0.18em] uppercase">
        Phase 2 — token specimen
      </p>

      {/* Display role: condensed width, heavy weight. */}
      <h1 className="text-ink mt-3 text-[length:var(--text-display)]">Ledger</h1>

      {/* Prose alone is measure-constrained — this is a legibility rule, not layout. */}
      <p className="text-ink-muted mt-4 max-w-prose">
        Archivo Variable at two widths, IBM Plex Mono for data, and the greenbar palette.
        Rules are functional: each one below marks a real boundary. The shell is 1200px;
        this paragraph is capped at 68 characters for reading comfort.
      </p>

      <hr className="mt-10" />

      {/* Key/value alignment — the recurring layout motif. */}
      <section className="mt-8" aria-labelledby="ink-heading">
        <h2 id="ink-heading" className="text-ink text-[length:var(--text-xl)]">
          Ink levels
        </h2>
        <dl className="mt-4">
          {inkLevels.map(({ token, label, use, cls }) => (
            <div
              key={token}
              className="border-rule flex items-baseline justify-between gap-4 border-b py-3"
            >
              <dt className={`${cls} font-mono text-[length:var(--text-sm)]`}>{label}</dt>
              <dd className="text-ink-faint text-[length:var(--text-sm)]">{use}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="surface-heading">
        <h2 id="surface-heading" className="text-ink text-[length:var(--text-xl)]">
          Surface ladder
        </h2>
        {/* Uses the full container width — demonstrates that sections vary
            deliberately rather than all sitting at one measure. */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {surfaces.map(({ token, label, use, cls }) => (
            <div
              key={token}
              className={`${cls} border-rule rounded-[var(--radius-card)] border p-4`}
            >
              <p className="text-ink font-mono text-[length:var(--text-sm)]">{label}</p>
              <p className="text-ink-faint mt-1 text-[length:var(--text-caption)]">
                {use}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="accent-heading">
        <h2 id="accent-heading" className="text-ink text-[length:var(--text-xl)]">
          Accent and numerals
        </h2>
        <div className="border-rule mt-4 flex flex-wrap items-baseline gap-6 border-t pt-4">
          <p className="text-stamp font-mono text-[length:var(--text-sm)]">stamp</p>
          <a href="#accent-heading" className="text-[length:var(--text-sm)] underline">
            carbon link
          </a>
          {/* tabular-nums applies via the `tabular` selector in theme.css */}
          <p className="tabular text-ink text-[length:var(--text-2xl)] font-semibold">
            100,000+
          </p>
          <p className="text-ink-faint text-[length:var(--text-caption)]">
            daily active users
          </p>
        </div>
      </section>
    </main>
  );
}
