const path = require("path");

module.exports = {
  extends: [
    "oclif",
    "oclif-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    "dot-notation": 2,
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../*"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
      },
    ],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
};
