/*
* npm run build
*/

var ora = require('ora'); // 终端 spinner
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var paths = require('./paths');
var webpackConfig = require('../webpack.prod.config.js');

process.env.NODE_ENV = 'production';

var spinner = ora('building for production...');
spinner.start();
 
rm(path.join(path.resolve(__dirname), '..', paths.buildPath), err => {
  if (err) throw err;
  console.log(chalk.cyan('build step 1'));
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    console.log(chalk.cyan('build step 2'));
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});