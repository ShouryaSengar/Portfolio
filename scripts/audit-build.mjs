/**
 * Static audit of the built output — checks what Lighthouse would flag without needing
 * a browser. Run after `npm run build`.
 *
 *   node scripts/audit-build.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const distAssets = join('dist', 'assets');
const html = readFileSync('dist/index.html', 'utf8');
const jsFile = readdirSync(distAssets).find((f) => f.endsWith('.js'));
const cssFile = readdirSync(distAssets).find((f) => f.endsWith('.css'));
const js = readFileSync(join(distAssets, jsFile), 'utf8');
const css = readFileSync(join(distAssets, cssFile), 'utf8');

let failures = 0;
const pass = (label) => console.log(`  ✓ ${label}`);
const fail = (label) => { console.log(`  ✗ ${label}`); failures++; };
const check = (cond, label) => cond ? pass(label) : fail(label);

// Collapse whitespace for matching, since Vite preserves multi-line formatting.
const htmlFlat = html.replace(/\s+/g, ' ');

console.log('=== HTML ===');
check(html.includes('lang="en"'), 'html[lang] present');
check(htmlFlat.includes('name="viewport"'), 'viewport meta');
check(html.includes('<title>'), 'title element');
check(htmlFlat.includes('name="description"'), 'description meta');
check(htmlFlat.includes('property="og:title"'), 'OG title');
check(html.includes('rel="icon"'), 'favicon link');
check(html.includes('rel="preload"'), 'font preload');
check(htmlFlat.includes('color-scheme'), 'color-scheme meta');
check(htmlFlat.includes('theme-color'), 'theme-color meta');
check(!html.match(/http:\/\/(?!localhost)/), 'no insecure HTTP links');

console.log('');
console.log('=== CSS ===');
console.log(`  size: ${(css.length / 1024).toFixed(1)} kB`);
check(css.includes('focus-visible'), 'focus-visible styles');
check(css.includes('prefers-reduced-motion'), 'reduced-motion media query');
check(css.includes('font-display'), 'font-display declared');
check(css.includes('scroll-margin-top'), 'scroll-margin for sticky header');
check(!css.includes('outline:none') && !css.includes('outline: none'), 'no outline:none suppression');
check(css.includes('text-wrap:balance') || css.includes('text-wrap: balance'), 'text-wrap: balance on headings');
check(css.includes('-webkit-font-smoothing'), 'font smoothing');
check(css.includes('tabular-nums'), 'tabular-nums for figures');

console.log('');
console.log('=== JS ===');
console.log(`  size: ${(js.length / 1024).toFixed(1)} kB raw, target < 400 kB`);
check(js.length < 400 * 1024, 'under 400 kB raw (proxy for 120 kB gzip budget)');
check(!js.includes('console.log'), 'no console.log');
check(js.includes('currentColor'), 'icons use currentColor');
check(js.includes('aria-expanded'), 'aria-expanded for disclosures');
check(js.includes('aria-current'), 'aria-current for active nav');
check(js.includes('tabIndex') || js.includes('tabindex'), 'tabIndex on skip target');

console.log('');
console.log('=== FONTS ===');
const fontsDir = join('dist', 'fonts');
const fonts = readdirSync(fontsDir);
check(fonts.includes('archivo-var-latin.woff2'), 'Archivo variable font present');
check(fonts.includes('plex-mono-400-latin.woff2'), 'Plex Mono font present');
check(fonts.length === 2, `only ${String(fonts.length)} font files (budget: 2 families)`);

console.log('');
console.log(`=== RESULT: ${failures === 0 ? 'PASS' : `${String(failures)} issue(s)`} ===`);
process.exit(failures === 0 ? 0 : 1);
