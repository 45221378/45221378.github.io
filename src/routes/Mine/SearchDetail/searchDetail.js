import React from 'react';
import { List } from 'antd-mobile';
import {withRouter} from 'dva/router';
import {connect} from 'dva';
import ajax from '../../../utils/ajax';

import './searchDetail.less';

const Item = List.Item;

@withRouter
@connect(({userInfo})=>({userInfo}))
export default class SearchDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            detailInfo:null
        }
    }
    transDate=(ms)=>{
        const date = new Date(ms);
        // console.log(date);
        const year = date.getFullYear();
        const mon = date.getMonth()+1;
        const day = date.getDate();
        // const hour = date.getHours();
        // const min = date.getMinutes();
        // const seconds = date.getSeconds();
        const thisDate = `${year}-${mon}-${day}`;
        return thisDate;
    }
    componentDidMount(){
        const {match:{params:{orderId}},dispatch} = this.props;
        dispatch({
            type:'loading/save',
            payload:true
        })
        ajax.post('/mobile/cllectionDetail',{orderId}).then((data)=>{
            // console.log(data.resultData);
            this.setState({
                detailInfo:data.resultData
            })
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
            dispatch({
                type:'loading/save',
                payload:false
            })
        })
    }
    render() {
        const {detailInfo} = this.state;
        const {orderinfo,repayplan,userinfo} = detailInfo || {};
        return (
            <section className="searchDetail">
                {userinfo&&<ul className="searchDetail-list">
                    <li className="searchDetail-list-item">
                        <List renderHeader={() => '基本信息'} className="my-list">
                            <Item extra={userinfo.username}>用户名称</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={userinfo.userphone}>电话号码</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={userinfo.schoolname}>学校名称</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={userinfo.qq}>QQ</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={userinfo.dorm}>宿舍</Item>
                        </List> 
                    </li>
                </ul>}

                {userinfo&&<ul className="searchDetail-list">
                    <li className="searchDetail-list-item">
                        {userinfo.ec1name&&<List renderHeader={() => '联系人信息'} className="my-list">
                            <Item extra={userinfo.ec1name}>父母姓名</Item>
                        </List>}
                        {userinfo.ec1name&&<List className="my-list">
                            <Item extra={userinfo.ec1phone}>联系方式</Item>
                        </List>}
                        {userinfo.ec2name&&<List className="my-list">
                            <Item extra={userinfo.ec2name}>室友姓名</Item>
                        </List>}
                        {userinfo.ec2name&&<List className="my-list">
                            <Item extra={userinfo.ec2phone}>联系方式</Item>
                        </List>}
                        {userinfo.ec3name&&<List className="my-list">
                            <Item extra={userinfo.ec3name}>同学姓名</Item>
                        </List>}
                        {userinfo.ec3name&&<List className="my-list">
                            <Item extra={userinfo.ec3phone}>联系方式</Item>
                        </List>}
                    </li>
                </ul>}

                {orderinfo&&<ul className="searchDetail-list">
                    <li className="title">订单详情</li>
                    <li className="item">商品金额：￥{orderinfo.ordername}</li>
                    <li className="item">首付金额：￥{orderinfo.paymentamt}</li>
                    <li className="item">分期金额：￥{orderinfo.periodamt}</li>
                    <li className="item">分期期数：{orderinfo.periodnum}期</li>
                    <li className="item">月供：￥{orderinfo.monamt}</li>
                    <li className="item last">首次还款日：{this.transDate(orderinfo.paymentdate)}</li>
                </ul>}

                {repayplan&&<ul className="searchDetail-list plan">
                    <li className="title">还款计划</li>
                    <li className="item head">
                        <span className="left">期数</span>
                        <span className="center">未还金额</span>
                        <span className="right">应还款日</span>
                    </li>
                    {repayplan.map((ele,index)=>(<li key={index} className="item">
                        <span className="left">{ele.periodnum}</span>
                        <span className="center">￥{ele.corptotal}</span>
                        <span className="right">{this.transDate(ele.repaydate)}</span>
                    </li>))}
                    {/* 
                    
                    <li className="item">
                        <span className="left">2</span>
                        <span className="center">￥1,903.58</span>
                        <span className="right">2018-10-23</span>
                    </li>
                    <li className="item">
                        <span className="left">3</span>
                        <span className="center">￥1,903.58</span>
                        <span className="right">2018-10-23</span>
                    </li> */}
                </ul>}
            </section>
        );
    }
}