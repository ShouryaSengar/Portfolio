/**
 * Checks that every nav anchor resolves to a real section id, and that the skip link
 * has a target. Run against a running preview: node scripts/verify-nav.mjs
 *
 * This is a static check of the SSR-less HTML plus the bundle, so it cannot confirm
 * runtime rendering. It exists because a dead anchor is invisible until someone clicks
 * it, and the nav ids live in a different file from the sections that carry them.
 */
import { readFileSync } from 'node:fs';

const nav = readFileSync('src/content/navigation.ts', 'utf8');
const app = readFileSync('src/app/App.tsx', 'utf8');
const header = readFileSync('src/features/header/Header.tsx', 'utf8');

const navIds = [...nav.matchAll(/\{ id: '([^']+)', label: '([^']+)' \}/g)].map(
  ([, id, label]) => ({ id, label }),
);

if (navIds.length === 0) {
  console.error('Parsed no nav items — has navigation.ts changed shape?');
  process.exit(1);
}

const sectionIds = [...app.matchAll(/<Section\s+id="([^"]+)"/g)].map(([, id]) => id);
const mainId = /<main id="([^"]+)"/.exec(app)?.[1] ?? null;
const skipHref = /href="#([^"]+)"/.exec(header)?.[1] ?? null;

let failures = 0;

console.log('Nav items and their targets:');
for (const { id, label } of navIds) {
  const found = sectionIds.includes(id);
  console.log(`  ${label.padEnd(14)} #${id.padEnd(14)} ${found ? 'resolves' : 'DEAD ANCHOR'}`);
  if (!found) failures++;
}

console.log('');
console.log(`main landmark id      : ${mainId ?? 'MISSING'}`);
console.log(`skip link target      : #${skipHref ?? 'MISSING'}`);
const skipOk = skipHref !== null && skipHref === mainId;
console.log(`skip link resolves    : ${skipOk ? 'yes' : 'NO'}`);
if (!skipOk) failures++;

const sectionsWithoutNav = sectionIds.filter((id) => !navIds.some((n) => n.id === id));
if (sectionsWithoutNav.length > 0) {
  console.log('');
  console.log(`Sections with an id but no nav entry: ${sectionsWithoutNav.join(', ')}`);
  console.log('(fine for the lead section, worth checking otherwise)');
}

console.log('');
console.log(failures === 0 ? 'PASS' : `FAIL: ${failures} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
