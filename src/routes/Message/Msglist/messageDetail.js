import React,{component} from 'react';
import classnames from 'classnames';
import { connect } from 'dva';


export default class MessageDetail extends React.Component{
  constructor(props){
    super(props)

  }
  render() {
    const {history} = this.props;
    const containClass = classnames({
      // 'msg-notice': true,
      // 'padL43': this.props.padL43,
      'msg-detail':true
    });
    const data=
      {id:'订单1',state: '1', time:'11:19',conteng:'客户【成成】订单【20180104164218313502】审核中，【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' };
    const obj = [
      {imgUrl:require("../../../assets/images/shen.png"),state:"审核"},
      {imgUrl:require("../../../assets/images/ju.png"),state:"拒单"},
      {imgUrl:require("../../../assets/images/xia.png"),state:"下单"}
    ];
    console.log(data);
    return (
      <div className="msg-list">
        <header>
          <aside>
            <img src={obj[data.state].imgUrl} />
          </aside>
          <article>
            <p>
              <span>{obj[data.state-1].state}</span>
              <span className="time">{data.time}</span>
            </p>
          </article>
          <p className="delete-right-p" onClick={()=>{history.push((`/orderDetail/${1}`))}}>
            <span>查看订单</span>
            <i className="iconfont icon-right"></i>
          </p>
        </header>
        <section  className={containClass}>
          <article>{data.conteng}</article>
          <span className="msg-time">2018-02-03 17:12</span>
        </section>
      </div>
    )
  }
}




