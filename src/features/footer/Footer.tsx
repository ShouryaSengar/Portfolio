import { profile } from '@content/profile';
import { Eyebrow } from '@shared/ui/Eyebrow';

/**
 * Footer: education, achievements, and the colophon.
 *
 * Education lives here rather than in a section of its own. With 2+ years of production
 * experience it is a footnote, and the old site giving it equal billing was part of what
 * made it read as a student's portfolio.
 *
 * Renders `<footer>` directly rather than through Section, because Section renders
 * `<section>` and a page should have exactly one contentinfo landmark with the right
 * element.
 */
export function Footer() {
  const { education } = profile;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-rule border-t">
      <div className="max-w-content mx-auto px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Eyebrow>Education</Eyebrow>
            <p className="text-ink mt-3 text-sm">
              {education.qualification}, {education.field}
            </p>
            <p className="text-ink-muted mt-1 text-sm">
              {education.institution}, {education.affiliation}
            </p>
            <p className="text-ink-faint text-caption mt-1 tabular-nums">
              {education.start}–{education.end} · {education.result} ·{' '}
              {education.location}
            </p>
          </div>

          <div className="lg:col-span-2">
            <Eyebrow>Recognition</Eyebrow>
            <ul className="mt-3 space-y-2">
              {profile.achievements.map((achievement) => (
                <li key={achievement.title} className="text-sm">
                  <span className="text-ink">{achievement.title}</span>
                  {/*
                    `in` narrowing, not a comparison against undefined. Under `as const`
                    the entries that omit `year` have no such key at all, so the union
                    does not carry the property and reading it does not typecheck.

                    Deliberately NOT solved the way ProjectLink.gated was, by making the
                    field required. For a boolean, absent and false meant the same thing
                    and uniformity was strictly better. Here absence is real information:
                    competitive programming and the courses are not tied to one year, and
                    filling it in would mean inventing data.
                  */}
                  {'year' in achievement ? (
                    <span className="text-ink-faint tabular-nums">
                      {' '}
                      · {achievement.year}
                    </span>
                  ) : null}
                  <span className="text-ink-muted"> — {achievement.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colophon. Naming the stack is not vanity on an engineer's site — a technical
            reader will check, and stating it invites the inspection rather than waiting
            for it. */}
        <div className="border-rule mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6">
          <p className="text-ink-faint text-caption">
            <span className="tabular-nums">{currentYear}</span> {profile.name}. Built with
            React, TypeScript and Tailwind CSS. No third-party scripts.
          </p>
          <a
            href="#main"
            className="text-ink-muted hover:text-ink text-caption font-mono tracking-[0.14em] uppercase"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
