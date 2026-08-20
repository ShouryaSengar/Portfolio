import { Contact } from '@features/contact';
import { Craft } from '@features/craft';
import { Experience } from '@features/experience';
import { Footer } from '@features/footer';
import { Header } from '@features/header';
import { Hero } from '@features/hero';
import { Work } from '@features/work';
import { Rule } from '@shared/ui/Rule';

/**
 * Composition root.
 *
 * Assembles features and owns nothing else — no markup beyond the landmarks and the
 * rules between sections, no content imports, no state. Every section is a feature with
 * its own barrel, and ESLint blocks reaching inside any of their trees
 * (.kiro/steering/structure.md).
 *
 * Rules live here rather than inside the sections so they sit OUTSIDE each section's
 * padded container. That gives the full-bleed separator the direction wants without
 * negative margins, which design-system.md bans as a structural hack.
 */
export function App() {
  return (
    <>
      <Header />

      {/* Skip-link target. `tabIndex={-1}` makes it programmatically focusable without
          adding a tab stop, so focus genuinely lands here rather than the browser
          merely scrolling. */}
      <main id="main" tabIndex={-1}>
        <Hero />

        {/* The strong rule marks the one real division: introduction, then evidence. */}
        <Rule weight="strong" />

        <Work />

        <Rule />

        <Craft />

        <Rule />

        <Experience />

        <Rule />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
