import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="home">
        <h3>home</h3>
        <Link to='/todo'>TODO</Link>
      </div>
    );
  }
}

export default Home;
