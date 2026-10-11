module.exports = [
  { ignores: ["node_modules/**"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        document: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    rules: { "no-undef": "error", "no-unused-vars": "error" },
  },
];
