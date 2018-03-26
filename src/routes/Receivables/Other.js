import React from 'react';

export default class Other extends React.Component{
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
                        <h3>银行账户户名：{ele.name}</h3>
                        <div className="receivables-payment-list-item-content">
                            <p>商品开户行：{ele.bankName}</p>
                            <p>银行账号：{ele.bankNum}</p>
                            <p>到账金额(元)：{ele.total}</p>
                            <p>贴息(元)：{ele.discount}</p>
                        </div>
                    </li>
                ))}
            </ul>:
            <p className="list-empty">暂无数据</p>}
        </section>)
    }
}