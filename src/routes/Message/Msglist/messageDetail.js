import React,{component} from 'react';
import classnames from 'classnames';
import { connect } from 'dva';


export default class MessageDetail extends React.Component{
  constructor(props,contents){
    super(props,contents)

  }
  render() {
    const containClass = classnames({
      'msg-notice': true,
      'padL43': this.props.padL43,
    });
    const {data} = this.props;
    const obj = [
      {imgUrl:require("../../../assets/images/shen.png"),state:"审核"},
      {imgUrl:require("../../../assets/images/ju.png"),state:"拒单"},
      {imgUrl:require("../../../assets/images/xia.png"),state:"下单"}
    ];
    console.log(data.state);
    return (
      <div >
        <header className={this.props.padL43}>
          <aside>
            <img className="" src={obj[data.state-1].imgUrl} />
          </aside>
          <article>
            <p>
              <span>{obj[data.state-1].state}</span>
              <span className="time">{data.time}</span>
            </p>
          </article>
          <p className="right-p">
            <span>查看详情</span>
            <i className="iconfont icon-right"></i>
          </p>
        </header>
        <section  className={containClass}>
          <p>{data.conteng}</p>
        </section>
      </div>
    )
  }
}




