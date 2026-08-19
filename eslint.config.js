import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'stats.html', 'legacy/**'],
  },

  // ---------- application source ----------
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      // NOTE: must be `configs.flat[...]`. The top-level `configs['recommended-latest']`
      // is still eslintrc format (plugins as an array) and crashes flat config.
      reactHooks.configs.flat['recommended-latest'],
      jsxA11y.flatConfigs.strict,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Architecture rules from .kiro/skills/react-architecture — these are the
      // failures that actually matter in review, so they are errors not warnings.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Enforce the one-directional dependency graph from .kiro/steering/structure.md:
      // shared/ must never reach into features/ or content/.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@features/*/*', '@/features/*/*'],
              message:
                'Import a feature through its index.ts barrel, not from inside its tree.',
            },
          ],
        },
      ],

      // Console statements do not ship. See react-architecture "Naming and hygiene".
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },

  // shared/ is the base layer — it may not depend on anything above it.
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@features/**', '@/features/**', '@content/**', '@/content/**', '@app/**', '@/app/**'],
              message:
                'shared/ must not import from features/, content/, or app/. Dependencies flow one way (see .kiro/steering/structure.md).',
            },
          ],
        },
      ],
    },
  },

  // ---------- build + lint config files ----------
  // vite.config.ts is covered by tsconfig.node.json, but eslint.config.js is in no
  // tsconfig at all. Neither needs type-aware rules, so both get the untyped preset —
  // enabling projectService here just makes the parser fail to find the file.
  {
    files: ['*.config.{js,ts}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    ...tseslint.configs.disableTypeChecked,
  },
);
