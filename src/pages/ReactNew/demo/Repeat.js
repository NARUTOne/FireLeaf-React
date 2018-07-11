import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

function Child (props) {
  const items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div ref={props.childRef}>{items}</div>;
}

class Repeat extends PureComponent { // 使用React.PureComponent进行浅比较，是否渲染更新组件；但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。
  constructor (props) {
    super(props);
    this.state = {
      num: 10
    };
    this.childEle = null;
    this.textInput = null;
    // 16.3+, 不能用于 函数组件
    this.myRef = React.createRef(); // const node = this.myRef.current;

    this.setTextInputRef = element => {
      this.textInput = element;
    };
  }

  componentDidMount () {
    const {num} = this.props;
    this.setState({num});
  }

  render () {
    const {num} = this.state;
    return (
      <div className="repeat" ref={this.myRef}>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <Child numTimes={num} childRef={(el) => this.childEle = el}>
          {(index) => <div key={index}>This is item {index} in the list</div>}
        </Child>
      </div>  
    );
  }
}

Repeat.defaultProps = {
  num: 10
};

Repeat.prototypes = {
  num: PropTypes.number.isRequired
};

export default Repeat;
