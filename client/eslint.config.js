module.exports = [
    {
        languageOptions: {
            ecmaVersion: 'latest', // Modern JavaScript
            sourceType: 'module',
            parser: require('@babel/eslint-parser'), // Babel parser
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-react'], // React support
                },
            },
        },
        plugins: {
            react: require('eslint-plugin-react'),
            'react-hooks': require('eslint-plugin-react-hooks'),
            prettier: require('eslint-plugin-prettier'),
        },
        settings: {
            react: {
                version: 'detect', // Auto-detect React version
            },
        },
        rules: {
            ...require('eslint-plugin-react').configs.recommended.rules,
            'prettier/prettier': 'error', // Format code using Prettier
            'react-hooks/rules-of-hooks': 'error', // Checks React Hooks rules
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
]
