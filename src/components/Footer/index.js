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
    setActive=(props)=>{
        const {location:{pathname}} = props;
        let thisKey = '';
        switch(pathname){
            case '/':
                thisKey = 'home';
                break;
            case '/goods':
                thisKey = 'goods';
                break;
            case '/orderList':
                thisKey = 'order';
                break;
            case '/messageCenter':
                thisKey = 'message';
                break;
            case '/mine':
                thisKey = 'mine';
                break;
            default:
                thisKey = 'home';
                break;
        }
        this.setState({
            activeKey:thisKey
        })
    }
    componentWillReceiveProps(props){
        this.setActive(props);
    }
    componentDidMount(){
        this.setActive(this.props);
    }
    render(){
        const {activeKey} = this.state;
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
                <Link className={activeKey==='order'?'nav-active':''} key="order" to="/orderList">
                    <i className={`iconfont ${activeKey==='order'?"icon-dingdan1":"icon-dingdan"}`}></i>
                    <span>订单</span>
                </Link>
                <Link className={activeKey==='message'?'nav-active':''} key="message" to="/messageCenter">
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
