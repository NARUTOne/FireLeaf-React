'use strict';

/**
 * webpack base config
 */

var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var StyleLintPlugin = require('stylelint-webpack-plugin');

var utils = require('./utils');
var CONFIG = require('../config/index');

var pnamePath = utils.pnamePath;

// 获取theme
const fs = require('fs');
const pkgPath = path.resolve(__dirname, './package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof pkg.theme === 'string') {
  let cfgPath = pkg.theme;
  if (cfgPath.charAt(0) === '.') {
    cfgPath = path.resolve(__dirname, cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof pkg.theme === 'object') {
  theme = pkg.theme;
}

var baseConfig = {
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, CONFIG.build.buildPath),
		publicPath: process.env.NODE_ENV === 'production'
      ? CONFIG.build.assetsPublicPath
      : CONFIG.dev.assetsPublicPath,  // 外部资源 url
		chunkFilename: pnamePath +'static/js/[id].[chunkhash:8].js' // chunk生成的文件名,按需加载
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': utils.resolve('src'),
      utils: path.resolve(__dirname, '../src/utils'),
      static: path.resolve(__dirname, '../static')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory', // 缓存loader执行结果
        include: [utils.resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
			{
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              "sourceMap": true,
              "modules": false,
              "modifyVars": theme,
              'javascriptEnabled': true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // 2.x以上；编译时出错，跳过，编译后保错
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      chunkFilename: pnamePath +'static/css/[id].[contenthash].css',
      filename: pnamePath +'static/css/[name].[contenthash].css'
    }),
    new StyleLintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['src/**/*.l?(e|c)ss'],
      cache: true,
      fix: true
    })
  ]
};

module.exports = baseConfig;
