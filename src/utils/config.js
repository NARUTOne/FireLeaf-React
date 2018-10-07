/**
 * some config
 */
var apiBaseUrl = '/';

if(process.env.NODE_ENV == 'development') {
  apiBaseUrl = 'https://easy-mock.com/mock/5abcaca669ca000c0358d08a/FLVAdmin/';
}

module.exports = {
  apiBaseUrl,
  systemName: 'Fire Leaf 🍂'
};