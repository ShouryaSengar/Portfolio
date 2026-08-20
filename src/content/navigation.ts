/**
 * Site navigation.
 *
 * Single source of truth for both the header links and the section ids they target.
 * Defining them together means a renamed section cannot silently leave a dead anchor
 * in the nav — the `SectionId` union below is derived from this list, so section
 * components can be typed to accept only a real id.
 */

export interface NavItem {
  readonly id: string;
  readonly label: string;
}

/**
 * An entry belongs here only once the section it points at exists. A nav link to an
 * unbuilt section is a dead anchor, and a dead anchor is invisible until someone clicks
 * it — `scripts/verify-nav.mjs` fails the check to keep that honest. Contact was held
 * out until its section landed, which is why the check passed at every commit.
 */
export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const satisfies readonly NavItem[];

/** Only ids that actually exist in the nav. A typo fails compilation. */
export type SectionId = (typeof navItems)[number]['id'];

/**
 * Ids in document order, computed once at module load.
 *
 * Stable identity matters: this is passed to `useActiveSection` as an effect
 * dependency, and rebuilding the array per render would tear down and re-create the
 * IntersectionObserver on every commit.
 */
export const sectionIds: readonly SectionId[] = navItems.map((item) => item.id);
