import type { Role } from './types';

/**
 * Employment history.
 *
 * One role, which is the honest picture at 2+ years. `end` is omitted rather than
 * set to a placeholder, because the role is current — the type makes it optional
 * for exactly this case.
 *
 * `clients` is separate from `highlights` so the client names can be rendered as
 * their own row without duplicating them in prose.
 */
export const roles = [
  {
    title: 'Software Engineer',
    company: 'Monocept Consulting Pvt Ltd',
    location: 'Gurugram, India',
    start: 'April 2024',

    clients: ['Axis Max Life Insurance', 'Aditya Birla Health Insurance'],

    highlights: [
      'Delivered 3 enterprise-grade applications serving 100,000+ daily active users across iOS, Android, and web.',
      'Contributed to work recognised with the 2024 ET CIO Award for Digital Transformation.',
      'Worked cross-functionally with Product, Design, QA, and client stakeholders across the full SDLC.',
    ],
  },
] as const satisfies readonly Role[];
