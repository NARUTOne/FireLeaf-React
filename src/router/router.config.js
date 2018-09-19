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
import Loadable from 'react-loadable';

import LoadingPage from 'components/LoadingPage/';

// sync code splitting


const App = Loadable({
  loader: () => import('../pages/App/'),
  loading: LoadingPage
});

const Home = Loadable({
  loader: () => import('../pages/Home/'),
  loading: LoadingPage
});

const Todo = Loadable({
  loader: () => import('../pages/Todo/'),
  loading: LoadingPage
});

const NotFound = Loadable({
  loader: () => import('../pages/NotFound/'),
  loading: LoadingPage
});

// routers
export default [
  {
    redirectUrl: '/app/home',
    exact: true,
    path: '/'
  },
  {
    path: '/app',
    component: App,
    children: [
      {
        component: Home,
        title: '首页',
        path: '/app/home'
      },
      {
        component: Todo,
        title: 'todo',
        path: '/app/todo'
      },
    ]
  },
  {
    component: NotFound,
    path: '/404'
  },
  {
    component: NotFound
  }
];