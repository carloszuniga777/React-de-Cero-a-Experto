import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitest from "@vitest/eslint-plugin";

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' }},
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

    // Configuración para tests
    {
      files: ['**/*.test.{js,jsx}'], // Incluye posibles JSX en tests
      ...vitest.configs.recommended,
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          ...vitest.environments.env.globals,
        },
        parserOptions: {
          ecmaFeatures: { jsx: true }, // Necesario si usas JSX en tests
          sourceType: 'module'
        }
      },
      settings: {
        react: { version: '18.3' } // Hereda configuración de React
      }
    }
]


