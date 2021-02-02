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
    }
}