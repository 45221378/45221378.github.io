import React from 'react';
import {withRouter} from 'dva/router'
import {connect} from 'dva'
import { Tabs ,Modal,Toast,Icon} from 'antd-mobile';
import './order.less'
import '../Message/messageCenter.less'
import ajax from '../../utils/ajax'
import Allorder from './allOrder'
import Stageorder from './stageOrder'
import Dayorder from './dayOrder'

let scrollY = 0;
let timer = null;
@withRouter
@connect(({organInfo})=>({organInfo}))
export default class OrderList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      thisStatus:'1',
      visible:false,
      hint:'request',
      cancelorderId:'',
      AllList: null,  //全部订单
      StageList:null, //分期订单
      Organlist:null, //即将到还款日
      pageSize:10,
      name:'',
      page:1,
      loading:false,    //底部转圈圈
      hasNone:false,    //是否滑动进行请求
    }
  };
  //关闭弹框
  closeModal=()=>{
    this.setState({
      visible:false
    })
  }
  setName=(val)=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      this.setState({
        name:val?val:''
      })
    },100)
  }
  searchGoods=()=>{
    let {thisStatus} =this.state;
    this.setState({
      page:1,
      hasNone:false
    })
    this.getorderLi(thisStatus,1,true);
  }

  scroll=()=>{
    const {thisStatus} = this.state;
    const $h = document.documentElement.clientHeight;
    const $scrollH = document.documentElement.scrollHeight;
    const $scroll = window.scrollY;
    if($scrollH-$scroll-$h<50 && $scroll>scrollY){
      const {page} = this.state;
      this.getorderLi(thisStatus,page*1+1);
    }
    setTimeout(()=>{scrollY=$scroll},0)
  };
  componentDidMount(){
    const {thisStatus,page} = this.state;
    this.getorderLi(thisStatus,page,true);
    window.addEventListener('scroll',this.scroll,false);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll,false);
  }
  //为00是询问框，询问是否取消订单
  differBtn=(orderStates,orderId)=>{
    const {history} = this.props;
    // e.preventDefault();
    //进行催单处理；
    // if(orderStates=='21'){
    //   ajax({
    //     method:'post',
    //     url:'/mobile/orderDetail',
    //     data:{
    //       orderId:orderId,
    //       type:3
    //     }
    //   }).then((response)=>{
    //     console.log(response);
    //   })
    // }else
    if(orderStates==='31'){
      // console.log('跳转到上传凭证页面');
      history.push(`upload/${orderId}`);
    }else if(orderStates==='00'){
      this.setState({
        cancelorderId:orderId,
        visible:orderStates==='00'?true:false,
        hint:orderStates==='00'?'request':''
      })
    }
  };
  //取消订单操作
  cancelOrder=()=>{
    const {cancelorderId,thisStatus} = this.state;
    ajax({
      method:'post',
      url:'/mobile/orderDetail',
      data:{
        orderId:cancelorderId,
        type:2
      }
    }).then((response)=>{
      Toast.info('取消成功',1,()=>{
        this.closeModal();
        this.getorderLi(thisStatus,1,true)
      });
    })
  }
  //顶部table切换
  changeList=(key)=>{
    if(key==='1'){
      this.setState({
        thisStatus:'1',
      })
      this.getorderLi('1',1,true,'');
    }else if(key==='2'){
      this.setState({
        thisStatus:'2',
      })
      this.getorderLi('2',1,true,'');
    }else if(key==='3'){
      this.setState({
        thisStatus:'3',
      })
      this.getorderLi('3',1,true,'');
    }
  };
  //根据不同的参数，渲染不同的组件
  getContent=(item)=>{
    const {AllList,StageList,Organlist} = this.state;
    const domList={
      '1':<Allorder infoList={AllList} searchGoods={this.searchGoods} setName={this.setName} differBtn={this.differBtn}/>,
      '2':<Stageorder infoList={StageList} searchGoods={this.searchGoods} setName={this.setName} differBtn={this.differBtn}/>,
      '3':<Dayorder infoList={Organlist} searchGoods={this.searchGoods} setName={this.setName} differBtn={this.differBtn}/>,
    }
    return domList[item]
  }
  //获取订单列表数据
  getorderLi=(type,page,isLoad,inputname)=>{
    let arrObj = {
      '1':'AllList',
      '2':'StageList',
      '3':'Organlist'
    }
    let thisLoad = false;
    let thisList = this.state[arrObj[type]] || [];
    let {pageSize,loading,hasNone,name} =this.state;
    let {dispatch} =this.props;

    let obj = {};
    obj.currentflag = 0;
    obj.currentpage = page;
    obj.pagesize = pageSize;
    obj.type = type;
    if(inputname!==undefined){
      obj.searchword = inputname
    }else{
      obj.searchword = name
    }
    if(type==='3'){
      obj.orderstatus = 2;
    }
    if(isLoad){
      hasNone= false;
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
    ajax.post('mobile/listOrder',obj).then((data) => {
      const {orderList,creditList,overdurorganlist} = data;
      if(orderList){
        thisList=thisList.concat(data.orderList);
        if(orderList.length<pageSize){
          thisLoad=true;
        }
        this.setState({
          AllList:thisList,
          page
        })
      }
      if(creditList){
        thisList=thisList.concat(data.creditList);
        if(creditList.length<pageSize){
          thisLoad=true
        }
        this.setState({
          StageList:thisList,
          page
        })
      }
      if(overdurorganlist){
        thisList=thisList.concat(data.overdurorganlist);
        if(overdurorganlist.length<pageSize){
          thisLoad=true
        }
        this.setState({
          Organlist:thisList,
          page
        })
      }
    }).catch((err)=>{
      console.log(err);
      // Toast.info(err.head,2);
      this.setState({
        AllList:[],
        StageList:[],
        Organlist:[]
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
  }



  render() {
    const {visible,hint,thisStatus,loading,hasNone} = this.state;
    const tabs = [
      {title:'全部订单',key:'1'},
      {title:'分期订单',key:'2'},
      {title:'即将到还款日',key:'3'}
    ];
    return(
      <div className='order tables'>
          <div className="fixed-top">
            <Tabs  className='tables-top' tabs={tabs} onChange={(tab,index)=>{this.changeList(tab.key)}}></Tabs>
            <section>
              {this.getContent(thisStatus)}
              {!hasNone&&<div className="loading-wrapper">
                {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
              </div>}
            </section>
          </div>

        {hint==='request'?
          <Modal visible={visible}
                 closable={true}
                 popup={true}
                 className='order-notice'
                 onClose={this.closeModal}
          >
            <p className='home-notice-title'>确定要取消订单吗？</p>
            <button className='btn-white' onClick={this.closeModal}>取消</button>
            <button className='btn-blue' onClick={this.cancelOrder}>确定</button>
          </Modal>:''}
      </div>

    )
  }
}
