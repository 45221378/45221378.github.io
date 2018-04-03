import React from 'react';
import { Link } from 'dva/router';
// import { InputItem, Picker, List } from 'antd-mobile';
import { Btn, FormItem } from '../../../components';
import { reduxForm, Field } from 'redux-form';
import validate from '../../../utils/validate';
// import { connect } from 'react-redux';
// import { connect } from 'dva';
import { Toast } from 'antd-mobile';

import './changePsd.less'

const baseInfoFormValidate = validate({
    // validateType: {
    //     mobile: 'm',
    //     shops: '*',
    //     password: 'pwd',
    // },
    // nullTip: {
    //     mobile: '请输入手机号',
    //     shops: '请选择商铺',
    //     password: '请输入密码',
    // },
    // errorTip: {
    //     m: '手机号格式不正确',
    //     shops: '',
    //     password: '密码格式不正确',
    // }
});

@reduxForm({
    form: 'changePsdForm',
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

// @withRouter
export default class ChangePsd extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
    }
    render() {
        const { handleSubmit} = this.props;
        return (
            <section className="changePsd">
               <form className="form">
                    <Field className="form-item" component={FormItem} label="原始密码" name="oldPsd" type="password" maxLength="20" placeholder="请输入原始密码" />
                    <Field className="form-item" component={FormItem} label="新密码" name="oldPsd" type="password" maxLength="20" placeholder="请输入6-20位新密码" />
                    <Btn className="submit">确定</Btn>
               </form>
            </section>
        );
    }
}