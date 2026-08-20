import type { Variants } from 'motion/react';

import { easeOutQuint } from './easings';

/**
 * Shared animation variants.
 *
 * Constraints from design-system.md:
 *   - durations 400–600ms for scroll reveals
 *   - only animate transform (translate/scale) and opacity
 *   - no parallax, no character-by-character text
 *   - `once: true` on all scroll-triggered animations
 *
 * Reduced-motion variants keep opacity transitions but disable transforms.
 */

/** Fade up from 24px below — the standard scroll-reveal entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutQuint },
  },
};

/** Fade in without vertical movement — used when reduced motion is active. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOutQuint },
  },
};

/**
 * Stagger container — orchestrates children with a 100ms stagger.
 * Children must use their own variants (e.g. `fadeUp`).
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Hero-specific stagger — slightly longer delays for the load sequence.
 * Gives the page a deliberate, unhurried entrance.
 */
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

/** Schema panel expand — 200ms as specified (150–250ms range). */
export const panelExpand: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.2, ease: easeOutQuint },
  },
};
