const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: path.join(__dirname, './src/components'),
        },
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: true, // or 'css'
      },
    ],
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-proposal-class-properties"    //解决箭头函数报错的
  ],
};