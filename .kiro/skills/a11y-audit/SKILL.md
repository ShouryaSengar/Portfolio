---
name: a11y-audit
description: Accessibility requirements and audit procedure for React UI. Use when building any interactive element, form, modal, navigation, or animated section, and as a review pass before shipping a section. Covers semantic HTML, keyboard operation, focus management, contrast, screen reader support, and reduced motion.
---

# Accessibility Audit

Accessibility is a correctness property, not a feature. On a senior frontend portfolio, an
inaccessible component is a visible competence gap.

Note up front: automated checks catch roughly a third of real issues. Full WCAG conformance
requires manual testing with assistive technology and expert review. Never claim a site is
"WCAG compliant" on the basis of a passing axe run — state what was checked.

## Semantic HTML first

Most accessibility comes free from using the right element.

| Need | Element |
|---|---|
| Performs an action | `<button>` |
| Navigates | `<a href>` |
| Grouped controls | `<fieldset>` + `<legend>` |
| Modal | `<dialog>` or a headless primitive |
| Expandable | `<details>`/`<summary>` or a wired-up button |
| Page regions | `<header> <nav> <main> <footer>` |
| Section | `<section>` with an accessible name |

`<div onClick>` is never acceptable. It has no role, no keyboard handling, no focus, and no
announcement.

## Landmarks and headings

- Exactly one `<main>`, one `<h1>`.
- Heading levels descend without skipping. `h2` → `h4` is a failure.
- Never choose a heading level for its font size. Size comes from a class.
- A skip-to-content link as the first focusable element.
- `<nav>` elements get `aria-label` when there is more than one.

## Keyboard operation

Every interactive element must be reachable and operable by keyboard alone.

- Tab order follows visual order. No positive `tabindex`.
- `Enter` and `Space` activate buttons; `Enter` follows links.
- `Escape` closes overlays and returns focus to the trigger.
- Arrow keys navigate within composite widgets (tabs, menus, listboxes) — that widget is a
  single tab stop, not one stop per item.
- Nothing traps focus except an intentional modal focus trap.

Test it: put the mouse down and complete every user journey on the page with the keyboard.

## Focus visibility

- `:focus-visible` styling on everything focusable.
- Never `outline: none` without an equivalent replacement.
- The ring must have ≥ 3:1 contrast against both the element and the adjacent background, and
  must be visible on every surface the element can sit on.
- Focus moves deliberately: into a modal on open, back to the trigger on close, to the heading
  of a newly revealed region.

## Contrast

- Body text ≥ 4.5:1. Large text (≥ 24px, or ≥ 19px bold) ≥ 3:1.
- UI component boundaries and graphical objects ≥ 3:1.
- Check `ink-muted` and `ink-faint` specifically. Low-opacity text over a tinted surface is
  where contrast usually fails, and it is the most common failure in dark-mode designs.
- Verify against the actual composited background, not the token in isolation.
- Never convey information by color alone. Pair it with text, icon, or shape.

## Images and icons

- Meaningful images: descriptive `alt` that conveys the purpose, not the filename.
- Decorative images: `alt=""` (present and empty, not omitted).
- Icon-only buttons: `aria-label` describing the action, and `aria-hidden="true"` on the icon.
- Inline SVG that carries meaning: `role="img"` plus `<title>`.

## Forms

- Every input has a real `<label>` associated by `htmlFor`/`id`. Placeholder is not a label.
- Required fields marked in text, not only with a red asterisk.
- Errors are text next to the field, referenced by `aria-describedby`, with
  `aria-invalid="true"` on the input.
- Validation errors are announced — use a live region or move focus to the first error.
- Autocomplete attributes on name, email, and similar fields.
- If this site's contact form posts to a third-party endpoint, its success and failure states
  must be announced, not just visually styled.

## Dynamic content

- Content that appears in response to an action needs an appropriate live region:
  `aria-live="polite"` for status, `role="alert"` for errors.
- Disclosure controls carry `aria-expanded` and `aria-controls`.
- Selected states use `aria-selected` or `aria-current`, not just a CSS class.
- Loading states are announced, not conveyed by a spinner alone.

## Motion

- `prefers-reduced-motion: reduce` must remove movement, parallax, autoplay, and looping
  background video. Keep opacity and color transitions so feedback survives.
- Nothing flashes more than three times per second.
- Any auto-advancing content has a pause control.
- No content is only reachable by scroll-triggered animation — if JS animation fails, the
  content must still be visible. Never leave elements at `opacity: 0` waiting on an observer
  without a no-JS fallback.

## Zoom and reflow

- Usable at 200% browser zoom with no loss of content or function.
- No horizontal scroll at 320px viewport width.
- Text resizes with user font-size preferences — use `rem` for type, avoid fixed-height text
  containers.

## Audit procedure

1. **Automated** — `axe` DevTools or `@axe-core/react` in development. Zero violations.
2. **Keyboard** — complete every journey with the keyboard only.
3. **Screen reader** — NVDA on Windows, or VoiceOver. Verify names, roles, states, and reading
   order for each interactive element.
4. **Zoom** — 200%, then 320px width.
5. **Reduced motion** — toggle the OS setting and reload.
6. **Contrast** — sample real rendered pixels, especially muted text on tinted surfaces.
7. **Lighthouse accessibility** — 100. Necessary, not sufficient.

Report what was tested and what was not. "axe reports zero violations and full keyboard
operation was verified; no screen reader testing was performed" is an honest and useful result.

---

Assembled for this project against [WCAG 2.2](https://www.w3.org/TR/WCAG22/), the
[WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/), and accessibility guidance in
[alirezarezvani/claude-skills senior-frontend](https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/senior-frontend/SKILL.md).
Content was rephrased for compliance with licensing restrictions.
