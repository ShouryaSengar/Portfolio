import { roles } from '@content/experience';
import { profile } from '@content/profile';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { SchemaInspector } from '@shared/ui/SchemaInspector';
import { ScrollReveal, ScrollRevealItem } from '@shared/ui/ScrollReveal';
import { Section } from '@shared/ui/Section';

/**
 * Employment history.
 *
 * One role, which is the honest shape at 2+ years, so this stays compact rather than
 * being padded out into a timeline.
 *
 * ALIGNMENT. This section previously used the narrower `feature` shell on the reasoning
 * that a single role does not need 1200px. That was wrong: the shell is centred, so a
 * narrower one moved the whole section 120px right of every other section's left edge
 * and looked broken. It now shares the standard shell like everything else, and the
 * compactness comes from constraining the CONTENT — which is left-aligned, so the edge
 * holds. Layout width and reading measure are separate problems.
 *
 * Education lives in the footer, not here. With production experience on the table it is
 * a footnote, and giving it a section of its own was one of the things wrong with the old
 * site.
 */
export function Experience() {
  /**
   * `roles` is a non-empty const tuple, so index 0 is typed as present and needs no
   * guard. If it ever becomes dynamic, this is the line that has to change.
   */
  const [role] = roles;

  return (
    <Section id="experience" aria-labelledby="experience-heading" rhythm="major">
      <ScrollReveal stagger>
        <ScrollRevealItem>
          <Eyebrow>Experience</Eyebrow>
          <h2 id="experience-heading" className="mt-2 text-2xl">
            {role.title}
          </h2>

          {/* Split across two lines rather than one em-dash-joined run. As a single line
              it stretched to nearly the full column and read as a URL rather than a heading
              subtitle. */}
          <p className="text-ink-muted mt-3 text-base">{role.company}</p>
          <p className="text-ink-faint text-caption mt-1">
            {role.location}
            {' · '}
            <span className="tabular-nums">{role.start}</span>
            {' to present'}
          </p>
        </ScrollRevealItem>

        {/*
          Two columns at the standard shell width, matching the idiom the case studies use.

          The left column deliberately does NOT use DataList. That component right-aligns
          its value against the label, which is correct for short values and breaks badly
          for long ones: "Axis Max Life Insurance · Aditya Birla Health Insurance" wrapped
          into a ragged two-line right-aligned block with the label stranded above it.
          Stacking label over value keeps everything on one left edge, and long values wrap
          the way ordinary text does.

          Both columns open with an Eyebrow so their first baselines line up.
        */}
        <ScrollRevealItem className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
          <div className="space-y-8">
            <div>
              <Eyebrow>Clients</Eyebrow>
              {/* One per line. Joined with a middot they formed a single long string that
                  was the actual source of the broken wrap. */}
              <ul className="mt-3 space-y-1.5">
                {role.clients.map((client) => (
                  <li key={client} className="text-ink text-sm">
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow>Specialisation</Eyebrow>
              <p className="text-ink mt-3 text-sm">{profile.specialisation}</p>
            </div>
          </div>

          <div>
            <Eyebrow>Delivered</Eyebrow>
            <ul className="mt-3">
              {role.highlights.map((highlight) => (
                <li key={highlight} className="border-rule border-t py-4 last:pb-0">
                  <p className="text-ink-muted max-w-prose text-sm">{highlight}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <SchemaInspector data={role} sourcePath="src/content/experience.ts" />
        </ScrollRevealItem>
      </ScrollReveal>
    </Section>
  );
}
