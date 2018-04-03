import React from 'react';
import { Tabs, List } from 'antd-mobile';
import {withRouter} from 'dva/router'
import Payment from './Payment';
import Bond from './Bond';
import Other from './Other';
import Rebate from './Rebate';

import './Receivables.less';

const Item = List.Item;


@withRouter
export default class Receivables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            total:{
                payment:'41,969.90',
                bond:'41,969.90',
                other:'41,969.90',
                rebate:'41,969.90'
            },
            thisStatus:'all'
        }
    }
    tabChange=(key)=>{
        this.setState({
            thisStatus:key
        })
    }
    getContent=()=>{
        const infoList = [
            {
                name:'张昊',
                orderId:'20180104153529313492',
                goodsName:'java课程培训',
                total:'1,000.00',
                bond:'0.00',
                discount:'0.00',
                payment:'1,000.00',
                payDate:'2018-09-12 18:20:46',
            },
            {
                name:'张昊',
                orderId:'20180104153529313492',
                goodsName:'java课程培训',
                total:'1,000.00',
                bond:'0.00',
                discount:'0.00',
                payment:'1,000.00',
                payDate:'2018-09-12 18:20:46',
            }
        ];
        const rebateList = [
            {
                rebateMonth:'返点月份：8月',
                rebateTotal:'1,000.00',
                rebateDate:'2018-09-12 18:20:46'
            },
            {
                rebateMonth:'返点月份：8月',
                rebateTotal:'1,000.00',
                rebateDate:'2018-09-12 18:20:46'
            },
            {
                rebateMonth:'返点月份：8月',
                rebateTotal:'1,000.00',
                rebateDate:'2018-09-12 18:20:46'
            },
            {
                rebateMonth:'返点月份：8月',
                rebateTotal:'1,000.00',
                rebateDate:'2018-09-12 18:20:46'
            }
        ];
        const bondList = [
            {
                bondTotal:'1,000.00',
                bondDate:'2018-09-12 18:20:46'
            },
            {
                bondTotal:'1,000.00',
                bondDate:'2018-09-12 18:20:46'
            },
            {
                bondTotal:'1,000.00',
                bondDate:'2018-09-12 18:20:46'
            },
            {
                bondTotal:'1,000.00',
                bondDate:'2018-09-12 18:20:46'
            }
        ];
        const otherList = [
            {
                name:'李超',
                bankName:'中国银行',
                bankNum:'6217857600011751778',
                total:'1,000.00',
                discount:'0.00'
            },
            {
                name:'李超',
                bankName:'中国银行',
                bankNum:'6217857600011751778',
                total:'1,000.00',
                discount:'0.00'
            },
            {
                name:'李超',
                bankName:'中国银行',
                bankNum:'6217857600011751778',
                total:'1,000.00',
                discount:'0.00'
            }
        ]
        const tabs = [
            {title:'全部',key:'all'},
            {title:'已支付',key:'paid'},
            {title:'支付中',key:'paying'}
        ];
        const {match:{params:{item='default'}},history} = this.props;
        const {total:{payment,bond,other,rebate},thisStatus} = this.state;
        const domList={
            default:<div>
                <Tabs tabs={tabs} onChange={(tab,index)=>{this.tabChange(tab.key)}}></Tabs>
                <section className="receivables-content">
                    <List className="receivables-content-list">
                        <Item arrow="horizontal" extra={payment} onClick={() => {history.push(`/receivables/payment/${thisStatus}`)}}>货款(元)</Item>
                        <Item arrow="horizontal" extra={bond} onClick={() => {history.push(`/receivables/bond/${thisStatus}`)}}>保证金退还</Item>
                        <Item arrow="horizontal" extra={other} onClick={() => {history.push(`/receivables/other/${thisStatus}`)}}>其他付款</Item>
                        <Item arrow="horizontal" extra={rebate} onClick={() => {history.push(`/receivables/rebate/${thisStatus}`)}}>返点</Item>
                    </List>
                </section>
            </div>,
            payment:<Payment infoList={infoList}/>,
            bond:<Bond infoList={bondList}/>,
            other:<Other infoList={otherList}/>,
            rebate:<Rebate infoList={rebateList}/>
        }
        return domList[item]
    }
    render(){
        return(<div className="receivables">
            {this.getContent()}
        </div>)
    }
}