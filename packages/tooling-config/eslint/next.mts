import globals from "globals";
import pluginReact from "eslint-plugin-react";
import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import common from "./common.mts";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  ...common,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@next/next": pluginNext
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...pluginNext.configs.recommended.rules
    }
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  pluginReact.configs.flat.recommended,
  {
    name: "tealdeer",
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    }
  }
];
