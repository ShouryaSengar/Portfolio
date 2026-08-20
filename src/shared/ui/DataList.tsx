import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * The key/value motif — label left, value right, rule between. This is the
 * recurring layout device of the Ledger direction (design-system.md, "Layout").
 *
 * Renders a real <dl> with <dt>/<dd> pairs, not styled divs. A screen reader
 * announces this as a description list with N items and pairs each term with its
 * definition; a stack of divs announces as unrelated text. Wrapping each pair in
 * a single <div> inside a <dl> is explicitly valid HTML, which is what makes the
 * per-row rule possible without breaking semantics.
 *
 *   <DataList>
 *     <DataRow label="Stack" value="React Native, Expo" />
 *     <DataRow label="Daily active users" value="100,000+" numeric />
 *   </DataList>
 *
 * DataRow takes `label` and `value` as props rather than children. This is the
 * one place configuration genuinely beats composition: the dt/dd pairing IS the
 * component's contract, and exposing it as children would let a call site emit
 * invalid list markup.
 */
const dataList = cva(
  // Strip the trailing rule: the last row ends the list, so a rule there would
  // divide nothing — and design-system.md says such a rule gets deleted.
  '[&>*:last-child]:border-b-0',
  {
    variants: {
      density: {
        tight: '[&>*]:py-2',
        default: '[&>*]:py-3',
        loose: '[&>*]:py-4',
      },
    },
    defaultVariants: {
      density: 'default',
    },
  },
);

export type DataListProps = ComponentPropsWithRef<'dl'> & VariantProps<typeof dataList>;

export function DataList({ className, density, ...props }: DataListProps) {
  return <dl className={cn(dataList({ density }), className)} {...props} />;
}

export interface DataRowProps {
  label: ReactNode;
  value: ReactNode;
  /**
   * Applies `tabular-nums`. Set this for any value containing digits that vary
   * between rows — without it, differing digit widths make the column edge
   * visibly ragged (.kiro/skills/ui-polish).
   */
  numeric?: boolean;
  className?: string;
}

export function DataRow({ label, value, numeric = false, className }: DataRowProps) {
  return (
    <div
      className={cn(
        'border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b',
        className,
      )}
    >
      <dt className="text-ink-muted text-sm">{label}</dt>
      <dd
        className={cn(
          'text-ink ml-auto text-right text-sm font-medium',
          numeric && 'tabular-nums',
        )}
      >
        {value}
      </dd>
    </div>
  );
}
