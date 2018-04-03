import React,{component} from 'react';
import { connect } from 'dva';
import {Link,withRouter} from 'dva/router'
import {Tabs, List } from 'antd-mobile';
import Msglist from './Msglist/msglist'

import './messageCenter.less'


export default class MessageCenter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showIdx:'msg',
      showNotice: true,
    }

  }
  changeList=(key)=>{
    console.log(key);
    this.setState({
      showIdx:key,
      showNotice: key=='msg'?true:false,
    })
  }
  msgList = ()=>{
    const tabs = [
      {title:'消息',key:'msg'},
      {title:'公告',key:'notice'},
    ];
    const msgLi = [
      {id:'订单1',state: '1', time:'11:19',conteng:'客户【成成】订单【20180104164218313502】审核中，【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      {id:'订单2',state: '2', time:'11:20',conteng:'客户【成成】订单【20180104164218313502】拒单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      {id:'订单3',state: '3', time:'11:21',conteng:'客户【成成】订单【20180104164218313502】下单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      {id:'订单4',state: '1', time:'11:22',conteng:'客户【成成】订单【20180104164218313502】审核中【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      {id:'订单5',state: '2', time:'11:23',conteng:'客户【成成】订单【20180104164218313502】拒单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      {id:'订单6',state: '3', time:'11:24',conteng:'客户【成成】订单【20180104164218313502】下单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
    ];
    const noticeLi= [
      {notice:'1公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告' ,time:'2018-02-03 17:12'},
      {notice:'2公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告' ,time:'2018-02-03 17:12'},
      {notice:'3公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告' ,time:'2018-02-03 17:12'},
      {notice:'4公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告' ,time:'2018-02-03 17:12'},
    ];
    const {match:{params:{item='default',status}},history} = this.props;
    const {showNotice} = this.state;
    const msgLiDom ={
      default:<div>
        <Tabs  className="tables-top" tabs={tabs} onChange={(tab,index)=>{this.changeList(tab.key)}}></Tabs>
        <Msglist showNotice={showNotice}/>
        <ul className="notice" style={{'display':showNotice?'none':'block'}}>
          {
            noticeLi.map((item,idx)=>{
              return(
                <li className="li" key={idx}>
                  <Link to={`/noticeDetail/${item.time}`}>
                    <div className="notice-content">
                      <p className="p1">{item.notice}</p>
                      <p className="p2">{item.time}</p>
                    </div>
                    <i className="iconfont icon-right"></i>
                  </Link>
               </li>
              )
            })
          }
        </ul>
      </div>
    }
    return msgLiDom[item]
  }
  render() {
    return (
      <div className="tables">
        {this.msgList()}
      </div>
    );
  }
}
