import React from 'react';

export default class Bond extends React.Component{
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
                        <h3>到账金额(元)：{ele.bondTotal}</h3>
                        <div className="receivables-payment-list-item-content">
                            <p>到账时间：{ele.bondDate}</p>
                        </div>
                    </li>
                ))}
            </ul>:
            <p className="list-empty">暂无数据</p>}
        </section>)
    }
}