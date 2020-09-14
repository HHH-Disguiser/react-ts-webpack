const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./config/webpack.common.js')
const compoiler = webpack(config)

app.use(webpackDevMiddleware(compoiler, {
    publicPath: config.output.publicPath
}));

app.listen(3001, function() {
    console.log('serve port 3001')
})