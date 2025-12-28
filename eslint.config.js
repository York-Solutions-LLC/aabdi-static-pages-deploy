import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

export default [
  // 1. Ignore build output and node_modules
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  // 2. Base JS rules
  js.configs.recommended,

  // 3. Vue rules
  ...(Array.isArray(vue.configs["flat/recommended"])
    ? vue.configs["flat/recommended"]
    : [vue.configs["flat/recommended"]]),

  // 4. Vue + TypeScript parser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  // 5. TypeScript files (type-checked)
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ...config.languageOptions,
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  })),

  // 6. JS / script files (disable type-aware rules)
  {
    files: ["*.js", "*.mjs", "*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },

  // 7. Prettier (last)
  prettierConfig,
];
