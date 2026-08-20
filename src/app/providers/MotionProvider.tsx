import { LazyMotion, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Motion provider using LazyMotion with the `domAnimation` feature set.
 *
 * `domAnimation` includes layout animations, spring physics, and exit animations
 * but NOT the heavier `domMax` features (SVG path morphing, drag). This keeps the
 * motion bundle ~17KB instead of ~34KB.
 *
 * `strict` ensures every animated component under this tree uses `m.*` (the lazy
 * variant) rather than `motion.*`, which would pull in the full bundle and defeat
 * the purpose of LazyMotion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
