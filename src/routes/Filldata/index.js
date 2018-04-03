import React from 'react';
import { connect } from 'dva';

import './filldata.less'
export default class Filldata extends React.Component {
  constructor(props,context) {
    super(props, context)
    this.state={
      otherToken:props.match.params.otherToken,
      returnUrl:props.match.params.returnUrl
    }
  }

  render() {
    console.log(this.state);
    const {otherToken,returnUrl} = this.state;
    const {history} = this.props;
    return(
      <div className="filldata">
        <p onClick={()=>{history.push(`/filldata/fillpeople/${otherToken}/${returnUrl}`)}}>
          <i className="iconfont icon-lianxiren font"></i>
          <span>补充联系人信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
        <p onClick={()=>{history.push(`/filldata/fillsame/${otherToken}/${returnUrl}`)}}>
          <i className="iconfont icon-pingtaidaixuanku font"></i>
          <span>补充同业平台信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
        <p onClick={()=>{history.push(`/filldata/fillother/${otherToken}/${returnUrl}`)}}>
          <i className="iconfont icon-ziliaoku font"></i>
          <span>补充其他信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
      </div>
    )
  }
}
