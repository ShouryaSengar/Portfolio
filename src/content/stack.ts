import type { ProjectSlug } from './projects';
import type { CapabilityGroup } from './types';

/**
 * Capabilities, grouped by how the work is actually done.
 *
 * No percentages. The old site rated itself `C++ 95%` and `Docker 85%`, which reads
 * as junior and cannot be defended when someone asks what the number means. Each
 * item instead names the production projects that evidence it, so the claim is
 * checkable — the proof is the link.
 *
 * `provenBy` is bound to `ProjectSlug`, so a mistyped or invented slug fails
 * compilation rather than rendering a dead reference.
 *
 * An empty `provenBy` is deliberate and honest. Competitive-programming languages,
 * general paradigms, and tooling are real but are not evidenced by these three case
 * studies, and claiming otherwise would be the same overstatement the percentages
 * were. The UI should render those without a proof marker rather than hiding them.
 */
export const capabilityGroups = [
  {
    label: 'Core',
    items: [
      { name: 'React', provenBy: ['mrec'] },
      { name: 'React Native', provenBy: ['abhi-one', 'mspace'] },
      { name: 'TypeScript', provenBy: ['mrec'] },
      { name: 'JavaScript', provenBy: ['abhi-one', 'mspace'] },
    ],
  },
  {
    label: 'Architecture',
    items: [
      /* The differentiator. Listed first within the group and evidenced twice. */
      { name: 'Server-Driven UI', provenBy: ['mrec', 'abhi-one'] },
      { name: 'Schema-Driven Forms', provenBy: ['abhi-one', 'mrec'] },
      { name: 'Role-Based Access Control', provenBy: ['mspace'] },
      { name: 'Object-Oriented Design', provenBy: [] },
    ],
  },
  {
    label: 'Interface',
    items: [
      { name: 'Tailwind CSS', provenBy: ['mrec'] },
      { name: 'Redux', provenBy: ['abhi-one', 'mrec'] },
      /* Not in the resume's Technical Skills list, but it is in the stack of two
         shipped projects, so it is evidenced rather than added. */
      { name: 'Expo', provenBy: ['abhi-one', 'mspace'] },
      { name: 'Material UI', provenBy: [] },
      { name: 'HTML and CSS', provenBy: ['mrec'] },
    ],
  },
  {
    label: 'Platform',
    items: [
      { name: 'Strapi CMS', provenBy: ['mrec'] },
      { name: 'AWS S3', provenBy: ['mrec'] },
      { name: 'REST API integration', provenBy: ['abhi-one', 'mspace', 'mrec'] },
      { name: 'Cognito and JWT auth', provenBy: ['mspace'] },
      { name: 'GraphQL', provenBy: [] },
      { name: 'Google Analytics', provenBy: [] },
    ],
  },
  {
    label: 'Also',
    items: [
      { name: 'C++', provenBy: [] },
      { name: 'SQL', provenBy: [] },
      { name: 'Git and GitLab', provenBy: [] },
      { name: 'Postman', provenBy: [] },
      { name: 'JIRA and Agile', provenBy: [] },
    ],
  },
] as const satisfies readonly CapabilityGroup<ProjectSlug>[];
