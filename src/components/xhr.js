/**
 * NARUTOne create on 2017-10-25
 * @public
 * @name xhr
 * @param  {object} options 当前请求配置
 * @description xhr  base on whatwg-fetch
 *
 */

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const isArray = arr => Array.isArray(arr);

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function setData(params) {
  let sendData = params;
  if (isObject(sendData)) {
    sendData = Object.assign({}, sendData);
    sendData = Object.keys(sendData).map(key => {
      let value = sendData[key];
      if (isArray(value) || isObject(value)) {
        value = JSON.stringify(value);
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');
  }else {
    return new Error ('options.data is object type');
  }

  return sendData;
}

/**
 * Requests a URL, returning a promise.
 * @public
 * @name xhr.getUrl
 * @param  {object} [options] The options we want to pass to "fetch"
 * ```js
 *  options = {
 *    url: 'api',  //{string} url , The URL we want to request
 *    type: 'GET,
 *    baseUrl: 'http://',
 *    data: {},
 *    success: res => {},
 *    error: err => {}
 * }
 * ```
 * @return {object}  return an object containing either "data" or "err"
 */
export default function xhr(options) {
  if(!options) return new Error ('The options field is required, and the type is object, for XHR !');
  
  const opt = {
    method: (options.type || "GET").toUpperCase(),
     //  mode: 'cors',
    //  credentials: 'include', // response header Access-Control-Allow-Origin 必须为 * , https://github.com/whatwg/fetch/issues/251
    // credentials: 'same-origin', // cors，所以credentials设置为include，如果不跨域，那么same-origin就行了
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  };

  if(opt.method === 'POST' || opt.method === 'PUT') {
    opt.body = setData(options.data) || {};
  }

  // 线上 设置同源，获取cookie
  if(process.env.NODE_ENV == 'production') {
    opt.credentials = 'same-origin';
  }
  else {
    /**
     * 需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，
     * 其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
     */
    // opt.credentials = 'include'
    // opt.mode = 'cors'
  }

  /**
   * @public
   * @name xhr.getUrl
   * @param {object} options 当前请求配置
   * @description 实现动态 url
   * ```js
   * xhr.getUrl = option => [apiBaseUrl] + option.url
   * ```
   * @return {string} 返回实际请求 url
   */
  if (xhr.getUrl) { 
    options.url = xhr.getUrl(options);
  } else {
    /**
     * @public
     * @name xhr.baseUrl
     * @type {string}
     * @description 全局基础 URL，常用的场景是接口是另外的服务，方便统一设置路径, 默认使用脚手架中 src/utils/config 中的apiBaseUrl, 
     * 配置 xhr_config.js
     */
    options.url = xhr.baseUrl + options.url;
  }

  const apiUrl = options.url + '';

  return fetch(apiUrl, opt)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      const success = xhr.success || options.success;
      success && success(res, options);
    })
    .catch(err => {
      options.error && options.error(err);
      throw new Error(err);
    });
}
