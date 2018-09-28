import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button } from 'antd';
import {loginAction} from '@/store/action/';
import {systemName} from 'utils/config';

const FormItem = Form.Item;
const {toLogin, loginError} = loginAction;

class Login extends Component {
  constructor () {
    super();
    this.state = {};
  }

  // static getDerivedStateFromProps (nextProps) { // nextProps, prevState
  //   return {};
  // }

  componentDidUpdate () {
    const {user, isLogin} = this.props;

    if (user && isLogin) {
      this.props.history.push('/app/home');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        new Promise((resolve, reject) => {
          if(values.userName == 'admin' && values.password == 'admin123') {
            resolve(values);
          }
          else {
            const err = '用户名或密码错误！';
            reject(err);
          }
        }).then((data) => {
          console.log(data);
          this.props.toLogin(data);
          // this.props.history.push('/app/home');
        }).catch((err) => {
          this.props.loginError(err);
        });
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-row">
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
              <span className='right'>Password：admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {

};

const mapStateToPorps = state => {
  const {login} = state;

  return Object.assign({}, login);
};

function mapDispatchToProps (dispatch) {
  return {
    toLogin: (params) => {
      toLogin(params, dispatch);
    },
    loginError: bindActionCreators(loginError, dispatch)
  };
}

export default connect(mapStateToPorps, mapDispatchToProps)(withRouter(Form.create()(Login)));