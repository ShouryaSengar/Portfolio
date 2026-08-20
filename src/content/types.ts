import type { TechIconId } from '@shared/ui/icons/techIcons';

/**
 * Types for the content layer.
 *
 * Everything is `readonly`: content is authored once in `src/content/*.ts` and never
 * mutated at runtime. The constants are declared with `satisfies` rather than `as`,
 * which checks them against these shapes while preserving literal inference — so a
 * project slug stays the string `'mrec'` rather than widening to `string`.
 *
 * Facts come from .kiro/steering/content.md, which is the source of truth. Nothing
 * in here may be invented, rounded, or embellished.
 */

/* ----------------------------------------------------------------- contact --- */

/**
 * A contact detail that must not appear as plain text in the initial HTML payload.
 *
 * Naive email and phone harvesters read static markup only, so the value ships
 * base64-encoded and is assembled in the browser. This is obfuscation, NOT security —
 * anything that executes JavaScript will still read it. It is a spam-volume measure,
 * accepted deliberately in content.md.
 */
export interface ObfuscatedContact {
  /** Base64 of the real value. */
  readonly encoded: string;
  /** Human-readable stand-in rendered until assembly completes. */
  readonly placeholder: string;
}

/* --------------------------------------------------------------- education --- */

export interface Education {
  readonly institution: string;
  readonly affiliation: string;
  readonly qualification: string;
  readonly field: string;
  readonly result: string;
  readonly location: string;
  readonly start: string;
  readonly end: string;
}

/* ------------------------------------------------------------ achievements --- */

export interface Achievement {
  readonly title: string;
  readonly detail: string;
  /** Omitted where the achievement is not tied to a single year. */
  readonly year?: string;
}

/* ----------------------------------------------------------------- profile --- */

export interface ProfileLinks {
  readonly github: string;
  readonly linkedin: string;
  /** Served from public/ so the URL stays stable and shareable. */
  readonly resume: string;
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly specialisation: string;
  /** One-line positioning. The headline claim of the whole site. */
  readonly headline: string;
  /** Longer professional summary, drawn from the resume. */
  readonly summary: string;
  readonly company: string;
  readonly companyShort: string;
  readonly roleStart: string;
  readonly location: string;
  readonly availability: string;
  readonly openToRemote: boolean;
  readonly email: ObfuscatedContact;
  readonly phone: ObfuscatedContact;
  readonly links: ProfileLinks;
  readonly education: Education;
  readonly achievements: readonly Achievement[];
}

/* ---------------------------------------------------------------- projects --- */

/** A measured result. `value` carries its own unit so it can be rendered verbatim. */
export interface Outcome {
  readonly value: string;
  readonly label: string;
}

/**
 * One thing that was built, with whatever it measurably changed.
 *
 * `outcomes` may legitimately be empty. Not every contribution has a defensible
 * figure attached, and content.md is explicit that a number must not be reused
 * across two contributions to make both look quantified.
 */
export interface Contribution {
  readonly summary: string;
  readonly outcomes: readonly Outcome[];
}

export type Platform = 'iOS' | 'Android' | 'Web';

export type LinkKind = 'web' | 'android' | 'ios' | 'repo';

export interface ProjectLink {
  readonly kind: LinkKind;
  readonly url: string;
  readonly label: string;
  /**
   * True when the URL lands on a sign-in wall. The UI must label these, so a
   * visitor is not sent to what looks like a broken link.
   *
   * Required, not optional, and set explicitly on every link. An optional boolean
   * has three states — true, false, and absent — where only two are meaningful.
   * Worse, under `as const` the links that omitted it had no such key, so the
   * union of link types did not carry the property and consumers could not read it
   * at all. Always present, always a boolean.
   */
  readonly gated: boolean;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly client: string;
  /** Short descriptor — what the product is, in the visitor's terms. */
  readonly tagline: string;
  readonly platforms: readonly Platform[];
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  /** What was hard. Stated before any solution. */
  readonly problem: string;
  /** What was decided, and why it followed from the problem. */
  readonly approach: string;
  readonly contributions: readonly Contribution[];
}

/* ------------------------------------------------------------- experience --- */

export interface Role {
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly start: string;
  /** Absent while the role is current. */
  readonly end?: string;
  readonly clients: readonly string[];
  readonly highlights: readonly string[];
}

/* ------------------------------------------------------------------ stack --- */

/* ------------------------------------------------------------------ stack --- */

/**
 * Capabilities are stated, not rated and not proved.
 *
 * There is no proficiency field and no evidence field. The old site rated skills as
 * percentages, which reads as junior and cannot be defended when someone asks what
 * the number means. An earlier draft swung the other way and tied every skill to the
 * projects that proved it, which turned a simple "here is what I work with" into an
 * argument nobody asked for. The case studies already carry the evidence.
 *
 * Three tiers, because they are genuinely different kinds of thing and flattening
 * them into one grid was the real problem:
 *
 *   1. `ArchitecturePattern` — the differentiator. Concepts, no logos, given room.
 *   2. `TechItem`           — the recognisable stack. Scannable, marked with a logo.
 *   3. plain strings        — everything else, quiet and text-only.
 */

/**
 * An architectural approach. Carries a short note because the name alone means
 * little to a non-technical reader and everything to a technical one.
 */
export interface ArchitecturePattern {
  readonly name: string;
  readonly note: string;
}

/**
 * A technology in the working stack.
 *
 * `icon` is REQUIRED, and that requirement is what separates this tier from the next.
 * A thing belongs here when it has a mark a reader recognises instantly; a thing with
 * no mark belongs in `alsoKnown` as plain text. Making the icon optional blurred that
 * line and left a permanently-dead branch in the view, which the linter flagged.
 *
 * The type is a type-only reference to the generated icon set, so it is erased at
 * build time — content gains no runtime dependency on presentation, but a typo'd icon
 * id fails compilation rather than rendering an empty box.
 */
export interface TechItem {
  readonly name: string;
  readonly icon: TechIconId;
}
