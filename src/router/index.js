import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home/';
import Todo from '../pages/Todo/';
import NotFound from '../pages/NotFound/';

class RouterList extends Component{
  render () {
    return (
      <BrowserRouter basename="/FireLeaf">
        <div className="wrapper">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/home" component={Home} />
            <Route path="/todo" component={Todo} />
            <Route path="/todo" component={NotFound} />
            {/* <Route path="*" render={({ staticContext, ...props }) => <NotFound {...props} />} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default RouterList;
