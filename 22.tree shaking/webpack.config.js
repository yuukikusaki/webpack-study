const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * tree shaking：去除无用代码
 *  前提： 1. 必须使用ES6模块化 2. 开启production环境
 *  作用： 减少代码体积
 * 
 *  在package.json中配置
 *      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
 *          问题：可能会把css / @babel/polyfill （副作用）文件干掉
 *      "sideEffects": ["*.css", "*.less"]
 */

// 定义node环境变量：决定使用browserslist
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    'postcss-preset-env'
                ]
            }
        }
    }
];

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built[chunkhash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                // 以下loader只会匹配一个
                // 注意：不能有两个配置处理同一种类型的文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    /**
                     * 正常来讲，一个文件只能被一个loader处理
                     * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                     *  先执行eslint 在执行babel
                     */
                    {
                        // 在package.json中eslintConfig --> airbnb
                        test: /\.js$/,
                        exclude: /node_modules/,
                        // 优先执行
                        enforce: 'pre',
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preser-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: {
                                        version: 2
                                    },
                                    targets: {
                                        chrome: '60',
                                        firefox: '50',
                                    }
                                }
                            ]
                        }
                    },
                    {
                        test: /\.(jpg|png|gif)/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs',
                            esModule: false
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media',
                            // publicPath: '../images/'//抽离css，图片路径出错的情况下
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built[chunkhash:10].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    mode: 'production',
    devtool: 'source-map'
};