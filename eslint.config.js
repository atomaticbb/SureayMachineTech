import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

// Shared by the TS/TSX block and the plain-JS block below. `js.configs
// .recommended` applies to every file with no globals of its own, so any file
// type not given a languageOptions block reports bogus no-undef errors.
const nodeGlobals = {
  console: "readonly",
  process: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  Buffer: "readonly",
  module: "readonly",
  require: "readonly",
  URL: "readonly",
  fetch: "readonly",
  setInterval: "readonly",
  setTimeout: "readonly",
  clearInterval: "readonly",
  clearTimeout: "readonly",
};

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.ts",
      "*.config.js",
      "client/public/**",
      // The lint script's `--ext .ts,.tsx` is a no-op under flat config, so
      // everything below gets linted unless listed here.
      // Vendored agent-skill helper scripts — not project source.
      ".github/**",
      // Agent worktrees hold full copies of the repo; linting them reports
      // every project file a second time.
      ".claude/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: nodeGlobals,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...nodeGlobals,
        // Browser globals
        document: "readonly",
        window: "readonly",
        navigator: "readonly",
        URLSearchParams: "readonly",
        MouseEvent: "readonly",
        Node: "readonly",
        Element: "readonly",
        HTMLElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLInputElement: "readonly",
        Headers: "readonly",
        XMLHttpRequest: "readonly",
        setInterval: "readonly",
        setTimeout: "readonly",
        clearInterval: "readonly",
        clearTimeout: "readonly",
        location: "readonly",
        history: "readonly",
        // Libraries
        React: "readonly",
        google: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react: react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      "no-console": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",
      "no-undef": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
