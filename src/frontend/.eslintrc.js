module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'plugin:vue/essential',
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    ignorePatterns: [
        '*.md',
        'node_modules/*',
        'build/*'
    ],
    rules: {
        // indent: ['off', 4],
        'func-call-spacing': ['error', 'never'],
        'vue/script-indent': ['error', 4, {baseIndent: 0}],
        'vue/valid-v-for': ['off'],
        'vue/no-use-v-if-with-v-for': ['off'],
        'vue/require-v-for-key': ['off'],
    },
}
