import React,{component} from 'react';
import { connect } from 'dva';

import './filldata.less'
export default class Filldata extends React.Component {
  render() {
    return(
      <div className="filldata">
        <p>
          <i className="iconfont icon-lianxiren font"></i>
          <span>补充联系人信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
        <p>
          <i className="iconfont icon-pingtaidaixuanku font"></i>
          <span>补充同业平台信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
        <p>
          <i className="iconfont icon-ziliaoku font"></i>
          <span>补充其他信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
      </div>
    )
  }
}
