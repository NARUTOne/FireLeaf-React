import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

class ABody extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { children } = this.props;
    return (
      <Content className="body">
        {children}
      </Content>
    );
  }
}

export default ABody;