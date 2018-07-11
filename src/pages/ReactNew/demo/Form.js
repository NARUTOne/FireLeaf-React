import React, {Component} from 'react';

// 非受控组件，从DOM获取数据

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.input.value);
    console.log(
      `Selected file - ${this.fileInput.files[0].name}`
    );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" defaultValue="Bob" ref={(input) => this.input = input} />
        </label>
        <label>
          Upload file:
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}

          />
          </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;