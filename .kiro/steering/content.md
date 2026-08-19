---
inclusion: always
---

# Content: Source of Truth

Every fact, number, and link for the site lives here, parsed from Shourya's resume
(Feb 2026) and confirmed directly by him. **Do not invent, embellish, or round any
number in this file.** If something is needed that isn't here, ask — don't guess.

`src/content/*.ts` is generated from this document. This file is the spec; those are
the typed implementation.

---

## Identity

| Field | Value |
|---|---|
| Name | Shourya Singh Sengar |
| Title | Software Engineer |
| Specialisation | React and React Native |
| Experience | 2+ years (since April 2024) |
| Company | Monocept Consulting Pvt Ltd ("Monocept") |
| Location | Gurugram, India |
| Availability | **Open to work — including fully remote** |
| Email | singhshourya2004@gmail.com |
| Phone | +91 9717838216 |
| GitHub | https://github.com/ShouryaSengar |
| LinkedIn | https://www.linkedin.com/in/shourya-singh-sengar-57921b146 |

**Phone number: confirmed for publication.** Shourya has opted to publish it. Mitigate the
scraping risk without hiding it:

- Render it as a `tel:` link so it is useful on mobile
- Do not put it in plain text in the initial HTML payload — assemble it client-side from
  parts, or obfuscate with CSS `unicode-bidi`. Naive email/phone scrapers read static
  markup only.
- Same treatment for the email address
- This is mitigation, not prevention. A determined scraper runs JS. If spam becomes a
  problem the number comes down.

## Positioning

The one-line version:

> Software Engineer specialising in React and React Native, building server-driven UI
> and schema-driven platforms for enterprise insurance and fintech.

The differentiator, in priority order:

1. **Server-Driven UI / schema-driven architecture.** Most engineers with 2 years build
   screens. Shourya builds systems that generate screens from JSON at runtime. This is
   the headline, not a footnote.
2. **Genuine cross-platform.** iOS, Android, and web — shipped, in production, not
   side projects.
3. **Real scale.** 100,000+ DAU across three enterprise apps.
4. **Measured outcomes.** Nearly every contribution has a number attached.

## Professional summary (from resume, verbatim facts)

Software Engineer with 2+ years of experience in React and React Native, building
scalable cross-platform applications and Server-Driven UI architectures. Experience
designing schema-driven form platforms, role-based access systems, and enterprise
workflows for insurance and fintech products.

## Experience

**Software Engineer — Monocept, Gurugram — April 2024 to Present**

- Delivered **3 enterprise-grade applications** serving **100,000+ DAU** across iOS,
  Android, and web
- Clients: **Axis Max Life Insurance** and **Aditya Birla Health Insurance**
- Work recognised with the **2024 ET CIO Award for Digital Transformation**
- Cross-functional collaboration with Product, Design, QA, and client stakeholders
  across the full SDLC

---

## Projects

All three are production enterprise applications. Ordered oldest to newest, which is
also the order of increasing architectural ownership — worth using as the narrative
spine of the Work section.

### 1. ABHI One — Aditya Birla Health Insurance

**Stack:** React Native, JavaScript, Expo, Redux
**Platforms:** Android, iOS, Web

| Link | URL |
|---|---|
| Web | https://abhioneapp.adityabirlahealth.com/ |
| Android | https://play.google.com/store/apps/details?id=com.abhione.adityabirlacapital |
| iOS | https://apps.apple.com/in/app/abhi-one/id6744645659 |

**Contributions:**

- Architected a **schema-driven form platform** rendering **15+ policy workflows** from
  API metadata — reduced form development effort by **70%** and improved agent
  lead-to-conversion tracking by **30%**
- Built in-app chat assistance with real-time FAQ and guided flows — automated
  **500+ queries/week**, cutting support tickets by **35%**

**The story to tell:** 15+ insurance policy workflows, each with different fields,
validation, and conditional logic. Hand-coding each one doesn't scale. The answer was a
platform that renders any workflow from API metadata — so a new policy type ships
without a new build.

### 2. mSpace — Axis Max Life Insurance

**Stack:** React Native, JavaScript, Expo
**Platforms:** Android, iOS

| Link | URL |
|---|---|
| Android | https://play.google.com/store/apps/details?id=com.mli.mspace |
| iOS | https://apps.apple.com/in/app/mspace/id6502915736 |

**Contributions:**

- Engineered a **SuperApp consolidating 5 standalone apps** into one platform via deep
  linking and modular navigation — serving **10+ internal tools**, improving task
  completion rate by **40%**
- Implemented WebView with native download, sharing, and event interception —
  eliminated cross-app switching
- Managed token lifecycle (**Cognito, JWT, refresh tokens**) with proactive refresh and
  **2FA single-device lock** — reduced unauthorized sessions by **50%**
