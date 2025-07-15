/* eslint.config.js — ESLint 9 flat config  */
import eslintJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';

export default [
  /* 1. Base JavaScript rules */
  eslintJs.configs.recommended,

  /* 2. Type-Script source files */
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.eslint.json'],
        sourceType: 'module',
      },
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      jest: jestPlugin,
      import: importPlugin,
    },
    rules: {
      /* —— TypeScript specific —— */
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      /* —— Import hygiene —— */
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'no-duplicate-imports': 'error',

      /* —— Stylistic tweaks —— */
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },

  /* 3. Jest test files — loosen some rules */
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  /* 4. Ignore generated output */
  {
    ignores: ['dist/**', 'coverage/**'],
  },
];
