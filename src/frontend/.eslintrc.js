module.exports = {
  env: {
    node: true,
  },
  parser: "vue-eslint-parser", // Use the correct parser for Vue
  parserOptions: {
    parser: "@typescript-eslint/parser", // TypeScript parser for script tags
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended", // TypeScript recommendations
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "vue/html-quotes": ["error", "double"],
    "vue3-recommended/verbatimModuleSyntax": "off",
    "vue/require-default-prop": "off",
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "max-len": ["warn", 80],
    "no-undef": "off",
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "vue/multi-word-component-names": "off",

    // TypeScript specific rules can be added here if needed
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