- Designed an **RBAC layer** with event-driven push notifications and deep-link routing
  — secured feature exposure across **5+ personas**, boosted same-day user action rate
  by **35%**

**The story to tell:** Five separate apps, five logins, five sets of context-switching.
Consolidating them meant solving identity, permissions, and navigation as one problem —
token lifecycle, 2FA device locking, and an RBAC layer gating features per persona.

Note: the resume lists "improving task completion rate by 40%" against both the SuperApp
consolidation and the WebView bullet. Attribute the 40% once, to the consolidation, and
describe the WebView outcome qualitatively. Repeating the same figure twice reads as
padding.

### 3. mRec — Axis Max Life Insurance

**Stack:** React, Redux, Tailwind CSS, TypeScript, Strapi CMS
**Platform:** Web — https://mspacerec.axismaxlife.com/login

**Contributions:**

- Built **config-driven dynamic UI** rendering pages, forms, and inputs from JSON
  fetched at runtime from **AWS S3**, with a **JSON rule engine** for conditional
  visibility — enabled **zero-deployment updates**, saving **20+ dev hours/week**
- Integrated a **Strapi CMS → S3 pipeline** for stakeholder-managed schemas —
  eliminated developer dependency for all workflow changes, reducing release cycle time
  by **80%**
- Optimised multi-stage recruitment pipelines with cross-role data handoff — cut
  processing time by **50%** and form errors by **60%**

**The story to tell:** The strongest piece of work and the best argument for seniority.
Every workflow change used to need a developer and a deploy. Now a stakeholder edits a
schema in Strapi, it publishes to S3, and the UI re-renders from JSON at runtime with a
rule engine handling conditional visibility. Developers removed from the loop entirely.

**This is also the only React + TypeScript + Tailwind project — the exact stack this
portfolio is built in.** Lead the Work section with it or give it the most space.

---

## Visual assets — what is cleared

**Shourya's own material: cleared.** Resume, profile photo, name, contact details, career
history, resume metrics.

**Client apps: publicly published material only.** Shourya has confirmed the clients have
no objection to use of their *public* assets. The boundary is what the rights holder has
already published themselves:

| Source | Status | Notes |
|---|---|---|
| ABHI One Play Store listing | Cleared | Screenshots published by Aditya Birla Capital |
| ABHI One App Store listing | Cleared | Screenshots published by Aditya Birla Capital |
| ABHI One web app (`abhioneapp.adityabirlahealth.com`) | Cleared | Publicly reachable surface |
| mSpace Play Store listing | Cleared | Screenshots published by Max Life Insurance |
| mSpace App Store listing | Cleared | Screenshots published by Max Life Insurance |
| mRec (`mspacerec.axismaxlife.com/login`) | **No public visuals exist** | Login-gated; use architecture diagrams |

Still off-limits, because no one has published it:

- Internal admin views, agent dashboards, configuration screens
- Real or realistic customer data, policy numbers, names, or PII — even blurred
- Proprietary rule definitions, internal endpoint names, or business logic

Practical note: store-listing screenshots are portrait phone captures, typically 1080×1920
or larger, and they carry the client's marketing overlays. They are not neutral UI shots.
Treat them as *proof of shipping* — presented in a device frame, at modest size — rather
than as the primary visual for a case study. Download and reprocess them locally to AVIF;
never hotlink from a store CDN.

**mRec has no public visuals at all, and it is the strongest work.** It needs an
architecture diagram: the Strapi → S3 → runtime-JSON pipeline with the rule engine. Author
it as SVG. For an interview panel this communicates more than a screenshot would, and it is
original work with no rights question attached.

Recommended per-project treatment:

| Project | Primary visual | Supporting |
|---|---|---|
| ABHI One | Schema-driven form pipeline diagram | Store screenshots in device frames, store badges |
| mSpace | RBAC persona / deep-link consolidation diagram | Store screenshots in device frames, store badges |
| mRec | Strapi → S3 → runtime render diagram | Live link (login-gated, so label it as such) |

Diagrams lead, screenshots support. That ordering matches what Shourya actually
contributed — the architecture — and it is what the technical audience is there to assess.

## Asset handling

Assets belong **in the repository**, not on external file hosts.

| Asset | Destination | Treatment |
|---|---|---|
| Profile photo | `src/assets/` | **Pending.** `images/Creative DP.png` has been deleted. Shourya is supplying a background-free portrait so it composites on any surface. AVIF + WebP, 2 sizes, dimensions in markup. |
| Resume | `public/resume.pdf` | Latest version. No spaces in the deployed path. |
| Store screenshots | `src/assets/projects/` | Downloaded and reprocessed to AVIF, not hotlinked. |
| Diagrams | `src/assets/diagrams/` | Author as SVG — crisp, tiny, themeable via `currentColor`. |

