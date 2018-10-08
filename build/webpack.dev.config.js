/**
 * webpack dev config
 */

var webpack = require('webpack');
var path = require('path');

var merge = require('webpack-merge'); // 配置合并
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 配置html
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); // 打开浏览器
var CopyWebpackPlugin = require('copy-webpack-plugin');

var utils = require('./utils');
var CONFIG = require('../config/index');
var baseConfig = require('./webpack.base.config.js');

var pnamePath = utils.pnamePath;
var port = process.argv.slice(2)[0] || CONFIG.dev.host;

module.exports = merge.smart(baseConfig, {
  mode: 'development',
	cache: true,
	entry: {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, '../src/index.js')
		]
	},
	output: {
		filename: pnamePath +'static/js/[name].[hash:8].js'
	},
	devtool: CONFIG.dev.devtool,
	performance: {
		hints: false
	},
	plugins: [
		new webpack.NamedModulesPlugin(), // 开发阶段，热加载HMR 显示相对路径
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}), // 环境变量
		new OpenBrowserPlugin({
			url: `http://localhost:${port}/${pnamePath}`
		}),
		new webpack.HotModuleReplacementPlugin(), // 启用HMR
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'template.html',
			inject: true,
			favicon: path.join(__dirname, '../favicon.ico')
		}),
		// copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: CONFIG.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
	]
});
