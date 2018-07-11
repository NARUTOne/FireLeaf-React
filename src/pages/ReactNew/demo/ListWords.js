import React, {PureComponent} from 'react';

class ListWords extends PureComponent {
  render() {
    return <div>
      <h4>num: {this.props.num}</h4>
      {this.props.words.join(',')}
    </div>;
  }
}

export default ListWords;