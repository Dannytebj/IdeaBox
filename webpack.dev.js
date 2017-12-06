const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: path.join(__dirname, 'client/src/index.js'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
