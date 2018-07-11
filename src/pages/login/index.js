import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import { Layout, Form, Icon, Input, Button, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction } from 'src/action/';
import {systemName, PName} from 'utils/config';
import './index.less';

const {
  loginPending,
  loginSuccess,
  loginError
} = loginAction;

const { Content } = Layout;
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.loginPending();
        new Promise((resolve, reject) => {
          if(values.userName == 'admin' && values.password == 'admin') {
            resolve(values);
          }
          else {
            const err = '用户名或密码错误！';
            reject(err);
          }
        }).then((data) => {
          this.props.loginSuccess(data);
          browserHistory.push(PName + '/todo');
        }).catch((err) => {
          this.props.loginError(err);
        });
      }
    });
  }

  render() {
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
                  <FormItem label='用户名'>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                  </FormItem>
                  <FormItem label='密码'>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
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
  user: PropTypes.object,
  isLogin: PropTypes.bool,
  isLoggingIn: PropTypes.bool
};

function mapStateToProps(state) {
  const {login} = state;
  return Object.assign({}, login);
}

function mapDispatchToProps(dispatch) {
  return {
    loginPending: bindActionCreators(loginPending, dispatch),
    loginSuccess: bindActionCreators(loginSuccess, dispatch),
    loginError: bindActionCreators(loginError, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));