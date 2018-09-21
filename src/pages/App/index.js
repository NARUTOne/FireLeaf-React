import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import RenderRouter from '@/components/RenderRouter/';
import {Layout} from 'antd';

import AHeader from './AHeader';
import ASider from './ASider';
import ABody from './ABody';
import AFooter from './AFooter';

class App extends Component {
  constructor () {
    super();
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const {match, routers} = this.props;
    const path = match.path;
    return (
      <div className="page">
        <Layout>
          <ASider collapsed={this.state.collapsed} path={path}></ASider>
          <Layout>
            <AHeader toggle={this.toggle} open={this.state.collapsed}></AHeader>
            <ABody>
              <div className="page-body">
                <RenderRouter routers={routers}></RenderRouter>
              </div>              
            </ABody>
            <AFooter></AFooter>
          </Layout>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(App);