import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import routers from '@/router/router.config';
import {arrayTreeCallBack} from 'utils/tools';

class BreadcrumbCustom extends Component {
  mapRouters (url) {
    let current = null;
    arrayTreeCallBack(routers, (item) => {
      if (url === item.path) {
        current = item;
      }
      return item;
    });

    return current;
  }

  renderBreadcrumb () {
    const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const current = this.mapRouters(url);
      return (
        <Breadcrumb.Item key={url}>
          {(current && current.disabled) ? current.title : <Link to={url}>
            {current.title}
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

export default withRouter(BreadcrumbCustom);