import React from 'react';
import { Link } from 'dva/router';
import { Button, InputItem, Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import Btn from './../../components/Button/Button';

import './login.less'

@createForm()
export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
      return(
          <section className="container login">
               <div className="login-header">
                  <i className="iconfont icon-logo2"></i>
                  <span className="text">商户端</span>
               </div>
               <form action="" className="login-form">
                  <label className="clearfix">
                      <i className="iconfont icon-shoujihao"></i>
                      <input type="tel" name="" placeholder='请输入手机号' />
                  </label>
                  <label className="clearfix">
                      <i className="iconfont icon-mima"></i>
                      <input type="tel" name="" placeholder='请输入密码' />
                  </label>
                <div className="btn-box">
                      <Btn className="login-btn">登录</Btn>
                </div>
               </form>
                <Link className="forget" to='/'>忘记密码？</Link>
          </section>
      )
    }
}
