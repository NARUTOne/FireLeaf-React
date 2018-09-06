/**
 * webpack-dev-server
 */

var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('../build/webpack.dev.config.js');
var CONFIG = require('../config/index');

var proxyTable = CONFIG.dev.proxyTable;
var port = process.argv.slice(2)[0] || CONFIG.dev.host;

var options = {
  hot: true,
  compress: true,
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, CONFIG.build.buildPath),
  publicPath: devConfig.output.publicPat,
  host: 'localhost',
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    modules: false,
    chunks: false,
    colors: true
  },
  // open: true, // autoOpenBrowser
  proxy: proxyTable,
  quiet: true // necessary for FriendlyErrorsPlugin
};

WebpackDevServer.addDevServerEntrypoints(devConfig, options);
const compiler = webpack(devConfig);
const server = new WebpackDevServer(compiler, options);

// proxy api requests
let proxyList=[];
if(Array.isArray(proxyTable)) proxyList = [...proxyList, proxyTable];
else Object.keys(proxyTable).forEach(function (context) {
  proxyList = [...proxyList, `Proxy created: ${context} -> ${proxyTable[context].target}`];
});

server.listen(port, 'localhost', function () {    
  console.log('dev server listening on port ' + port);
  console.log(proxyList);
});