import React from 'react';
import {Button,SearchBar,Icon} from 'antd-mobile';
import store from '../../index'
import {withRouter} from 'dva/router';
import {SpaceTips} from '../../components/index';
import UploadPhotos from './UploadPhotos'
import ajax from '../../utils/ajax'
import './UploadVoucher.less';

let scrollY = 0;
let timer = null;
@withRouter
export default class UploadVoucher extends React.Component{
    constructor(props){
        super(props);
        this.state={
            proList:null,
            name:'',
            pageSize:10,
            page:1,
            loading:false,
            hasNone:false
        }
    }

    //上拉加载
    scroll=(e)=>{
        const $h = document.documentElement.clientHeight;
        const $scrollH = document.documentElement.scrollHeight;
        const $scroll = window.scrollY;
        if($scrollH-$scroll-$h<20 && $scroll>scrollY){
            const {page,name} = this.state;
            this.getGoods(page*1+1,name);
        }
        setTimeout(()=>{scrollY=$scroll},0)
    }

    //查询按钮点击操作
    searchGoods=()=>{
        this.setState({
            page:1,
            hasNone:false
        })
        this.getGoods(1,true);
    }

    //获取商品列表的ajax请求操作
    getGoods=(page,isClear=false)=>{
        let {pageSize,loading,proList,hasNone,name} = this.state;
        const { dispatch } = store;
        proList = !proList || isClear?[]:proList;
        if(loading || hasNone){
            return;
        }
        if(!isClear){
            this.setState({
                loading:true,
            })
        }else{
            dispatch({
                type:'loading/save',
                payload:true
            })
        }
        ajax.post('/mobile/listConfirm',{currentflag:0,currentpage:page,pagesize:pageSize,searchword:name}).then((data)=>{
            const thisList = proList.concat(data.confirmList);
            let hasNone = false;
            if(data.confirmList.length<pageSize && !isClear){
                hasNone=true;
            }
            this.setState({
                page,
                proList:thisList,
                hasNone
            })
        }).catch((err)=>{
            console.log(err);
            this.setState({
                proList:[]
            })
        }).finally(()=>{
            this.setState({
                loading:false
            })
            dispatch({
                type:'loading/save',
                payload:false
            })
        })
    }

    //查询按钮值设置
    setName=(val)=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{
        this.setState({
          name:val?val:''
        })
      },100)
    }

    //日期转化
    translateDate=(date)=>{
        const year = date.substring(0,4);
        const mon = date.substring(4,6);
        const day = date.substring(6,8);
        const hour = date.substring(8,10);
        const min = date.substring(10,12);
        const second = date.substring(12);

        const thisDate = `${year}-${mon}-${day} ${hour}:${min}:${second}`;
        return thisDate;
    }
    
    componentDidMount(){
        this.getGoods(1,true);
        window.addEventListener('scroll',this.scroll,false);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll,false);
    }
    render(){
        const {match:{params:{orderId}},history}=this.props;
        const {proList,loading,hasNone} = this.state;
        return(<section className="upload">
            {!orderId?<div className="upload-list">
                {proList&&<div>
                    {(proList&&proList.length>0)?<div className="upload-list-wrapper">
                    <SearchBar placeholder="可输入客户姓名、手机号、商品名称" cancelText="搜索" onSubmit={this.searchGoods} onCancel={this.searchGoods} showCancelButton onChange={this.setName}/>
                    <ul className="upload-list-content" onScroll={this.scroll}>
                        {proList.map((ele,index)=>(
                            <li className="upload-list-content-item" key={index}>
                                <h3><b>{ele.userName} {ele.userPhone}</b><span>￥{ele.totalDealAmt}</span></h3>
                                <div className="upload-list-content-item-content">
                                    <p>商品名称：{ele.orderDesc}</p>
                                    <p>{this.translateDate(ele.orderDate)}</p>
                                    <p className="special">订单编号：{ele.orderId}</p>
                                    <Button type="primary" onClick={()=>(history.push(`/upload/${ele.orderId}`))}>上传</Button>
                                </div>
                            </li>
                        ))}
                    </ul></div>:
                    <SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips={'暂无信息'} />}
                </div>}
                {!hasNone&&<div className="loading-wrapper">
                  {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
                </div>}
            </div>:
            <UploadPhotos/>}
        </section>)
    }
}
