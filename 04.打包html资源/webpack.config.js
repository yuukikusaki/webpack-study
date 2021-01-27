/**
 * loader：1. 下载 2. 使用(配置loader)
 * plugins：1. 下载 2.引入 3. 使用
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
        ],
    },
    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // html-webpack-plugin@next(webpack5)
        // 功能：默认创建一个空的HTML文件
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}