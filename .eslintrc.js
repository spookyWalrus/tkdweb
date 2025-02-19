module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  plugins: ["prettier", "react", "cypress"],
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": ["warn", { allow: ["error"] }],
  },
  overrides: [
    {
      files: [
        "cypress.config.js",
        "jest/__mocks__/*.js",
        "jest/__tests__/*.test.js",
        "*.css",
        "*.module.css",
        "package-lock.json",
        "*.json",
      ],
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
  ignorePatterns: ["*.md"],
};
