module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:vue/essential',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  ignorePatterns: ['*.md'],
  rules: {

    // General
    indent: ['warn', 2],
    'no-unused-vars': ['warn'],
    'func-call-spacing': ['error', 'never'],
    'object-curly-spacing': ['warn', 'always', { "objectsInObjects": false, "arraysInObjects": false }],
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }],

    //Vue
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    'vue/html-indent': ['error', 2, { baseIndent: 1 }],
    'vue/valid-v-for': ['warn'],
    'vue/no-use-v-if-with-v-for': ['warn'],
    'vue/require-v-for-key': ['error'],
    'vue/no-arrow-functions-in-watch': ['error'],
    'vue/no-async-in-computed-properties': ['error'],
    'vue/no-dupe-keys': ['warn'],
    'vue/no-dupe-v-else-if': ['warn'],
    'vue/require-prop-types': ['warn'],
    'vue/prop-name-casing': ['warn', 'snake_case'],
    'vue/valid-v-slot': ['off'],
  },
}
