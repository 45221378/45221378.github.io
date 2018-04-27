import React from 'react';
import classnames from 'classnames';
import ajax from '../../../utils/ajax'
import moment from 'moment'

export default class MessageDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      messageId: props.match.params.detail,
      msgDetail:[]
    }
  }
  getmsgDetail=()=>{
    ajax({
      method: 'post',
      url: '/mobile/messageDetail',
      data: {
        messageId: this.state.messageId,
        phone: '15175188586',
        type:1
      }
    }).then((response)=>{
      this.setState({
        msgDetail:response.messageInfo
      })
    })
  }
  //时间戳转化为时间格式
  // trantime=(data)=>{
  //   var date = new Date(data),
  //     Y=date.getFullYear()+'-',
  //     M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
  //     D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ',
  //     h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
  //     m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
  //     s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
  //   return Y+M+D+h+m+s;
  // }

  componentWillMount(){
    this.getmsgDetail();
  }
  render() {
    const {history} = this.props;
    const {msgDetail} =this.state;
    const containClass = classnames({
      'msg-detail':true
    });
    const obj = {
      1:{imgUrl:require("../../../assets/images/ju.png"),state:"拒单"},
      2:{imgUrl:require("../../../assets/images/shen.png"),state:"审核"},
      3:{imgUrl:require("../../../assets/images/ju.png"),state:"公告"},
      4:{imgUrl:require("../../../assets/images/ju.png"),state:"补足保证金"},
      5:{imgUrl:require("../../../assets/images/xia.png"),state:"下单"},
      6:{imgUrl:require("../../../assets/images/ju.png"),state:"逾期"},
      7:{imgUrl:require("../../../assets/images/ju.png"),state:"回购"},
    }
    return (
      <div className="msg-list">
        <header>
          <article>
            <p>
              {msgDetail.messageType&&<span>{obj[msgDetail.messageType].state}</span>}
              <span className="time">{msgDetail.time}</span>
            </p>
          </article>
          <p className="delete-right-p" onClick={()=>{history.push((`/orderDetail/${msgDetail.orderId}`))}}>
            <span>查看订单</span>
            <i className="iconfont icon-right"></i>
          </p>
        </header>
        <section  className={containClass}>
          <article>{msgDetail.message}</article>
          <span className="msg-time">{moment(msgDetail.createTime).format('YYYY-MM-DD HH:mm')}</span>
        </section>
      </div>
    )
  }
}




