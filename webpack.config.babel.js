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
    loaders: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader', 'sass-loader']
        })
      },
    ],
    rules: [       
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  node: {
    fs: 'empty',
  },

  plugins: [
    new ExtractTextPlugin('build/style.css', {
      allChunks: true
    }),
  ],

  plugins: process.argv.indexOf('-p') === -1 ? null : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  ],
};
