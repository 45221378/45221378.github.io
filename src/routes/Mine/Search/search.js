import React from 'react';
import { withRouter } from 'dva/router';
import {Icon} from 'antd-mobile';
import { connect } from 'dva';
import {SpaceTips} from '../../../components/index';
import './search.less'

import ajax from '../../../utils/ajax'

let scrollY = 0;
@withRouter
@connect(({userInfo})=>({userInfo}))
export default class Search extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state={
            overList:null,
            pageSize:10,
            loading:false,
            page:1,
            hasNone:false
        }
    }
    scroll=()=>{
        const $h = document.documentElement.clientHeight;
        const $scrollH = document.documentElement.scrollHeight;
        const $scroll = window.scrollY;
        if($scrollH-$scroll-$h<10&&scrollY<$scroll){
            const {page} = this.state;
            this.getOverList(page*1+1);
        }
        setTimeout(()=>{scrollY=$scroll},0)
    }
    getOverList=(page,isClear=false)=>{
        let {overList,pageSize,loading,hasNone} = this.state;
        const {dispatch} = this.props;
        if(loading || hasNone){
            return false;
        }
        if(!isClear){ 
            this.setState({
                loading:true
            })
        }else{
            dispatch({
                type:'loading/save',
                payload:true
            })
        }
        overList = overList?overList:[];
        ajax.post('/mobile/listOrder',{currentflag:0,orderstatus:1,currentpage:page,pagesize:pageSize,type:3}).then((data)=>{
            overList = [...overList,...data.overdurorganlist]
            let hasNone = false;
            if(data.overdurorganlist.length<pageSize){
                hasNone = true;
            }
            this.setState({
                page,
                overList,
                hasNone
            })
        })
        .catch((err)=>{
            console.log(err);
            this.setState({
                overList:[]
            })
        })
        .finally(()=>{
            dispatch({
                type:'loading/save',
                payload:false
            })
            this.setState({
                loading:false
            })
        })
    }
    componentDidMount(){
        const {page} = this.state;
        this.getOverList(page,true);
      window.addEventListener('scroll',this.scroll,false);
    }
    componentWillUnmount(){
      window.removeEventListener('scroll',this.scroll,false);
    }
    render() {
        const {overList,loading,hasNone} = this.state;
        return (<section className="receivables-payment search">
            {overList&&<div>
                {(overList&&overList.length>0)?<ul className="receivables-payment-list">
                    {overList.map((item,index)=>(<li key={index} className="receivables-payment-list-item">
                        <h3><b>{item.custName}</b><span>{item.phone}</span></h3>
                        <div className="receivables-payment-list-item-content border">
                            <p>订单名称：{item.proName}</p>
                            <p>分期金额：¥{item.periodAmt}</p>
                            <p>首次还款日：{item.paymentDate}</p>
                            {/* <p>贴息：¥</p>
                            <p>实际金额：¥</p>
                            <p>到账时间：</p> */}
                        </div>
                        <div className="receivables-payment-list-item-content">
                            <p>逾期期数：{item.durNum}期</p>
                            <p>逾期天数：{item.durDay}天</p>
                            <p>逾期金额：¥{item.durAmt}</p>
                            <p>滞纳金：¥{item.procomtAmt}</p>
                            <p>总金额：¥{item.totalAmt}</p>          
                        </div>
                        <a onClick={()=>{this.props.history.push(`/mine/searchDetail/${item.orderId}`)}} className="checkBtn">查 看</a>
                    </li>))}
                </ul>:
                <SpaceTips imgUrl={require('../../../assets/images/nomessage.png')} tips={'暂无逾期'} />}
                {!hasNone&&<div className="loading-wrapper">
                    {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
                </div>}
            </div>}
            
            
        </section>);
    }
}