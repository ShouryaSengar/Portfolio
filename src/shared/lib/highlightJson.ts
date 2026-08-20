/**
 * A minimal JSON tokenizer for the schema inspector.
 *
 * WHY HAND-ROLLED. The alternative is a syntax-highlighting library, and
 * .kiro/skills/web-performance is explicit that highlighting must happen at build time
 * or not at all — shipping a runtime highlighter to colour one panel would cost more
 * than everything else on the page combined. JSON has five token kinds worth
 * distinguishing, which is about thirty lines of regex. No dependency, no runtime cost
 * beyond the string scan itself.
 *
 * Not a validator and not a parser. It assumes well-formed input, which is guaranteed
 * because the input always comes from `JSON.stringify`.
 */

export type JsonTokenKind = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'syntax';

export interface JsonToken {
  readonly kind: JsonTokenKind;
  readonly value: string;
}

/**
 * Ordering matters. The key branch must come first: a key and a string value are
 * lexically identical, and only the following colon tells them apart. The lookahead
 * checks for it without consuming it, so the colon still falls through to `syntax`.
 */
const TOKEN_PATTERN =
  /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false)\b|\b(null)\b/g;

export function tokenizeJson(json: string): readonly JsonToken[] {
  const tokens: JsonToken[] = [];
  let lastIndex = 0;

  // `exec` in a loop rather than `matchAll`, because the gaps between matches are
  // themselves meaningful — they carry the braces, commas, colons and indentation.
  let match: RegExpExecArray | null;
  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(json)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: 'syntax', value: json.slice(lastIndex, match.index) });
    }

    const [raw, key, string, number, boolean, nullish] = match;

    if (key !== undefined) {
      tokens.push({ kind: 'key', value: key });
    } else if (string !== undefined) {
      tokens.push({ kind: 'string', value: string });
    } else if (number !== undefined) {
      tokens.push({ kind: 'number', value: number });
    } else if (boolean !== undefined) {
      tokens.push({ kind: 'boolean', value: boolean });
    } else if (nullish !== undefined) {
      tokens.push({ kind: 'null', value: nullish });
    }

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < json.length) {
    tokens.push({ kind: 'syntax', value: json.slice(lastIndex) });
  }

  return tokens;
}
