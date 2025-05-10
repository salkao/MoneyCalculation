module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  rules: {
    quotes: ["error", "single"],
    "@typescript-eslint/quotes": ["error", "single"],
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
