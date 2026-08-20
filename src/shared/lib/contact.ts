/**
 * Assembles contact details that ship base64-encoded.
 *
 * WHY THIS EXISTS. Shourya's email and phone number are published deliberately, but
 * putting them as plain text in the served HTML invites bulk harvesting — most
 * address scrapers fetch markup and regex it without executing JavaScript. Encoding
 * the value and decoding it in the browser removes the site from that easy path.
 *
 * WHAT THIS IS NOT. This is not security or privacy protection and must not be
 * described as such. Base64 is trivially reversible, and anything driving a real
 * browser engine reads the value immediately. It reduces spam volume from low-effort
 * crawlers, nothing more. The trade-off is recorded in .kiro/steering/content.md.
 */

/**
 * The shape this module operates on, declared locally on purpose.
 *
 * `ObfuscatedContact` in `content/types.ts` is the canonical content type, but
 * `shared/` must not import from `content/` — dependencies flow one way (see
 * .kiro/steering/structure.md, enforced by no-restricted-imports in eslint.config).
 * Structural typing means the content constants satisfy this without a link between
 * the layers. This is a function's parameter contract, not duplicated data.
 */
export interface EncodedContact {
  readonly encoded: string;
  readonly placeholder: string;
}

export function revealContact(contact: EncodedContact): string {
  try {
    // `atob` yields Latin-1. Round-tripping via percent-encoding restores UTF-8, so
    // non-ASCII survives. Today's values are ASCII, but a silently mangled contact
    // detail is a bad way to find out that changed.
    const latin1 = atob(contact.encoded);
    return decodeURIComponent(
      Array.from(
        latin1,
        (char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`,
      ).join(''),
    );
  } catch {
    // A malformed value must not break the page. The placeholder is already
    // user-facing copy rather than a raw token.
    return contact.placeholder;
  }
}

/** `mailto:` href for an encoded email address. */
export function mailtoHref(contact: EncodedContact): string {
  return `mailto:${revealContact(contact)}`;
}

/**
 * `tel:` href for an encoded phone number.
 *
 * The stored value carries display spacing (`+91 97178 38216`). `tel:` needs a dial
 * string, so everything but digits and a leading `+` is stripped to give E.164.
 * Deriving it here keeps the number stored once, rather than in two encodings that
 * could drift apart.
 */
export function telHref(contact: EncodedContact): string {
  const dialable = revealContact(contact).replace(/[^\d+]/g, '');
  return `tel:${dialable}`;
}
