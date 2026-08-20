import { getAsset, type AssetId } from '@content/assets';
import type { ProjectEntry, ProjectSlug } from '@content/projects';
import { cn } from '@shared/lib/cn';
import { ButtonLink } from '@shared/ui/Button';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { Placeholder } from '@shared/ui/Placeholder';
import { SchemaInspector } from '@shared/ui/SchemaInspector';
import { Tag } from '@shared/ui/Tag';

/**
 * Maps a project to its architecture diagram.
 *
 * Explicit rather than a `diagram-${slug}` template, because that would not narrow to
 * `AssetId` and would silently produce a broken lookup for a new project. Typed as an
 * exhaustive record, so adding a project without registering a diagram fails
 * compilation instead of failing at runtime.
 */
const DIAGRAM_BY_SLUG = {
  'abhi-one': 'diagram-abhi-one',
  mspace: 'diagram-mspace',
  mrec: 'diagram-mrec',
} as const satisfies Record<ProjectSlug, AssetId>;

export interface CaseStudyProps {
  /** The literal-typed entry, so `slug` narrows and the diagram lookup needs no cast. */
  project: ProjectEntry;
  /** Position in the sequence, used for the record number. */
  index: number;
  /**
   * `lead` gets a larger heading, an accented number, and more air.
   *
   * Three identically-weighted cards in a row is the template answer, and
   * .kiro/skills/tailwind-design-system names monotone layout — same size, same gap,
   * same density everywhere — as the sound of nobody deciding. mRec is the strongest
   * work and the only React + TypeScript + Tailwind project, so it carries the weight.
   * It also sits last, which makes the chronological order build to it rather than
   * front-loading the best material.
   */
  prominence?: 'standard' | 'lead';
}

export function CaseStudy({ project, index, prominence = 'standard' }: CaseStudyProps) {
  const isLead = prominence === 'lead';
  const diagram = getAsset(DIAGRAM_BY_SLUG[project.slug]);
  const headingId = `work-${project.slug}`;

  return (
    <article aria-labelledby={headingId} className={cn(isLead ? 'py-14' : 'py-10')}>
      {/* ------------------------------------------------------ record head --- */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <div className="flex items-baseline gap-4">
          {/* Numbered because the sequence carries real information: oldest to newest
              is also increasing architectural ownership. design-system.md permits the
              marker here and nowhere else. */}
          <Eyebrow tone={isLead ? 'accent' : 'faint'} tracking="tight">
            {String(index + 1).padStart(2, '0')}
          </Eyebrow>
          <h3 id={headingId} className={isLead ? 'text-3xl' : 'text-xl'}>
            {project.name}
          </h3>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.platforms.map((platform) => (
            <li key={platform}>
              <Tag tone="outline">{platform}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-ink-muted mt-3 text-sm">
        {project.tagline}
        <span className="text-ink-faint"> — {project.client}</span>
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      {/* --------------------------------------------------- problem/approach --- */}
      {/* Problem before approach, always. A case study that opens with the solution
          has skipped the only part that shows judgement. */}
      <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <Eyebrow>Problem</Eyebrow>
          <p className="text-ink-muted mt-2 text-sm">{project.problem}</p>
        </div>
        <div>
          <Eyebrow>Approach</Eyebrow>
          <p className="text-ink-muted mt-2 text-sm">{project.approach}</p>
        </div>
      </div>

      {/* -------------------------------------------------------- diagram --- */}
      {/* Full width for every project rather than tucked into a narrow column: a 16/9
          architecture diagram squeezed into a side column is unreadable, which defeats
          the point of leading with diagrams instead of screenshots. */}
      <div className="mt-10">
        {diagram.status === 'final' && diagram.src ? (
          <img
            src={diagram.src}
            alt={diagram.label}
            className="border-rule w-full rounded-card border"
            style={{ aspectRatio: String(diagram.ratio) }}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Placeholder
            label={diagram.label}
            ratio={diagram.ratio}
            note={diagram.note}
          />
        )}
      </div>

      {/* ---------------------------------------------------- contributions --- */}
      <div className="mt-10">
        <Eyebrow>Contributions</Eyebrow>
        <ul className="mt-4 space-y-6">
          {project.contributions.map((contribution) => (
            <li key={contribution.summary} className="border-rule border-t pt-4">
              <p className="text-ink text-sm">{contribution.summary}</p>

              {/* Outcomes stay attached to what produced them. A bare metrics list
                  divorced from the work reads as a scoreboard; here each figure is
                  evidence for the sentence above it. Contributions with no defensible
                  figure render without one rather than borrowing another's. */}
              {contribution.outcomes.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {contribution.outcomes.map((outcome) => (
                    <li key={outcome.label} className="flex items-baseline gap-2">
                      <span className="text-stamp text-base font-semibold tabular-nums">
                        {outcome.value}
                      </span>
                      <span className="text-ink-faint text-caption">{outcome.label}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------------------------------------------- links --- */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {project.links.map((link) => (
          <ButtonLink
            key={link.url}
            href={link.url}
            target="_blank"
            intent={link.kind === 'web' && isLead ? 'primary' : 'secondary'}
            size="sm"
          >
            {link.label}
          </ButtonLink>
        ))}
        {/* A sign-in wall stated in text, not left for the visitor to discover. */}
        {project.links.some((link) => link.gated) ? (
          <p className="text-ink-faint text-caption">Sign-in required</p>
        ) : null}
      </div>

      <SchemaInspector
        data={project}
        sourcePath={`src/content/projects.ts — ${project.slug}`}
      />
    </article>
  );
}
