import React from 'react';
import { connect } from 'dva';
import qs from 'qs';
import './filldata.less'

@connect(
  state=>(
    {
      organId:state.organInfo.organId,
      phone:state.organInfo.phone,
      token:state.token,
    }
  )
)
export default class Filldata extends React.Component {
  constructor(props,context) {
    super(props, context)
    // console.log(props);
    // console.log(props.location.search.substring(1));
    let urlParams = qs.parse(props.location.search.substring(1),{decoder:decodeURIComponent});
    this.state={
      orderId:urlParams.orderId,
      otherToken:urlParams.otherToken,
      organId:urlParams.organId,
      phone:urlParams.phone,
      returnLink:urlParams.returnLink,
    }
  }

  //如果有token和organId和phone就需要dispatch他的值
  componentWillMount(){
    // console.log(this.state);
    const {dispatch} =this.props;
    if(this.state.organId&&this.state.phone){
      dispatch({
        type:'organInfo/save',
        payload:this.state
      })
    }
    if(this.state.otherToken){
      dispatch({
        type:'token/save',
        payload:this.state.otherToken
      })
    }
  }
  render() {
    const {orderId} = this.state;
    const {history} = this.props;
    return(
      <div className="filldata">
        {/*<p onClick={()=>{history.push(`/filldata/fillpeople/${orderId}${otherToken?'/'+otherToken:''}${returnUrl?'/'+{returnUrl}:''}`)}}>*/}
        <p onClick={()=>{history.push(`/filldata/fillpeople/${orderId}`)}}>
        <i className="iconfont icon-lianxiren font"></i>
          <span>补充联系人信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
        <p onClick={()=>{history.push(`/filldata/fillsame/${orderId}`)}}>
          <i className="iconfont icon-pingtaidaixuanku font"></i>
          <span>补充同业平台信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
        <p onClick={()=>{history.push(`/filldata/fillother/${orderId}`)}}>
          <i className="iconfont icon-ziliaoku font"></i>
          <span>补充其他信息</span>
          <i className="iconfont icon-right right"></i>
        </p>
      </div>
    )
  }
}
