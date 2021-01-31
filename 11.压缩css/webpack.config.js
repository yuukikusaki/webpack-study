const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 设置nodejs环境变量
process.env.NODE_ENV = 'development';

// optimize-css-assets-webpack-plugin

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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /**
                     * css兼容性处理：postcss --> postcss-loader postcss-preset-env
                     * 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                     * 
                     * "browserslist": {
                     *    // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                          "development": [
                            "last 1 chrome version",//最近的chrome
                            "last 1 firefox version",
                            "last 1 safari version"
                          ],
                          // 生产环境：默认是看生产环境
                          "production":[
                            ">0.2%",//兼容99.8的浏览器
                            "not dead",//不用已死的
                            "not op_mini all"//不要 op—_mini
                          ]
                        }
                     */
                    // 使用loader的默认配置
                    // 'postcss-loader',
                    // 修改loader的配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:  [
                                    // postcss的插件
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    }
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
            filename: 'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin()
    ],
    mode: 'development'
};