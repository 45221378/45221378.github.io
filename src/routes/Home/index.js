import React from 'react';
import {Link} from 'dva/router';
import {Modal} from 'antd-mobile'

import './home.less'

export default class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:true
    }
  }
  closeModal=()=>{
    this.setState({
      visible:false
    })
  }
  render(){
    const {visible} = this.state;
    return (
      <div className="home">
        <section className="home-container">
          <Link className="home-container-order" to="/oneKey">一键下单</Link>
          <ul className="home-container-list clearfix">
            <li className="home-container-list-item">
              <Link to='/upload'>
                <i className="iconfont icon-shangchuan"></i>
                <span>上传收货凭证</span>
              </Link>
            </li>
            <li className="home-container-list-item">
              <Link to='/receivables'>
                <i className="iconfont icon-shoukuan"></i>
                <span>收款明细</span>
              </Link>
            </li>
            <li className="home-container-list-item">
              <Link to='/organNotice'>
                <i className="iconfont icon-shanghuxuzhi"></i>
                <span>商户须知</span>
              </Link>
            </li>
            <li className="home-container-list-item">
              <Link to='/calc'>
                <i className="iconfont icon-jisuanqi"></i>
                <span>分期计算器</span>
              </Link>
            </li>
          </ul>
          <ul className="home-container-list clearfix">
            <li className="home-container-list-item">
              <Link to='/upload'>
                <i className="iconfont icon-shangchuan"></i>
                <span>上传收货凭证</span>
              </Link>
            </li>
            <li className="home-container-list-item">
              <Link to='/payment'>
                <i className="iconfont icon-shoukuan"></i>
                <span>收款明细</span>
              </Link>
            </li>
            <li className="home-container-list-item">
              <Link to='/organNotice'>
                <i className="iconfont icon-shanghuxuzhi"></i>
                <span>商户须知</span>
              </Link>
            </li>
            <li className="home-container-list-item">
              <Link to='/calc'>
                <i className="iconfont icon-jisuanqi"></i>
                <span>分期计算器</span>
              </Link>
            </li>
          </ul>
        </section>
        <Modal visible={visible}
          closable={true}
          popup={true}
          className="home-notice"
          onClose={this.closeModal}
        >
          <span className="home-notice-img"></span>
          <p className="home-notice-title">元旦放假通知</p>
          <p className="home-notice-content">年元旦节假期将至，根据国家相关规定并结合公司情况，现将我司排通知如下司排通知如……</p>
          <footer>
            <Link className="home-notice-btn" to="/noticeDetail">查看详情</Link>
          </footer>
        </Modal>
      </div>
    )
  }
}
