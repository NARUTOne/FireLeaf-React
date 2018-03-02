import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon, Timeline } from 'antd';
import './index.less';

class List extends Component {

  change(type, index) {
    this.props.onChange(type, index);
  }

  render() {
    const { data } = this.props;
    return (
      <Timeline className="todos__list">
        {data.map((item, i) => (
          <Timeline.Item key={i}>
            {item}
            <Icon type="close" className='line-delete' onClick={() => {
              this.change('splice', i);
            }} />
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }
}

List.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default List;