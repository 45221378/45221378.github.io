import React from 'react';
import { Button} from 'antd-mobile';
import './button.less'
export default class DashedBtn extends React.Component{


  render() {
    let classNames = require('classnames');
    let { type, onClick, className,style} = this.props;
    // console.log(this.props);
    if (!type) {
      type = 'primary'
    }
    let btnClass = classNames('dashedBtn',className);
    return(
      <div className={btnClass} style={style} >
        <Button type={type} onClick={onClick}><i className="iconfont icon-jia1"></i>{this.props.children}</Button>
      </div>
    )
  }
}
