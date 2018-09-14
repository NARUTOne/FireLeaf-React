import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollTop from 'components/ScrollTop/';
import routers from './router.config';

const routerList = routers.map((item, index) => {
  // console.log(item.component);
  const componentPage = item.component;
  return <Route exact={!!item.exact} path={item.path} component={componentPage} key={'page' + index}/>;
});

class RouterList extends Component{
  render () {
    return (
      <BrowserRouter basename="/FireLeaf">
        <ScrollTop>
          <div className="wrapper">
            <Switch>
              {routerList}
              {/* <Route path="*" render={({ staticContext, ...props }) => <NotFound {...props} />} /> */}
            </Switch>
          </div>
        </ScrollTop>
      </BrowserRouter>
    );
  }
}

export default RouterList;
