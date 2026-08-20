/**
 * Audits the asset registry.
 *
 *   node scripts/verify-assets.mjs            report only, always exits 0
 *   node scripts/verify-assets.mjs --strict   exits 1 if any placeholder remains
 *
 * Phase 8 runs the strict form so a placeholder cannot reach production. Until then
 * the plain form is a running to-do list split by who owns each item.
 */
import { readFileSync } from 'node:fs';

const strict = process.argv.includes('--strict');
const source = readFileSync('src/content/assets.ts', 'utf8');

// Parse the registry entries out of the source rather than importing it, so this
// script has no build step and no dependency on TypeScript.
const entries = [...source.matchAll(/\{\s*id: '([^']+)',\s*label: '([^']+)',\s*status: '([^']+)',[\s\S]*?owner: '([^']+)',\s*\}/g)].map(
  ([, id, label, status, owner]) => ({ id, label, status, owner }),
);

if (entries.length === 0) {
  console.error('Could not parse any asset entries. Has the shape of assets.ts changed?');
  process.exit(1);
}

const pending = entries.filter((e) => e.status === 'placeholder');
const done = entries.filter((e) => e.status === 'final');

console.log(`Assets registered: ${entries.length}  final: ${done.length}  placeholder: ${pending.length}`);

if (pending.length > 0) {
  const byOwner = { shourya: [], build: [] };
  for (const entry of pending) byOwner[entry.owner]?.push(entry);

  if (byOwner.shourya.length > 0) {
    console.log('\nWaiting on Shourya:');
    for (const e of byOwner.shourya) console.log(`  - ${e.label}  (${e.id})`);
  }
  if (byOwner.build.length > 0) {
    console.log('\nTo author in-project:');
    for (const e of byOwner.build) console.log(`  - ${e.label}  (${e.id})`);
  }
}

if (strict && pending.length > 0) {
  console.error(`\nFAIL: ${pending.length} placeholder asset(s) still present. Not shippable.`);
  process.exit(1);
}

console.log(pending.length === 0 ? '\nPASS: all assets final.' : '\nOK for now (not strict).');
