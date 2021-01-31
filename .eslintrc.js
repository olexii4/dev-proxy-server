module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    ignorePatterns: [
        '.github/',
        '.vscode/',
        'assets/',
        'build/',
        '*.js',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'notice',
    ],
    rules: {
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1,
                'maxEOF': 1,
            }
        ],
        'notice/notice': [
            'error',
            {
                templateFile: '.config/copyright.js',
                onNonMatchingHeader: 'report',
                messages: {
                    reportAndSkip: 'Missing license header',
                },
            },
        ],
        'spaced-comment': 'error',
        'no-warning-comments': [
            'warn',
            {
                'terms': ['todo'],
                'location': 'start'
            }
        ],
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    },
};
