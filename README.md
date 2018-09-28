# PROJECT NAME

:fire: :bug:

[构建过程](https://github.com/NARUTOne/blog-note/issues/26)

## 准备reading

### install

```sh
git clone </path/to/repository>

cd repository

npm install
```

### dev-running

```sh
# 默认 3001
npm start
# 或
npm start -p [port]
# webpack-dev
npm run dev

```

### build-dist

```sh
# 规范测试校验
npm run lint
# 打包
npm run build
```

## 脚手架目录

```sh

│  .babelrc                                   --- babel 配置
│  .eslintrc                                  --- eslint 配置
│  .stylelintrc                               --- stylelint 配置
│  favicon.ico
│  package.json
│  README.md
│  template.html                              --- html 模板
│  
├─build                                       --- webpack打包配置
│      utils.js
│      webpack.base.config.js
│      webpack.dev.config.js
│      webpack.prod.config.js
│
├─config                                      --- 项目变量配置
│      dev.env.js
│      prod.env.js
│      theme.js
│
├─script                                      --- 项目脚本
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      prod.js
│      server.js
│
├─src
│  │ index.js                                 --- 入口文件
│  │  
│  ├─api                                      --- xhr接口调用逻辑
│  │
│  ├─components                               --- 组件
│  │  
│  ├─mock                                     --- mock 数据
│  ├─pages                                    --- pages 页面
│  │  ├─App
│  │  ├─Home
│  │  ├─Login
│  │  ├─NotFound
│  │  ├─RouterDemo
│  ├─router                                    --- 路由配置
│  │      BrowsweRouter.js
│  │
│  │      router.config.js
│  │
│  ├─sagas                                      --- redux-saga
│  │
│  │      login.js
│  │
│  ├─store                                      --- react-redux
│  │  │
│  │  │  types.js
│  │  │  
│  │  ├─action
│  │  │
│  │  │      login.action.js
│  │  │
│  │  └─reducer
│  ├─style                                      --- 项目的样式存放目录，主要采用less编写
│  │  │  base.less
│  │  │  index.less
│  │  │  variables.less
│  │  │  
│  │  ├─pages
│  │  └─utils
│  │          antd-cover.less
│  │
│  └─utils                                       --- 项目工具
│          auth.js
│          config.js
│          history.js
│          tools.js
│          xhr.config.js
│          xhr.js
│
└─static                                         --- 静态资源
    │  .gitkeep
    │  
    └─imgs
            login_bg.svg
            logo-00.png
            logo-fff.png
            logo.png

```

> 待完善...

## DEMO示例 (线上查看敬请期待:smile:)

- [https://github.com/NARUTOne/redux-react-demo](https://github.com/NARUTOne/redux-react-demo)

## 参考

> 本项目默认安装了 antd-design

- [antd-design](https://ant.design/docs/react/introduce-cn)

## 日志

[LOG](./CHANGE.md)