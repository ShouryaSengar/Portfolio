/**
 * Checks that every nav anchor resolves to a real section id, and that the skip link
 * has a target.
 *
 *   node scripts/verify-nav.mjs
 *
 * Scans every .tsx under src/ rather than just App.tsx. Sections started life in the
 * composition root and moved into src/features as Phase 5 progressed; the earlier
 * App.tsx-only version failed loudly the moment the work section moved, which is the
 * behaviour wanted — a dead anchor is invisible until someone clicks it.
 *
 * This is a static source check. It cannot confirm the sections actually render, only
 * that the ids the nav points at exist somewhere in the source.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function collectTsx(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...collectTsx(path));
    } else if (entry.name.endsWith('.tsx')) {
      found.push(path);
    }
  }
  return found;
}

const nav = readFileSync('src/content/navigation.ts', 'utf8');
const navIds = [...nav.matchAll(/\{ id: '([^']+)', label: '([^']+)' \}/g)].map(
  ([, id, label]) => ({ id, label }),
);

if (navIds.length === 0) {
  console.error('Parsed no nav items — has navigation.ts changed shape?');
  process.exit(1);
}

const sources = collectTsx('src');
const sectionIds = new Set();
let mainId = null;
const skipTargets = new Set();

for (const file of sources) {
  const source = readFileSync(file, 'utf8');
  for (const [, id] of source.matchAll(/<Section\s+id="([^"]+)"/g)) {
    sectionIds.add(id);
  }
  const main = /<main id="([^"]+)"/.exec(source);
  if (main) mainId = main[1];
  for (const [, target] of source.matchAll(/href="#([^"]+)"/g)) {
    skipTargets.add(target);
  }
}

let failures = 0;

console.log(`Scanned ${String(sources.length)} .tsx files`);
console.log('');
console.log('Nav items and their targets:');
for (const { id, label } of navIds) {
  const found = sectionIds.has(id);
  console.log(
    `  ${label.padEnd(14)} #${id.padEnd(14)} ${found ? 'resolves' : 'DEAD ANCHOR'}`,
  );
  if (!found) failures++;
}

console.log('');
console.log(`main landmark id   : ${mainId ?? 'MISSING'}`);
const skipOk = mainId !== null && skipTargets.has(mainId);
console.log(`skip link resolves : ${skipOk ? 'yes' : 'NO'}`);
if (!skipOk) failures++;

const orphans = [...sectionIds].filter((id) => !navIds.some((n) => n.id === id));
if (orphans.length > 0) {
  console.log('');
  console.log(`Sections with an id but no nav entry: ${orphans.join(', ')}`);
}

console.log('');
console.log(failures === 0 ? 'PASS' : `FAIL: ${String(failures)} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
