/**
 * some config
 */
var apiBaseUrl = '/';

if(process.env.NODE_ENV == 'development') {
  apiBaseUrl = '/';
}

module.exports = {
  apiBaseUrl,
  systemName: 'system name'
};