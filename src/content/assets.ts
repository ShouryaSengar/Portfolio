/**
 * Asset registry.
 *
 * Every image, diagram, and document the site needs, with its current status. This
 * exists so that "we'll swap the dummy later" cannot quietly become "the dummy
 * shipped". `scripts/verify-assets.mjs` reads this file; Phase 8 runs it in strict
 * mode so any remaining placeholder blocks the release.
 *
 * When a real asset lands: drop the file in, change `status` to 'final', and set
 * `src`. Keep `ratio` identical to the placeholder's, or the layout will shift.
 */

export type AssetStatus = 'placeholder' | 'final';

export type AssetOwner =
  /** Shourya has to supply the file. */
  | 'shourya'
  /** Authored in this project (diagrams, favicon, OG image). */
  | 'build';

export interface AssetEntry {
  readonly id: string;
  readonly label: string;
  readonly status: AssetStatus;
  /** Final aspect ratio, width / height. Reserved now so nothing shifts later. */
  readonly ratio: number;
  /** Populated once status is 'final'. */
  readonly src?: string;
  readonly note: string;
  readonly owner: AssetOwner;
}

export const assets = [
  {
    id: 'portrait',
    label: 'Portrait',
    status: 'final',
    ratio: 4 / 5,
    src: '/Profile.png',
    note: 'Background-free portrait on ledger canvas with accent strip.',
    owner: 'shourya',
  },
  {
    id: 'resume',
    label: 'Resume PDF',
    status: 'final',
    ratio: 1 / 1.414,
    src: '/resume.pdf',
    note: 'Latest revision, served from public/resume.pdf.',
    owner: 'shourya',
  },
  {
    id: 'diagram-mrec',
    label: 'mRec pipeline diagram',
    status: 'final',
    ratio: 16 / 9,
    src: '/diagrams/mrec-pipeline.svg',
    note: 'Strapi to S3 to runtime JSON, with the rule engine. Authored as SVG. Primary visual — mRec is login-gated so no screenshot exists.',
    owner: 'build',
  },
  {
    id: 'diagram-abhi-one',
    label: 'ABHI One form pipeline diagram',
    status: 'final',
    ratio: 16 / 9,
    src: '/diagrams/abhi-one-pipeline.svg',
    note: 'API metadata to rendered policy workflow. Authored as SVG.',
    owner: 'build',
  },
  {
    id: 'diagram-mspace',
    label: 'mSpace consolidation diagram',
    status: 'final',
    ratio: 16 / 9,
    src: '/diagrams/mspace-consolidation.svg',
    note: 'Five apps into one surface, with the RBAC persona gate. Authored as SVG.',
    owner: 'build',
  },
  {
    id: 'shots-abhi-one',
    label: 'ABHI One store screenshots',
    status: 'placeholder',
    ratio: 9 / 19.5,
    note: 'From the public Play Store and App Store listings. Reprocess to AVIF, never hotlink.',
    owner: 'build',
  },
  {
    id: 'shots-mspace',
    label: 'mSpace store screenshots',
    status: 'placeholder',
    ratio: 9 / 19.5,
    note: 'From the public Play Store and App Store listings. Reprocess to AVIF, never hotlink.',
    owner: 'build',
  },
  {
    id: 'og-image',
    label: 'Open Graph preview image',
    status: 'final',
    ratio: 1200 / 630,
    src: '/og-image.svg',
    note: 'What people see when the site is shared. Authored in-project.',
    owner: 'build',
  },
  {
    id: 'favicon',
    label: 'Favicon',
    status: 'final',
    ratio: 1,
    src: '/favicon.svg',
    note: 'SVG favicon. Authored in-project.',
    owner: 'build',
  },
] as const satisfies readonly AssetEntry[];

export type AssetId = (typeof assets)[number]['id'];

/** Lookup by id, so a call site cannot reference an asset that is not registered. */
export function getAsset(id: AssetId): AssetEntry {
  const found = assets.find((asset) => asset.id === id);
  if (!found) {
    throw new Error(`Asset "${id}" is not registered in src/content/assets.ts`);
  }
  return found;
}
