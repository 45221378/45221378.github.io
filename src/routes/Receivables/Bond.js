import React from 'react';
import {SpaceTips} from '../../components/index';

export default class Bond extends React.Component{
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
                    <h3>到账金额(元)：{ele.tranAmt}</h3>
                    <div className="receivables-payment-list-item-content">
                        <p>到账时间：{ele.updateDt}</p>
                    </div>
                </li>
            )):<SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips="暂无数据"/>}
        </ul>)
    }
}