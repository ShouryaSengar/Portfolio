import { projects } from '@content/projects';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Rule } from '@shared/ui/Rule';
import { ScrollReveal, ScrollRevealItem } from '@shared/ui/ScrollReveal';
import { Section } from '@shared/ui/Section';

import { CaseStudy } from './CaseStudy';

/**
 * The work section: three production case studies.
 *
 * Order is chronological and deliberately not re-sorted. content.md calls the
 * oldest-to-newest sequence the narrative spine, because it is also the order of
 * increasing architectural ownership — a form platform, then whole-app consolidation,
 * then a pipeline that takes developers out of the release loop. Reading it in order
 * is the argument.
 *
 * The last entry gets the `lead` treatment rather than the first. Putting the
 * strongest work last makes the progression build to it; leading with it would leave
 * the section descending.
 */
export function Work() {
  const lastIndex = projects.length - 1;

  return (
    <Section id="work" aria-labelledby="work-heading" rhythm="major">
      <ScrollReveal stagger>
        <ScrollRevealItem>
          <Eyebrow>Selected work</Eyebrow>
          <h2 id="work-heading" className="mt-2 text-2xl">
            Three applications in production
          </h2>
          <p className="text-ink-muted mt-3 max-w-prose text-sm">
            Enterprise insurance and fintech, serving 100,000+ daily active users across
            iOS, Android, and web. Ordered oldest to newest, which is also the order of
            increasing architectural ownership.
          </p>
        </ScrollRevealItem>

        {/* Rules between records rather than around cards. A ruled register is the
            motif of this direction, and it avoids three detached boxes in a row. */}
        <ScrollRevealItem className="mt-6">
          {projects.map((project, index) => (
            <div key={project.slug}>
              <Rule />
              <CaseStudy
                project={project}
                index={index}
                prominence={index === lastIndex ? 'lead' : 'standard'}
              />
            </div>
          ))}
        </ScrollRevealItem>
      </ScrollReveal>
    </Section>
  );
}
