# PROJECT NAME

:fire: :bug:

- webpack: 3.8.1
- react: ^16.4.1
- react-router: ^3.2.1
- antd: ^3.1.2

独立的前端代码包，接通数据源后（`src/utils/config.js`）即可本地运行，放置服务器后端环境下即可部署

## 安装

```sh
$ git clone </path/to/repository>

$ cd repository

$ npm install
```

## 本地开发环境运行

```sh
$ npm start

或

$ npm start -p [port]
```

## 打包发布

```sh
$ npm run build
```

## DEMO示例 (线上查看敬请期待:smile:)

- [https://github.com/NARUTOne/redux-react-demo](https://github.com/NARUTOne/redux-react-demo)

## 脚手架目录

```

|-- md                                 // 脚手架文档
|-- script                             // 项目构建, 环境path, 主题等
|-- src                                // 项目源码
|   |-- action                         // redux的action
|   |-- components                     // 业务组件
|   |-- mock                           // 开发数据源
|   |-- pages                          // 业务界面
|       |-- app                        // 单页入口（布局）
|       |-- home                       // 默认首页
|       |-- notFound                   // 404页
|       |-- template                   // react组件模板（简易）
|       |-- ...
|   |-- reducer                        // redux的reducer
|   |-- utils                          // 公共集合（配置，样式，工具）
|       |-- style                      // 公共样式（less 变量）
|       |-- config                     // 项目业务配置
|       |-- tools                      // 工具方法
|   |-- index                          // 项目入口
|   |-- router                        // 路由配置
|   |-- xhr_config                    // xhr组件全局配置
|-- public                             // 项目静态文件
|-- .babelrc                           // babel配置
|-- .editorconfig                      // 定义代码格式
|-- .eslintrc                          // eslint代码规范
|-- .stylelintrc                       // stylelint样式规范
|-- package.json                       // 项目基本信息
|-- template.html                      // html 模板
|-- webpack.base.config.js             // webpack基础配置
|-- webpack.dev.config.js             // webpack开发配置
|-- webpack.prod.config.js             // webpack生产配置

```

## 参考

> 本项目默认安装了 antd-design

- [antd-design](https://ant.design/docs/react/introduce-cn)

## 日志

[LOG](./md/log.md)