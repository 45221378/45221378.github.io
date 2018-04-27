import React from 'react';
// import { Link } from 'dva/router';
// import { InputItem, Picker, List, Toast } from 'antd-mobile';
import { Btn, FormItem } from './../../components';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import validate from '../../utils/validate';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import qs from 'qs';
import axios from 'axios';
import baseURL from '../../utils/config';
import md5 from 'md5/md5';

const baseInfoFormValidate = validate({
    validateType: {
        phone: 'm',
        organId: '*',
        captcha: 'smsCode',
        password: 'password',
    },
    nullTip: {
        phone: '请输入手机号',
        organId: '请选择商铺',
        captcha: '请输入短信验证码',
        password: '请输入密码'
    },
    errorTip: {
        m: '手机号格式不正确',
        '*': '',
        smsCode: '短信验证码不正确',
        password: '密码格式不正确',
    }
});
const selector = formValueSelector('findPsdForm');

@reduxForm({
    form: 'findPsdForm',
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
@connect(
    state => ({
        phone: selector(state, 'phone'),
        organId: selector(state, 'organId'),
        // values:state.values
    })
)
// @withRouter
export default class Form extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
        this.state = {
            capCodeSrc: '',
            pTips: '',
            text: '获取验证码',
            disabled: false,
            countFlag: false,
            codeTips:'',
            imgHint: 'none',
            showShop: 'none',
            organList: [],
            codeType: '0' //0 短信 1 语音
        }
        this.timer = null;
        // this.start = this.start.bind(this);
    }
    // componentWillMount() {
    //     this.props.reset();
    // }
    //查询登录用户商户
    getOrgan = () => {
        const { warning } = this.props;
        const mobile = this.refs.mobile.value;
        console.log()
        if (warning) {
            Toast.info(warning);
        }
        else {
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
                    console.log(body);
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

    getCode = (e, type) => {
        e.preventDefault();
        const { warning, organId } = this.props;
        console.log(organId);
        if (warning) {
            Toast.info(warning)
        } else if (organId) {
            //获取图形验证码
            this.setState({
                codeType:type
            })
            this.getImgCode(type);
        } else {
            Toast.info('请选择商铺');
        }
    }
    count = () => {
        //  const { text, disabled } = this.state;
        let count = 60;
        this.timer = setInterval(() => {
            // let {count}=this.state;
            // console.log(count);
            if (count--) {
                this.setState({
                    text: `${count}s`,
                    disabled: true
                })
            } else {
                this.resetCount();
            }
        }, 1000)
    }
    resetCount = () => {
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.setState({
            text: '重新获取',
            disabled: false,
            countFlag:false
        })
    }
    getImgCode = () => {
        // const {codeType} = this.state;
        const mobile = this.refs.mobile.value;
        const data = {
            phone: mobile
        }
        const sortArr = Object.keys(data).sort() || [];
        const str = sortArr.reduce((prev, current) => (prev += data[current]), '');
        const signature = md5(str.trim());
        const imgSrc = `${baseURL}wap/imagesCaptcha?phone=${mobile}&signature=${signature}&${Date.now()}`
        this.setState({
            imgHint: 'block',
            capCodeSrc: imgSrc,
            // codeType: imgType
        })
    }
    closeImgCode = () => {
        this.refs.imgCode.value = '';
        this.setState({
            imgHint: 'none',
            pTips: '',
        })
    }

    showCodeTip=(type)=>{
        const tip = type === '0' ? '短信验证码发送中，请注意查收！' :'我们将致电告知验证码，请注意接听！';
        this.setState({
            countFlag:true,
            codeTips:tip
        })
    }

    checkImg = () => {
        const capCode = this.refs.imgCode.value;
        const { codeType } = this.state;
        if (capCode) {
            // console.log(this.props);
            const { organId, phone } = this.props;
            // console.log(organId,phone);
            if (codeType == '0') {
                //图形验证码校验后发送短信验证码
                axios({
                    method: 'post',//方法
                    url: `${baseURL}wap/sendCaptch`,//地址
                    data: {//参数
                        "organcode": "CREDIT_SYS_REQ",
                        "organid": organId,
                        "phone": phone,
                        "randomCode": capCode
                    },
                    transformRequest: [function (data) {
                        const sortArr = Object.keys(data).sort() || [];
                        const str = sortArr.reduce((prev, current) => (prev += data[current]), '');
                        data.signature = md5(str.trim());
                        return qs.stringify(data);
                    }]
                }).then((response) => {
                    // console.log(response);
                    // const headData = JSON.parse(response.data[0]).head;
                    //  const headData = JSON.parse(response.data[0]).head;
                    const data = JSON.parse(response.data[0]);
                    const { head, body } = data;
                    console.log(head, body);
                    if (head.retcode === 'success' || head.retcode === '0000') {
                        console.log(body);
                        this.closeImgCode();
                        this.count();
                        this.showCodeTip('0');
                    } else {
                        this.setState({
                            pTips: head.msg,
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                //图形验证码校验后发送语音验证码
                axios({
                    method: 'post',//方法
                    url: `${baseURL}wap/voiceCaptch`,//地址
                    data: {//参数
                        "messageType": "02",
                        "organcode": "CREDIT_SYS_REQ",
                        "organid": organId,
                        "phone": phone,
                        "randomCode": capCode
                    },
                    transformRequest: [function (data) {
                        const sortArr = Object.keys(data).sort() || [];
                        const str = sortArr.reduce((prev, current) => (prev += data[current]), '');
                        data.signature = md5(str.trim());
                        return qs.stringify(data);
                    }]
                }).then((response) => {
                    // console.log(response);
                    // const headData = JSON.parse(response.data[0]).head;
                    //  const headData = JSON.parse(response.data[0]).head;
                    const data = JSON.parse(response.data[0]);
                    const { head, body } = data;
                    console.log(head, body);
                    if (head.retcode === 'success' || head.retcode === '0000') {
                        console.log(body);
                        this.closeImgCode();
                        this.count();
                        this.showCodeTip('1');
                    } else {
                        this.setState({
                            pTips: head.msg,
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }

        } else {
            this.setState({
                pTips: '请输入图形验证码'
            })
        }
    }

    findSubmit = (values) => {
        const { error } = this.props;
        console.log(values);
        if (error) {
            Toast.info(error);
        } else {
            axios({
                method: 'post',//方法
                url: `${baseURL}wap/houseUserForgetPwd`,//地址
                data: {//参数
                    captcha: values.captcha,
                    organcode: "CREDIT_SYS_REQ",
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
                const { history } = this.props;
                const data = JSON.parse(response.data[0]);
                const { head, body } = data;
                // const { data: { auth, head, body } } = response;
                if (head.retcode == '0000' || head.retcode == 'success') {
                    console.log(body)
                    history.push('/findPsd/success')
                } else {
                    Toast.info(head.msg)
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { pTips, disabled, imgHint, text, capCodeSrc, showShop, organList, countFlag,codeTips } = this.state;
        // const { showShop, organList } = this.state;

        return (
            <section className="findPsd">
                <form className="findPsd-form">
                    <ul className="form-list">
                        <li className="form-list-item">
                            <label className="form-list-label form-list-border">
                                <Field ref="mobile" component="input" className="login-account" type="tel" placeholder="请输入手机号" name="phone" maxLength="11" onBlur={this.getOrgan} />
                            </label>
                        </li>
                        <li className="form-list-item" style={{ display: showShop }}>
                            <label className="form-list-label form-list-border">
                                <Field component={FormItem} extra="请选择商铺" name="organId" type="select" cols={1} arr={organList} />
                            </label>
                        </li>
                        <li className="form-list-item">
                            <label className="form-list-label">
                                <Field component="input" type="text" placeholder="请输入短信验证码" name="captcha" />
                                <button className="getCode" onClick={e => this.getCode(e, 0)} disabled={disabled}>
                                    {text}
                                </button>
                            </label>
                        </li>
                        {countFlag ? (<li className="form-list-tips">
                           {codeTips}
                        </li>) : (<li className="form-list-tips">
                            收不到验证码？<button className="getVoiceCode" disabled={disabled} onClick={e => this.getCode(e, 1)}>尝试语音验证码</button>
                        </li>)}
                        <li className="form-list-item">
                            <label className="form-list-label">

                                <Field component="input" type="text" placeholder="设置密码（输入6-20位数字或字母）" name="password" />
                            </label>
                        </li>
                    </ul>
                    <Btn onClick={handleSubmit(this.findSubmit)}>确定</Btn>
                </form>
                <section className="commonhint" style={{ display: imgHint }}>
                    <section className="commonhint-small bounceInDown">
                        <img className="commonhint-small-group" onClick={this.closeImgCode} src={require("../../assets/images/group.png")} alt='' />
                        <h5 className="commonhint-small-h5">请输入图形验证码</h5>
                        <form className="hint-form validform">
                            <p className="p-tips">{pTips}</p>
                            <label className="hint-form-label" >
                                <i className="iconfont icon-qrcode"></i>
                                <input ref="imgCode" className="login-pwd" type="text" placeholder="请输入图形验证码" maxLength="6" />
                                <img onClick={this.getImgCode} src={capCodeSrc} alt='' />
                            </label>
                            {/* <button className="submitImgCode" type="button" onClick={this.sbumitImg}>确定</button> */}
                            <Btn className="submitImgCode" onClick={this.checkImg}>确定</Btn>
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}