import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@shared/lib/cn';

/**
 * A stand-in for an asset that does not exist yet.
 *
 * The point of this component is that it CANNOT be mistaken for finished work. It
 * states what belongs there and at what size, so a placeholder that survives to
 * production is embarrassing rather than invisible. Every instance is tracked in
 * `src/content/assets.ts` and audited by `scripts/verify-assets.mjs`, which Phase 8
 * runs in strict mode to block the release.
 *
 * It reserves the exact final geometry via `aspect-ratio`, so dropping the real asset
 * in later causes no layout shift and no CLS regression. That is the whole reason to
 * use this rather than leaving a gap.
 */
const placeholder = cva(
  [
    'relative flex w-full items-center justify-center overflow-hidden',
    'border-rule bg-leaf-sunk border border-dashed',
    'rounded-card',
  ],
  {
    variants: {
      tone: {
        /* Default. Quiet enough to review layout around it. */
        quiet: '',
        /* For assets on the critical path — the accent makes them impossible to
           scroll past without noticing. */
        loud: 'border-stamp',
      },
    },
    defaultVariants: { tone: 'quiet' },
  },
);

export interface PlaceholderProps extends VariantProps<typeof placeholder> {
  /** What the final asset is, e.g. "Portrait" or "mRec pipeline diagram". */
  label: string;
  /** Final aspect ratio as `width / height`. Must match the real asset. */
  ratio: number;
  /** Optional note, e.g. intended dimensions or source. */
  note?: string;
  className?: string;
}

export function Placeholder({ label, ratio, note, tone, className }: PlaceholderProps) {
  return (
    <div
      className={cn(placeholder({ tone }), className)}
      style={{ aspectRatio: String(ratio) }}
      /* Announced, not hidden. A reviewer using a screen reader should also be able
         to tell that this is unfinished. */
      role="img"
      aria-label={`Placeholder: ${label}${note ? `. ${note}` : ''}`}
    >
      <div className="px-4 text-center">
        <p className="text-ink-muted text-caption font-mono tracking-[0.18em] uppercase">
          Placeholder
        </p>
        <p className="text-ink mt-1 text-sm">{label}</p>
        {note ? <p className="text-ink-faint text-caption mt-1">{note}</p> : null}
      </div>
    </div>
  );
}
