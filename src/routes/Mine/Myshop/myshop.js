import React from 'react';

import './myshop.less'

export default class Myshop extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
    }
    render() {
        return (
            <section className="myshop">
                <div className="codeBox">
                    <h2 className="title">扫码进入我的店铺！</h2>
                    <img src={require('../../../assets/images/mine-bg.png')} alt=""/>
                </div>
                <p className="text">店铺地址 http://www.1v1.one:8081/m/#/main/home</p>
            </section>
        );
    }
}