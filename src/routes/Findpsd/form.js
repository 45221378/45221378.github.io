import React from 'react';
import { Link } from 'dva/router';
// import { InputItem, Picker, List, Toast } from 'antd-mobile';
import { Btn, FormItem } from './../../components';
import { reduxForm, Field } from 'redux-form';
import validate from '../../utils/validate';
// import { connect } from 'react-redux';
// import { connect } from 'dva';
import { Toast } from 'antd-mobile';


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

@reduxForm({
    form: 'findPsdForm',
    persistentSubmitErrors: true,
    initialValues: {
    },
    validate: baseInfoFormValidate,
    warn: (values) => {
        let warn = {};
        let error = baseInfoFormValidate(values);
        if (error.mobile) {
            warn._warning = error.mobile;
        }
        return warn;
    }
})

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
            count: props.count || 60,
            imgHint:'none'
        }
        this.timer = null;
        // this.start = this.start.bind(this);
    }

    getSmsCode = (e)=>{
        e.preventDefault();
        const { warning, dispatch  } = this.props;
        if (warning) {
            Toast.info(warning)
        } else {
            //这里是接口请求
            this.setState({
                imgHint:'block'
            })
        }
    }
    closeImgCode = ()=>{
        this.setState({
            imgHint: 'none',
            pTips: '',
        })
    }

    checkImg = ()=>{
        const capCode = this.refs.imgCode.value;
        if (capCode){
            console.log(11);

        }else{
            this.setState({
                pTips: '请输入图形验证码'
            })
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { pTips, disabled, imgHint, text, capCodeSrc } = this.state;
        const arr = [{ value: 0, label: '商铺1' }, { value: 1, label: '请选择商铺2' }, { value: 2, label: '请选择商铺3' }];
        return (
            <section className="findPsd">
                <form className="findPsd-form">
                    <ul className="form-list">
                        <li className="form-list-item">
                            <label className="form-list-label form-list-border">
                                <Field ref="mobile" component="input" className="login-account" type="tel" placeholder="请输入手机号" name="mobile" maxLength="11" />
                            </label>
                        </li>
                        <li className="form-list-item">
                            <label className="form-list-label form-list-border">
                                <Field component={FormItem} extra="请选择商铺" name="shops" type="select" cols={1} arr={arr} thisName="shops" />
                            </label>
                        </li>
                        <li className="form-list-item">
                            <label className="form-list-label">
                                <Field component="input" type="text" placeholder="请输入短信验证码" name="code" />
                                <button className="getCode" onClick={e => this.getSmsCode(e)} disabled={disabled}>
                                    {text}
                                </button>
                            </label>
                        </li>
                        <li className="form-list-tips">
                            收不到验证码？<span className="getVoiceCode">尝试语音验证码</span>
                        </li>
                        <li className="form-list-item">
                            <label className="form-list-label form-list-border">

                                <Field component="input" type="text" placeholder="设置密码（输入6-20位数字或字母）" name="psd" />
                            </label>
                        </li>
                    </ul>
                    <Btn>确定</Btn>
                </form>
                <section className="commonhint" style={{ display: imgHint }}>
                    <section className="commonhint-small bounceInDown">
                        <img className="commonhint-small-group" onClick={this.closeImgCode} src={require("../../assets/images/group.png")} />
                        <h5 className="commonhint-small-h5">请输入图形验证码</h5>
                        <form className="hint-form validform">
                            <p className="p-tips">{pTips}</p>
                            <label className="hint-form-label" >
                                <i className="iconfont icon-qrcode"></i>
                                <input ref="imgCode" className="login-pwd" type="text" placeholder="请输入图形验证码" maxLength="6" />
                                <img onClick={this.getImg} src={capCodeSrc} />

                                {/*{*/}
                                {/*capCodeSrc && <img className="register2-form-imgcode" src={capCodeSrc}  id="getimgcode" onClick={this.getImg}/>*/}
                                {/*}*/}
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