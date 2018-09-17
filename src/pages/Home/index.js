import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

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
        <Link to='/todo'>TODO</Link><br/>
        <NavLink to="/home" activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}>home</NavLink>
      </div>
    );
  }
}

export default Home;
