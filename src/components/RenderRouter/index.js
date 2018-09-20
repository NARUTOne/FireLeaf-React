import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// PureComponent 采用导致Route无法更新
class RenderRouter extends Component {
  render() {
    return (
      <Switch>
        {this.props.routers.map((item, index) => {
          const ComponentPage = item.component;
          return <Route exact 
            path={item.path}
            render={props => <ComponentPage {...props} routers={item.children || []}></ComponentPage> }
            key={'page' + index + item.path}/>;
        })}
        <Route render={() => <Redirect to="/404" push/>} />
      </Switch>  
    );
  }
}

export default RenderRouter;

