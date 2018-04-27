import React, { Component } from 'react';
import { Link } from 'dva/router';
import { withRouter } from 'react-router-dom';
import { Btn, FormItem } from './../../components';
import { reduxForm, Field, change } from 'redux-form';
import validate from '../../utils/validate';
import { Toast } from 'antd-mobile';
import qs from 'qs';
import axios from 'axios';
import baseURL from '../../utils/config';
import md5 from 'md5/md5';
// import cache from './../../utils/cache';


import './login.less'


const baseInfoFormValidate = validate({
    validateType: {
        phone: 'm',
        organId: '*',
        password: 'password',
    },
    nullTip: {
        phone: '请输入手机号',
        organId: '请选择商铺',
        password: '请输入密码',
    },
    errorTip: {
        m: '手机号格式不正确',
        '*': '',
        password: '密码格式不正确',
    }
});

@reduxForm({
    form: 'loginForm',
    persistentSubmitErrors: true,
    initialValues: {},
    validate: baseInfoFormValidate,
    warn: (values) => {
        let warn = {};
        let error = baseInfoFormValidate(values);
        if (error.phone) {
            warn._warning = error.phone;
        }
        return warn;
    }
})

@withRouter
export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
        // const {dispatch} = props;
        // dispatch({
        //     type:'token/clean',
        // })
        this.state = {
            showShop: 'none',
            organList: []
        }
    }

    componentWillMount(){
        this.props.reset();
    }
    //查询登录用户商户
    getOrgan = () => {
        const { warning } = this.props;
        const mobile = this.refs.mobile.value;
        if (warning) {
            Toast.info(warning);
        }else {
            axios({
                method: 'post',//方法
                url: `${baseURL}wap/queryOrganByUserName`,//地址
                data: {//参数
                    phone: mobile
                },
                transformRequest: [function (data) {
                    const sortArr = Object.keys(data).sort() || [];
                    const str = sortArr.reduce((prev, current) => (prev += data[current]), '');
                    data.signature = md5(str.trim());
                    return qs.stringify(data);
                }]
            }).then((response) => {
                // const headData = JSON.parse(response.data[0]).head;
                //  const headData = JSON.parse(response.data[0]).head;
                const data = JSON.parse(response.data[0]);
                const { head, body } = data;
                if (head.retcode === 'success') {
                    // console.log(body);
                    const { organList } = body;
                    if (organList && organList.length > 1) {
                        let arr = []
                        for (let i = 0; i < organList.length; i++) {
                            let obj = {};
                            obj.value = organList[i].organId;
                            obj.label = organList[i].chName;
                            arr.push(obj);
                        }
                        this.setState({
                            showShop: 'flex',
                            organList: arr
                        })
                    } else {
                        const { dispatch } = this.props;
                        dispatch(change('loginForm', 'organId', organList[0].organId));
                    }
                } else {
                    Toast.info(head.msg);
                }
                // console.log(data,typeof data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    login = (values) => {
        const { error } = this.props;
        // console.log(values);
        if (error) {
            Toast.info(error);
        } else {
            axios({
                method: 'post',//方法
                url: `${baseURL}mobile/organUserLogin`,//地址
                data: {//参数
                    organId: values.organId,
                    password: values.password,
                    phone: values.phone,
                },
                transformRequest: [function (data) {
                    const sortArr = Object.keys(data).sort() || [];
                    // console.log(sortArr);
                    const str = sortArr.reduce((prev, current) => (prev += data[current]), '');
                    // console.log(str);
                    data.signature = md5(str.trim());
                    return qs.stringify(data);
                }]
            }).then((response) => {
                // console.log(response);
                const { history, dispatch } = this.props;
                const { data: { auth, head } } = response;
                if (head.retcode == '0000') {
                    // console.log(auth.token);
                    const { body:{organData:{accessPath,organId,organType,organName}}} = response.data;
                    dispatch({
                        type: 'token/save',
                        payload: auth.token
                    });
                    dispatch({
                        type: 'organInfo/save',
                        payload: {
                            accessPath,
                            organId,
                            organType,
                            organName,
                            phone: values.phone
                        }
                    });
                    dispatch({
                        type:'loading/save',
                        payload:true
                    })
                    // window.location.href = '/';
                    history.push('/');
                } else {
                    Toast.info(head.msg)
                }
            }).catch((error) => {
                Toast.info(error.msg)
            });
        }
    }

    render() {
        // console.log(this.props);
        const { handleSubmit } = this.props;
        const { showShop, organList } = this.state;
        // console.log(organList);
        // const arr = [{ value: 'aaaa', label: '商铺1' }, { value: 'bbb', label: '请选择商铺2' }, { value: 'ccc', label: '请选择商铺3' }];
        return (
            <section className="login">
                <div className="login-header">
                    <i className="iconfont icon-logo2"></i>
                    <span className="line"></span>
                    <span className="text">商户端</span>
                </div>
                <form action="" className="login-form">
                    <label className="clearfix">
                        <i className="iconfont icon-shoujihao"></i>
                        <Field ref="mobile" component="input" className="login-account" type="tel" placeholder="请输入手机号" name="phone" maxLength="11" onBlur={this.getOrgan} />
                    </label>

                    <label style={{ display: showShop }}>
                        <i className="iconfont icon-dianpu"></i>
                        <Field component={FormItem} extra="请选择商铺" name="organId" type="select" cols={1} arr={organList} />
                    </label>

                    <label className="clearfix">
                        <i className="iconfont icon-mima"></i>
                        {/* <input type="tel" name="" placeholder='请输入密码' /> */}
                        <Field component="input" className="login-account" type="password" placeholder="请输入密码" name="password" maxLength="20" />
                    </label>

                    <div className="btn-box">
                        <Btn className="login-btn" onClick={handleSubmit(this.login)}>登录</Btn>
                    </div>
                </form>
                <Link className="forget" key="findPsd" to="/findPsd">忘记密码？</Link>
            </section>
        )
    }
}
