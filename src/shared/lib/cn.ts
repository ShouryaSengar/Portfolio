import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names, resolving Tailwind utility conflicts so the
 * last-declared utility wins.
 *
 * This is the only sanctioned way to compose class strings in this project —
 * hand-concatenating them reintroduces the specificity bugs that
 * .kiro/skills/frontend-design-direction warns about.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
