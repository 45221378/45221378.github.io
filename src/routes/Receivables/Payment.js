import React from 'react';
import {SpaceTips} from '../../components/index';

export default class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render(){
        const {infoList} = this.props;
        return(<ul className="receivables-payment-list">
            {(infoList&&infoList.length>0)?infoList.map((ele,index)=>(
                <li className="receivables-payment-list-item" key={index}>
                    <h3><b>{ele.custName}</b><span>{ele.orderId}</span></h3>
                    <div className="receivables-payment-list-item-content">
                        <p>商品名称：{ele.custName}</p>
                        <p>订单金额：¥{ele.orderAmt}</p>
                        <p>保证金：¥{ele.blockAmt}</p>
                        <p>贴息：¥{ele.discountAmt}</p>
                        <p>实际金额：¥{ele.realpayAmt}</p>
                        <p>到账时间：{ele.updateDt}</p>
                    </div>
                </li>
            )):<SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips="暂无数据"/>}
        </ul>)
    }
}