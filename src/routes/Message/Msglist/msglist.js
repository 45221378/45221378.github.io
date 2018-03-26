import React,{component} from 'react';
import { connect } from 'dva';
import MessageDetail from './messageDetail'

export default class Msglist extends React.Component{
  constructor(props,content){
    super(props,content)
    this.state={
      checkAll: false,
      padL43:'',
      msgList: [
        { state: '1', time:'11:19',conteng:'客户【 成成】订单【20180104164218313502】审核中，【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        { state: '2', time:'11:20',conteng:'客户【 成成】订单【20180104164218313502】拒单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        { state: '3', time:'11:21',conteng:'客户【 成成】订单【20180104164218313502】下单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        { state: '1', time:'11:22',conteng:'客户【 成成】订单【20180104164218313502】审核中【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        { state: '2', time:'11:23',conteng:'客户【 成成】订单【20180104164218313502】拒单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        { state: '3', time:'11:24',conteng:'客户【 成成】订单【20180104164218313502】下单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      ]
    }
  }

  showcheckAll=()=>{
    this.setState({
      checkAll: !this.state.checkAll,
      padL43:this.state.checkAll?'':'padL43'
    })

  }

  render() {
    const {checkAll, padL43} = this.state;
    const {showNotice} = this.props;
    var items = this.state.msgList.map((item,idx)=>{
        return  (
          <li className="msg-list" key={idx}>
            <div className="checkbox ui-ckBox" style={{'display':checkAll?'block':'none'}}>
              <input className="ui-ckBox-checkbox" type="checkbox" />
              <span className="ui-ckBox-iconBox checkbox-li">
                  <i className="ui-ckBox-icon iconfont icon-yes"></i>
                </span>
            </div>
            <MessageDetail data={item} padL43={padL43} />
          </li>
        )
    })
    return(
      <div className="msg" style={{'display':showNotice?'block':'none'}}>
        <ul>
          {items}
        </ul>

        <section className="nav-footer" style={{'display':checkAll?'block':'none'}}>
          <div className="ui-ckBox">
            <input className="ui-ckBox-checkbox" type="checkbox" />
            <span className="ui-ckBox-iconBox">
              <i className="ui-ckBox-icon iconfont icon-yes"></i>
            </span>
          </div>
          <span className="checkAll">全选</span>
          <button className="nav-footer-btn nav-footer-btn2" >删除(2)</button>
          <button className="nav-footer-btn nav-footer-btn1" onClick={this.showcheckAll}>取消</button>
        </section>
        <div className="edit-msg" style={{'display':checkAll?'none':'block'}} onClick={this.showcheckAll}>
          <span>编辑</span>
        </div>
      </div>
    )
  }
}
