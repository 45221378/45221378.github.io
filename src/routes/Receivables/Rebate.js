import React from 'react';

export default class Rebate extends React.Component{
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
                        <h3>{ele.rebateMonth}</h3>
                        <div className="receivables-payment-list-item-content">
                            <p>到账金额(元)：{ele.rebateTotal}</p>
                            <p>到账时间：{ele.rebateDate}</p>
                        </div>
                    </li>
                ))}
            </ul>:
            <p className="list-empty">暂无数据</p>}
        </section>)
    }
}