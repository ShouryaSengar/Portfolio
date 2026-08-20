import type { ArchitecturePattern, TechItem } from './types';

/**
 * What Shourya works with. Stated, not rated, not argued.
 *
 * Split into three tiers deliberately — see the commentary on the types. The previous
 * single flat list gave a 24-cell grid equal weight to everything, which buried the
 * architecture work (the actual differentiator) among tooling nobody scans for.
 */

/**
 * Tier 1 — the differentiator. Given the most room in the layout.
 *
 * These are the reason the rest of the list is interesting: plenty of engineers list
 * React, far fewer have shipped a runtime that renders itself from configuration.
 */
export const architecture = [
  {
    name: 'Server-Driven UI',
    note: 'Interfaces that render themselves from JSON resolved at runtime, so shipping a change does not mean shipping a build.',
  },
  {
    name: 'Schema-Driven Forms',
    note: 'Form platforms generated from API metadata, so a new workflow is a schema change rather than new code.',
  },
  {
    name: 'Role-Based Access Control',
    note: 'Permission layers that decide what each persona can reach, wired to routing and notifications.',
  },
] as const satisfies readonly ArchitecturePattern[];

/**
 * Tier 2 — the working stack, each with a recognisable mark.
 *
 * Ordered by how central each is to the work rather than alphabetically, so a
 * recruiter scanning the first row sees the things that matter. React Native and React
 * share the React mark, which is correct: there is no separate React Native logo.
 *
 * An icon is mandatory here. Anything without a recognisable mark belongs in
 * `alsoKnown` below — that is the whole distinction between the two tiers.
 */
export const stack = [
  { name: 'React', icon: 'react' },
  { name: 'React Native', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Redux', icon: 'redux' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Expo', icon: 'expo' },
  { name: 'Material UI', icon: 'mui' },
  { name: 'GraphQL', icon: 'graphql' },
  { name: 'Strapi CMS', icon: 'strapi' },
  { name: 'HTML', icon: 'html' },
  { name: 'CSS', icon: 'css' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
] as const satisfies readonly TechItem[];

/**
 * Tier 3 — real, but not worth a logo or a headline.
 *
 * Plain strings on purpose. Several of these have no mark in simple-icons at all
 * (AWS withdrew theirs), and inventing a visual for them would give them more weight
 * than they deserve on a frontend portfolio.
 */
export const alsoKnown = [
  'AWS S3',
  'Cognito and JWT auth',
  'REST API integration',
  'SQL',
  'C++',
  'Google Analytics',
  'GitLab',
  'Postman',
  'JIRA',
  'Agile',
] as const satisfies readonly string[];
