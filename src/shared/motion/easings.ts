/**
 * Shared easing curves for the Ledger direction.
 *
 * All motion on this site uses a single custom ease-out with a strong initial
 * acceleration and a long, gentle deceleration. This gives movement a decisive
 * start and a calm landing — consistent with the restrained aesthetic.
 *
 * The motion-craft skill specifies `cubic-bezier(0.23, 1, 0.32, 1)` as the
 * primary ease-out. No ease-in or spring animations are used.
 */

/** Primary ease-out for all transitions. */
export const easeOutQuint: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Slightly faster ease for micro-interactions (button presses, toggles). */
export const easeOutMicro: [number, number, number, number] = [0.25, 1, 0.5, 1];
