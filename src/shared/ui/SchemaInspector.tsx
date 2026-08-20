import { useId, useMemo, useState } from 'react';

import { tokenizeJson, type JsonTokenKind } from '@shared/lib/highlightJson';
import { cn } from '@shared/lib/cn';

/**
 * THE SIGNATURE ELEMENT of this site (.kiro/steering/design-system.md).
 *
 * Reveals the actual configuration object that rendered the section it sits in.
 *
 * WHY THIS IS NOT A GIMMICK. The object shown is the real one — it is
 * `JSON.stringify` of the same value the section consumed, not a hand-written sample
 * that resembles it. Shourya's strongest work is server-driven UI, where interfaces
 * generate themselves from JSON resolved at runtime, and this site genuinely does the
 * same thing: its content lives as typed constants in `src/content/` and the sections
 * render from them. The panel makes that visible instead of claiming it.
 *
 * It also cannot be lifted onto another subject. On a photographer's portfolio,
 * exposing the config behind a section would mean nothing.
 *
 * CONSTRAINTS, all from design-system.md:
 *   - closed by default
 *   - keyboard operable, with aria-expanded and aria-controls
 *   - never the only route to information; every section is fully legible with the
 *     panel shut, so this is strictly additive
 */

/**
 * Token colours use one accent and three ink levels — never several hues.
 * Numbers take the accent because on this site the numbers are the substance: the
 * metrics are what a reader is scanning for.
 */
const TOKEN_CLASS: Record<JsonTokenKind, string> = {
  key: 'text-ink',
  string: 'text-ink-muted',
  number: 'text-stamp',
  boolean: 'text-stamp',
  null: 'text-ink-faint',
  syntax: 'text-ink-faint',
};

export interface SchemaInspectorProps {
  /** The object this section rendered from. Shown verbatim. */
  data: unknown;
  /** What the object is, e.g. `profile` or `projects[0]`. Shown as the source path. */
  sourcePath: string;
  className?: string;
}

export function SchemaInspector({ data, sourcePath, className }: SchemaInspectorProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  /**
   * Serialised lazily and then memoised. Stringifying a large object on every render
   * of a closed panel would be wasted work, and the panel starts closed by design.
   * `open` is a dependency so the cost is paid on first expand, not on mount.
   */
  const tokens = useMemo(() => {
    if (!open) {
      return null;
    }
    return tokenizeJson(JSON.stringify(data, null, 2));
  }, [open, data]);

  return (
    <div className={cn('mt-8', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((wasOpen) => !wasOpen);
        }}
        className={cn(
          'text-ink-muted hover:text-ink inline-flex items-center gap-2',
          'text-caption font-mono tracking-[0.14em] uppercase',
          'rounded-control min-h-11 px-1',
          'transition-colors duration-150 ease-[var(--ease-out-quint)]',
        )}
      >
        {/* A rotating caret would need a transition on `rotate`, which Tailwind v4
            emits as a standalone property — easy to get wrong. Two glyphs is simpler
            and reads unambiguously. */}
        <span aria-hidden="true" className="text-stamp">
          {open ? '\u2212' : '+'}
        </span>
        {open ? 'Hide schema' : 'Inspect schema'}
      </button>

      {open && tokens !== null ? (
        <div id={panelId} className="border-rule bg-leaf-sunk rounded-card mt-3 border">
          <p className="border-rule text-ink-faint text-caption border-b px-4 py-2 font-mono">
            {sourcePath}
          </p>
          {/* Horizontal scroll rather than wrapping: wrapped JSON loses its
              indentation, which is the only thing making the structure readable.
              max-h keeps a long object from swallowing the page. */}
          <pre className="text-caption max-h-80 overflow-auto px-4 py-3 leading-relaxed">
            <code className="font-mono">
              {tokens.map((token, index) => (
                <span
                  // Tokens have no stable identity and the list is immutable for a
                  // given object, so the index is a legitimate key here.
                  key={`${String(index)}-${token.kind}`}
                  className={TOKEN_CLASS[token.kind]}
                >
                  {token.value}
                </span>
              ))}
            </code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}
