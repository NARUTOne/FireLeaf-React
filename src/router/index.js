import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import ScrollTop from '@/components/ScrollTop/';
import routers from './router.config';
import BrowserRouter from './BrowsweRouter';

const routerList = routers.map((item, index) => {
  // console.log(item.component);
  const ComponentPage = item.component;
  if (item.path) {
    if (item.children && item.children.length) {
      return <Route
        exact={item.exact}
        path={item.path} 
        render={(props) => <ComponentPage {...props} routers={item.children}/>} 
        key={'page' + index + item.path}/>;
    }
    return <Route
      exact={item.exact}
      path={item.path} 
      render={(props) => item.redirectUrl ? <Redirect to={item.redirectUrl} push /> :<ComponentPage {...props}/>}  
      key={'page' + index + item.path}/>;
  }
  return <Route component={ComponentPage} key={'page' + index}/>;
});

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  console.log(message);
  callback(allowTransition);
};

class RouterList extends Component{
  render () {
    return (
      <BrowserRouter basename="/FireLeaf" getUserConfirmation={getConfirmation}>
        <ScrollTop>
          <div className="wrapper">
            <Switch key={Math.random()}>
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
