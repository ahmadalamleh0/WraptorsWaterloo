import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // The root .js files are unused reference copies from the Dubai baseline;
  // nothing imports them.
  globalIgnores(['dist', 'quoteform.js', 'youtube_handle.js', 'youtube_handle - Copy.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Build config and scripts run in Node.
    files: ['vite.config.js', 'pwa-assets.config.js', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
])
