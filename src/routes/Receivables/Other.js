import React from 'react';
import {SpaceTips} from '../../components/index';

export default class Other extends React.Component{
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
                    <h3>银行账户户名：{ele.accountName}</h3>
                    <div className="receivables-payment-list-item-content">
                        <p>商品开户行：{ele.accountBank}</p>
                        <p>银行账号：{ele.accountNo}</p>
                        <p>到账金额(元)：{ele.tranAmt}</p>
                        <p>到账时间：{ele.updateDt}</p>
                    </div>
                </li>
            )):<SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips="暂无数据"/>}
        </ul>)
    }
}