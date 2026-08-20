import { Button, ButtonLink } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Rule } from '@shared/ui/Rule';
import { Section } from '@shared/ui/Section';
import { Tag } from '@shared/ui/Tag';

/**
 * PHASE 3 SPECIMEN SHEET — not the final site.
 *
 * Assembled entirely from shared/ui primitives, with no ad-hoc markup and no raw
 * values. Its job is to prove the primitives compose and to make the token system
 * inspectable in a browser.
 *
 * Real sections arrive in Phase 5 and will live under features/, at which point
 * this file becomes a thin composition root. Delete the body then.
 *
 * Content below is drawn from .kiro/steering/content.md so the primitives are
 * exercised against realistic strings and figures rather than lorem.
 */

const STACK = ['React Native', 'Expo', 'Redux', 'TypeScript'] as const;

const SURFACES = [
  { key: 'raised', label: 'raised', note: 'one step above canvas' },
  { key: 'sunk', label: 'sunk', note: 'inset — receives content' },
  { key: 'bare', label: 'bare', note: 'outline only' },
] as const;

export function App() {
  return (
    <main>
      {/* ------------------------------------------------------------- lead --- */}
      <Section aria-labelledby="lead-heading" rhythm="major">
        <Eyebrow>Phase 3 — component specimen</Eyebrow>
        <h1 id="lead-heading" className="text-display mt-3">
          Ledger
        </h1>
        <p className="text-ink-muted mt-5 max-w-prose">
          Every element below is a <code className="font-mono text-sm">shared/ui</code>{' '}
          primitive bound to semantic tokens. The shell is 1200px; this paragraph is
          capped at 65 characters for reading comfort. Rules are functional — each one
          marks a real boundary.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/resume.pdf" intent="primary">
            Download resume
          </ButtonLink>
          <ButtonLink
            href="https://github.com/ShouryaSengar"
            target="_blank"
            intent="secondary"
          >
            GitHub
          </ButtonLink>
        </div>
      </Section>

      {/* A full-bleed rule is a SIBLING of Section, so it sits outside the padded
          container by structure rather than by negative margin. */}
      <Rule weight="strong" />

      {/* ---------------------------------------------------------- buttons --- */}
      <Section aria-labelledby="buttons-heading">
        <Eyebrow>Controls</Eyebrow>
        <h2 id="buttons-heading" className="mt-2 text-2xl">
          Buttons
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button intent="primary">Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="ghost">Ghost</Button>
          <Button intent="secondary" size="sm">
            Small
          </Button>
          <Button intent="primary" disabled>
            Disabled
          </Button>
        </div>

        <p className="text-ink-faint mt-4 max-w-prose text-sm">
          Tab through these to check the focus ring, and hold a click to see the 0.97
          press. Disabled keeps its cursor so the reason for inaction is visible.
        </p>
      </Section>

      <Rule />

      {/* ------------------------------------------------------ surfaces --- */}
      <Section aria-labelledby="surfaces-heading">
        <Eyebrow>Elevation</Eyebrow>
        <h2 id="surfaces-heading" className="mt-2 text-2xl">
          Surfaces
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {SURFACES.map(({ key, label, note }) => (
            <Card key={key} surface={key}>
              <p className="text-ink font-mono text-sm">{label}</p>
              <p className="text-ink-faint text-caption mt-1">{note}</p>
            </Card>
          ))}
        </div>

        {/* `interactive` supplies hover AND focus-within, so the affordance is
            equally available to keyboard users. */}
        <Card interactive padding="lg" className="mt-4">
          <Eyebrow tone="accent">Interactive card</Eyebrow>
          <h3 className="mt-2 text-xl">ABHI One</h3>
          <p className="text-ink-muted mt-2 max-w-prose text-sm">
            Schema-driven form platform rendering 15+ policy workflows from API metadata.
            Hover the card, then tab to the link inside it — the border responds to both.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <ButtonLink
              href="https://abhioneapp.adityabirlahealth.com/"
              target="_blank"
              intent="ghost"
              size="sm"
            >
              Visit site
            </ButtonLink>
          </div>
        </Card>
      </Section>

      <Rule />

      {/* ----------------------------------------------------------- data --- */}
      <Section aria-labelledby="data-heading" width="feature">
        <Eyebrow>Key / value</Eyebrow>
        <h2 id="data-heading" className="mt-2 text-2xl">
          Data rows
        </h2>
        <p className="text-ink-muted mt-3 max-w-prose text-sm">
          A real description list. Numeric values use tabular figures so the right edge
          stays flush as digits change.
        </p>

        <DataList className="mt-6">
          <DataRow label="Role" value="Software Engineer" />
          <DataRow label="Daily active users" value="100,000+" numeric />
          <DataRow label="Applications in production" value="3" numeric />
          <DataRow label="Release cycle reduction" value="80%" numeric />
          <DataRow label="Form development effort saved" value="70%" numeric />
          <DataRow
            label="Platforms"
            value={
              <span className="flex flex-wrap justify-end gap-2">
                <Tag tone="outline">iOS</Tag>
                <Tag tone="outline">Android</Tag>
                <Tag tone="outline">Web</Tag>
              </span>
            }
          />
        </DataList>
      </Section>

      <Rule />

      {/* ------------------------------------------------------ typography --- */}
      <Section aria-labelledby="type-heading" rhythm="major">
        <Eyebrow>Typography</Eyebrow>
        <h2 id="type-heading" className="mt-2 text-2xl">
          One family, two widths
        </h2>
        <p className="text-ink-muted mt-3 max-w-prose text-sm">
          Headings take Archivo at 78% width and weight 700. Body sits at 100% and 400.
          Both come from a single variable font file.
        </p>

        <div className="mt-8 space-y-4">
          <p className="text-3xl">Display 39 — condensed</p>
          <p className="text-2xl">Heading 31 — condensed</p>
          <p className="text-xl">Subhead 25 — condensed</p>
          <p className="text-base">Body 16 — normal width, regular weight</p>
          <p className="text-ink-muted text-sm">Small 13 — supporting copy</p>
          <p className="text-caption text-ink-faint font-mono">
            Caption 11 — mono, passes AA at 5.20:1
          </p>
        </div>
      </Section>
    </main>
  );
}
