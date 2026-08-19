import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Only active for `npm run analyze` — never in a normal build.
    ...(process.env.ANALYZE
      ? [visualizer({ open: true, gzipSize: true, brotliSize: true })]
      : []),
  ],

  resolve: {
    // Must stay in sync with "paths" in tsconfig.app.json.
    alias: {
      '@': resolvePath('./src'),
      '@app': resolvePath('./src/app'),
      '@features': resolvePath('./src/features'),
      '@shared': resolvePath('./src/shared'),
      '@content': resolvePath('./src/content'),
      '@assets': resolvePath('./src/assets'),
    },
  },

  build: {
    target: 'es2022',
    // Budget guard for .kiro/skills/web-performance (initial JS < 120 kB gzipped).
    // Vite measures this limit against RAW size, not gzip, so 400 kB raw is used as
    // the proxy (JS compresses roughly 3:1). Verify the real gzip figure in the build
    // output, not via this warning.
    chunkSizeWarningLimit: 400,
    // No manual chunking yet — deliberately.
    // Vite 8 runs Rolldown, where declarative splitting is `output.advancedChunks`
    // (the Rollup `manualChunks` object map is gone; only a function is accepted).
    // Per .kiro/skills/web-performance, split only what `npm run analyze` proves is
    // worth splitting. Revisit once Motion and the real feature code land.
  },

  server: {
    port: 5173,
    open: false,
  },
});
