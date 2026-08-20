import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@shared/lib/cn';

/**
 * Shared button styling for the two semantically distinct components below.
 *
 * Depth is borders-only — no shadows anywhere, per design-system.md. On a paper
 * direction a drop shadow breaks the metaphor and is the classic source of "looks
 * off but I can't say why".
 *
 * All five interactive states are present: default, hover, active, focus-visible,
 * disabled. Missing states are the fastest tell of an unfinished interface
 * (.kiro/skills/ui-polish).
 */
const buttonStyles = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-[var(--radius-control)] border',
    'font-medium whitespace-nowrap',
    // Name the exact properties. Animating every property is wasteful and catches
    // things you did not intend, including layout ones (.kiro/skills/motion-craft).
    // Utility names are avoided in these comments on purpose: Tailwind's scanner
    // reads raw text and will emit any class name it finds, comments included.
    // See tailwind-design-system "Scanning".
    //
    // NOTE the list below names `scale`, not `transform`. Tailwind v4 compiles
    // scale utilities to the standalone CSS `scale` property rather than to
    // `transform: scale()`, so naming `transform` here would silently not apply
    // and the press would snap instead of easing. Verified in the compiled CSS.
    'transition-[color,background-color,border-color,scale]',
    'duration-150 ease-[var(--ease-out-quint)]',
    // Press feedback. Never below 0.95 — that reads as a bug, not a press.
    'active:scale-[0.97]',
    // The native `disabled` attribute already blocks interaction, so this is
    // purely the visual state. No pointer-events-none: it would also kill the
    // not-allowed cursor that tells people why nothing happened.
    'disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50',
    'disabled:active:scale-100',
  ],
  {
    variants: {
      intent: {
        /* The single accent, reserved for the one primary action in a view. */
        primary: ['border-stamp bg-stamp text-leaf', 'hover:border-ink hover:bg-ink'],
        /* Default for most actions. Structure from a rule, not a fill. */
        secondary: [
          'border-rule-strong bg-leaf text-ink',
          'hover:border-ink hover:bg-leaf-sunk',
        ],
        /* Lowest emphasis. Transparent border keeps the box metrics identical
           to the other intents so swapping intent never shifts layout. */
        ghost: [
          'border-transparent bg-transparent text-ink-muted',
          'hover:border-rule hover:text-ink',
        ],
      },
      size: {
        /* 40px — the WCAG 2.5.5 floor. Do not go smaller.
           Plain `text-sm` rather than text-[length:var(--text-sm)]: the token is
           declared in @theme so the utility already resolves to it, AND
           tailwind-merge recognises the named utility as a font-size, so a call
           site can override it via className. The arbitrary form defeats that. */
        sm: 'h-10 px-4 text-sm',
        /* 44px — the WCAG 2.5.5 target. Default. */
        md: 'h-11 px-5 text-base',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'secondary',
      size: 'md',
      block: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonStyles>;

/* ------------------------------------------------------------------ Button ---
   Performs an action. Renders a real <button>, which brings keyboard handling
   (Enter AND Space), focus, and the correct role for free.
--------------------------------------------------------------------------- */

export type ButtonProps = ComponentPropsWithRef<'button'> & ButtonVariants;

export function Button({
  className,
  intent,
  size,
  block,
  // A bare <button> inside a form defaults to type="submit" and will silently
  // submit it. Defaulting to "button" makes the safe case the default one.
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ intent, size, block }), className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------- ButtonLink ---
   Navigates. Renders an <a href>, which responds to Enter only, exposes a link
   role, and offers the browser's own affordances (open in new tab, copy target).

   This is deliberately a SEPARATE component rather than a polymorphic `as` prop
   on Button. A button and a link are not two skins of one thing — they differ in
   role, keyboard contract, and what a screen reader announces. Collapsing them
   behind one API is how <div onClick> gets rationalised back in
   (.kiro/skills/react-architecture, "Controls: native -> primitive -> hand-roll").

   Note there is no `disabled`: links cannot be disabled. If an action can be
   unavailable, it is a Button.
--------------------------------------------------------------------------- */

export type ButtonLinkProps = ComponentPropsWithRef<'a'> &
  ButtonVariants & {
    href: string;
    /* Required, not optional. An anchor with no content is announced as an empty
       link and is unusable with a screen reader. Enforcing it here is stronger
       than the jsx-a11y rule, which cannot see children through a spread. */
    children: ReactNode;
  };

export function ButtonLink({
  className,
  intent,
  size,
  block,
  target,
  rel,
  children,
  ...props
}: ButtonLinkProps) {
  // Cross-origin _blank without noopener exposes window.opener to the target
  // page (reverse tabnabbing). Applied automatically so a call site cannot
  // forget it.
  const safeRel =
    target === '_blank' ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ') : rel;

  return (
    <a
      target={target}
      rel={safeRel}
      className={cn(buttonStyles({ intent, size, block }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
