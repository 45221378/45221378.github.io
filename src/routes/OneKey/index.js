import React from 'react';
import { connect } from 'dva';
import {Button,SearchBar,Icon} from 'antd-mobile'
import {Link,withRouter} from 'dva/router'

import './OneKey.less';

import ajax from '../../utils/ajax'

let scrollY = 0;
let timer = null;
@withRouter
@connect(({organInfo})=>({organInfo}))
export default class OneKey extends React.Component{
    constructor(props){
        super(props);
        const {organInfo:{organType}} = props;
        this.state={
            is3C:organType*1===0,
            proList:null,
            name:'',
            pageSize:10,
            page:1,
            loading:false,
            hasNone:false
        }
    }
    getList=()=>{
        const {proList} = this.state;
        return proList.map((ele,index)=>(<li key={index}>
            <Link to={`/oneKey/setStages/${ele.proId}`} className="one-content-list-item">
                <img src={ele.proImg} alt={ele.proName}/>
                <section>
                    <p>{ele.proName}{ele.busiProductSubsidy.subsidyType!=='0'&&<b>贴息</b>}</p>
                    <span>￥{ele.proSalePrice}</span>
                </section>
            </Link>
        </li>))
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
      this.setState({
        page:1,
        hasNone:false
      })
      this.getGoods(1,true);
    }
    getGoods=(page,isClear=false)=>{
      let {pageSize,loading,proList,hasNone,name} = this.state;
      const { dispatch } = this.props;
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
      ajax.post('/mobile/listProduct',{currentflag:0,currentpage:page,pagesize:pageSize,proName:name}).then((data)=>{
        const thisList = proList.concat(data.proList);
        let hasNone = false;
        if(data.proList.length<pageSize && !isClear){
          hasNone=true;
        }
        this.setState({
          page,
          proList:thisList,
          hasNone
        })
      }).catch((err)=>{
        console.log(err)
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
    scroll=()=>{
      const $h = document.documentElement.clientHeight;
      const $scrollH = document.documentElement.scrollHeight;
      const $scroll = window.scrollY;
      if($scrollH-$scroll-$h<20 && $scroll>scrollY){
        const {page,name} = this.state;
        this.getGoods(page*1+1,name);
      }
      setTimeout(()=>{scrollY=$scroll},0)
    }
    componentDidMount(){
      this.getGoods(1,true);
      window.addEventListener('scroll',this.scroll,false);
    }
    componentWillUnmount(){
      window.removeEventListener('scroll',this.scroll,false);
    }
    render(){
        const {is3C,proList,loading,hasNone} = this.state;
        const {history} = this.props;
        return(<div className="one">
          {proList&&<div>
            {proList.length>0?<div className="one-content">
                <SearchBar placeholder="可输入商品名称" cancelText="搜索" onSubmit={this.searchGoods} onCancel={this.searchGoods} showCancelButton onChange={this.setName}/>
                <div className="one-content-wrapper" onScroll={this.scroll}>
                    <ul className="one-content-list">
                        {this.getList()}
                    </ul>
                    {!hasNone&&<div className="loading-wrapper">
                      {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
                    </div>}
                </div>
                {is3C&&<Link className="addGoodBtn" to="/oneKey/setStages/empty">
                    其他商品
                </Link>}
            </div>:
            <div className="one-empty">
                <img src={require('../../assets/images/onkey-empty.png')} alt="商品为空"/>
                <p>商品列表为空</p>
                {is3C&&<Button type="primary" onClick={()=>{history.push('/oneKey/setStages/empty')}}>其他商品</Button>}
            </div>}
          </div>}
        </div>)
    }
}
