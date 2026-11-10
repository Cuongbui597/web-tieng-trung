import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                './lib',
                '../lib',
                '../../lib',
                '../../../lib',
                './lib/index',
                '../lib/index',
                '../../lib/index',
                '../../../lib/index',
              ],
              message: 'Import explicitly from app/lib/server or app/lib/client (do not import from the lib directory root).',
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
