const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 单入口
    // entry: './src/js/index.js
    entry: {
        // 多入口：有一个入库，最终输出就有一个bundle
        main: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        // [name]：取文件名
        filename: 'js/[name].[chunkhash:10].js',
        path: resolve(__dirname, 'build')
    },
    /**
     * 可以将node_modules中代码单独打包一个chunk最终输出
     * 自动分析多入口chunk中，有没有公共的文件。如果有会打包成一个单独的chunk
     */
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production',
};