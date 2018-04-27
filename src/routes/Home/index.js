import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Modal} from 'antd-mobile'

import './home.less'

import ajax from '../../utils/ajax'

@connect(({userInfo})=>({userInfo}))
export default class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      message:null
    }
  }
  closeModal=()=>{
    this.setState({
      visible:false
    })
  }
  componentDidMount(){
    const {dispatch} = this.props;
    ajax.post('/mobile/selectUnreadMessage',{phone:'15175188586'}).then((data)=>{
      if(data){
        this.setState({
          visible:true,
          message:data
        })
      }
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      dispatch({
        type:'loading/save',
        payload:false
      })
    })
    
  }
  render(){
    const {visible,message} = this.state;
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
        </section>
        {message&&<Modal visible={visible}
          closable={true}
          popup={true}
          className="home-notice"
          onClose={this.closeModal}
        >
          <span className="home-notice-img"></span>
          <p className="home-notice-title">{message.Data.messageTitle}</p>
          <p className="home-notice-content">{message.Data.message}</p>
          <footer>
            <a className="home-notice-btn" onClick={()=>{this.props.history.push(`/noticeDetail/${message.Data.messageId}`)}}>查看详情</a>
          </footer>
        </Modal>}
      </div>
    )
  }
}
