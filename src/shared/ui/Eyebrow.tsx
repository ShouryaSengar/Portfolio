import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * The small mono, uppercase, letter-spaced label that sits above a heading or
 * marks a field — the recurring "form label" voice of the Ledger direction.
 *
 * Renders a <p> by default. Two things to be careful about at the call site:
 *
 * 1. An eyebrow is NOT a heading. It has no heading semantics and must not be
 *    used as one, or the document outline breaks. Pair it with a real h2/h3.
 * 2. Uppercase is applied with `text-transform`, so the accessible name stays
 *    the sentence-case text you wrote. Do not type SHOUTING text into it —
 *    screen readers may spell out all-caps words letter by letter.
 *
 * Tracking is wide because uppercase mono at 11px needs it to stay legible.
 */
const eyebrow = cva('font-mono text-caption uppercase', {
  variants: {
    tone: {
      /* Default. Quiet, structural — passes AA at this size (5.20:1). */
      faint: 'text-ink-faint',
      muted: 'text-ink-muted',
      accent: 'text-stamp',
    },
    tracking: {
      /* 0.18em — measured by eye against Archivo's mono companion at 11px. */
      default: 'tracking-[0.18em]',
      tight: 'tracking-[0.08em]',
    },
  },
  defaultVariants: {
    tone: 'faint',
    tracking: 'default',
  },
});

export type EyebrowProps = ComponentPropsWithRef<'p'> & VariantProps<typeof eyebrow>;

export function Eyebrow({ className, tone, tracking, ...props }: EyebrowProps) {
  return <p className={cn(eyebrow({ tone, tracking }), className)} {...props} />;
}
