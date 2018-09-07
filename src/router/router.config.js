/*
 * @File: router.config.js
 * @Project: fireleaf-react-scaffold
 * @File Created: Friday, 7th September 2018 5:57:23 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 7th September 2018 5:57:42 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2018 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * router config
 */

export default [
  {
    component: '../pages/Home/',
    exact: true,
    path: '/'
  },
  {
    component: '../pages/Home/',
    path: '/home'
  },
  {
    component: '../pages/Todo/',
    path: '/todo'
  },
  {
    component: '../pages/NotFound/',
    path: '/404'
  }
];