import React from 'react';
import {connect} from 'dva';
import QRCode from 'qrcode.react';

import './myshop.less'

@connect(({organInfo})=>({organInfo}))
export default class Myshop extends React.Component {
    // constructor(props) {
    //     // console.log(props);
    //     super(props)
    // }
    render() {
        const {organInfo:{accessPath}} = this.props;
        return (
            <section className="myshop">
                <div className="codeBox">
                    <h2 className="title">扫码进入我的店铺！</h2>
                    {/* <img src={require('../../../assets/images/mine-bg.png')} alt=""/> */}
                    <QRCode value={accessPath}/>
                </div>
                <p className="text">店铺地址 {accessPath}</p>
            </section>
        );
    }
}