---
inclusion: always
---

# Product

## What this is

A portfolio site for **Shourya Singh Sengar**, a software engineer with 2+ years of
professional experience specialising in frontend development with **React** and
**React Native**.

The site is a proof of craft. It is not a résumé in HTML. A visitor should be able to
tell from the interface itself that the person who built it does frontend work at a
senior level. If the site could plausibly have been bought as a template, it has failed
its purpose.

## Audience and their job

Two readers, both important:

1. **Hiring managers and recruiters** — scanning for 60 to 90 seconds. They need role,
   stack, level of experience, and two or three convincing pieces of work, without
   hunting.
2. **Engineers on the interview panel** — they will open devtools, check the network
   tab, run Lighthouse, tab through with the keyboard, and read the GitHub repo. The
   implementation is part of the portfolio.

Design for the first. Do not disappoint the second.

## The single job of the page

Convince a technical reader, in under two minutes, that this person builds high-quality
React interfaces — and give them an obvious next step (resume, GitHub, email).

## What is being replaced

The current site is a single-file jQuery build (`index.html`, `style.css`, `script.js`)
using jQuery, Owl Carousel, Typed.js, particles.js, Waypoints, and Font Awesome via CDN.
Everything about it is being retired: stack, content, and visual direction.

Specifically wrong today and must not carry over:

- **Positioning is stale.** It describes a student seeking a front-end internship at
  AKGEC Ghaziabad. Shourya is now a Software Engineer at Monocept with 2+ years of
  experience and three production apps serving 100,000+ DAU.
- **Percentage skill bars** (`C++ 95%`, `Docker 85%`). These read as junior and the
  numbers are not defensible. Remove the pattern entirely; do not restyle it.
- **Backend and "My Services" framing.** No Node/Express/MongoDB service cards. The
  positioning is frontend specialist, not freelance generalist.
- **Font Awesome icons.** Replaced by a modern line-icon set.
- **Particle background, typed-text effect, carousel.** All three are recognizable
  2018-era portfolio tropes.
- **The non-functional contact form.** Either wire it to a real service or replace it
  with direct contact links. Never ship a form that silently does nothing.

## Content

**All copy, facts, links, and metrics live in `.kiro/steering/content.md`.** That file is
the single source of truth, parsed from Shourya's Feb 2026 resume and confirmed by him.
Read it before writing any copy. Do not invent a fact that isn't in it.

Headline summary: Software Engineer at Monocept Consulting Pvt Ltd (Gurugram) since April
2024. Three production enterprise apps — **ABHI One** and **mSpace** (React Native,
iOS + Android) and **mRec** (React + TypeScript + Tailwind, web) — for Aditya Birla Health
Insurance and Axis Max Life Insurance, serving 100,000+ DAU. Specialises in Server-Driven
UI and schema-driven form platforms. Open to work, including remote.

The old site's projects (ShoeKart, Certificate Generator, BooKart LMS, Todo, Shared
Expense Manager) are college-era work. They are **superseded** by the three production
apps and should not appear in the main Work section. At most, a collapsed "earlier work"
list — and only if the page needs the volume, which it probably doesn't.

Open items are tracked at the bottom of `content.md`. Use a visible placeholder for
anything unresolved and flag it rather than filling the gap.

## Content principles

- **Show, do not rate.** Replace self-assessed percentages with evidence: shipped work,
  problems solved, decisions made.
- **Lead with outcomes.** "Cut bundle size 40% and TTI from 4.1s to 1.6s" beats
  "worked on performance."
- **Server-Driven UI is the real differentiator.** Most engineers at 2 years build
  screens; Shourya built platforms that generate screens from JSON at runtime. Lead with
  the architecture, not the framework list.
- **Cross-platform is the second differentiator.** Two React Native apps live on the App
  Store and Play Store. Most React portfolios stop at web. Give mobile real space.
- **First person, active voice, sentence case.** No third-person bio, no "passionate
  about crafting seamless experiences."
- **Every project needs a why.** What the problem was, what was decided, what the result
  was. Screenshots and a link are not a case study.

## Non-goals

- No backend, no database, no server-side runtime. Static build only.
- No CMS. Content is typed constants in the repo.
- No blog in v1. It is a commitment that shows badly when abandoned.
- No login, no dashboard, no analytics-heavy tooling.
- No AI chatbot answering questions about the résumé.
