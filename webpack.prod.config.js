/**
 * webpack production config
 */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //能够删除未引用代码(dead code)的压缩工具(minifier)
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩优化 ， cssnano =>postcss
// var OfflinePlugin = require('offline-plugin'); //离线缓存 体验

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包资源分析

var baseWebpackConfig = require('./webpack.base.config');
var paths = require('./script/paths');

const pnamePath = paths.PName ? (paths.PName + '/').replace(/\/\//, '/') : '' ;

var prodConfig = merge(baseWebpackConfig, {
	entry: {
		vendor: ['react', 'react-dom', 'mockjs', 'redux', 'react-redux', 'redux-thunk'],
		time: ['moment']
	},
  output: {
		filename: pnamePath +'static/js/[name].[chunkhash:8].js'
	},
  module: {
    // 这些库都是不依赖其它库的库 不需要解析他们可以加快编译速度
    noParse: /node_modules\/(moment|echarts\.js)/,
  },
  devtool: false,
	plugins: [
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: { 
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // webpack3 Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new OfflinePlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, paths.buildPath, 'index.html'),
      template: 'template.html',
      inject: true, // 注入
      favicon: path.join(__dirname, 'favicon.ico'),
      minify: {
        removeComments: true, // 带HTML注释
        collapseWhitespace: true, // 文本节点出现的空白而崩溃
        removeAttributeQuotes: true // 删除属性引用
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'time', 'runtime'],
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // ( 公共chunk(commnons chunk) 的名称)
      name: "commons",
      // ( 公共chunk 的文件名)
      filename: pnamePath + "static/js/commons.[chunkhash:4].js",
      // (模块必须被 3个 入口chunk 共享)
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // (选择所有被选 chunks 的子 chunks)
      children: true,
      // (异步加载)
      async: true, // 在单入口的应用中可以选择去除 `commons`，而在子模块的 `CommonsChunkPlugin` 的配置中配置 `async` 为 `true`
      // (在提取之前需要至少三个子 chunk 共享这个模块)
      minChunks: 3,
    }),
    // new BundleAnalyzerPlugin() // 打包分析默认打开 localhost:8888 查看交互
  ]
});

module.exports = prodConfig;