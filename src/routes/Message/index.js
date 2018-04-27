import React from 'react';
import { connect } from 'dva';
import {Tabs,Toast,Icon} from 'antd-mobile';
import Msglist from './Msglist/msglist'
import Noticelist from './Noticelist/notice'
import './messageCenter.less'
import ajax from '../../utils/ajax'
let scrollY = 0;
@connect(({organInfo})=>({organInfo}))
export default class MessageCenter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showIdx:'msg',
      showNotice: true,
      msgList: null,
      noticeList: null,
      load:false,
      pageSize:10,
      page:1,
      loading:false,
      hasNone:false,
      visible:false,
      type:1,
      checkAll: false,
      select:false,
      selectAll:false,
      selectCount:0,
      padL43:'',
    }
  }
  tabChange=(key)=>{
    if(key==='msg'){
      this.setState({
        type:1,
        showIdx:'msg',
        page:1,
        checkAll: false,
        selectCount:0,
        padL43:''
      })
      this.getNotice(1,1,true);
    }else{
      this.setState({
        type:2,
        showIdx:'notice',
        page:1,
      })
      this.getNotice(2,1,true);
    }
  };

  scroll=()=>{
    const {type} = this.state;
    const $h = document.documentElement.clientHeight;
    const $scrollH = document.documentElement.scrollHeight;
    const $scroll = window.scrollY;
    if($scrollH-$scroll-$h<30 && $scroll>scrollY){
      const {page} = this.state;
      this.getNotice(type,page*1+1);
    }
    setTimeout(()=>{scrollY=$scroll},0)
  }
  componentDidMount(){
    this.getNotice(1,1,true);
    window.addEventListener('scroll',this.scroll,false);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll,false);
  }
  //具体消息/公告组件
  getContent=(item)=>{
    const {msgList,noticeList} = this.state;
    const domList={
      'msg':<Msglist infoList={msgList} getNotice={this.getNotice} check={this.check} checkTotal={this.checkTotal} deleteli={this.deleteli} showcheckAll={this.showcheckAll} checkAll={this.state.checkAll} padL43={this.state.padL43} selectAll={this.state.selectAll} selectCount={this.state.selectCount}/>,
      'notice':<Noticelist infoList={noticeList}/>,
    }
    return domList[item]
  }

  //请求消息/公告列表
  getNotice=(type,page,isLoad)=>{
    let arrObj = {
      '1':'msgList',
      '2':'noticeList'
    }

    let thisLoad = false;
    let thisList = this.state[arrObj[type]] || [];
    let {pageSize,loading,hasNone} =this.state;
    let {dispatch} =this.props;
    let obj = {};
    obj.type = type;
    obj.currentflag = 0;
    obj.currentpage = page;
    obj.pagesize = pageSize;
    if(isLoad){
      hasNone =false;
    }
    if(loading || hasNone){
      return;
    }
    if(isLoad){
      dispatch({
        type:'loading/save',
        payload:true
      })
      thisList=[];
    }else{
      this.setState({
        loading:true
      })
    }
    ajax.post('/mobile/listMessage',obj).then((data) => {
      const {orderList,creditList} = data;
      if(orderList){
        thisList=thisList.concat(data.orderList);
        if(orderList.length<pageSize){
          thisLoad=true;
        }
        if(orderList.length>0){
          this.setState({
            selectAll:false
          })
        }
        this.setState({
          msgList:thisList,
          page
        })
      }
      if(creditList){
        thisList=thisList.concat(data.creditList);
        if(creditList.length<pageSize){
          thisLoad=true
        }
        this.setState({
          noticeList:thisList,
          page
        })
      }
    }).catch((err)=>{
      console.log(err);
      // Toast.info(err.head,2);
        this.setState({
          noticeList:[],
          msgList:[]
        })
    }).finally(()=>{
      dispatch({
        type:'loading/save',
        payload:false
      });
      this.setState({
        loading:false,
        hasNone: thisLoad
      })
    })
  };
  //一个单独的li的全选返选
  check=(idx)=>{
    const {msgList} = this.state;
    var  selectAll = true;
    var  selectCount =0;
    const list = msgList.map((item,index)=>{
      if(index===idx){
        item.selectm = !item.selectm;
      }
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
      selectAll:selectAll,
      selectCount:selectCount
    })
  };
  //所有的按钮全选返选
  checkTotal=()=>{
    const {msgList} = this.state;
    var list = msgList.map((item)=>{
      item.selectm = !this.state.selectAll;
      return item;
    });
    this.setState({
      msgList:list,
      selectAll:!this.state.selectAll,
      selectCount:!this.state.selectAll?list.length:0
    })
  };
  showcheckAll=()=>{
    this.setState({
      checkAll: !this.state.checkAll,
      padL43:this.state.checkAll?'':'padL43'
    })
  };
  deleteli=()=>{
    var sendid=[];
    const {msgList} = this.state;
    msgList.map((item)=>{
      if(item.selectm){
        sendid+=item.messageId+','
      }
      return sendid
    });

    if(sendid.length===0){
      Toast.info('请选择您要删除的消息');
    }else{
      ajax({
        method:'post',
        url:'/mobile/deleteMessage',
        data:{
          messageId:sendid,
          phone:'15175188586',
          type:1
        }
      }).then((response) => {
        Toast.info('操作成功',1,()=>{
          this.getNotice(1,1,true)
          this.setState({
            selectAll: false,
            selectCount:0
          })
        });
        // this.getMsg();
        // this.checkTotal();
      })
    }
  };


  render() {
    const tabs = [
      {title:'消息',key:'msg'},
      {title:'公告',key:'notice'},
    ];
    const {showIdx,loading,checkAll,hasNone} = this.state;
    return (
      <div className="tables msgtables-div">
          <div>
            <Tabs className="tables-top" tabs={tabs} onChange={(tab,index)=>{this.tabChange(tab.key)}}></Tabs>
            <section style={{'paddingBottom':checkAll?'60px':'0'}} >
              {this.getContent(showIdx)}
              {!hasNone&&<div className="loading-wrapper">
                {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
              </div>}
            </section>
          </div>
        {/*<SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips={'暂无信息'} />*/}
      </div>
    );
  }
}
