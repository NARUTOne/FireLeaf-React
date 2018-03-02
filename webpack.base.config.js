/**
 * webpack base config
 */

const path = require('path');
var webpack = require('webpack');

// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var paths = require('./script/paths');
const pnamePath = paths.PName ? (paths.PName + '/').replace(/\/\//, '/') : '' ;

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
	target: 'web', // 构建目标
	entry: {
		app: [ path.resolve(__dirname, 'script/polyfills.js'), path.resolve(__dirname, 'src/index.js')]
	},
	output: {
    path: path.resolve(__dirname, paths.buildPath),
		publicPath: '/',  // 外部资源 url
		chunkFilename: pnamePath +'static/js/[id].[chunkhash:8].js' // chunk生成的文件名,按需加载
	},
	module: {
		rules: [
			{
        test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, "public")],
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
				test: /\.(png|jpe?g|gif|svg|eot|woff|woff2?|ttf|otf)(\?.*)?$/,
				use: [
          {
            loader: 'file-loader',
            options: {
							name: pnamePath +'static/media/[name].[hash:8].[ext]'
						}
          }
				]
			},
			{
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
			{
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
            },
            {
							loader: 'postcss-loader',
							options: {
								"sourceMap": true,
							}
            },
            {
              loader: 'less-loader',
              options: {
								"sourceMap": true,
								"modules": false,
                "modifyVars": theme
              }
            }
          ]
        })
      }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
    alias: {
      public: path.resolve(__dirname, './public'),
      src: path.resolve(__dirname, './src'),
      utils: path.resolve(__dirname, './src/utils'),
      components: path.resolve(__dirname, './src/components'),
    }
	},
	plugins: [
    // new CleanWebpackPlugin(['dist']), // 清除 测试dist
		new webpack.NoEmitOnErrorsPlugin(), // 2.x以上；编译时出错，跳过，编译后保错
		new ExtractTextPlugin({ // 提取出css模块，到公共文件.css
			filename: pnamePath +'static/css/[name].[contenthash].css',
			disable: false,
			allChunks: true
		}),
	]
};

module.exports = baseConfig;