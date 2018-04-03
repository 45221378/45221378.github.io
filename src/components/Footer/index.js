import React from 'react';
import {Link,withRouter} from 'dva/router';

import './footer.less'

@withRouter
export default class Footer extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        activeKey: 'home',
      };
    }
    componentDidMount(){
        const {location:{pathname}} = this.props;
        console.log(pathname);
        let thisKey = '';
        switch(pathname){
            case '/':
                thisKey = 'home';
                break;
            case '/goods':
                thisKey = 'goods';
                break;
            case '/Order':
                thisKey = 'order';
                break;
            case '/Message':
                thisKey = 'message';
                break;
            case '/mine':
                thisKey = 'mine';
                break;
            default:
                thisKey = 'home';
                break;
        }
        console.log(thisKey);
        this.setState({
            activeKey:thisKey
        })
    }
    render(){
        const {activeKey} = this.state;
        console.log(activeKey);
      return (
        <div className="footer-nav clearfix">
            <Link className={activeKey==='home'?'nav-active':''} key="home" to="/">
                <i className={`iconfont ${activeKey==='home'?"icon-shouye":"icon-shouye1"}`}></i>
                <span>首页</span>
            </Link>
            <Link className={activeKey==='goods'?'nav-active':''} key="goods" to="/goods">
                <i className={`iconfont ${activeKey==='goods'?"icon-shangpin":"icon-shangpin1"}`}></i>
                <span>商品</span>
            </Link>
            <Link className={activeKey==='order'?'nav-active':''} key="order" to="/main/orderList">
                <i className={`iconfont ${activeKey==='order'?"icon-dingdan1":"icon-dingdan"}`}></i>
                <span>订单</span>
            </Link>
            <Link className={activeKey==='message'?'nav-active':''} key="message" to="/main/MessageCenter">
                <i className={`iconfont ${activeKey==='message'?"icon-xiaoxi":"icon-xiaoxi1"}`}></i>
                <span>消息</span>
            </Link>
            <Link className={activeKey==='mine'?'nav-active':''} key="mine" to="/mine">
                <i className={`iconfont ${+activeKey==='mine'?"icon-geren":"icon-geren1"}`}></i>
                <span>我的</span>
            </Link>
        </div>
      );
    }
  }
