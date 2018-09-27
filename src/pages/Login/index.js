import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Layout, Form, Icon, Input, Button, Row, Col } from 'antd';
import {systemName} from 'utils/config';

const { Content } = Layout;
const FormItem = Form.Item;

class Login extends Component {
  constructor () {
    super();
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        new Promise((resolve, reject) => {
          if(values.userName == 'admin' && values.password == 'admin') {
            resolve(values);
          }
          else {
            const err = '用户名或密码错误！';
            reject(err);
          }
        }).then((data) => {
          console.log(data);
          this.props.history.push('/app/home');
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Content>
         <Row className="login-row" type="flex" justify="space-around" align="middle">
          <Col span="8">
            <div className='login-box'>
              <div className='login-logo'>
                {systemName}
              </div>
              <div className='login-form'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem label='用户名😁'>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '请输入用户名!' }]
                    })(
                      <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />
                    )}
                  </FormItem>
                  <FormItem label='密码🔒'>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>                 
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登 录
                    </Button>
                  </FormItem>
                </Form>
                <p className='login-example'>
                  <span>Username：admin</span>
                  <span className='right'>Password：admin</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

Login.propTypes = {

};

export default withRouter(Form.create()(Login));