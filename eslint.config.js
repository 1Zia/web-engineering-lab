module.exports = [
  {
    ignores: [
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "docs/evidence/**",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        document: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",
        window: "readonly",
      },
    },
    rules: { "no-undef": "error", "no-unused-vars": "error" },
  },
  {
    files: ["public/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: { Element: "readonly", setTimeout: "readonly" },
    },
  },
];
