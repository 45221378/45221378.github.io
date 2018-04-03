import React,{component} from 'react';
import { connect } from 'dva';
import { Button, WhiteSpace, WingBlank} from 'antd-mobile';
import { classnames } from 'classnames';

import './button.less'
export default class Opacitybtn extends React.Component{
  constructor(props, context) {
    super(props, context)
  }
  render() {
    let classNames = require('classnames');
    let { type, onClick, className } = this.props;
    if (!type) {
      type = 'primary'
    }
    let btnClass = classNames('opacityBtn',className);
    // console.log(this.props);
    return(
      <div className={btnClass}>
        <Button type={type} onClick={onClick}>{this.props.children}</Button>
      </div>
    )
  }
}
