import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './index.less';
class ScrollTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render () {
    return (
      <div className="scroll-top">{this.props.children}</div>
    );
  }
}

export default withRouter(ScrollTop);
