import React, {Component} from 'react';
import Loadable from 'react-loadable';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LoadingPage from 'components/LoadingPage/';
import routers from './router.config';

const routerList = routers.map((item, index) => {
  console.log(item.component);
  const componentPage = Loadable({
    loader: () => import(`${item.component}`),
    // loader: () => import('../pages/Home/'),
    loading: LoadingPage
  });
  return <Route exact={!!item.exact} path={item.path} component={componentPage} key={'page' + index}/>;
});

class RouterList extends Component{
  render () {
    return (
      <BrowserRouter basename="/FireLeaf">
        <div className="wrapper">
          <Switch>
            {routerList}
            {/* <Route path="*" render={({ staticContext, ...props }) => <NotFound {...props} />} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default RouterList;
