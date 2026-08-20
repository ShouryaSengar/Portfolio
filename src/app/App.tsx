import { roles } from '@content/experience';
import { alsoKnown, architecture, stack } from '@content/stack';
import { Header } from '@features/header';
import { Hero } from '@features/hero';
import { Work } from '@features/work';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Rule } from '@shared/ui/Rule';
import { Section } from '@shared/ui/Section';
import { TechIcon } from '@shared/ui/TechIcon';

/**
 * PHASE 4 SPECIMEN — not the final site.
 *
 * Renders the whole typed content layer through the shared/ui primitives. Its job is
 * to prove the content shapes and the primitives compose, and to surface anything
 * that only breaks with real strings and real figures in place.
 *
 * Phase 5 replaces this with proper sections under features/. Delete the body then.
 */
export function App() {
  const role = roles[0];

  return (
    <>
      <Header />
      {/* Skip-link target. `tabindex="-1"` makes it programmatically focusable
          without adding a tab stop, so focus genuinely lands here rather than the
          browser only scrolling. */}
      <main id="main" tabIndex={-1}>
        <Hero />

        <Rule weight="strong" />

        <Work />

        <Rule />

        {/* ------------------------------------------------------- experience --- */}
        <Section id="experience" aria-labelledby="experience-heading" width="feature">
          <Eyebrow>Experience</Eyebrow>
          <h2 id="experience-heading" className="mt-2 text-2xl">
            {role.title}
          </h2>
          <p className="text-ink-muted mt-1 text-sm">
            {role.company} — {role.location} — {role.start} to present
          </p>

          <ul className="mt-6 space-y-3">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="text-ink-muted text-sm">
                {highlight}
              </li>
            ))}
          </ul>

          <DataList className="mt-6">
            <DataRow label="Clients" value={role.clients.join(', ')} />
          </DataList>
        </Section>

        <Rule />

        {/* ------------------------------------------------------------ stack --- */}
        <Section id="capabilities" aria-labelledby="stack-heading" rhythm="major">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 id="stack-heading" className="mt-2 text-2xl">
            What I work with
          </h2>

          {/* Tier 1 — architecture leads and gets prose, not a chip. These are the
            differentiator, so they are the one thing here given real space. */}
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
            give a continuous ruling rather than detached chips, so it reads as a
            register instead of a tag cloud. */}
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

          {/* Tier 3 — quiet, text-only, making no visual claim. */}
          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <Eyebrow className="mr-1">Also</Eyebrow>
            {alsoKnown.map((item) => (
              <span key={item} className="text-ink-muted text-sm">
                {item}
              </span>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
