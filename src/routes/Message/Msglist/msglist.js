import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import {Link} from 'dva/router'
import SpaceTips from './../../../components/Space'



@connect(({organInfo})=>({organInfo}))
export default class Msglist extends React.Component{
  constructor(props){
    super(props)
    this.state={
      infoList:[],
    }
  }

  render() {
    const obj = {
      1:{imgUrl:require("../../../assets/images/ju.png"),state:"拒单"},
      2:{imgUrl:require("../../../assets/images/shen.png"),state:"审核"},
      3:{imgUrl:require("../../../assets/images/ju.png"),state:"公告"},
      4:{imgUrl:require("../../../assets/images/ju.png"),state:"补足保证金"},
      5:{imgUrl:require("../../../assets/images/xia.png"),state:"下单"},
      6:{imgUrl:require("../../../assets/images/ju.png"),state:"逾期"},
      7:{imgUrl:require("../../../assets/images/ju.png"),state:"回购"},
    };
    const containClass = classnames({
      'msg-notice': true,
      'padL43': this.state.padL43,
    });
    const {infoList,check,checkTotal,deleteli,showcheckAll,checkAll,selectAll,selectCount} = this.props;
    var msgLi = (infoList&&infoList.length>0)?infoList.map((item,idx)=>

      (
        <li className="msg-list" key={idx} >
          <div className="checkbox ui-ckBox" style={{'display':checkAll?'block':'none'}}>
            <input className="ui-ckBox-checkbox"  type="checkbox" checked={item.selectm?"checked":""} onChange={()=>check(idx)}/>
            <span className="ui-ckBox-iconBox checkbox-li">
                <i className="ui-ckBox-icon iconfont icon-yes"></i>
              </span>
          </div>
          <div>
            <header className={checkAll?'padL43':''} >
              <aside>
              </aside>
              <article>
                <p>
                  <span>{obj[item.messageType].state}</span>
                  <span className="time">{item.createTime}</span>
                </p>
              </article>
              <Link to={`/messageDetail/${item.messageId}`} className="right-p">
                <span>查看详情</span>
                <i className="iconfont icon-right"></i>
              </Link>
            </header>
            <section className={containClass}>
              <p>{item.message}</p>
            </section>
          </div>
        </li>
      )
    ):<SpaceTips imgUrl={require('../../../assets/images/nomessage.png')} tips="暂无消息"/>;

    return(
      <div>
        {infoList&&<div className="msg">
          <div className="scrolldiv">
            <ul>
              {msgLi}
              {/*{loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}*/}
            </ul>
          </div>
        </div>
        }
        <div className="edit-msg" style={{'display':checkAll?'none':'block'}} onClick={showcheckAll}>
          <span>编辑</span>
        </div>
        <section className="nav-footer" style={{'display':checkAll?'block':'none'}}>
          <div className="ui-ckBox">
            <input className="ui-ckBox-checkbox" checked={selectAll?"checked":""} type="checkbox" onChange={()=>checkTotal()}/><span className="ui-ckBox-iconBox">
              <i className="ui-ckBox-icon iconfont icon-yes"></i>
            </span>
          </div>
          <span className="checkAll">全选</span>
          <button className="nav-footer-btn nav-footer-btn2" onClick={deleteli}>删除({selectCount})</button>
          <button className="nav-footer-btn nav-footer-btn1" onClick={showcheckAll}>取消</button>
        </section>
      </div>
    )
  }
}
