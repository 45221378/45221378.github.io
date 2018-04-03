import React from 'react';
// import { Link } from 'dva/router';
// import { InputItem, Picker, List } from 'antd-mobile';
import { Btn } from './../../components';


export default class Success extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
    }

    toLogin=()=>{
        const {history} = this.props;
        history.push('/login')
        // console.log(this.props);
    }

    render() {
        return (
            <div className="findPsd-success">
                <img src={require("../../assets/images/success.png")} alt="" className="success-img"/>
                <p className="success-tips">找回密码成功，请牢记您的密码！</p>
                {/* <Link className="success-btn" to='/login'>重新登录</Link> */}
                <Btn onClick={this.toLogin}>重新登录</Btn>
            </div>
        );
    }
}