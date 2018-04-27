import React from 'react';
import {withRouter} from 'dva/router'
import {List,SearchBar} from 'antd-mobile';
import SpaceTips from './../../components/Space'

function showDate(dateString){
  let date = dateString;
  return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
}
const Item = List.Item;

@withRouter
export default class Stageorder extends React.Component{
  render() {
    const {infoList,searchGoods,setName,history} = this.props;
    const filterObj = {
      '00': {tips: '未支付', btn2: '取消订单'},
      '01': {tips: '已收货'},
      '03': {tips: '订单取消'},
      '04': {tips: '订单已删除'},
      '21': {tips: '分期审批'},
      '22': {tips: '分期成功（待首付）'},
      '23': {tips: '已拒单'},
      '24': {tips: '分期成功（待还款）'},
      '25': {tips: '分期完成'},
      '31': {tips: '商家发货', btn2: '确认收货'},
      '02': {tips: '交易完成'},
      '32': {tips: '审核收获失败', btn2: '确认收货'},
    };
    return (
      <section className="height100 2">
        {infoList&&<div className='orderList orderSearch'>
          <SearchBar placeholder="可输入客户姓名、手机号、订单号" cancelText="搜索" onSubmit={searchGoods} onCancel={searchGoods} onChange={setName} showCancelButton/>
        {
          infoList && infoList.length > 0 ?
              <div className="list-wrapper">
                <List>
                  {
                    infoList.map((item, idx) => {
                      return (
                        <Item className='li' key={idx}>
                          {/*src={filterObj[item.orderStates].imgUrl}*/}
                          {/*{filterObj[item.status].imgUrl&&<img src={filterObj[item.status].imgUrl} />}*/}
                          <header>
                            <div>
                              <span>{item.userName || item.custName}</span><span
                              className="padl6">{item.userPhone || item.phone}</span>
                              <p className='showState'>{`${item.status ? filterObj[item.status].tips : ''}`}</p>
                            </div>
                          </header>
                          <section className='order-name'>
                            <p>订单名称：<span>{item.orderDesc || item.proName}</span></p>
                            <p>订单编号：<span>{item.orderId}</span></p>
                            <p>下单日期：<span>{showDate(item.orderDate)}</span></p>
                            <span className='money'>¥{item.totalDealAmt || item.periodAmt}</span>
                            {item.status && filterObj[item.status].btn2 && <button
                              onClick={() => this.differBtn(item.status, item.orderId)}>{filterObj[item.status].btn2}</button>}
                            <button onClick={() => {
                              history.push(`/orderDetail/${item.orderId}`)
                            }}>查看
                            </button>
                          </section>
                        </Item>
                      )
                    })
                  }
                </List>
              </div>: <SpaceTips imgUrl={require('../../assets/images/noorder.png')} tips={'暂无订单'}/>
        }
      </div>}

      </section>
    )
  }
}
