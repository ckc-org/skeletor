module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json"],
      },
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "build/*",
    "node_modules/*",
    "cypress/**",
    "**/.github",
    "**/.husky/**",
    "**/*.css",
    "**/webpack.config.js",
    "**/.gitignore",
    "**/.eslintrc.js",
    "**/.prettierrc.js",
    "**/*.png",
    "**/*.jpg",
    "**/*.gif",
    "**/*.jpeg",
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
      },
    ],
    "import/no-cycle": 0,
    "operator-linebreak": "off",
    "arrow-parens": 0,
    "no-shadow": 0,
    "react/jsx-props-no-spreading": "off",
    "object-curly-newline": "off",
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".jsx", ".js"],
      },
    ],
    "no-use-before-define": "off",
    "import/no-extraneous-dependencies": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/no-unknown-property": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
