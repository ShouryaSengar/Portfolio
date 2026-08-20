import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * A page section: owns container width, horizontal gutter, and vertical rhythm.
 *
 * Width and reading measure are separate concerns. This component supplies the
 * *container*; paragraphs inside it are constrained separately with
 * `max-w-prose`. Never pass a prose measure here — see
 * .kiro/steering/design-system.md "Container widths".
 */
const section = cva(
  // Gutter grows with the viewport rather than letting content stretch to fill.
  'mx-auto w-full px-6 md:px-10 lg:px-16',
  {
    variants: {
      /**
       * Only two options, deliberately.
       *
       * This layout centres every shell with `mx-auto`, so a NARROWER shell shifts both
       * edges inward — a 960px section inside a 1200px page starts 120px further right
       * than its neighbours. That breaks the left edge, which is the axis a reader
       * tracks down the page, and it reads as a mistake rather than a decision.
       *
       * `feature` and `page` were offered here and immediately caused exactly that:
       * the experience section looked misaligned against every other section. Removing
       * them makes the error impossible instead of merely documented.
       *
       * To make a section feel narrower, constrain its CONTENT with a prose measure or a
       * narrower inner column. Those are left-aligned inside the shell, so the edge stays
       * put. That is the layout-width versus reading-measure distinction in
       * .kiro/steering/design-system.md.
       *
       * (Utility names are omitted from this comment on purpose — Tailwind scans raw
       * text, so naming one here would emit it into the stylesheet unused.)
       */
      width: {
        content: 'max-w-content', // 1200 — the shell width for every section
        full: 'max-w-none', // opt out for genuine full-bleed; caller owns width
      },
      /* Vertical rhythm. Desktop values track the 96–160px section rhythm in
         design-system.md; mobile steps down so sections do not feel stranded. */
      rhythm: {
        none: '',
        tight: 'py-12 md:py-16', // 48 → 64
        section: 'py-16 md:py-24', // 64 → 96
        major: 'py-24 md:py-40', // 96 → 160
      },
    },
    defaultVariants: {
      width: 'content',
      rhythm: 'section',
    },
  },
);

/**
 * A landmark region needs an accessible name, so one of `aria-labelledby` or
 * `aria-label` is required at the type level rather than left to review.
 * See .kiro/skills/a11y-audit "Landmarks and headings".
 */
type AccessibleName =
  | { 'aria-labelledby': string; 'aria-label'?: never }
  | { 'aria-label': string; 'aria-labelledby'?: never };

export type SectionProps = Omit<
  ComponentPropsWithRef<'section'>,
  'aria-label' | 'aria-labelledby'
> &
  VariantProps<typeof section> &
  AccessibleName;

export function Section({ className, width, rhythm, ...props }: SectionProps) {
  return <section className={cn(section({ width, rhythm }), className)} {...props} />;
}
