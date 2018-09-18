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
        <h3>home</h3>
        <Link to='/todo'>TODO</Link><br/>
        <NavLink to="/home" activeStyle={{
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
