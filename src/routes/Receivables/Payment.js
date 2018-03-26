import React from 'react';

export default class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render(){
        const {infoList} = this.props;
        return(<section className="receivables-payment">
            {infoList.length?<ul className="receivables-payment-list">
                {infoList.map((ele,index)=>(
                    <li className="receivables-payment-list-item" key={index}>
                        <h3><b>{ele.name}</b><span>{ele.orderId}</span></h3>
                        <div className="receivables-payment-list-item-content">
                            <p>商品名称：{ele.goodsName}</p>
                            <p>订单金额：¥{ele.total}</p>
                            <p>保证金：¥{ele.bond}</p>
                            <p>贴息：¥{ele.discount}</p>
                            <p>实际金额：¥{ele.payment}</p>
                            <p>到账时间：{ele.payDate}</p>
                        </div>
                    </li>
                ))}
            </ul>:
            <p className="list-empty">暂无数据</p>}
        </section>)
    }
}