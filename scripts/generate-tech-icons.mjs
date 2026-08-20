/**
 * Generates src/shared/ui/icons/techIcons.ts from simple-icons.
 *
 * WHY GENERATE INSTEAD OF IMPORTING. The simple-icons ESM entry point is a single
 * 5.1 MB module covering 3,453 brands. It declares `sideEffects: false` so a bundler
 * should tree-shake it, but putting a 5 MB module in the graph to keep a dozen path
 * strings is a build-time cost and a correctness risk if shaking ever regresses
 * silently. Extracting the paths we use means simple-icons stays a devDependency and
 * ships zero runtime bytes — the same approach used for the vendored fonts.
 *
 * Run after changing ICONS:
 *   node scripts/generate-tech-icons.mjs
 *
 * TRADEMARKS. simple-icons data is CC0, but the marks themselves remain the property
 * of their owners. Using them to indicate familiarity with a technology is ordinary
 * descriptive use. They are rendered monochrome in `currentColor`, never in brand
 * colours — Direction A permits exactly one accent, and a grid of brand-coloured
 * logos would wreck it (see .kiro/steering/design-system.md).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import * as simpleIcons from 'simple-icons';

/**
 * The marks worth showing, keyed by the id used in content.
 *
 * Deliberately not every tool. A logo earns its place when it is instantly
 * recognisable to someone scanning for a frontend stack; everything else reads better
 * as text and costs no bytes. Tooling (Jira, GitLab, Postman) and one-off languages
 * are therefore text-only in the content layer.
 */
const ICONS = {
  react: 'siReact',
  typescript: 'siTypescript',
  javascript: 'siJavascript',
  redux: 'siRedux',
  tailwind: 'siTailwindcss',
  expo: 'siExpo',
  mui: 'siMui',
  html: 'siHtml5',
  css: 'siCss',
  graphql: 'siGraphql',
  strapi: 'siStrapi',
  git: 'siGit',
  github: 'siGithub',
};

const entries = [];
let totalBytes = 0;

for (const [id, exportName] of Object.entries(ICONS)) {
  const icon = simpleIcons[exportName];
  if (!icon) {
    console.error(`FAIL: ${exportName} not found in simple-icons`);
    process.exit(1);
  }
  totalBytes += icon.path.length;
  entries.push({ id, title: icon.title, path: icon.path });
}

const body = entries
  .map(({ id, title, path }) => `  ${id}: {\n    title: '${title.replace(/'/g, "\\'")}',\n    path: '${path}',\n  },`)
  .join('\n');

const output = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Source: simple-icons (devDependency). Regenerate with:
 *   node scripts/generate-tech-icons.mjs
 *
 * Paths only, rendered monochrome in currentColor by shared/ui/TechIcon. Brand
 * colours are deliberately discarded: Direction A allows one accent, and a grid of
 * multi-coloured logos would break it.
 *
 * All icons use a 24x24 viewBox.
 */

export interface TechIconData {
  readonly title: string;
  readonly path: string;
}

export const TECH_ICONS = {
${body}
} as const satisfies Record<string, TechIconData>;

/** Ids available to content. A typo fails compilation rather than rendering nothing. */
export type TechIconId = keyof typeof TECH_ICONS;
`;

const target = fileURLToPath(new URL('../src/shared/ui/icons/techIcons.ts', import.meta.url));
writeFileSync(target, output, 'utf8');

console.log(`Wrote ${entries.length} icons to src/shared/ui/icons/techIcons.ts`);
console.log(`Path data: ${totalBytes} bytes (~${Math.round(totalBytes / 1024)} KB before gzip)`);