`src/assets/` rather than `public/` for images so Vite content-hashes them and can emit
responsive variants. The resume stays in `public/` because it needs a stable, shareable URL.

**Profile photo: awaiting asset.** The old stylised graphic (`images/Creative DP.png`) has
been removed. Shourya will supply a real portrait with no background, so it sits on any
surface without a plate behind it.

Design around the fact that it is not here yet:

- Build the section with a reserved, correctly-proportioned placeholder that has explicit
  `width`/`height`. Dropping the image in later must not shift layout.
- A cut-out portrait needs a deliberate relationship to the ledger canvas — it will read as
  floating unless it is anchored by the ruling grid, a baseline, or an overlap with a
  section edge. Decide that anchor when the asset arrives, not before.
- Transparent PNG is large. Convert to AVIF with an alpha channel and check the file size
  against the 150 kB per-image ceiling.

Do not link assets from Google Drive, Dropbox, or similar. Those services rate-limit
hotlinking, serve through redirects that break `<img>` loading, strip caching headers, send
unoptimised originals, and can change URLs without notice. A Drive-hosted hero image would
fail the LCP budget on its own.

## Skills — present as evidence, never as percentages

The old site's percentage bars are gone. Group by how the work is actually done, and
where possible attach each item to the project that proves it.

**Languages** — JavaScript, TypeScript, C++, SQL

**Frontend** — React.js, React Native, Redux, Tailwind CSS, Material UI, GraphQL,
HTML, CSS

**Architecture** — Server-Driven UI, Schema-Driven Forms, RBAC, OOP

**Platform & Cloud** — Strapi CMS, AWS S3, REST API integration, Cognito/JWT auth,
Google Analytics

**Tooling** — Git, GitHub, GitLab, Postman, JIRA, Agile, Copilot, Claude

Prefer showing "Server-Driven UI — *shipped in mRec and ABHI One*" over a bar at 85%.
The proof is the link.

## Education

**Ajay Kumar Garg Engineering College, AKTU** — 2020 to 2024
B.Tech, Information Technology — CGPA 7.4 / 10 — Ghaziabad, Uttar Pradesh

With 2+ years of production experience, education is a small footer-adjacent detail.
Do not give it a full section the way the old site did.

## Achievements

- **2024 ET CIO Award for Digital Transformation** — awarded for work Shourya
  contributed to at Monocept
- **Achiever of the Month, January 2026** — Monocept, for high-impact feature delivery
- **Competitive programming** — 600+ DSA problems solved; CodeChef 1650+,
  LeetCode 1650+, Codeforces 1250+
- **Udemy React Native** — 28-hour program, Maximilian Schwarzmüller
- **Udemy React** — 84-hour program, Jonas Schmedtmann
- **Coding Ninjas** — Data Structures and Algorithms in C++

The ET CIO Award is a team/organisational award. Phrase it accurately — "contributed to
work recognised with the 2024 ET CIO Award" — not as a personal award. Overstating it is
the kind of thing an interviewer will probe.

## Numbers worth featuring in the hero or a stat strip

Every one of these is from the resume and defensible:

| Figure | Meaning |
|---|---|
| 100,000+ | daily active users across shipped apps |
| 3 | enterprise applications in production |
| 5 | apps consolidated into one SuperApp |
| 15+ | policy workflows rendered from metadata |
| 80% | reduction in release cycle time (mRec) |
| 70% | reduction in form development effort (ABHI One) |
| 20+ | developer hours saved per week (mRec) |

Pick two or three. Seven numbers in a row is a wall, and it reads as trying too hard.
Per the `frontend-design-direction` skill, a big-number-with-small-label stat grid is
the template answer — only use it if it genuinely beats the alternatives here.

## Copy rules

- First person, active voice, sentence case
- No "passionate about crafting seamless digital experiences" — the old site's register
- Lead with what was built and what changed, not with adjectives
- Every number keeps its context. "80% faster releases" alone is meaningless; "cut
  release cycle time 80% by moving schema authoring out of the codebase" is the point
- Client names are public (both insurers are named on the resume and the apps are
  published under their brands), so they can be used. Internal system details should not
  be.

## Still outstanding

**One item.** The latest resume PDF needs to land in the repo as `public/resume.pdf`. The
existing `Shourya SinghSengar_Resume.pdf` in the repo root is an older revision — the
version this file was parsed from is newer and is the one to publish. Needed by Phase 7,
not blocking earlier phases.

Resolved: LinkedIn URL, phone publication (yes, with client-side assembly), email,
company name, project list and ordering, availability and remote status, client asset
clearance, profile photo (reuse `Creative DP.png`).
