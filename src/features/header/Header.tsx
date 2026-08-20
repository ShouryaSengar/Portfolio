import { useEffect, useId, useRef, useState } from 'react';

import { navItems, sectionIds } from '@content/navigation';
import { profile } from '@content/profile';
import { cn } from '@shared/lib/cn';
import { useActiveSection } from '@shared/hooks/useActiveSection';

/**
 * The site header: a ruled bar, not a floating pill.
 *
 * Direction A wants structure to be quiet, so this is the canvas colour with a single
 * bottom rule — the same background as the page, exactly as a sidebar shares its
 * canvas in design-system.md. A tinted or shadowed bar would fragment the page into
 * "header world" and "content world".
 */
export function Header() {
  const activeId = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the trigger. Without the focus
  // return, dismissing the menu strands a keyboard user at the top of the document.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      {/*
        First focusable element in the document. Visually hidden until focused, at
        which point it must be genuinely visible — a skip link that stays off-screen
        when focused is worse than none, because it silently swallows the first Tab.
      */}
      <a
        href="#main"
        className={cn(
          'sr-only',
          'focus-visible:bg-leaf focus-visible:text-ink focus-visible:border-rule-strong',
          'focus-visible:rounded-control focus-visible:not-sr-only focus-visible:fixed',
          'focus-visible:top-3 focus-visible:left-3 focus-visible:z-50',
          'focus-visible:border focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm',
        )}
      >
        Skip to content
      </a>

      <header className="border-rule bg-ledger sticky top-0 z-40 border-b">
        <div className="max-w-content mx-auto flex h-16 items-center justify-between px-6 md:px-10 lg:px-16">
          {/* Home link doubles as the wordmark. Mono and tracked, so it reads as a
              filed label rather than a logo. */}
          <a
            href="#main"
            className="text-ink font-mono text-sm tracking-[0.14em] uppercase"
          >
            {profile.name.split(' ')[0]}
            <span className="text-ink-faint"> / {profile.title}</span>
          </a>

          {/* ---------------------------------------------------- desktop nav --- */}
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      // aria-current is the semantic signal. The underline is the
                      // visual one; neither substitutes for the other.
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'rounded-control inline-flex h-10 items-center px-3 text-sm',
                        'transition-colors duration-150 ease-[var(--ease-out-quint)]',
                        isActive
                          ? 'text-ink decoration-stamp underline decoration-2 underline-offset-[6px]'
                          : 'text-ink-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ----------------------------------------------------- mobile nav --- */}
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
            className={cn(
              'rounded-control border-rule-strong text-ink inline-flex h-10 items-center',
              'border px-3 text-sm md:hidden',
              'transition-colors duration-150 ease-[var(--ease-out-quint)]',
              'hover:bg-leaf-sunk active:scale-[0.97]',
            )}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/*
          A disclosure, not a modal — so no focus trap and no scroll lock, which would
          both be wrong for a panel that does not obscure the page. Kept in the DOM
          only while open so its links are not reachable by Tab when hidden.
        */}
        {menuOpen ? (
          <nav
            id={menuId}
            aria-label="Sections"
            className="border-rule bg-ledger border-t md:hidden"
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="border-rule border-b last:border-b-0">
                  <a
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className={cn(
                      'flex min-h-11 items-center px-6 text-sm',
                      activeId === item.id ? 'text-ink' : 'text-ink-muted',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
}
