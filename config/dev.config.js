const merge = require('webpack-merge');
const common = require('./common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: common.output.path
  }
});

