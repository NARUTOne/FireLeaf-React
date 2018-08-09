import React, { Component } from 'react';
import List from './List';
import {Input, Button } from 'antd';
import MyIcon from 'components/MyIcon';

import './index.less';

class Todos extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      list: []
    };
  }

  handleListChange = (type, index) => {
    const {list} = this.state;
    list.splice(index, 1);
    
    this.setState({list});
  }

  handleAdd() {
    const {list, text} = this.state;    
    list.push(text);
    
    this.setState({list});
  }

  render() {
    const { state } = this;
    const { text, list } = state;
    return (
      <div className="todos">
        <h1>TODOsaf</h1>
        <MyIcon type='food'/>
        <div className='todo-box'>
          <Input style={{width: 200}} addonBefore='/' value={text} onChange={e => this.setState({'text': e.target.value})}/>
          <Button onClick={() => {this.handleAdd();}} type="primary">添加</Button>
        </div>        
        <List data={list} onChange={this.handleListChange} />
      </div>
    );
  }
}

export default Todos;