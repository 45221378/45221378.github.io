import React,{component} from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import {Search} from '../../components'

import './order.less'
import '../Message/messageCenter.less'

export default class OrderList extends React.Component{
  render() {
    return(
      <div className="order tables">
        <ul className="tables-top">
          <li>全部订单</li>
          <li>分期订单</li>
          <li>即将到还款日</li>
          <em className="em"></em>
        </ul>
        <div className="orderList">
          <div>
            <Search />
            <ul>
              <li>
                <img src={require("../../assets/images/fahuo.png")} alt=""/>
                <header>
                  <p><span>张昊</span><span>18087878787</span></p>
                </header>
                <section className="order-name">
                  <p>订单名称：<span>java课程培训</span></p>
                  <p>订单编号：<span>201801041535293</span></p>
                  <p>下单日期：<span>2017-12-20</span></p>
                  <span className="money">$1890</span>
                  <button>取消订单</button>
                  <button>查看</button>
                </section>
              </li>
              <li>
                <img src={require("../../assets/images/judan.png")} alt=""/>
                <header>
                  <p><span>张昊</span><span>18087878787</span></p>
                </header>
                <section className="order-name">
                  <p>订单名称：<span>java课程培训</span></p>
                  <p>订单编号：<span>201801041535293</span></p>
                  <p>下单日期：<span>2017-12-20</span></p>
                  <span className="money">$1890</span>
                  <button>取消订单</button>
                  <button>查看</button>
                </section>
              </li>
              <li>
                <img src={require("../../assets/images/shenpi.png")} alt=""/>
                <header>
                  <p><span>张昊</span><span>18087878787</span></p>
                </header>
                <section className="order-name">
                  <p>订单名称：<span>java课程培训</span></p>
                  <p>订单编号：<span>201801041535293</span></p>
                  <p>下单日期：<span>2017-12-20</span></p>
                  <span className="money">$1890</span>
                  <button>取消订单</button>
                  <button>查看</button>
                </section>
              </li>
              <li>
                <img src={require("../../assets/images/tijiao.png")} alt=""/>
                <header>
                  <p><span>张昊</span><span>18087878787</span></p>
                </header>
                <section className="order-name">
                  <p>订单名称：<span>java课程培训</span></p>
                  <p>订单编号：<span>201801041535293</span></p>
                  <p>下单日期：<span>2017-12-20</span></p>
                  <span className="money">$1890</span>
                  <button>取消订单</button>
                  <button>查看</button>
                </section>
              </li>
            </ul>

          </div>
          <div>
            222
          </div>
          <div>
            333
          </div>
        </div>
      </div>
    )
  }
}
