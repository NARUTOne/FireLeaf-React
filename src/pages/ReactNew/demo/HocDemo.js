/**
 * !HOC高阶组件
 * ?高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
 */
import {Component} from 'react';

 // 函数接受一个组件参数……
function withHOC (WrappedComponent, data) {
  // ……返回另一个新组件……
  return class extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: data
      };
    }

    componentDidMount () {
      
    }

    componentWillUnmount () {
  
    }

    handleChange (data) {
      this.setState({
        data: data
      });
    }

    render() {
      // ……使用最新的数据渲染组件
      // 注意此处将已有的props属性传递给原组件
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

export default withHOC;