/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 *  作用：一个模块发送编号，只会重新打包一个模块（而不是打包所有模块）
 *      极大提升构建速度
 * 
 *      样式文件：可以使用HMR功能，因为style-loader内部实现了~
 *      js文件：默认不能使用HMR --> 需要修改js代码，添加支持HMR功能的代码
 *          注意：HMR功能对比js处理，只能处理非入口js文件的其他文件。
 *      html文件：默认不能使用HMR，同时会导致html不能热更新~（不用做HMR功能）
 *        解决：修改entry入口，将html文件引入
 * 
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/index.js', './src/index.html'],
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        // loader配置
        rules: [
            {
                // 处理less资源
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    // 关闭es6模块化
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            {
                // 处理html中img资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        // plugins的配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        // 开启HMR功能
        // 当修改了webpack配置，新配置想要生效，必须重启webpack服务
        hot: true
    },
    devtool: 'eval-source-map'
};

/**
 * source-map：一种 提供源代码到构建后代码映射技术 技术（如果构建后代码出错了，通过映射可以追踪源代码错误）
 *  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * 
 *  source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *  inline-source-map：内联
 *      1. 只生成一个内联source-map
 *      2. 错误代码准确信息 和 源代码的错误位置
 *  hidden-source-map：外部
 *      错误代码错误原因，没有错误位置
 *      不能追踪源代码错误，只能提示到构建后代码的错误位置
 *  eval-source-map
 *      每一个文件都生成对应的source-map，都在eval
 *  nosources-source-map：外部
 *      错误代码准确信息，但是没有任何源代码信息 
 *  cheap-source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *      只能精确到行
 *  cheap-module-source-map：外部
 *      错误代码准确信息 和 源代码的错误位置 
 *      module会将loader的source map加入
 *  内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快
 * 
 *  开发环境：速度快，调试更友好
 *      速度快(eval>inline>cheap>...)
 *          eval-cheap-source-map
 *          eval0-source-map
 *      调试更友好
 *          source-map
 *          cheap-module-source-map
 *          cheap-source-map
 * 
 *      --> eval-source-map
 * 
 *  生产环境：源代码要不要隐藏？调试要不要更友好
 *      内联会让代码体积变大，所以生产环境不用内联
 *      nosources-source-map 全部隐藏
 *      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
 * 
 *      --> source-map / cheap-module-source-map
 */