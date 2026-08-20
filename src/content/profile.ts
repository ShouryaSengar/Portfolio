import type { Profile } from './types';

/**
 * Identity, positioning, education, achievements.
 *
 * Every value traces to .kiro/steering/content.md. Do not add a fact that is not
 * in that file, and do not soften or inflate one that is.
 */
export const profile = {
  name: 'Shourya Singh Sengar',
  title: 'Software Engineer',
  specialisation: 'React and React Native',

  /* The headline claim. Server-driven UI leads, because that is the genuine
     differentiator — most engineers at this experience level build screens, not
     systems that generate them. */
  headline:
    'I build interfaces that build themselves — server-driven UI and schema-driven platforms for enterprise insurance and fintech.',

  summary:
    'Software Engineer with 2+ years of experience in React and React Native, building scalable cross-platform applications and server-driven UI architectures. I design schema-driven form platforms, role-based access systems, and enterprise workflows for insurance and fintech products.',

  company: 'Monocept Consulting Pvt Ltd',
  companyShort: 'Monocept',
  roleStart: 'April 2024',
  location: 'Gurugram, India',
  availability: 'Open to work, including fully remote',
  openToRemote: true,

  /* Base64, assembled in the browser so these are not plain text in the served
     HTML. Obfuscation against bulk harvesters, not security — see
     ObfuscatedContact in ./types. Shourya opted to publish both. */
  email: {
    // singhshourya2004@gmail.com
    encoded: 'c2luZ2hzaG91cnlhMjAwNEBnbWFpbC5jb20=',
    placeholder: 'email',
  },
  phone: {
    // +91 97178 38216
    encoded: 'KzkxIDk3MTc4IDM4MjE2',
    placeholder: 'phone',
  },

  links: {
    github: 'https://github.com/ShouryaSengar',
    linkedin: 'https://www.linkedin.com/in/shourya-singh-sengar-57921b146',
    resume: '/resume.pdf',
  },

  education: {
    institution: 'Ajay Kumar Garg Engineering College',
    affiliation: 'AKTU',
    qualification: 'B.Tech',
    field: 'Information Technology',
    result: 'CGPA 7.4 / 10',
    location: 'Ghaziabad, Uttar Pradesh',
    start: '2020',
    end: '2024',
  },

  achievements: [
    {
      /* Deliberately phrased as a contribution, not a personal award. The ET CIO
         Award is organisational, and overstating it is exactly the kind of claim
         an interviewer probes. */
      title: 'Contributed to work recognised with the 2024 ET CIO Award',
      detail: 'Awarded for digital transformation, for work delivered at Monocept.',
      year: '2024',
    },
    {
      title: 'Achiever of the Month',
      detail: 'Recognised at Monocept for high-impact feature delivery.',
      year: '2026',
    },
    {
      title: 'Competitive programming',
      detail:
        '600+ DSA problems solved. CodeChef 1650+, LeetCode 1650+, Codeforces 1250+.',
    },
    {
      title: 'React Native, Udemy',
      detail: '28-hour programme under Maximilian Schwarzmüller.',
    },
    {
      title: 'React, Udemy',
      detail: '84-hour programme under Jonas Schmedtmann.',
    },
    {
      title: 'Data Structures and Algorithms in C++',
      detail: 'Certificate of completion, Coding Ninjas.',
    },
  ],
} satisfies Profile;
