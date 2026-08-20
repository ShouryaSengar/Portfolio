/**
 * One-off verification that the generated icon set ships correctly.
 * Run after a build: node scripts/verify-icons.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const generated = readFileSync('src/shared/ui/icons/techIcons.ts', 'utf8');
const paths = [...generated.matchAll(/path: '([^']+)'/g)].map((m) => m[1]);

const jsFile = readdirSync('dist/assets').find((f) => f.endsWith('.js'));
const js = readFileSync(join('dist', 'assets', jsFile), 'utf8');

const inBundle = paths.filter((p) => js.includes(p)).length;
const libShipped = js.includes('simple-icons');
const usesCurrentColor = js.includes('currentColor');
const brandHex = [...js.matchAll(/hex:\s*["'][0-9A-Fa-f]{6}/g)].length;

console.log('icons generated          :', paths.length);
console.log('icons present in bundle  :', inBundle);
console.log('simple-icons lib shipped :', libShipped ? 'YES (bad)' : 'no (good)');
console.log('renders currentColor     :', usesCurrentColor ? 'yes (good)' : 'MISSING');
console.log('brand hex values shipped :', brandHex === 0 ? 'none (good)' : `${brandHex} (bad)`);

const pass =
  inBundle === paths.length && !libShipped && usesCurrentColor && brandHex === 0;
console.log('');
console.log(pass ? 'PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
