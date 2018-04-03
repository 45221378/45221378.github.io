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

import './addGood.less';

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
export default class AddGood extends Component {
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
        console.log(this.props);
        const { handleSubmit } = this.props;
        const arr = [{ value: 'aaaa', label: '商铺1' }, { value: 'bbb', label: '请选择商铺2' }, { value: 'ccc', label: '请选择商铺3' }];
        return (
            <section className="addGood">
                <ul className="addGood-list">
                    <li className="addGood-list-item">
                        <Field title="商品类型" component={FormItem} extra="请选择商品类型" name="goodType" type="select" cols={1} arr={arr} />
                    </li>
                    <li className="addGood-list-item">
                        <Field title="商品名称" component={FormItem} name="goodName" placeholder="请填写完整的商品名称，包括颜色、内存、型号"/>
                    </li>
                </ul>

                <ul className="addGood-list">
                    <li className="addGood-list-item">
                        <Field title="售价" component={FormItem} name="price" placeholder="请输入售价" />
                    </li>
                    <li className="addGood-list-item">
                        <Field title="分期期数" tips="这里是提示信息" component={FormItem} extra="请选择分期期数" name="qishu" type="select" cols={1} arr={arr} />
                    </li>
                    <li className="addGood-list-item">
                        <Field title="贴息方式" component={FormItem} extra="请选择分期期数" name="qishu" type="select" cols={1} arr={arr} />
                    </li>
                </ul>
               
            </section>
        )
    }
}
