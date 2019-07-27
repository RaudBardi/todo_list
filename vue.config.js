const path      = require('path');
const webpack   = require('webpack');

module.exports = {
    outputDir:'dist',
    assetsDir:'assets',
    filenameHashing: false,
    transpileDependencies: ['vuex-persist'],
    configureWebpack: {
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ]
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)));
        config.optimization.delete('splitChunks');
    }
};


function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/stylus/global/index.styl'),
            ],
        })
}
