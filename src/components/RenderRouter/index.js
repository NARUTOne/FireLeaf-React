import React, {PureComponent} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

class RenderRouter extends PureComponent {
  render() {
    return (
      <Switch>
        {this.props.routers.map((item, index) => {
          const ComponentPage = item.component;
          return <Route exact 
            path={item.path}
            render={props => <ComponentPage {...props}></ComponentPage> }
           key={'page' + index}/>;
        })}
        <Route render={() => <Redirect to="/404" />} />
      </Switch>  
    );
  }
}

export default RenderRouter;

