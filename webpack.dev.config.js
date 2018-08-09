/**
 * webpack dev config
 */

const webpack = require('webpack');
const path = require('path');

const merge = require('webpack-merge'); // 为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 配置html
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); // 打开浏览器 

const paths = require('./script/paths');
const baseConfig = require('./webpack.base.config.js');
const port = process.argv.slice(2)[0] || 3001;

const pnamePath = paths.PName ? (paths.PName + '/').replace(/\/\//, '/') : '' ;

module.exports = merge.smart(baseConfig, {
	cache: true,
	output: {
		filename: pnamePath +'static/js/[name].[hash:8].js'
	},
	devtool: '#cheap-module-eval-source-map',
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
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'template.html',
			inject: true,
			favicon: path.join(__dirname, 'favicon.ico')
		})
	]
});

