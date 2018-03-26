import React,{component} from 'react';
import { connect } from 'dva';
import { Button, WhiteSpace, WingBlank} from 'antd-mobile';

import './button.less'
export default class Opacitybtn extends React.Component{
  render() {
    return(
      <div className="opacityBtn">
        <Button type="primary">补充资料</Button>
      </div>
    )
  }
}
