import React, {Component} from 'react';
import Repeat from './demo/Repeat';
import NameForm from './demo/Form';
import ListWords from './demo/ListWords';
import ContextDemo from './demo/ContextDemo';
import FregmentBox from './demo/FregmentBox';
import PortalsBox from './demo/PortalsBox';
import {Button} from 'antd';

import './index.less';

class NewChange extends Component {
  constructor (props) {
    super(props);
    this.state = {
      words: ['marklar'],
      wordsNum: 1
    };
  }

  handleAdd = () => {
    const {words} = this.state;
    // words.push('marklar');
    const arr = [...words, 'marklar'];
    this.setState({words: arr});
  }

  handleUpdate = () => {
    const {wordsNum} = this.state;
    const num = wordsNum + 1;    
    // wordsNum ++;
    this.setState({wordsNum: num});
  }

  render () {
    return (
      <div className="react-new-change">
        <h3>ReactJS 16.4 学习</h3>
        <div>
          <h4>PureComponent</h4>
          <ListWords words={this.state.words} num={this.state.wordsNum}></ListWords>
          <Button onClick={this.handleAdd} type="primary">单词添加</Button>
          <Button onClick={this.handleUpdate} >数字更新</Button>
        </div>
        <div>
          <h4>React.forwardRef</h4>
          <Repeat num={10}/>
        </div>
        <div>
          <h4>函数式ref</h4>
          <NameForm></NameForm>
        </div>
        <div>
          <h4>context</h4>
          <ContextDemo></ContextDemo>
        </div>
        <div>
          <h4>React.Fregment</h4>
          <FregmentBox></FregmentBox>
        </div>
        <div>
          <h4>Portals</h4>
          <div id="app-root">
            <PortalsBox></PortalsBox>
          </div>
          <div id="modal-root"></div>
        </div>
      </div>
    );
  }
}

export default NewChange;