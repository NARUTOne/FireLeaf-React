/**
 * webpack-dev-server
 */

var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('../webpack.dev.config.js');
var paths = require('./paths');

const proxyTable = paths.proxyTable;

const options = {
	hot: true,
  compress: true,
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, paths.buildPath),
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

server.listen(3001, 'localhost', function() {    
  console.log('dev server listening on port 3001');
  console.log(proxyList);
});