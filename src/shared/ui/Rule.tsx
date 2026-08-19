import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * The ruling grid divider — the structural motif of the Ledger direction.
 *
 * Renders `<hr>`, which carries an implicit separator role. That is deliberate:
 * per design-system.md, "a rule that divides nothing gets deleted", so every
 * Rule marks a real boundary and is therefore semantic. If you want decoration,
 * you do not want a Rule — and you probably do not want the decoration either.
 *
 * Rules are blue-green (`--color-rule`), never black. Match the weight to the
 * importance of the boundary, not to taste.
 *
 * Full-bleed: do NOT reach for negative margins to escape a Section's padding
 * (design-system.md bans that as a structural hack). Place the Rule as a sibling
 * of the Section instead, so it is outside the padded container by structure:
 *
 *   <Rule />
 *   <Section aria-labelledby="work">…</Section>
 *   <Rule />
 */
const rule = cva('border-0 border-t', {
  variants: {
    weight: {
      /* Should disappear when you are not looking for it, and be findable when
         you need structure. */
      default: 'border-rule',
      /* Emphasis boundaries only — a major section change. */
      strong: 'border-rule-strong',
    },
    spacing: {
      none: '',
      tight: 'my-4',
      default: 'my-8',
      loose: 'my-12',
    },
  },
  defaultVariants: {
    weight: 'default',
    spacing: 'none',
  },
});

export type RuleProps = ComponentPropsWithRef<'hr'> & VariantProps<typeof rule>;

export function Rule({ className, weight, spacing, ...props }: RuleProps) {
  return <hr className={cn(rule({ weight, spacing }), className)} {...props} />;
}
