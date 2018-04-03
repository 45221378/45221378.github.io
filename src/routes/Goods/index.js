import React, { component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Search } from '../../components'
import { Tabs, List, SearchBar, Modal } from 'antd-mobile';

import './goods.less'

const Item = List.Item;
export default class OrderList extends React.Component {



  getList = () => {
    const orderLi = [
      { orderId: 1, orderStates: 1, name: '张昊', phone: '18087878787', course: 'java课程培训', orderNum: '201801041535293', orderTime: '2017-12-20', orderMoney: '$1890' },
      { orderId: 2, orderStates: 2, name: '张迭代', phone: '18087878787', course: 'java课程培训', orderNum: '201801041535293', orderTime: '2017-12-20', orderMoney: '$1890' },
      { orderId: 3, orderStates: 3, name: '张非', phone: '18087878787', course: 'java课程培训', orderNum: '201801041535293', orderTime: '2017-12-20', orderMoney: '$1890' },
      { orderId: 4, orderStates: 4, name: '张烦恼', phone: '18087878787', course: 'java课程培训', orderNum: '201801041535293', orderTime: '2017-12-20', orderMoney: '$1890' },
      { orderId: 5, orderStates: 5, name: '张从', phone: '18087878787', course: 'java课程培训', orderNum: '201801041535293', orderTime: '2017-12-20', orderMoney: '$1890' },
    ];
    // const filterObj = {
    //   1: { imgUrl: require("../../assets/images/sendgoods.png"), btn1: "查看", btn2: "取消订单" },
    //   2: { imgUrl: require("../../assets/images/stages.png"), btn1: "查看", btn2: "催单" },
    //   3: { imgUrl: require("../../assets/images/tobeSub.png"), btn1: "查看", btn2: "上传凭证" },
    //   4: { imgUrl: require("../../assets/images/refuse.png"), btn1: "查看", btn2: "上传凭证" },
    //   5: { btn1: "查看" }
    // };


    const { match: { params: { item = 'default', status } }, history } = this.props;
    const orderList = {
      default: 
        <section className="orderList goodsList">
          {/* <SearchBar placeholder="可输入客户姓名、手机号、订单号" /> */}
          <Search />
          <List>
            {
              orderLi.map((item, idx) => {
                return (
                  <Item className="li" key={idx}>
                    <header>
                      {/* <p><span>{item.name}</span><span>{item.phone}</span></p> */}
                      <p><span>java课程培训</span><span className="status">下架中</span></p>
                    </header>
                    <section className="order-name clearfix">
                      <p>标注价格：<span>{item.course}</span></p>
                      <p>成交价格：<span className="price">{item.orderNum}</span></p>
                      <p>贴息信息：<span>{item.orderTime}</span></p>
                      <p className="createTime">创建时间：2017-09-15 16:21:25</p>
                      <button>上架</button>
                      <button>修改</button>
                    </section>
                  </Item>
                )
              })
            }
          </List>
        </section>
      ,
    };
    return orderList[item]
  };
  render() {
    return (
      <div className="order tables goods">
        {this.getList()}
        <Link className="addGoodBtn" to="/addGood">
            <img src={require('../../assets/images/addGood.png')} alt=""/>
        </Link>
      </div>

    )
  }
}

  // render() {
  //   return (
  //     <div className="order tables goods">
  //       <div className="orderList goodsList">
  //         <Search />
  //         <ul>
  //           <li>
  //             <header>
  //               <p><span>java课程培训</span><span className="status">下架中</span></p>
  //             </header>
  //             <section className="order-name clearfix">
  //               <p>标注价格：<span>¥17,800</span></p>
  //               <p>成交价格：<span className="price">¥17,800</span></p>
  //               <p>贴息信息：<span>贴息金额100元</span></p>
  //               <p className="createTime">创建时间：2017-09-15 16:21:25</p>
  //               <button>上架</button>
  //               <button>修改</button>
  //             </section>
  //           </li>
  //           <li>
  //             <header>
  //               <p><span>java课程培训</span><span className="status">下架中</span></p>
  //             </header>
  //             <section className="order-name clearfix">
  //               <p>标注价格：<span>¥17,800</span></p>
  //               <p>成交价格：<span className="price">¥17,800</span></p>
  //               <p>贴息信息：<span>贴息金额100元</span></p>
  //               <p className="createTime">创建时间：2017-09-15 16:21:25</p>
  //               <button>上架</button>
  //               <button>修改</button>
  //             </section>
  //           </li>
  //           <li>
  //             <header>
  //               <p><span>java课程培训</span><span className="status">下架中</span></p>
  //             </header>
  //             <section className="order-name clearfix">
  //               <p>标注价格：<span>¥17,800</span></p>
  //               <p>成交价格：<span className="price">¥17,800</span></p>
  //               <p>贴息信息：<span>贴息金额100元</span></p>
  //               <p className="createTime">创建时间：2017-09-15 16:21:25</p>
  //               <button>上架</button>
  //               <button>修改</button>
  //             </section>
  //           </li>
  //           <li>
  //             <header>
  //               <p><span>java课程培训</span><span className="status">下架中</span></p>
  //             </header>
  //             <section className="order-name clearfix">
  //               <p>标注价格：<span>¥17,800</span></p>
  //               <p>成交价格：<span className="price">¥17,800</span></p>
  //               <p>贴息信息：<span>贴息金额100元</span></p>
  //               <p className="createTime">创建时间：2017-09-15 16:21:25</p>
  //               <button>上架</button>
  //               <button>修改</button>
  //             </section>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   )
  // }
// }
