import eslint from "@eslint/js";
import prettierEslint from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import common from "./common.mjs";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierEslint,
  ...common,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mts", "*.ts"]
        },
        warnOnUnsupportedTypeScriptVersion: true
      }
    }
  },
  {
    ignores: ["**.next", "**out/", "node_modules/", "dist/", "build/"]
  }
);
