import React from 'react';
import { Tabs, List, Icon } from 'antd-mobile';
import {withRouter} from 'dva/router'
import {connect} from 'dva';
import Payment from './Payment';
import Bond from './Bond';
import Other from './Other';
import Rebate from './Rebate';
import ajax from '../../utils/ajax'
import {SpaceTips} from '../../components/index';

import './Receivables.less';

const Item = List.Item;

let unlisten = null;
let scrollY = 0;
@withRouter
@connect(({userInfo})=>({userInfo}))
export default class Receivables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            thisStatus:'all',
            pageSize:10,
            page:1,
            loading:false,
            hasNone:false
        }
    }
    tabChange=(key)=>{
        this.getTotalAmt(key,0,1,true);
        this.setState({
            thisStatus:key,
            page:1
        })
    }
    scroll=()=>{
        const $h = document.documentElement.clientHeight;
        const $scrollH = document.documentElement.scrollHeight;
        const $scroll = window.scrollY;
        if($scrollH-$scroll-$h<50 && $scroll>scrollY){
            const {match:{params:{item='default',status='all'}}} = this.props;
            const {page} = this.state;
            this.getTotalAmt(status,item,page*1+1,false);
        }
        setTimeout(()=>{scrollY=$scroll},0)
    }
    getContent=(item)=>{
        const {bailList,organPayList,otherList,rebateList} = this.state;
        const domList={
            '01':<Payment infoList={organPayList} />,
            '02':<Bond infoList={bailList}/>,
            '03':<Other infoList={otherList}/>,
            '04':<Rebate infoList={rebateList}/>
        }
        return domList[item]
    }
    getTotalAmt=(status,type,page,isLoad)=>{
        const arrObj = {
            '01':'organPayList',
            '02':'bailList',
            '03':'otherList',
            '04':'rebateList'
        }
        let thisLoad = false;
        let thisList = this.state[arrObj[type]] || [];
        const {pageSize,loading,hasNone} = this.state;
        const {dispatch} = this.props;
        let obj = {};
        obj.queryType = type*1+1 || 1;
        obj.currentflag = 0;
        obj.currentpage = page;
        obj.pagesize = pageSize;
        if(status!=='all'){
            obj.status = status;
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
        ajax.post('/mobile/receivable',obj).then((data)=>{

            const {receivableList,rebateList,organPayList,bailList,otherList} = data;
            if(rebateList){
                thisList=thisList.concat(rebateList);
                if(rebateList.length<pageSize){
                    thisLoad=true
                }
                this.setState({
                    rebateList:thisList,
                    page
                })
            }
            if(organPayList){
                thisList=thisList.concat(organPayList);
                if(organPayList.length<pageSize){
                    thisLoad=true
                }
                this.setState({
                    organPayList:thisList,
                    page
                })
            }
            if(bailList){
                thisList=thisList.concat(bailList);
                if(bailList.length<pageSize){
                    thisLoad=true
                }
                this.setState({
                    bailList:thisList,
                    page
                })
            }
            if(otherList){
                thisList=thisList.concat(otherList);
                if(otherList.length<pageSize){
                    thisLoad=true
                }
                this.setState({
                    otherList:thisList,
                    page
                })
            }
            if(receivableList){
                this.setState({
                    receivableList,
                    page
                })
            }
        }).catch((err)=>{
            console.log(err);
            this.setState({
                receivableList:[]
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
    componentDidMount(){
        const {history} = this.props;
        unlisten = history.listen(({pathname})=>{
            this.setState({
                hasNone:false
            })
            if(pathname==='/receivables'){
                this.tabChange('all');
            }else if(pathname.indexOf('/receivables')===-1){

            }else{
                const arr = pathname.split('/');
                this.getTotalAmt(arr[3],arr[2],1,true);
            }
        })
        window.addEventListener('scroll',this.scroll,false);
    }
    componentWillUnmount(){
        unlisten();
        window.removeEventListener('scroll',this.scroll,false);
    }
    render(){
        const tabs = [
            {title:'全部',key:'all'},
            {title:'已支付',key:'S'},
            {title:'支付中',key:'U'}
        ];
        const nameList={
            '01':'货款(元)',
            '02':'保证金退还',
            '03':'其他付款',
            '04':'返点'
        }
        const {match:{params:{item='default'}},history} = this.props;
        const {receivableList,thisStatus,loading,hasNone} = this.state;
        return(<div className="receivables">

            {item==='default'?<div>
                {receivableList&&<div>
                    <Tabs tabs={tabs} onChange={(tab,index)=>{this.tabChange(tab.key)}}></Tabs>
                    {(receivableList&&receivableList.length>0)?<section className="receivables-content">
                        <List className="receivables-content-list">
                            {receivableList&&receivableList.map((ele,index)=>(<Item arrow="horizontal" key={index} extra={ele.SUM} onClick={(type,status) => {history.push(`/receivables/${ele.payType}/${thisStatus}`)}}>{nameList[ele.payType]}</Item>))}
                        </List>
                    </section>:
                    <SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips={'暂无信息'} />}
                </div>}
            </div>:<section className="receivables-payment">
                {this.getContent(item)}
                {!hasNone&&<div className="loading-wrapper">
                  {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
                </div>}
            </section>}
        </div>)
    }
}
