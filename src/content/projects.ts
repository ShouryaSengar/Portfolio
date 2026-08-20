import type { Project } from './types';

/**
 * The three production applications.
 *
 * Ordered oldest to newest, which is also the order of increasing architectural
 * ownership — form platform, then whole-app consolidation, then a pipeline that
 * removes developers from the release loop. content.md calls that progression the
 * narrative spine of the Work section, so the array order is meaningful and should
 * not be re-sorted for visual convenience.
 *
 * Every figure below appears in .kiro/steering/content.md. None is rounded,
 * combined, or reused.
 */
export const projects = [
  {
    slug: 'abhi-one',
    name: 'ABHI One',
    client: 'Aditya Birla Health Insurance',
    tagline: 'Health insurance app for agents and customers',
    platforms: ['iOS', 'Android', 'Web'],
    stack: ['React Native', 'JavaScript', 'Expo', 'Redux'],

    problem:
      'Fifteen or more insurance policy workflows, each with its own fields, validation rules, and conditional logic. Hand-coding every one of them does not scale, and each new policy type meant another release.',
    approach:
      'A schema-driven form platform that renders any workflow from API metadata. Adding a policy type became a metadata change rather than a build, so the form layer stopped being the bottleneck.',

    contributions: [
      {
        summary:
          'Architected a schema-driven form platform rendering 15+ policy workflows from API metadata.',
        outcomes: [
          { value: '70%', label: 'less form development effort' },
          { value: '30%', label: 'better agent lead-to-conversion tracking' },
        ],
      },
      {
        summary:
          'Built in-app chat assistance with real-time FAQ and guided flows.',
        outcomes: [
          { value: '500+', label: 'queries automated per week' },
          { value: '35%', label: 'fewer support tickets' },
        ],
      },
    ],

    links: [
      {
        kind: 'web',
        url: 'https://abhioneapp.adityabirlahealth.com/',
        label: 'Visit site',
      },
      {
        kind: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.abhione.adityabirlacapital',
        label: 'Google Play',
      },
      {
        kind: 'ios',
        url: 'https://apps.apple.com/in/app/abhi-one/id6744645659',
        label: 'App Store',
      },
    ],
  },

  {
    slug: 'mspace',
    name: 'mSpace',
    client: 'Axis Max Life Insurance',
    tagline: 'SuperApp consolidating five internal applications',
    platforms: ['iOS', 'Android'],
    stack: ['React Native', 'JavaScript', 'Expo'],

    problem:
      'Five separate internal apps meant five sign-ins and constant context-switching for the same person doing one job.',
    approach:
      'Consolidating them was not a navigation problem, it was an identity and permissions problem. Deep linking and modular navigation unified the surface, while token lifecycle, device locking, and a role-based access layer decided what each persona could actually reach.',

    contributions: [
      {
        summary:
          'Engineered a SuperApp consolidating 5 standalone apps into one platform via deep linking and modular navigation, serving 10+ internal tools.',
        outcomes: [{ value: '40%', label: 'higher task completion rate' }],
      },
      {
        /* content.md attributes the 40% task-completion figure to the
           consolidation above. The resume lists it against this bullet too, but
           repeating one number across two contributions reads as padding, so this
           one is described qualitatively. */
        summary:
          'Implemented WebView with native download, sharing, and event interception, removing the need to switch between apps mid-task.',
        outcomes: [],
      },
      {
        summary:
          'Managed token lifecycle across Cognito, JWT, and refresh tokens, with proactive refresh and a 2FA single-device lock.',
        outcomes: [{ value: '50%', label: 'fewer unauthorized sessions' }],
      },
      {
        summary:
          'Designed an RBAC layer with event-driven push notifications and deep-link routing, gating feature exposure across 5+ personas.',
        outcomes: [{ value: '35%', label: 'higher same-day user action rate' }],
      },
    ],

    links: [
      {
        kind: 'android',
        url: 'https://play.google.com/store/apps/details?id=com.mli.mspace',
        label: 'Google Play',
      },
      {
        kind: 'ios',
        url: 'https://apps.apple.com/in/app/mspace/id6502915736',
        label: 'App Store',
      },
    ],
  },

  {
    slug: 'mrec',
    name: 'mRec',
    client: 'Axis Max Life Insurance',
    tagline: 'Recruitment platform driven entirely by runtime configuration',
    platforms: ['Web'],
    stack: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Strapi CMS', 'AWS S3'],

    problem:
      'Every change to a recruitment workflow required a developer and a deployment. The people who understood the process could not change it, and the people who could change it were a release cycle away.',
    approach:
      'The UI stopped being code and became a consumer of configuration. A stakeholder edits a schema in Strapi, it publishes to S3, and the interface re-renders from that JSON at runtime, with a rule engine resolving conditional visibility. Developers left the loop entirely.',

    contributions: [
      {
        summary:
          'Built config-driven dynamic UI rendering pages, forms, and inputs from JSON fetched at runtime from AWS S3, with a JSON rule engine for conditional visibility. Enabled zero-deployment updates.',
        outcomes: [{ value: '20+', label: 'developer hours saved per week' }],
      },
      {
        summary:
          'Integrated a Strapi CMS to S3 pipeline for stakeholder-managed schemas, eliminating developer dependency for workflow changes.',
        outcomes: [{ value: '80%', label: 'shorter release cycle' }],
      },
      {
        summary:
          'Optimised multi-stage recruitment pipelines with cross-role data handoff.',
        outcomes: [
          { value: '50%', label: 'faster processing' },
          { value: '60%', label: 'fewer form errors' },
        ],
      },
    ],

    links: [
      {
        kind: 'web',
        url: 'https://mspacerec.axismaxlife.com/login',
        label: 'Visit site',
        /* Lands on a sign-in wall. The UI must say so, or the link looks broken. */
        gated: true,
      },
    ],
  },
  /* `as const` before `satisfies`, and both are needed.
     `satisfies` alone only type-checks the literal against the shape — it does not
     stop string properties widening to `string`, so ProjectSlug below resolved to
     plain `string` and accepted any value. `as const` freezes the literals, while
     `satisfies` still catches a mistyped or missing field. Verified with a probe
     that an invalid slug is now rejected. */
] as const satisfies readonly Project[];

/** Slug union derived from the data, so it cannot drift from it. */
export type ProjectSlug = (typeof projects)[number]['slug'];
