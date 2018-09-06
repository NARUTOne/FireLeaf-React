'use strict';

const path = require('path');
const CONFIG = require('../config/index');

const pnamePath = CONFIG.PName ? (CONFIG.PName + '/').replace(/\/\//, '/') : '' ;

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir);
}; 

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? CONFIG.build.assetsSubDirectory
    : CONFIG.dev.assetsSubDirectory;

  return path.posix.join(pnamePath + assetsSubDirectory, _path);
};

exports.pnamePath = pnamePath;