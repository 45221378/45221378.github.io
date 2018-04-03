import React from 'react';
import { Link } from 'dva/router';
import './search.less'

export default class Search extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
    }
    render() {
        return (
            <section className="receivables-payment search">
                <ul className="receivables-payment-list">
                
                    <li className="receivables-payment-list-item">
                        <h3><b>张昊</b><span>18223565879</span></h3>
                        <div className="receivables-payment-list-item-content border">
                            <p>订单名称：java课程培训</p>
                            <p>分期金额：¥16,800</p>
                            <p>首次还款日：2018-02-01</p>
                            {/* <p>贴息：¥</p>
                            <p>实际金额：¥</p>
                            <p>到账时间：</p> */}
                        </div>
                        <div className="receivables-payment-list-item-content">
                            <p>逾期期数：一期</p>
                            <p>逾期天数：10天</p>
                            <p>逾期金额：￥2,000</p>
                            <p>滞纳金：¥5</p>
                            <p>总金额：¥2,005</p>          
                        </div>
                        <Link to='/mine/searchDetail' className="checkBtn">查 看</Link>
                    </li>
                </ul>
        </section>
        );
    }
}