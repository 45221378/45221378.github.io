import React,{component} from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import {Link,withRouter} from 'dva/router'

export default class Msglist extends React.Component{

  constructor(props,content){
    super(props,content)
    this.state={
      checkAll: false,
      padL43:'',
      msgList: [
        {id:'订单1',state: '1', time:'11:19',conteng:'客户【成成】订单【20180104164218313502】审核中，【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        {id:'订单2',state: '2', time:'11:20',conteng:'客户【成成】订单【20180104164218313502】拒单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        {id:'订单3',state: '3', time:'11:21',conteng:'客户【成成】订单【20180104164218313502】下单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        {id:'订单4',state: '1', time:'11:22',conteng:'客户【成成】订单【20180104164218313502】审核中【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        {id:'订单5',state: '2', time:'11:23',conteng:'客户【成成】订单【20180104164218313502】拒单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
        {id:'订单6',state: '3', time:'11:24',conteng:'客户【成成】订单【20180104164218313502】下单【需要同业账单】 。具体原因为：【已注册的同业信息有:微贷网,】' },
      ],
      select:false,
      selectAll:false,
      selectCount:0
    }
  }
  componentWillMount(){
    const msgList=this.state.msgList.map(item=>{
      return Object.assign({},item,{selectm:false})
    })
    this.setState({
      msgList:msgList
    })
  }
  check=(idx)=>{
    const {msgList} = this.state;
    var  selectAll = true;
    var  selectCount =0;
    const list = msgList.map((item,index)=>{
      if(index===idx){
         item.selectm = !item.selectm;
      };
      if(!item.selectm){
        selectAll=false;
      }
      if(item.selectm){
        selectCount++;
      }
      return item;
    });
    this.setState({
      select:list,
      selectAll,
      selectCount
    })
  };
  checkTotal=(e)=>{
    this.setState({
      // select:!this.state.select,
      selectAll:!this.state.selectAll,
      selectCount:!this.state.selectAll?this.state.msgList.length:0
    });
    const {msgList} = this.state;
    var list = msgList.map((item)=>{
        item.selectm = !this.state.selectAll;
        return item;
    });
    this.setState({
      msgList:list
    })
  };

  showcheckAll=()=>{
    this.setState({
      checkAll: !this.state.checkAll,
      padL43:this.state.checkAll?'':'padL43'
    })

  };

  delete=()=>{
    var sendid=[];
    const {msgList} = this.state;
    var deleteId = msgList.map((item)=>{
      if(item.selectm){
        sendid+=item.id+','
      }
      return sendid
    });
    console.log(typeof sendid);
  };

  render() {
    const obj = [
      {imgUrl:require("../../../assets/images/shen.png"),state:"审核"},
      {imgUrl:require("../../../assets/images/ju.png"),state:"拒单"},
      {imgUrl:require("../../../assets/images/xia.png"),state:"下单"}
    ];
    const containClass = classnames({
      'msg-notice': true,
      'padL43': this.state.padL43,
    });
    const {checkAll, padL43,selectAll,select,selectCount} = this.state;
    const {showNotice,history} = this.props;
    var msgList = this.state.msgList.map((item,idx)=>
        (
        <li className="msg-list" key={idx}>
          <div className="checkbox ui-ckBox" style={{'display':checkAll?'block':'none'}}>
            <input className="ui-ckBox-checkbox"  type="checkbox" checked={item.selectm?"checked":""} onChange={()=>this.check(idx)}/>
            <span className="ui-ckBox-iconBox checkbox-li">
                <i className="ui-ckBox-icon iconfont icon-yes"></i>
              </span>
          </div>
          <div>
            <header className={checkAll?'padL43':''} >
              <aside>
                <img className="" src={obj[item.state-1].imgUrl} />
              </aside>
              <article>
                <p>
                  <span>{obj[item.state-1].state}</span>
                  <span className="time">{item.time}</span>
                </p>
              </article>
              <Link to={`/messageDetail/${item.id}`} className="right-p">
                <span>查看详情</span>
                <i className="iconfont icon-right"></i>
              </Link>
            </header>
            <section className={containClass}>
              <p>{item.conteng}</p>
            </section>
          </div>
        </li>
      )
    );
    return(
      <div className="msg" style={{'display':showNotice?'block':'none'}}>
        <ul className={checkAll?'pad-bot72':''}>
          {msgList}
        </ul>

        <section className="nav-footer" style={{'display':checkAll?'block':'none'}}>
          <div className="ui-ckBox">
            <input className="ui-ckBox-checkbox" checked={selectAll?"checked":""} type="checkbox" onChange={this.checkTotal}/>
            <span className="ui-ckBox-iconBox">
              <i className="ui-ckBox-icon iconfont icon-yes"></i>
            </span>
          </div>
          <span className="checkAll">全选</span>
          <button className="nav-footer-btn nav-footer-btn2" onClick={this.delete}>删除({selectCount})</button>
          <button className="nav-footer-btn nav-footer-btn1" onClick={this.showcheckAll}>取消</button>
        </section>
        <div className="edit-msg" style={{'display':checkAll?'none':'block'}} onClick={this.showcheckAll}>
          <span>编辑</span>
        </div>
      </div>
    )
  }
}
