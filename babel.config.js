module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@test': './src/test',
                    '@assets': './src/assets',
                    '@contexts': './src/contexts',
                    '@business': './src/business',
                    '@common': './src/common',
                    '@components': './src/components',
                    '@config': './src/config',
                    '@constant': './src/constant',
                    '@view': './src/view',
                    '@jssdk': './src/jssdk',
                    '@navigation': './src/navigation',
                    '@utils': './src/utils',
                    '@lib': './src/lib',
                    '@localization': './src/localization',
                },
                log: true, // 启用日志以帮助调试
            },
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                version: '2022-03',
            },
        ],
        '@babel/plugin-transform-class-static-block',
        'react-native-reanimated/plugin',
    ],
};
