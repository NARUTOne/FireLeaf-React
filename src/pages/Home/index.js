import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Button} from 'antd';

class Home extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="home">
        <h2>Home</h2>
        <Link to='/app/todo'>TODO</Link><br/>
        <Link to='/404'>404</Link><br/>
        <NavLink to="/app/home" activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}>home</NavLink>
        <h3>ant-components</h3>
        <Button type="primary">Primary</Button>
      </div>
    );
  }
}

export default Home;
