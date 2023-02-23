/*eslint global-require: "off"*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
require('@babel/register');

module.exports = (env, argv) => {
  
  const devMode = argv.mode === 'development';

  const config = {
    target: 'web',

    entry: ['@babel/polyfill', './src/index.js'],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallback: {
        fs: false
      }
    },

    devServer: {
      host: '0.0.0.0',
      port: 8000,
      hot: true,
      static: {                               
        directory: path.join(__dirname, './public'),
        publicPath: '/public',
        watch: true
      },
      historyApiFallback: true
    },

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: devMode ? '/' : '/build/',
    },

    optimization: {
      minimize: (devMode) ? false : true,
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true,
          extractComments: true,
          terserOptions: {
            output: {
              comments: false
            }
          }
        }),
        new CssMinimizerPlugin()
      ],
      moduleIds: "deterministic",
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: {
          // name of the chunk
            name: 'vendor',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /[\\/]node_modules[\\/]/,
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
              ['@babel/preset-env', { loose: true }],
              '@babel/preset-react',
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

    // First array is dev only, second is production
    plugins: devMode 
      ? [
        new HtmlWebpackPlugin({
          template: 'index.html'
        })
      ] : [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
      ],
  };

  if (devMode) {
    config.devtool = 'inline-source-map';
  }

  return config;
};
