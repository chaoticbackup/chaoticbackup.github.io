import webpack from 'webpack';
import path from 'path';

let ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  entry: ['babel-polyfill', `${__dirname}/src/components/index.js`],
  output: {
    path: `${__dirname}/build`,
    publicPath: '/build/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  node: {
    fs: 'empty',
  },

  // First array is dev only, second is production
  plugins: process.argv.indexOf('-p') === -1 ? [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      warnings: true,
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ],
};
