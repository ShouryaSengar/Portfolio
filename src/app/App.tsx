import { profile } from '@content/profile';
import { projects } from '@content/projects';
import { roles } from '@content/experience';
import { alsoKnown, architecture, stack } from '@content/stack';
import { Header } from '@features/header';
import { mailtoHref, revealContact, telHref } from '@shared/lib/contact';
import { ButtonLink } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Rule } from '@shared/ui/Rule';
import { Section } from '@shared/ui/Section';
import { Tag } from '@shared/ui/Tag';
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
        <Section aria-labelledby="lead-heading" rhythm="major">
          <Eyebrow>Phase 4 — content layer</Eyebrow>
          <h1 id="lead-heading" className="text-display mt-3">
            {profile.name}
          </h1>
          <p className="text-ink-muted mt-5 max-w-prose">{profile.headline}</p>

          <DataList className="mt-8 max-w-prose" density="tight">
            <DataRow label="Role" value={`${profile.title}, ${profile.companyShort}`} />
            <DataRow label="Based in" value={profile.location} />
            <DataRow label="Availability" value={profile.availability} />
            {/* Contact values are decoded in the browser, so they are absent from the
              served HTML. See shared/lib/contact for the reasoning and its limits. */}
            <DataRow
              label="Email"
              value={
                <a href={mailtoHref(profile.email)}>{revealContact(profile.email)}</a>
              }
            />
            <DataRow
              label="Phone"
              value={
                <a href={telHref(profile.phone)} className="tabular-nums">
                  {revealContact(profile.phone)}
                </a>
              }
            />
          </DataList>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={profile.links.resume} intent="primary">
              Download resume
            </ButtonLink>
            <ButtonLink href={profile.links.github} target="_blank">
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.links.linkedin} target="_blank" intent="ghost">
              LinkedIn
            </ButtonLink>
          </div>
        </Section>

        <Rule weight="strong" />

        {/* ------------------------------------------------------------- work --- */}
        <Section id="work" aria-labelledby="work-heading" rhythm="major">
          <Eyebrow>Selected work</Eyebrow>
          <h2 id="work-heading" className="mt-2 text-2xl">
            Three applications in production
          </h2>
          <p className="text-ink-muted mt-3 max-w-prose text-sm">
            Ordered oldest to newest, which is also the order of increasing architectural
            ownership.
          </p>

          <div className="mt-8 space-y-6">
            {projects.map((project, index) => (
              <Card key={project.slug} padding="lg">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {/* Numbered because the sequence carries real information here —
                    the only place design-system.md permits these markers. */}
                  <Eyebrow tone="accent" tracking="tight">
                    {String(index + 1).padStart(2, '0')}
                  </Eyebrow>
                  <h3 className="text-xl">{project.name}</h3>
                  <p className="text-ink-faint text-caption">{project.client}</p>
                </div>

                <p className="text-ink-muted mt-2 text-sm">{project.tagline}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.platforms.map((platform) => (
                    <li key={platform}>
                      <Tag tone="outline">{platform}</Tag>
                    </li>
                  ))}
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <Eyebrow>Problem</Eyebrow>
                    <p className="text-ink-muted mt-2 text-sm">{project.problem}</p>
                  </div>
                  <div>
                    <Eyebrow>Approach</Eyebrow>
                    <p className="text-ink-muted mt-2 text-sm">{project.approach}</p>
                  </div>
                </div>

                <DataList className="mt-6">
                  {project.contributions.flatMap((contribution) =>
                    contribution.outcomes.map((outcome) => (
                      <DataRow
                        key={`${contribution.summary}-${outcome.label}`}
                        label={outcome.label}
                        value={outcome.value}
                        numeric
                      />
                    )),
                  )}
                </DataList>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <ButtonLink
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      intent="secondary"
                      size="sm"
                    >
                      {/* A gated link must say so, or it reads as broken. */}
                      {link.gated ? `${link.label} (sign-in required)` : link.label}
                    </ButtonLink>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

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
