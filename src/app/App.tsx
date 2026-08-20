import { profile } from '@content/profile';
import { projects } from '@content/projects';
import { roles } from '@content/experience';
import { capabilityGroups } from '@content/stack';
import { mailtoHref, revealContact, telHref } from '@shared/lib/contact';
import { ButtonLink } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Rule } from '@shared/ui/Rule';
import { Section } from '@shared/ui/Section';
import { Tag } from '@shared/ui/Tag';

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
    <main>
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
            value={<a href={mailtoHref(profile.email)}>{revealContact(profile.email)}</a>}
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
      <Section aria-labelledby="work-heading" rhythm="major">
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
      <Section aria-labelledby="experience-heading" width="feature">
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
      <Section aria-labelledby="stack-heading" rhythm="major">
        <Eyebrow>Capabilities</Eyebrow>
        <h2 id="stack-heading" className="mt-2 text-2xl">
          Evidenced, not rated
        </h2>
        <p className="text-ink-muted mt-3 max-w-prose text-sm">
          No percentages. Each item names the production work that proves it, or stands
          without a claim.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityGroups.map((group) => (
            <div key={group.label}>
              <Eyebrow tone="muted">{group.label}</Eyebrow>
              <DataList className="mt-3" density="tight">
                {group.items.map((item) => (
                  <DataRow
                    key={item.name}
                    label={item.name}
                    value={
                      item.provenBy.length > 0 ? (
                        <span className="text-ink-faint text-caption font-mono">
                          {item.provenBy.join(' · ')}
                        </span>
                      ) : (
                        ''
                      )
                    }
                  />
                ))}
              </DataList>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
