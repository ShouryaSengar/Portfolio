import { m, useReducedMotion } from 'motion/react';

import { profile } from '@content/profile';
import { fadeOnly, fadeUp, heroStagger } from '@shared/motion';
import { ButtonLink } from '@shared/ui/Button';
import { DataList, DataRow } from '@shared/ui/DataList';
import { Eyebrow } from '@shared/ui/Eyebrow';
import { SchemaInspector } from '@shared/ui/SchemaInspector';
import { Section } from '@shared/ui/Section';

/**
 * The hero, composed as a filed record.
 *
 * WHY THIS SHAPE. The template answer for a metrics-heavy engineer is a big name, a
 * tagline, and a row of stat cards. content.md and the design-direction skill both warn
 * against it specifically, because it appears on every AI-generated portfolio regardless
 * of subject and it flattens four unrelated numbers into one wall.
 *
 * Instead the hero is the header of a ledger entry: a status line, the name set large in
 * the condensed display width, the positioning claim at reading measure, then the facts
 * as a ruled key/value register. The figures live inside that register rather than in
 * their own grid, so they read as entries on a record instead of a scoreboard.
 *
 * The portrait sits top-right like a photograph affixed to a personnel file. That is
 * what solves the cut-out problem noted in content.md: a background-free portrait floats
 * unless something anchors it, and here the ruling and the record block do that.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const childVariants = prefersReducedMotion ? fadeOnly : fadeUp;

  return (
    <Section aria-labelledby="hero-name" rhythm="major">
      <m.div initial="hidden" animate="visible" variants={heroStagger}>
        {/* The single most actionable fact for someone scanning for 90 seconds, so
            it gets the accent and the top slot. */}
        <m.div variants={childVariants}>
          <Eyebrow tone="accent">{profile.availability}</Eyebrow>
        </m.div>

        <m.h1 id="hero-name" className="text-display mt-4" variants={childVariants}>
          {profile.name}
        </m.h1>

        <m.p
          className="text-ink-muted mt-6 max-w-prose text-lg"
          variants={childVariants}
        >
          {profile.headline}
        </m.p>

        {/* The record. Figures are entries here, not a separate stat grid. */}
        <m.div variants={childVariants}>
          <DataList className="mt-10 max-w-prose">
            <DataRow label="Role" value={`${profile.title}, ${profile.companyShort}`} />
            <DataRow label="Based in" value={profile.location} />
            <DataRow label="In production" value="3 enterprise applications" numeric />
            <DataRow label="Daily active users" value="100,000+" numeric />
          </DataList>
        </m.div>

        <m.div className="mt-10 flex flex-wrap gap-3" variants={childVariants}>
          <ButtonLink href={profile.links.resume} intent="primary">
            Download resume
          </ButtonLink>
          <ButtonLink href={profile.links.github} target="_blank">
            GitHub
          </ButtonLink>
          <ButtonLink href={profile.links.linkedin} target="_blank" intent="ghost">
            LinkedIn
          </ButtonLink>
        </m.div>

        {/* The signature. This section renders from `profile`, so this shows the
            genuine object rather than an illustration of one. */}
        <m.div variants={childVariants}>
          <SchemaInspector data={profile} sourcePath="src/content/profile.ts" />
        </m.div>
      </m.div>
    </Section>
  );
}
