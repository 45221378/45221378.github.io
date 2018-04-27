import React from 'react';
// import { Link } from 'dva/router';
// import { InputItem, Picker, List } from 'antd-mobile';
import { Btn, FormItem } from '../../../components';
import { reduxForm, Field } from 'redux-form';
import validate from '../../../utils/validate';
// import { connect } from 'react-redux';
// import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import ajax from '../../../utils/ajax'
// import cache from './../../../utils/cache';
// import store from '../../index';
import { withRouter } from 'dva/router';


import './changePsd.less'


const baseInfoFormValidate = validate({
    validateType: {
        password: 'password',
        nowpassword: 'password'
    },
    nullTip: {
        password: '请输入原始密码',
        nowpassword: '请输入新密码'
    },
    errorTip: {
        password: '密码格式不正确',
    }
});
@withRouter
@reduxForm({
    form: 'changePsdForm',
    persistentSubmitErrors: true,
    initialValues: {
    },
    validate: baseInfoFormValidate,
    // warn: (values) => {
    //     let warn = {};
    //     let error = baseInfoFormValidate(values);
    //     return warn;
    // }
})

export default class ChangePsd extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
    }
    componentWillMount(){
        this.props.reset();
    }
    submit = (values) => {
        // const { getState } = store;
        // const info = getState();
        const { error } = this.props;
        if (error) {
            Toast.info(error);
        } else {
            ajax({
                method: 'post',
                url: ' /mobile/changePwd',
                data: {
                    nowpassword: values.nowpassword,
                    // organId: organId,
                    password: values.password,
                    // phone: phone,
                    // token: token
                }
            }).then((response) => {
            //    console.log(response);
                Toast.info('修改成功',2,()=>{this.props.history.push('/login')});
            })
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <section className="changePsd">
                <form className="form">
                    <Field className="form-item" component={FormItem} title="原始密码" name="password" type="password" maxLength="20" placeholder="请输入原始密码" />
                    <Field className="form-item" component={FormItem} title="新密码" name="nowpassword" type="password" maxLength="20" placeholder="请输入6-20位新密码" />
                    <Btn className="submit" onClick={handleSubmit(this.submit)}>确定</Btn>
                </form>
            </section>
        );
    }
}