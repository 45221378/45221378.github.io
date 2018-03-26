import React,{component} from 'react';
import { connect } from 'dva';
import { Button, WhiteSpace, WingBlank} from 'antd-mobile';

import './button.less'
export default class DashedBtn extends React.Component{
  render() {
    return(
      <div className="dashedBtn">
        <Button><i className="iconfont icon-jia1"></i>添加联系人</Button>
      </div>
    )
  }
}
