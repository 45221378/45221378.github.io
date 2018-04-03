import React from 'react';
import { connect } from 'dva';
import { classnames } from 'classnames';

import { Button, WhiteSpace, WingBlank} from 'antd-mobile';


import './button.less'
export default class DashedBtn extends React.Component{
  constructor(props,context){
    super(props,context)
  }

  render() {
    let classNames = require('classnames');
    let { type, onClick, className} = this.props;
    // console.log(this.props);
    if (!type) {
      type = 'primary'
    }
    let btnClass = classNames('dashedBtn',className);
    return(
      <div className={btnClass}>
        <Button type={type} onClick={onClick}><i className="iconfont icon-jia1"></i>{this.props.children}</Button>
      </div>
    )
  }
}
