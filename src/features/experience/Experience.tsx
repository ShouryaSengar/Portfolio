import { roles } from '@content/experience';
import { profile } from '@content/profile';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { SchemaInspector } from '@shared/ui/SchemaInspector';
import { Section } from '@shared/ui/Section';

/**
 * Employment history.
 *
 * One role, which is the honest shape at 2+ years, so this is deliberately compact
 * rather than padded into a timeline. Narrower container than the work section: a single
 * record with three highlights does not want 1200px, and varying width by section is
 * the spatial-rhythm rule rather than an inconsistency.
 *
 * Education lives in the footer, not here. With production experience on the table it is
 * a footnote, and giving it a section of its own was one of the things wrong with the
 * old site.
 */
export function Experience() {
  /**
   * `roles` is a non-empty const tuple, so index 0 is typed as present and needs no
   * guard. If it ever becomes dynamic, this is the line that has to change.
   */
  const [role] = roles;

  return (
    <Section id="experience" aria-labelledby="experience-heading" width="feature">
      <Eyebrow>Experience</Eyebrow>
      <h2 id="experience-heading" className="mt-2 text-2xl">
        {role.title}
      </h2>

      <p className="text-ink-muted mt-2 text-sm">
        {role.company}
        <span className="text-ink-faint">
          {' — '}
          {role.location}
          {' — '}
          {role.start} to present
        </span>
      </p>

      <ul className="mt-8 space-y-4">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="border-rule border-t pt-4">
            <p className="text-ink-muted text-sm">{highlight}</p>
          </li>
        ))}
      </ul>

      <DataList className="mt-8">
        <DataRow label="Clients" value={role.clients.join(' · ')} />
        <DataRow label="Specialisation" value={profile.specialisation} />
      </DataList>

      <SchemaInspector data={role} sourcePath="src/content/experience.ts" />
    </Section>
  );
}
