import { alsoKnown, architecture, stack } from '@content/stack';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Rule } from '@shared/ui/Rule';
import { SchemaInspector } from '@shared/ui/SchemaInspector';
import { Section } from '@shared/ui/Section';
import { TechIcon } from '@shared/ui/TechIcon';

/**
 * Capabilities, in three tiers of decreasing weight.
 *
 * The tiers exist because a single flat list gave equal weight to twenty-four items,
 * which buried the architecture work — the actual differentiator — among tooling nobody
 * scans for. Splitting them is the whole point of this section:
 *
 *   1. architecture — concepts with no logos, given prose and real space
 *   2. stack        — technologies with recognisable marks, in a ruled cell grid
 *   3. alsoKnown    — plain strings, quiet, making no visual claim
 *
 * No percentages anywhere, and no evidence links either. The case studies already carry
 * the proof; this section states what Shourya works with.
 */
export function Craft() {
  return (
    <Section id="capabilities" aria-labelledby="capabilities-heading" rhythm="major">
      <Eyebrow>Capabilities</Eyebrow>
      <h2 id="capabilities-heading" className="mt-2 text-2xl">
        What I work with
      </h2>

      {/* Tier 1 — architecture leads and gets prose, not a chip. */}
      <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-3">
        {architecture.map((pattern) => (
          <div key={pattern.name}>
            <h3 className="text-lg">{pattern.name}</h3>
            <p className="text-ink-muted mt-2 text-sm">{pattern.note}</p>
          </div>
        ))}
      </div>

      <Rule spacing="loose" />

      {/* Tier 2 — a ruled cell grid. Borders on the container plus one edge per cell
          give continuous ruling rather than detached chips, so it reads as a register
          instead of a tag cloud. */}
      <ul className="border-rule grid grid-cols-2 border-t border-l sm:grid-cols-3 lg:grid-cols-4">
        {stack.map((item) => (
          <li
            key={item.name}
            className="border-rule flex items-center gap-3 border-r border-b px-4 py-3"
          >
            {/* Every item in this tier has a mark by definition — that is what
                distinguishes it from `alsoKnown`. No conditional needed. */}
            <TechIcon id={item.icon} className="text-ink-faint" />
            <span className="text-ink text-sm">{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Tier 3 — quiet, text-only. */}
      <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <Eyebrow className="mr-1">Also</Eyebrow>
        {alsoKnown.map((item) => (
          <span key={item} className="text-ink-muted text-sm">
            {item}
          </span>
        ))}
      </div>

      <SchemaInspector
        data={{ architecture, stack, alsoKnown }}
        sourcePath="src/content/stack.ts"
      />
    </Section>
  );
}
