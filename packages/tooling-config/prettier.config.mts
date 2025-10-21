import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  overrides: [
    {
      files: ["*.jsonc"],
      options: {
        parser: "jsonc",
        // By spec, JSONC only extends JSON with comment support, not trailing commas as Prettier likes to add
        trailingComma: "none"
      }
    }
  ]
};

export default config;
