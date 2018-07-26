import React, {Component} from 'react';
import {Button} from 'antd';

// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('primary');

const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};

const ThemeContextToggle = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

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

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅接收 theme 属性
  // 也接收了一个来自 context 的 toggleTheme 函数
  return (
    <ThemeContextToggle.Consumer>
      {({theme, toggleTheme}) => (
        <Button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </Button>
      )}
    </ThemeContextToggle.Consumer>
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

// 

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

class ContextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary',
      toggleTheme: this.toggleTheme,
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
        <ThemeContextToggle.Provider value={this.state}>
          <Content />
        </ThemeContextToggle.Provider>
      </div>
    );
  }
}

export default ContextDemo;