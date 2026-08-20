/**
 * Verifies the JSON tokenizer against real content.
 *
 *   node scripts/verify-highlight.mjs
 *
 * Two properties matter and neither is obvious from reading the regex:
 *   1. Lossless — concatenating every token value must reproduce the input exactly.
 *      A tokenizer that drops or duplicates a character corrupts the panel silently.
 *   2. Keys and string values are distinguished, since they are lexically identical
 *      and only the following colon separates them.
 */

// Mirror of src/shared/lib/highlightJson.ts. Duplicated rather than imported because
// this script runs on raw node with no TypeScript step.
const TOKEN_PATTERN =
  /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false)\b|\b(null)\b/g;

function tokenizeJson(json) {
  const tokens = [];
  let lastIndex = 0;
  let match;
  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(json)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: 'syntax', value: json.slice(lastIndex, match.index) });
    }
    const [raw, key, string, number, boolean, nullish] = match;
    if (key !== undefined) tokens.push({ kind: 'key', value: key });
    else if (string !== undefined) tokens.push({ kind: 'string', value: string });
    else if (number !== undefined) tokens.push({ kind: 'number', value: number });
    else if (boolean !== undefined) tokens.push({ kind: 'boolean', value: boolean });
    else if (nullish !== undefined) tokens.push({ kind: 'null', value: nullish });
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < json.length) {
    tokens.push({ kind: 'syntax', value: json.slice(lastIndex) });
  }
  return tokens;
}

let failures = 0;

// A sample shaped like the real content: nested objects, arrays, numbers, booleans,
// null, an escaped quote, and a colon inside a string value (the classic false
// positive for naive key detection).
const sample = {
  name: 'Shourya Singh Sengar',
  openToRemote: true,
  missing: null,
  count: 100000,
  ratio: 1.414,
  tricky: 'a string with a colon: not a key',
  escaped: 'he said "hello"',
  nested: { items: ['react', 'typescript'], depth: 2 },
};

const json = JSON.stringify(sample, null, 2);
const tokens = tokenizeJson(json);

const rebuilt = tokens.map((t) => t.value).join('');
const lossless = rebuilt === json;
console.log(`lossless round-trip     : ${lossless ? 'yes' : 'NO'}`);
if (!lossless) failures++;

const byKind = tokens.reduce((acc, t) => {
  acc[t.kind] = (acc[t.kind] ?? 0) + 1;
  return acc;
}, {});
console.log('token counts            :', JSON.stringify(byKind));

const keys = tokens.filter((t) => t.kind === 'key').map((t) => JSON.parse(t.value));
const expectedKeys = [
  'name',
  'openToRemote',
  'missing',
  'count',
  'ratio',
  'tricky',
  'escaped',
  'nested',
  'items',
  'depth',
];
const keysMatch = expectedKeys.every((k) => keys.includes(k));
console.log(`all keys detected       : ${keysMatch ? 'yes' : 'NO'}`);
if (!keysMatch) {
  console.log('  expected:', expectedKeys.join(', '));
  console.log('  detected:', keys.join(', '));
  failures++;
}

// The colon-inside-a-string case must be a string, never a key.
const trickyIsString = tokens.some(
  (t) => t.kind === 'string' && t.value.includes('not a key'),
);
console.log(`colon in string value   : ${trickyIsString ? 'string (correct)' : 'MISCLASSIFIED'}`);
if (!trickyIsString) failures++;

// Booleans and null must not be swallowed as syntax.
const hasBoolean = tokens.some((t) => t.kind === 'boolean');
const hasNull = tokens.some((t) => t.kind === 'null');
console.log(`boolean / null detected : ${hasBoolean && hasNull ? 'yes' : 'NO'}`);
if (!(hasBoolean && hasNull)) failures++;

console.log('');
console.log(failures === 0 ? 'PASS' : `FAIL: ${failures} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
