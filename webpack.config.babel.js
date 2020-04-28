/*eslint global-require: "off"*/
const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
require('@babel/register');

const devMode = (process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1);

module.exports = {
  entry: ['@babel/polyfill', './src/components/index.js'],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: {
      index: 'index.html',
    },
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    chunkFilename: '[name].js',
    publicPath: '/build/',
  },

  optimization: {
    minimizer: [
      // https://www.stackery.io/blog/webpack-upgrade/
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
        terserOptions: {
          parse: {
            ecma: 8
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: {
          // name of the chunk
          name: 'vendor',
          // sync + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /node_modules/,
          priority: 20,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/typescript',
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-flow',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-transform-computed-properties',  { loose: true }],
          ],
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  node: {
    fs: 'empty',
  },

  // First array is dev only, second is production
  plugins: devMode 
  ? [
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
};
