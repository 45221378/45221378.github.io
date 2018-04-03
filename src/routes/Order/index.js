import React,{component} from 'react';
import { connect } from 'dva';
import {withRouter,Link} from 'dva/router'
import { Tabs, List,SearchBar ,Modal} from 'antd-mobile';
import {Search,SpaceTips} from '../../components'

import './order.less'
import '../Message/messageCenter.less'
import request from "../../utils/request";

const Item = List.Item;
@withRouter
export default class OrderList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      thisStatus:'all',
      visible:false,
      hint:'request'
    }
  };
  tabChange=(key)=>{
    this.setState({
      thisStatus:key
    })
  };
  closeModal=()=>{
    this.setState({
      visible:false
    })
  }
  differBtn=(orderStates)=>{
    // e.preventDefault();
    console.log(orderStates);
    this.setState({
      visible:orderStates==1||2?true:false,
      hint:orderStates==1?'request':''
    })
  };


  getList =()=>{
    const tabs = [
      {title:'全部订单',keys:'all'},
      {title:'分期订单',keys:'stage'},
      {title:'即将到还款日',keys:'soon'}
    ];
    const orderLi = [
      {orderId:1,orderStates:1,name:'张昊',phone:'18087878787',course:'java课程培训',orderNum:'201801041535293',orderTime:'2017-12-20',orderMoney:'$1890'},
      {orderId:2,orderStates:2,name:'张迭代',phone:'18087878787',course:'java课程培训',orderNum:'201801041535293',orderTime:'2017-12-20',orderMoney:'$1890'},
      {orderId:3,orderStates:3,name:'张非',phone:'18087878787',course:'java课程培训',orderNum:'201801041535293',orderTime:'2017-12-20',orderMoney:'$1890'},
      {orderId:4,orderStates:4,name:'张烦恼',phone:'18087878787',course:'java课程培训',orderNum:'201801041535293',orderTime:'2017-12-20',orderMoney:'$1890'},
      {orderId:5,orderStates:5,name:'张从',phone:'18087878787',course:'java课程培训',orderNum:'201801041535293',orderTime:'2017-12-20',orderMoney:'$1890'},
    ];
    const filterObj = {
      1:{imgUrl:require("../../assets/images/sendgoods.png"),btn1:"查看",btn2:"取消订单"},
      2:{imgUrl:require("../../assets/images/stages.png"),btn1:"查看",btn2:"催单"},
      3:{imgUrl:require("../../assets/images/tobeSub.png"),btn1:"查看",btn2:"上传凭证"},
      4:{imgUrl:require("../../assets/images/refuse.png"),btn1:"查看",btn2:"上传凭证"},
      5:{btn1:"查看"}
    };
    const {match:{params:{item='default',status}},history} = this.props;
    const orderList = {
      default:<div>
        <Tabs  className="tables-top" tabs={tabs} onChange={(tab,index)=>{this.tabChange(tab.key)}}></Tabs>
        <section className="orderList">
          <SearchBar placeholder="可输入客户姓名、手机号、订单号"/>
          <List>
            {
              orderLi.map((item,idx)=>{
                return (
                  <Item className="li" key={idx}>
                    {/*src={filterObj[item.orderStates].imgUrl}*/}
                    {filterObj[item.orderStates].imgUrl&&<img src={filterObj[item.orderStates].imgUrl} />}
                    <header>
                      <p><span>{item.name}</span><span>{item.phone}</span></p>
                    </header>
                    <section className="order-name">
                      <p>订单名称：<span>{item.course}</span></p>
                      <p>订单编号：<span>{item.orderNum}</span></p>
                      <p>下单日期：<span>{item.orderTime}</span></p>
                      <span className="money">{item.orderMoney}</span>
                      {filterObj[item.orderStates].btn2&&<button onClick={()=>this.differBtn(item.orderStates)}>{filterObj[item.orderStates].btn2}</button>}
                      {filterObj[item.orderStates].btn1&&<button onClick={() => {history.push(`/orderDetail/${item.orderId}`)}}>{filterObj[item.orderStates].btn1}</button>}
                    </section>
                  </Item>
                )
              })
            }
          </List>
        </section>
      </div>,
    };
    return orderList[item]
  };
  render() {
    const {visible,hint} = this.state;
    return(
      <div className="order tables">
        {this.getList()}
        {/*<SpaceTips imgUrl={require("../../assets/images/noorder.png")} tips={'暂无订单'}/>*/}
        {hint=='request'?
          <Modal visible={visible}
                 closable={true}
                 popup={true}
                 className="order-notice"
                 onClose={this.closeModal}
          >
            <p className="home-notice-title">确定要取消订单吗？</p>
            <button className="btn-white" onClick={this.closeModal}>取消</button>
            <button className="btn-blue">确定</button>
          </Modal>:
          <Modal visible={visible}
                 closable={true}
                 popup={true}
                 className="order-notice"
                 onClose={this.closeModal}
          >
            <p className="home-tips-title">设置分期期数后，用户下单只能选择该期数分期</p>

            <button onClick={this.closeModal} className="big-btn">知道了</button>
          </Modal>}
      </div>

    )
  }
}
