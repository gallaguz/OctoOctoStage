module.exports = {
    devServer: {
        host: 'localhost',
    },
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: '[local]-[hash]',
                },
            },
        },
    },
};
