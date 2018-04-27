import React from 'react';
import { Button} from 'antd-mobile';

import './button.less'
export default class Opacitybtn extends React.Component{
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
