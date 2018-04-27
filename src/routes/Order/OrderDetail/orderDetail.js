import React from 'react';
import {Opacitybtn} from '../../../components'
import ajax from '../../../utils/ajax'

function showDate(dateString){
  let date = dateString;
  return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
}
function showDateTime(dateString){
  let date = dateString;
  return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)} ${date.slice(8,10)}:${date.slice(10,12)}:${date.slice(12,14)}`;
}
export default class OrderDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orderId:props.match.params.orderId,
      orderDetail:[]
    }
  }
  //获取订单详情
  componentDidMount(){
    ajax({
      method:'post',
      url:' /mobile/orderDetail',
      data:{
        orderId:this.state.orderId,
        // orderId:'20170209095145301397',
        type:1
      }
    }).then((response)=>{
      // console.log(response);
      this.setState({
        orderDetail : response.orderInfo
      })
    })
  }
  //获取订单详情
  getOrderDetail=()=>{
    const filterObj = {
      '00':{tips:'未支付',btn2:'取消订单'},
      '01':{tips:'已收货'},
      '03':{tips:'订单取消'},
      '04':{tips:'订单已删除'},
      '21':{tips:'分期审批',btn2:'催单'},
      '22':{tips:'分期成功（待首付）'},
      '23':{tips:'已拒单',btn2:'担保'},
      '24':{tips:'分期成功（待还款）'},
      '25':{tips:'分期完成'},
      '31':{tips:'商家发货',btn2:'确认收货'},
      '02':{tips:'交易完成'},
      '32':{tips:'审核收获失败',btn2:'确认收货'},
      // '11':{tips:'正在支付',btn2:'取消订单'},
      // '12':{tips:'支付成功',btn2:'取消订单'},
    };

    const {match:{params:{item='default'}},} = this.props;
    const {order} = this.state.orderDetail;
    const OrderDetail = {
      default:
        <div>
          {
            this.state.orderDetail.order ?
              <p className="order-status">订单状态<span>{filterObj[order.status].tips}</span></p>
              : ''
          }
          {/*{*/}
            {/*this.state.orderDetail.busiCreditInfo?*/}
              {/*<section>*/}
                {/*<p>还款日：<span>{orderCredit&&orderCredit.paymentDate?`每月${orderCredit.paymentDate}号`:''}</span></p>*/}
                {/*<p>总金额：<span>￥{busiCreditInfo.creditAmt}</span></p>*/}
              {/*</section>*/}
              {/*:''*/}
          {/*}*/}
          {/*{*/}
            {/*this.state.orderDetail.orderCredit?*/}
              {/*<section>*/}
                {/*<p>已还期数：<span>13/18</span></p>*/}
                {/*<p>分期总额：<span>￥17,800</span></p>*/}
                {/*<p>首次还款日：<span>{`${orderCredit.paymentDate?moment(orderCredit.paymentDate).format('YYYY-MM-DD'):''}`}</span></p>*/}
              {/*</section>*/}
            {/*:''*/}
          {/*}*/}
          {
            this.state.orderDetail.order?
              <div>
                <section>
                  <p>订单名称：<span>{order.orderDesc}</span></p>
                  <p>订单编号：<span>{order.orderId}</span></p>
                  <p>下单日期：<span>{`${order.orderDate?showDate(order.orderDate):''}`}</span></p>
                </section>
                <section className="order-time">
                  <p>订单金额：<span>{order.totalAmt}</span></p>
                  <p>成交总价：<span>{order.totalDealAmt}</span></p>
                  <p>支付时间：<span>{`${order.payDate?showDateTime(order.payDate):''}`}</span></p>
                  <div className="leavemsg">
                    <span>买家留言：</span>
                    <div className="textarea">{order.userMsg}</div>
                  </div>
                </section>
              </div>
            :''
          }
        </div>
    }
    return OrderDetail[item]
  };
  //获取收获凭证
  getEvidence=()=>{
    const {match:{params:{item='default'}}} = this.props;
    const {childList,order} = this.state.orderDetail;
    // const recvImg = 'http://www.1v1.one:8088/group1/M00/03/43/wKgCA1nyl2KAbW8JAB2faUOJ_Pc643.png,http://www.1v1.one:8088/group1/M00/03/43/wKgCA1nyl2KAbW8JAB2faUOJ_Pc643.png,http://www.1v1.one:8088/group1/M00/03/43/wKgCA1nyl2KAbW8JAB2faUOJ_Pc643.png,http://www.1v1.one:8088/group1/M00/03/43/wKgCA1nyl2KAbW8JAB2faUOJ_Pc643.png'
    // const receiveImg = childList?childList.recvImg.split(','):'';
    // console.log(receiveImg);
    const recvImg = childList?childList[0].recvImg:'';
    const recvImgarray = recvImg?recvImg.split(','):'';
    // console.log(recvImgarray);
    const Evidence = {
      default:<div>
        {
          this.state.orderDetail.childList?
            <div className="voucher">
              <span>收货凭证：</span>
              <div>
                <div>
                  {
                    recvImgarray?recvImgarray.map((item,idx)=>{
                      // console.log(item.proImg)
                      return(
                        <img key={idx} src={`${item}`} alt=""/>
                      )
                    }):''
                  }
                </div>
              </div>
              <p>上传凭证日期：<span>{`${childList&&childList[0].recvDate?showDate(childList[0].recvDate):''}`}</span></p>
              <p>审核凭证通过日期：<span>{`${order&&order.organPayDate?showDate(order.organPayDate):''}`}</span></p>
            </div>
            :''
        }
      </div>
    }
    return Evidence[item]
  };
  render() {
    const {history} = this.props;
    const {orderId} = this.state;
    const {order} = this.state.orderDetail;
    // console.log(order);
    return(
      <div className="main">
        <div className="main-wrapper">
          <div className="orderDetail">
            {this.getOrderDetail()}
            {this.getEvidence()}
          </div>
        </div>
        {
          order&&order.status==='21'&&<Opacitybtn onClick={()=>{history.push(`/filldata?orderId=${orderId}`)}}>补充资料</Opacitybtn>
        }
      </div>
    )
  }
}
