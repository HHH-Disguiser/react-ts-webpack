const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname,'../build'), 
        hot:true     //react-hot-loader 开启热编译
    }
})