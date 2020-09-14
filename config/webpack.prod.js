const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const optimizeCss  = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins:[
        new optimizeCss({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: { removeAll: true }},
            canPrint: true
        })
    ]
})