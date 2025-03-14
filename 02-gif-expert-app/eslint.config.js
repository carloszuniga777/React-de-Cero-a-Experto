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
    ...vitest.configs.recommended,                //------------- >Vitest 1
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,      //------------- >Vitest 2   
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { 
    react: { version: '18.3' },
    vitest: {
      typecheck: true                           //------------- >Vitest 3
    } 
  },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
       vitest                                 //------------- >Vitest 4   
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
]
