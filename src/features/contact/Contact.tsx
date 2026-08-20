import { profile } from '@content/profile';
import { mailtoHref, revealContact, telHref } from '@shared/lib/contact';
import { ButtonLink } from '@shared/ui/Button';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { SchemaInspector } from '@shared/ui/SchemaInspector';
import { ScrollReveal, ScrollRevealItem } from '@shared/ui/ScrollReveal';
import { Section } from '@shared/ui/Section';

/**
 * Contact.
 *
 * Direct links only, no form. A form on a static site needs a third-party endpoint,
 * which contradicts the zero-third-party-scripts budget in tech.md, and the old site's
 * form posted to `#` and silently did nothing. A `mailto:` that demonstrably works beats
 * a form that might not.
 *
 * Email and phone are assembled in the browser from base64. That is spam mitigation, not
 * security — see shared/lib/contact for the honest limits of it. Both are published at
 * Shourya's explicit request.
 */
export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading" rhythm="major">
      <ScrollReveal stagger>
        <ScrollRevealItem>
          <Eyebrow tone="accent">{profile.availability}</Eyebrow>
          <h2 id="contact-heading" className="mt-2 text-2xl">
            Get in touch
          </h2>
          <p className="text-ink-muted mt-3 max-w-prose text-sm">
            Open to frontend and React Native roles, including fully remote. The fastest
            route is email.
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <DataList className="mt-8 max-w-prose">
            <DataRow
              label="Email"
              value={
                <a
                  href={mailtoHref(profile.email)}
                  className="underline-offset-4 hover:underline"
                >
                  {revealContact(profile.email)}
                </a>
              }
            />
            <DataRow
              label="Phone"
              value={
                <a
                  href={telHref(profile.phone)}
                  className="tabular-nums underline-offset-4 hover:underline"
                >
                  {revealContact(profile.phone)}
                </a>
              }
            />
            <DataRow label="Based in" value={profile.location} />
          </DataList>
        </ScrollRevealItem>

        <ScrollRevealItem className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={mailtoHref(profile.email)} intent="primary">
            Send an email
          </ButtonLink>
          <ButtonLink href={profile.links.linkedin} target="_blank">
            LinkedIn
          </ButtonLink>
          <ButtonLink href={profile.links.github} target="_blank" intent="ghost">
            GitHub
          </ButtonLink>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <SchemaInspector
            // The encoded contact values, not the decoded ones — showing the decoded pair
            // here would put them back into a scrapeable position and undo the whole point
            // of assembling them client-side.
            data={{
              location: profile.location,
              availability: profile.availability,
              links: profile.links,
            }}
            sourcePath="src/content/profile.ts — contact"
          />
        </ScrollRevealItem>
      </ScrollReveal>
    </Section>
  );
}
