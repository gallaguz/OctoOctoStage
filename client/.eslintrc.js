module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': [
            'error',
            {
                'max-len': [
                    'error',
                    {
                        code: 80,
                        ignoreTrailingComments: true,
                        ignoreComments: true,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true,
                        ignoreRegExpLiterals: true,
                        ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\(',
                    },
                ],
                printWidth: 80,
                trailingComma: 'es5',
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                useTabs: false,
                endOfLine: 'auto',
            },
        ],
    },
};
