const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  resolve: {
    //resolve   解析
    extensions: [".tsx", ".ts", ".js"], //extensions  自动解析扩展 为数组中所包含的
  },
  output: {
    filename: "[name][hash].js", //根据内容输出唯一hash值  可以用于解决缓存
    path: path.resolve(__dirname, "./build"),
    publicPath: "/"
  },
  optimization: {
    //分割bundle 减小包的体积
    splitChunks: {
      chunks: "all", //删除重复的loader   包括同步或者是异步的就引入的包   这一步是做优化
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include: path.resolve(__dirname, "../src"),
        use: ExtractTextPlugin.extract({
          //extract-text-webpack-plugin 这里的作用是把css文件单独打包出来，不跟js文件混合在一起，需要在下面的plugin配置
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[path][name]_[local]--[hash:base64:5]",
                },
                localsConvention: "camelCase",
              },
            },
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: (loader) => {
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("autoprefixer")();
                },
              },
            },
          ],
        }),
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: ["react-hot-loader/babel"],
            },
          },
        ],
        exclude: [path.resolve(__dirname, "node_modules")],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:['file-loader']
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit: 10240,
              name: '[hash].[ext]',
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Production",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new ExtractTextPlugin({
      filename: "[name][hash].css",
    }),
  ],
};
