module.exports = {
  useTabs: false,
  tabWidth: 2,
  jsxSingleQuote: true,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "auto",
  plugins: ["@trivago/prettier-plugin-sort-imports"],

  importOrderSeparation: false,
  importOrder: [
    "^lodash|^react$",
    "react",
    "^@",
    "^components",
    "^modules",
    "^\\w",
    "^(\\.\\./)+",
    "^\\.",
  ],
};
