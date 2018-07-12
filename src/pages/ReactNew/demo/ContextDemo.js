import React, {Component} from 'react';
import {Button} from 'antd';

// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('primary');

// 一个关于渲染属性API的问题是 refs 不会自动的传递给被封装的元素。为了解决这个问题，使用 React.forwardRef：
function ThemedButton(props) {
  // console.log(props);
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} type={theme} >ThemeContext-{theme}</Button>}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  // console.log(props);
  return (
    <div>
      <ThemedButton onClick={props.changeTheme}/>
    </div>
  );
}

class ContextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary'
    };
  }

  toggleTheme = () => {
    const {theme} = this.state;
    const newTheme = theme === 'primary' ? 'dashed' : 'primary';
    this.setState({theme: newTheme});
  }

  render () {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme}/>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default ContextDemo;