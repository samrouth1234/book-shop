// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import prettierConfig from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
    settings: {
      next: {
        rootDir: ".",
      },
    },
  }),
];

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
const config = [
  {
    ignores: ["src/components/ui/*"],
  },
  eslint.configs.recommended,
  ...tanstackQuery.configs["flat/recommended"],
  { ignores: ["src/components/ui/*"] },
  {
    rules: {
      "no-unused-vars": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(error|err|_)$",
        },
      ],
    },
  },
  ...eslintConfig,
  prettierConfig,
];

export default config;

