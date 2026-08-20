import { useEffect, useState } from 'react';

/**
 * Reports which section is currently in view, for highlighting the nav.
 *
 * Uses `IntersectionObserver` rather than a scroll listener: the browser does the work
 * off the main thread, so this costs nothing per frame. A scroll handler here would
 * fire dozens of times a second and is the classic cause of janky nav highlighting
 * (.kiro/skills/web-performance).
 *
 * The `rootMargin` deliberately shrinks the viewport to a band near the top. Without
 * it, a tall section and a short one are both "intersecting" for most of a scroll and
 * the active state flickers between them. Biasing to the upper third means the active
 * section is the one the reader is actually reading.
 *
 * Progressive enhancement: this only drives a visual highlight. The nav links are real
 * anchors and work with no JavaScript at all.
 *
 * @param ids Section ids in document order. Must be a STABLE reference — a fresh array
 *   each render would tear down and rebuild the observer on every commit. Pass a module
 *   constant such as `sectionIds` from content/navigation.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    // Tracked outside the callback because each callback invocation only reports the
    // entries that CHANGED, not everything currently on screen.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Resolve ties by document order rather than by ratio, so scrolling down
        // advances the highlight predictably instead of jumping to whichever section
        // happens to occupy more pixels.
        setActiveId(ids.find((id) => visible.has(id)) ?? null);
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}
