/**
 * webpack prod config
 */

var webpack = require('webpack');
var path = require('path');

var merge = require('webpack-merge'); // 配置合并
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 配置html
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩优化 ， cssnano =>postcss
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ZipWebpackPlugin =require('zip-webpack-plugin');

var utils = require('./utils');
var CONFIG = require('../config/index');
var baseConfig = require('./webpack.base.config.js');

var pnamePath = utils.pnamePath;
var domain = CONFIG.build.domain || '';

var webpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: CONFIG.build.assetsPublicPath,
		filename: pnamePath +'static/js/[name].[chunkhash:8].js'
	},
  devtool: CONFIG.build.productionSourceMap ? CONFIG.build.devtool : false,
  plugins: [
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: CONFIG.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.ContextReplacementPlugin(/moment[\\/\\]locale$/, /zh-cn/),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, CONFIG.build.buildPath, 'index.html'),
      template: 'template.html',
      inject: true, // 注入
      favicon: utils.resolve('favicon.ico'),
      minify: {
        removeComments: true, // 带HTML注释
        collapseWhitespace: true, // 文本节点出现的空白而崩溃
        removeAttributeQuotes: true // 删除属性引用
      }
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: CONFIG.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
     // https://github.com/erikdesjardins/zip-webpack-plugin
     new ZipWebpackPlugin({
      path: path.join(__dirname, '../'),
      filename: domain + '.zip',
      pathPrefix: domain + '/'
    })
  ],
  // webpack 4.x 删除了 CommonsChunkPlugin，以支持两个新的选项（optimization.splitChunks 和 optimization.runtimeChunk）
  optimization: {
    splitChunks: {
      chunks: "all", // 必须三选一： "initial" | "all"(默认) | "async"
      minSize: 0, // 最小尺寸，默认0
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 1, // 最大异步请求数， 默认1
      maxInitialRequests: 1, // 最大初始化请求书，默认1
      name: function(){}, // 名称，此选项可接收 function
      cacheGroups: { // 这里开始设置缓存的 chunks
          common: {
            name: 'common',
            chunks: 'initial',
            // minSize: 1,
            minChunks: 2,
            enforce: true,
            priority: -20, // 缓存组优先级
          },
          vendor: { // key 为entry中定义的 入口名称
            chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认)
            test: /react|react-router|redux/, // 正则规则验证，如果符合就提取 chunk
            name: "vendor", // 要缓存的 分隔出来的 chunk 名称
            minSize: 0,
            minChunks: 1,
            enforce: true,
            priority: -10, // 缓存组优先级
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            reuseExistingChunk: true // 可设置是否重用该chunk
          }
      }
    }
  }
});

module.exports = webpackConfig;
