const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //在每次打包前清除旧包

const webpack = require('webpack')

module.exports = {
    mode: 'development',
    // optimization: { //优化
    //     usedExports: false // 定义了但未被使用的是否要导出   true则导出  false 则不导出
    // },
    entry: {
        //app: './src/index.js',
        //print: './src/print.js'
        app: '../src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', //该选项指定了  浏览器中所指定的 此输出项的url  资源所在位置
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../build', //dist文件下的目录都可以在服务器上访问
        compress: true,
        port: 9000,
        hot: true, //开启热编译
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
};