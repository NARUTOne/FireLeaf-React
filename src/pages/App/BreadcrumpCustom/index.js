import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { Breadcrumb } from 'antd';
class BreadcrumbCustom extends Component {
  mapRouters (url) {
    return this.props.mapData.find(item => item.path === url);
  }

  renderBreadcrumb () {
    const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const current = this.mapRouters(url);
      return (
        <Breadcrumb.Item key={url}>
          {(current && current.disabled) ? current.title : <Link to={url}>
            {current ? current.title : 'no title'}
          </Link>}
        </Breadcrumb.Item>
      );
    });

    // const defaultBreadcrumb = [(
    //   <Breadcrumb.Item key="/">
    //     <Link to="/">/</Link>
    //   </Breadcrumb.Item>
    // )];

    const breadcrumbItems = [].concat(extraBreadcrumbItems);
    return breadcrumbItems;
  }

  render () {
    const breadcrumbs = this.renderBreadcrumb();
    return (
      <div className="a-breadcrumb">
        <Breadcrumb separator=">">
          {breadcrumbs}
        </Breadcrumb>
      </div>
    );
  }
}

BreadcrumbCustom.propTypes = {
  mapData: PropTypes.array
};

export default withRouter(BreadcrumbCustom);