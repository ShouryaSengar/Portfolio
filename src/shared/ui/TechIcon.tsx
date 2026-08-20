import { cn } from '@shared/lib/cn';

import { TECH_ICONS, type TechIconId } from './icons/techIcons';

export interface TechIconProps {
  id: TechIconId;
  className?: string;
}

/**
 * A monochrome technology mark.
 *
 * Rendered in `currentColor`, never in the brand's own colour. Direction A allows one
 * accent, and a grid of multi-coloured logos would dismantle the palette — the marks
 * are here to be recognised at a glance, not to reproduce brand guidelines.
 *
 * `aria-hidden` and `focusable="false"` are deliberate: every use of this sits beside
 * a visible text label, so announcing the icon too would make a screen reader read
 * every technology twice. If it is ever used without an adjacent label, that call site
 * needs its own accessible name — not a change here.
 */
export function TechIcon({ id, className }: TechIconProps) {
  const icon = TECH_ICONS[id];

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-5 shrink-0', className)}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
