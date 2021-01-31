const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放进去
                    // 'style-loader',
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:''
                        }
                    },
                    // 将css文件整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的文件重命名
            filename:'css/built.css'
        })
    ],
    mode: 'development'
};