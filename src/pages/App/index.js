import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RenderRouter from '@/components/RenderRouter/';

class App extends Component {
  constructor () {
    super();
    this.state = {

    };
  }

  render () {
    const {routers} = this.props;
    return (
      <div className="page">
        <h1>APP</h1>
        <Link to="/app/home">Home</Link><br/>
        <Link to="/app/todo">TODO</Link>
        <div className="body">
          <RenderRouter routers={routers}></RenderRouter>
        </div>
      </div>
    );
  }
}

export default App;