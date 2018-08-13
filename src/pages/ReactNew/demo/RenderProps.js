/*
 * @File: RenderProps.js
 * @Project: xj-web-scaffold
 * @File Created: Monday, 13th August 2018 2:57:53 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Monday, 13th August 2018 2:57:57 pm
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
 *     |      | 神兽保佑
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

 // !术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间共享代码的简单技术。
 // ? 组件能够知道什么需要渲染的任何函数 prop 在技术上都是 “render prop” 

 /**
  *  ? children prop
  *   <Mouse>
        {mouse => (
          <p>The mouse position is {mouse.x}, {mouse.y}</p>
        )}
      </Mouse>
  */

import React, {Component} from 'react';
import logoImg from 'public/logo.png';

class LogoImg extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src={logoImg} style={{ position: 'absolute', left: mouse.x-200, top: mouse.y-300, width: '100px', height: '100px'}} />
    );
  }
}

/**
 * ! 在 React.PureComponent 中使用 render props 要注意
 * class Mouse extends React.PureComponent {
    // Same implementation as above...
  } 
 * ? 定义一个 prop 作为实例方法
  <Mouse render={this.renderTheCat} /> 
 */

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '300px', border: '1px solid #e3e3e3' }} onMouseMove={this.handleMouseMove}>

        {/* ...but how do we render something other than a <p>? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        {/* render prop 以让 <Mouse> 能够动态决定什么需要渲染 */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        {/* HOC with render prop */}
        <Mouse render={mouse => (
          <LogoImg mouse={mouse} />
        )}/>
      </div>
    );
  }
}

class RenderProps extends Component {
  render () {
    return (<div>
      <MouseTracker></MouseTracker>
    </div>);
  }
}

 export default RenderProps;