module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        '@react-native-community',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { tabWidth: 4 }], //使用 Prettier，设置 4 空格缩进
        'react/react-in-jsx-scope': 'off', // React 17+ 不需要显式引入 React
        'react-native/no-inline-styles': 'off', // 允许使用内联样式
        'react-native/no-unused-styles': 'warn', // 警告未使用的样式
        'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }], // 检查未使用的变量和导入
        '@typescript-eslint/no-unused-vars': ['warn'], // TypeScript 下检查未使用的变量
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
