import React,{component} from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Msglist from './Msglist/msglist'

import './messageCenter.less'




export default class MessageCenter extends React.Component{
  constructor(props,content){
    super(props,content);
    this.state = {
      showNotice: true,
    }

  }

  changeList=(flag)=>{
    // console.log(id);
    this.setState({
      showNotice:flag
    })
  }

  render() {
    console.log(this.state);
    const {showNotice} = this.state;
    return (
      <div className="tables">
          <div className="tables-top" >
            <p id="msg"  onClick={()=>this.changeList(!!1)} className={showNotice?"color666":""}>消息</p>
            <p id="notice" onClick={()=>this.changeList(!!0)} className={showNotice?"":"color666"}>公告</p>
            <em style={{left:showNotice?0:'50%'}}></em>
          </div>
          <Msglist showNotice={showNotice} />
          <ul className="notice" style={{'display':showNotice?'none':'block'}} >
            <li>
              <div className="notice-content">
                <p className="p1">公告公告公告公告公告公告</p>
                <p className="p2">2018-02-03 17:12</p>
              </div>
              <i className="iconfont icon-right"></i>
            </li>
            <li>
              <div className="notice-content">
                <p className="p1">公告公告公告公告公告公告</p>
                <p className="p2">2018-02-03 17:12</p>
              </div>
              <i className="iconfont icon-right"></i>
            </li>
          </ul>
      </div>
    );
  }
}




