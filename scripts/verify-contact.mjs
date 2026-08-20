/**
 * Asserts no plain-text contact detail reaches any served asset.
 *
 *   node scripts/verify-contact.mjs      (run after a build)
 *
 * This exists because the mechanism has already been defeated once. The client-side
 * assembly in shared/lib/contact worked perfectly while a hardcoded address in the
 * noscript block of index.html shipped the email anyway. The helper being correct is not
 * the same as the site being correct, so this checks the OUTPUT.
 *
 * Phase 8 should run this as a release gate alongside verify-assets --strict.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const EMAIL = 'singhshourya2004@gmail.com';
const PHONE_DIGITS = '9717838216';
const ENCODED_EMAIL = 'c2luZ2hzaG91cnlhMjAwNEBnbWFpbC5jb20=';
const ENCODED_PHONE = 'KzkxIDk3MTc4IDM4MjE2';

const assetDir = join('dist', 'assets');
const files = [
  join('dist', 'index.html'),
  ...readdirSync(assetDir)
    .filter((f) => f.endsWith('.js') || f.endsWith('.css'))
    .map((f) => join(assetDir, f)),
];

let failures = 0;
let encodedEmailFound = false;
let encodedPhoneFound = false;

for (const file of files) {
  const content = readFileSync(file, 'utf8');

  if (content.includes(EMAIL)) {
    console.error(`LEAK: plain email in ${file}`);
    failures++;
  }
  if (content.includes(PHONE_DIGITS)) {
    console.error(`LEAK: plain phone in ${file}`);
    failures++;
  }
  if (content.includes(ENCODED_EMAIL)) encodedEmailFound = true;
  if (content.includes(ENCODED_PHONE)) encodedPhoneFound = true;
}

console.log(`Scanned ${String(files.length)} built asset(s)`);
console.log(`plain email       : ${failures > 0 ? 'see leaks above' : 'absent (good)'}`);
console.log(`encoded email     : ${encodedEmailFound ? 'present (expected)' : 'MISSING'}`);
console.log(`encoded phone     : ${encodedPhoneFound ? 'present (expected)' : 'MISSING'}`);

// A missing encoded value means the contact section stopped rendering, which is also a
// regression — just a different one.
if (!encodedEmailFound || !encodedPhoneFound) {
  console.error('Encoded values missing: the contact section may no longer render.');
  failures++;
}

console.log('');
console.log(failures === 0 ? 'PASS' : `FAIL: ${String(failures)} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
