/**
 * Asserts every section shell shares the same width, so the left edge holds down the
 * whole page.
 *
 *   node scripts/verify-alignment.mjs
 *
 * WHY. Shells are centred with `mx-auto`, so a narrower one shifts BOTH edges inward and
 * the section starts further right than its neighbours. The experience section shipped
 * that way and looked broken. Removing `feature` and `page` from Section's variants makes
 * it hard to repeat; this makes it visible if someone reintroduces the option or hand-
 * rolls a shell with a different max-width.
 *
 * Also checks the header and footer wrappers, since they are hand-rolled rather than
 * using Section and would drift silently.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SHELL = 'max-w-content';

function collectTsx(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...collectTsx(path));
    else if (entry.name.endsWith('.tsx')) found.push(path);
  }
  return found;
}

let failures = 0;

// 1. No Section may override width except to opt out entirely.
console.log('Section width overrides:');
let overrides = 0;
for (const file of collectTsx('src')) {
  const source = readFileSync(file, 'utf8');
  for (const [, value] of source.matchAll(/<Section[^>]*?\swidth="([^"]+)"/gs)) {
    overrides++;
    const allowed = value === 'full';
    console.log(`  ${file}  width="${value}"  ${allowed ? '(allowed opt-out)' : 'NOT ALLOWED'}`);
    if (!allowed) failures++;
  }
}
if (overrides === 0) console.log('  none — every section uses the default shell');

// 2. Hand-rolled wrappers must use the same shell token.
console.log('');
console.log('Hand-rolled shells (header, footer):');
for (const file of ['src/features/header/Header.tsx', 'src/features/footer/Footer.tsx']) {
  const source = readFileSync(file, 'utf8');
  const widths = [...source.matchAll(/max-w-([a-z0-9-]+)/g)].map(([, w]) => `max-w-${w}`);
  const wrong = widths.filter((w) => w !== SHELL && w !== 'max-w-prose');
  console.log(`  ${file}  ${widths.length > 0 ? widths.join(', ') : 'none'}`);
  if (wrong.length > 0) {
    console.log(`    unexpected: ${wrong.join(', ')}`);
    failures++;
  }
}

console.log('');
console.log(failures === 0 ? 'PASS' : `FAIL: ${String(failures)} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
