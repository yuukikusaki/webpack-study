const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 单入口
    // entry: './src/js/index.js'
    entry: {
        // 多入口：有一个入库，最终输出就有一个bundle
        main:'./src/js/index.js',
        test:'./src/js/test.js'
    },
    output: {
        // [name]：取文件名
        filename: 'js/[name].[chunkhash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    mode: 'production',
};