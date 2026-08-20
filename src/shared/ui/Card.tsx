import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * A bounded surface on the ledger.
 *
 * Depth is borders-only — no shadows, ever. On a paper direction a drop shadow
 * breaks the metaphor, and mixing depth strategies is the most common cause of
 * "looks off but I can't say why" (design-system.md, "Depth strategy").
 *
 * CONCENTRIC RADIUS. The rule is `outer = inner + padding`. This card is 5px with
 * 20px of padding, so anything nested directly inside it should have radius 0 —
 * not another 5px. Matching the parent's radius on a child is the single most
 * common detail that makes UI feel subtly wrong. Sharp inner corners are correct
 * here and consistent with "paper has edges, not pillows".
 *
 * Card is presentational and renders a <div>. It is deliberately NOT clickable:
 * the project cards this exists for carry several links each (live site, Play
 * Store, App Store), so a card-as-single-link would be wrong. Use `interactive`
 * only for hover/focus affordance around real focusable children.
 */
const card = cva('rounded-card border', {
  variants: {
    surface: {
      /* Raised one step above the canvas. The default. */
      raised: 'border-rule bg-leaf',
      /* Inset — receives content. Used for the schema panel and inputs.
         Inset surfaces are DARKER than their surroundings, not lighter. */
      sunk: 'border-rule bg-leaf-sunk',
      /* Outline only, canvas shows through. */
      bare: 'border-rule bg-transparent',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6 md:p-8',
    },
    interactive: {
      /* `focus-within` matters as much as `hover` here: without it, keyboard
         users get no equivalent of the mouse affordance. */
      true: [
        'transition-colors duration-150 ease-[var(--ease-out-quint)]',
        'hover:border-rule-strong focus-within:border-ink',
      ],
      false: '',
    },
  },
  defaultVariants: {
    surface: 'raised',
    padding: 'md',
    interactive: false,
  },
});

export type CardProps = ComponentPropsWithRef<'div'> & VariantProps<typeof card>;

export function Card({ className, surface, padding, interactive, ...props }: CardProps) {
  return (
    <div className={cn(card({ surface, padding, interactive }), className)} {...props} />
  );
}
