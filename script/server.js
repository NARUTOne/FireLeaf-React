/**
 * @type: express + webpack-dev-middleware
 * @cli: npm start
 * @server: localhost:3001
 */

var express = require('express');
var path = require('path');
var webpack = require('webpack');
var rm = require('rimraf');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('../webpack.dev.config.js');
var paths = require('./paths');

var app = express();
var port = process.argv.slice(2)[0] || 3001;

var uri = 'http://localhost:' + port;
 
rm.sync(path.resolve(__dirname, '..', paths.buildPath));

const compiler = webpack(WebpackConfig);

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: WebpackConfig.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(devMiddleware);
/**
 * browserHistory 下，静态资源加载
 */
// //加载指定目录静态资源 
var resourcePath = path.resolve(__dirname, '..', paths.buildPath);
app.use(express.static(resourcePath));
// //配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
// 这个需要动态修改index.html
app.get('*', function(req, res) {
  // res.sendFile(path.resolve(resourcePath, 'index.html'))
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return console.error(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, function () {
  console.log('Server listening on ' + uri + ', Ctrl+C to stop');
});