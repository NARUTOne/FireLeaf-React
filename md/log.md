# 更新日志 :bug:
> :fire: xj-web-scaffold 更新日志

## v.0.5.3

`2018-02-22`

> 添加业务图标，项目中可以按需添加所需图标; 

- 添加参考：http://www.cnblogs.com/bldxh/p/6360064.html
- 图标参考：http://iconfont.cn
- 添加 `MyIcon`组件，修改业务图标时，注意修改其下的less文件

## v.0.5.2

`2018-02-05`

> 优化布局，添加主题theme:  `drak`、`light`、 `default`

## v.0.5.1

`2018-02-01`

> 添加代码编辑规范 `.editorconfig`, `.eslintignore`, `.eslintrc`, `.stylelintrc`;
> 目前的默认一些代码编写规范，大部分都是采用下列其中的默认规范，***可自定义定义规范，但不建议，代码保持统一规范有益于维护、可读哦 :blush:**

- http://eslint.cn/
- https://stylelint.io/
- http://editorconfig.org/

```
$ npm install babel-eslint eslint-plugin-react eslint stylelint stylelint-config-standard --save-dev

```

## v.0.5

`2018-01-29`

> 从`0.5`之后，脚手架再不默认提供示例，demo示例移动到 https://github.com/NARUTOne/redux-react-demo

- 修改 `head nav` ， 并动态支持 `mobile` 下显示
- 修改 `logo` 图片
- 修改优化`webpack`打包配置, 加入缓存，提出公共依赖等优化。

## v.0.4.4 

`2018-01-17`

- 修复 `xhr`下的 `GET` 模式下的 `TypeError: HEAD or GET Request cannot have a body`
- 微调部分样式及全局默认布局配色
- 升级antd到`3.1.2`，修复antd版本造成的bug

## v.0.4.3 

`2018-01-04`

- 添加 `xhr`下的 `opt.xhr.baseUrl` 为某些个性化接口配置 `url`
- 微调部分样式及全局默认配色
- 添加项目名配置`script/paths` 及 `utils/config` 下的 `PName`，配合打包及前端路由配置项目名

## v0.4.2

`2017-12-16`

- 设置 `nav` 及 `system name` 配置与 `utils/config`
- 添加 开发文件模板 `pages/template`

## v0.4.1

`2017-12-15`

- 修复 `browserhistory`下的 `Breadcrumb` 路径切换问题
- `tools`工具库中添加 `arrayTreeCallBack` 方法，处理树形数据问题

## v0.4.0

`2017-12-10`

- 修改 `xhr`配置，添加 cookie同源配置
- `antd` 升级到 3.0.0
- `react/react-dom` 升级到 16.2.0
- `react-router` 升级到 3.2.0

## v0.3.1

`2017-11-22`

- 更新 `Rechats` 组件，暂时不支持 `map` 展示。

- 更新 `xhr` 交互方式， 创建 `xhr_config.js` 配置文件， 全局设置。

- 修改 `head` 添加导航  `nav` 并支持 响应式

## v0.3

`2017-11-21`

- 新增theme色调修改：`script/theme.js`，采用less 变量的形式，修改 antd 组件主题。
[Errors when importing antd.less using less-loader #7850](https://github.com/ant-design/ant-design/issues/7850)
[定制主题中单独使 webpack 进行 theme 定制的更改步骤补充 #8035](https://github.com/ant-design/ant-design/pull/8035/commits/7fef8e993a0049579d3a00de4691efef255127b6)

- 修改webpack样式配置。

- 抽出公共样式为变量，全局设置 `utils/style`。

- 脚手架设置两种布局方式：
![](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/xj-web-scaffold/layout1.png)
![](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/xj-web-scaffold/layout2.png)

```js
// import HeaderToggle from './headerToggle/'
import Head from './head'

...

let comment = <Layout  key="layout" className='layout-row'>
      {/*<SiderCustom  key="sider" path={routes[1].path} collapsed={this.state.collapsed} />*/}
      <Layout  key="layout-content">
        {/*<HeaderToggle key="header" location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/>*/}
        <Head key="header" location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/>
        <Body key="body">
          <Breadcrumb routes={routes} params={params} separator=">" style={{padding: '0 8px 8px'}}/>
          {children}
        </Body>
        <Foot  key="footer"/>
      </Layout>
    </Layout>
    
```

## v0.2

`2017-11-08`

- 新增Redux, 对一些公共部分放入 全局store

- 修改登录模式，采用Redux

## v0.1.2

`2017-11-06`

- 添加paths, 用于存储一些公共配置path

- 修改登录flex布局bug

## v0.1.1

`2017-11-03`

- 添加promise，解决IE下的未定义bug

- 修复flex布局，IE下失效问题

## v0.1.0 

`2017-10-31`

- xj-web-scaffold 正式启动，并暂时不进行开源，放入内网gitLab 
  地址: [xj-web-scaffold](http://172.168.0.114:8089/wuzhong/xj-web-scaffold)

- 脚手架默认支持 `fontawesome` 图标 `<IconFont/>`， 补充 `antd` 的 `Icon`

- 脚手架默认自带 `echarts` 支持组件 `<Recharts />`

  