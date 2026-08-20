import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * A small mono label — tech stack entries, platform markers, status.
 *
 * Renders a <span>, so it composes anywhere: standalone, or inside an <li>.
 *
 * There is deliberately no TagList component. For a set of tags, write the
 * semantics explicitly at the call site:
 *
 *   <ul className="flex flex-wrap gap-2">
 *     <li><Tag>React Native</Tag></li>
 *     <li><Tag>Expo</Tag></li>
 *   </ul>
 *
 * A list of things should be a list. Hiding the <ul>/<li> inside a wrapper that
 * maps over children is more code, more magic, and worse semantics. Per
 * .kiro/skills/react-architecture, extract on the second real reuse — if Phase 5
 * shows this repeating with identical markup, revisit then.
 *
 * Radius is `--radius-control` (3px), not the card radius. Large radius on small
 * elements is banned in design-system.md.
 */
const tag = cva(
  [
    'inline-flex items-center rounded-control border',
    'font-mono text-caption whitespace-nowrap',
    'px-2 py-1',
  ],
  {
    variants: {
      tone: {
        /* Default: quiet, structural. Most tags are this. */
        default: 'border-rule bg-leaf-sunk text-ink-muted',
        /* Outline only — for dense groups where filled tags would read as noise. */
        outline: 'border-rule bg-transparent text-ink-muted',
        /* The accent. Reserve for genuine emphasis: "Live", "Production".
           One accent, used sparingly — see design-system.md. */
        accent: 'border-stamp bg-transparent text-stamp',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
);

export type TagProps = ComponentPropsWithRef<'span'> & VariantProps<typeof tag>;

export function Tag({ className, tone, ...props }: TagProps) {
  return <span className={cn(tag({ tone }), className)} {...props} />;
}
