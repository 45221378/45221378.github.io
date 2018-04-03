import React, { Component } from 'react';
import { Link } from 'dva/router';
import { withRouter } from 'react-router-dom';

// import { InputItem, Picker, List, Toast } from 'antd-mobile';
// import { createForm } from 'rc-form';
import { Btn, FormItem } from './../../components';
import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
import validate from '../../utils/validate';
// import { connect } from 'dva';
import { Toast } from 'antd-mobile';



import './login.less'
const baseInfoFormValidate = validate({
    validateType: {
        mobile: 'm',
        shops: '*',
        password: 'pwd',
    },
    nullTip: {
        mobile: '请输入手机号',
        shops: '请选择商铺',
        password: '请输入密码',
    },
    errorTip: {
        m: '手机号格式不正确',
        shops: '',
        password: '密码格式不正确',
    }
});

// @connect(
//     (state) => ({})
// )
@reduxForm({
    form: 'loginForm',
    persistentSubmitErrors: true,
    initialValues: {
    },
    validate: baseInfoFormValidate,
    warn: (values) => {
        let warn = {};
        let error = baseInfoFormValidate(values);
        return warn;
    }
})

@withRouter
export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    getValues = (values) => {
        const { history, error, dispatch } = this.props;
        console.log(values);
        if (error) {
            Toast.info(error);
        }
    }
    render() {
        // console.log(this.props);
        const { handleSubmit } = this.props;
        const arr = [{ value: 'aaaa', label: '商铺1' }, { value: 'bbb', label: '请选择商铺2' }, { value: 'ccc', label: '请选择商铺3' }];
        return (
            <section className="login">
                <div className="login-header">
                    <i className="iconfont icon-logo2"></i>
                    <span className="text">商户端</span>
                </div>
                <form action="" className="login-form">
                    <label className="clearfix">
                        <i className="iconfont icon-shoujihao"></i>
                        {/* <input type="tel" name="" placeholder='请输入手机号' /> */}
                        <Field ref="mobile" component="input" className="login-account" type="tel" placeholder="请输入手机号" name="mobile" maxLength="11" />
                    </label>

                    <label>
                        <i className="iconfont icon-dianpu"></i>
                        {/* <SelectPick
                        er thisName="shops" arr={arr} extra="请选择商铺" thisForm={this.props.form} cols={1} /> */}
                        <Field initialValue='商铺1' initialId='aaaa' component={FormItem} extra="请选择商铺" name="shops" type="select" cols={1} arr={arr} />
                    </label>

                    <label className="clearfix">
                        <i className="iconfont icon-mima"></i>
                        {/* <input type="tel" name="" placeholder='请输入密码' /> */}
                        <Field ref="" component="input" className="login-account" type="password" placeholder="请输入密码" name="password" maxLength="20" />
                    </label>

                    <div className="btn-box">
                        <Btn className="login-btn" onClick={handleSubmit(this.getValues)}>登录</Btn>
                    </div>
                </form>
                <Link className="forget" key="findPsd" to="/findPsd">忘记密码？</Link>
            </section>
        )
    }
}
