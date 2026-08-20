import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

import { cn } from '@shared/lib/cn';
import { fadeOnly, fadeUp, staggerContainer } from '@shared/motion';

/**
 * A scroll-reveal wrapper using Motion's `whileInView`.
 *
 * Fades children up 24px and into full opacity as they enter the viewport.
 * When `prefers-reduced-motion` is active, only opacity transitions —
 * no vertical movement.
 *
 * `viewport.once` is always true: elements reveal once and stay visible.
 * Repeated animations on scroll would contradict the Ledger direction.
 */
export interface ScrollRevealProps {
  /** Whether this container should stagger its children (requires children to use variants). */
  stagger?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ScrollReveal({
  className,
  stagger = false,
  children,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = prefersReducedMotion ? fadeOnly : fadeUp;
  const containerVariants = stagger ? staggerContainer : itemVariants;

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15% 0px' }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}

/**
 * A child item that participates in a staggered reveal.
 * Must be inside a `<ScrollReveal stagger>` parent.
 */
export interface ScrollRevealItemProps {
  className?: string;
  children?: ReactNode;
}

export function ScrollRevealItem({ className, children }: ScrollRevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? fadeOnly : fadeUp;

  return (
    <m.div variants={variants} className={cn(className)}>
      {children}
    </m.div>
  );
}
