import React, {Component} from 'react';
import RenderRouter from '@/components/RenderRouter/';

class DEMOPage extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const {routers} = this.props;

    return (
      <div className="demo-page">
        <RenderRouter routers={routers}></RenderRouter> 
      </div>
    );
  }
}

export default DEMOPage;