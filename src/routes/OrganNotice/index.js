import React from 'react';
import {withRouter} from 'dva/router';
import {List} from 'antd-mobile';

import './organNotice.less'

const Item = List.Item;

@withRouter
export default class OrganNotice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            first:'',
            second:''
        }
    }
    getContent=()=>{
        const {match:{params:{first,second}},history} = this.props;
        if(first&&second){
            const dom = <div className="organ-detail">
                <div className="organ-detail-content">
                    <h3 className="organ-detail-title">认证成功获得额度</h3>
                    {this.getSecond(first*1,second*1)}
                </div>
            </div>;
            return dom;
        }else if(first&&!second){
            const dom = this.getFirst(first*1);
            return dom;
        }else{
            return(<List className="organ-list">
            <Item arrow="horizontal" onClick={() => {history.push('/organNotice/0')}}>订单相关</Item>
            <Item arrow="horizontal" onClick={() => {history.push('/organNotice/1')}}>额度相关</Item>
            <Item arrow="horizontal" onClick={() => {history.push('/organNotice/2')}}>联系方式</Item>
        </List>)
        }
    }
    getFirst=(first)=>{
        const {history} = this.props;
        const firstList = {
            0:<List className="organ-list">
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/0/0')}}>申请人受理状态</Item>
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/0/1')}}>订单查询</Item>
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/0/2')}}>修改订单</Item>
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/0/3')}}>订单取消</Item>
            </List>,
            1:<List className="organ-list">
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/1/0')}}>认证成功获得额度</Item>
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/1/1')}}>额度是否可以提高</Item>
            </List>,
            2:<List className="organ-list">
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/2/0')}}>联系电话</Item>
                <Item arrow="horizontal" onClick={() => {history.push('/organNotice/2/1')}}>惠分期微信公众号</Item>
            </List>
        }
        return firstList[first];
    }
    getSecond=(first,second)=>{
        const {history} = this.props;
        const domList = {
            0:{
                0:<div>
                    <p>申请使用“花呗服务”，您需要同意本授权书中的所有内容: </p>
                    <p>1.因您向重庆市阿里小微小额贷款有限公司、商融（上海）商业保理有限公司（以下统称“花呗服务商”）申请花呗服务，根据花呗服务商对您的信用信息的查询需求，您同意花呗服务商向芝麻信用管理有限公司（“芝麻信用”）查询您的信用信息，用于评估花呗与您的交易条件和控制贷款中的风险，有效期至花呗服务商对您的花呗服务的申请审核不通过日为止，或者您就实际与花呗服务商签订的《花呗用户服务合同》规定的双方权利义务完全终止之日止。 </p>
                    <p>2.为了能让您在芝麻信用处的信用信息及时被花呗服务商查询，如果您还不是芝麻信用的用户，您应该同意并签订本授权同意书所附的《芝麻信用服务协议》成为芝麻信用用户。如果您已经是芝麻信用用户，您无需重复签订本须知所附的《芝麻信用服务协议》。 芝麻信用服务合同 </p>
                    <p>3.为了能让您在芝麻信用处的信用信息及时被花呗服务商查询，如果您还不是芝麻信用的用户，为了能让您在芝麻信用处的信用信息及时被花呗服务商查询，如果您还不是芝麻信用的用户，为了能让您在芝麻信用处的信用信息及时被花呗服务商查询，如果您还不是芝麻信用的用户，为了能让您在芝麻信用处的信用信息及时被花呗服务商查询，如果您还不是芝麻信用的用户，为了能让您在芝麻信用处的信用信息及时被花呗服务商查询，如果您还不是芝麻信用的用户， </p>
                </div>,
                1:<p>0-bbbbbbbb</p>
            },
            1:{
                0:<p>1-aaaaaaaa</p>,
                1:<p>1-bbbbbbbb</p>
            },
            2:{
                0:<p>2-aaaaaaaa</p>,
                1:<p>2-bbbbbbbb</p>
            }
        }
        return domList[first][second];
    }
    componentDidMount(){
        this.getContent();
    }
    render(){
        const {first,second} = this.state;
        return(
            <div className="organ">
                {this.getContent()}
            </div>
        )
    }
} 