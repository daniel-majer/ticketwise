import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React-related packages.
            ['^react', '^next'],

            // 2. Other external packages.
            ['^@?\\w'],

            // 3. Side effect imports (CSS, polyfills, ...).
            ['^\\u0000'],

            // 4. Absolute imports (based on tsconfig.json or jsconfig.json paths), e.g. @components, @utils.
            ['^@components', '^@hooks', '^@utils', '^@lib', '^@styles'],

            // 5. Relative imports: parent directories first.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // 6. Relative imports: current directory.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // 7. Style imports.
            [
              '\\.css$',
              '\\.scss$',
              '\\.sass$',
              '\\.less$',
              '\\.styl$',
              '\\.tailwind$',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]

export default eslintConfig
