import React,{component} from 'react';
import { connect } from 'dva';
import {Opacitybtn} from '../../../components'



export default class OrderDetail extends React.Component {
  constructor(props){
    super(props)

  }
  goFillData=()=>{
    const {history} = this.props;
    history.push('/filldata');
  };
  render() {
    return(
      <div>
        <div className="orderDetail">
          <h6>订单状态</h6>
          <img className="img-state" src={require("../../../assets/images/stages.png")} alt=""/>
          <section>
            <p>已还期数：<span>13/18</span></p>
            <p>分期总额：<span>￥17,800</span></p>
            <p>首次还款日：<span>2017-12-20</span></p>
          </section>
          <section>
            <p>订单名称：<span>java课程培训</span></p>
            <p>订单编号：<span>201801041535293</span></p>
            <p>下单日期：<span>2017-12-20</span></p>
          </section>
          <section className="order-time">
            <p>订单金额：<span>java课程培训</span></p>
            <p>成交总价：<span>201801041535293</span></p>
            <p>支付时间：<span>2017-12-20</span></p>
            <div className="leavemsg">
              <span>买家留言：</span>
              <textarea defaultValue="拉飞机阿里放假啊啦放假啦发拉飞机拉飞机啦飞机啦拉萨简历发解放啦雷声大拉飞机阿里就发了飞机阿减肥拉飞机龙卷风绿卡">
            </textarea>
            </div>
          </section>
          <div className="voucher">
            <span>收货凭证：</span>
            <div>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
              <img src={require("../../../assets/images/home-bg.png")} alt=""/>
            </div>
            <p>上传凭证日期：<span>2017-12-20</span></p>
            <p>审核凭证通过日期：<span>2017-12-20</span></p>
          </div>
        </div>
        <Opacitybtn onClick={this.goFillData}>上传凭证</Opacitybtn>
      </div>
    )
  }
}
