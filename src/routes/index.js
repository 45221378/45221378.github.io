import React,{Component} from 'react';
import { Router, Switch, Route } from 'dva/router';
import {connect} from 'dva';
import {ActivityIndicator,Toast} from 'antd-mobile';
import qs from 'qs';
import store from '../index';
// import dynamic from 'dva/dynamic';
import Main from "./Main/index";
// import Home from "./Home/index";
import Calc from "./Calc/index"
// import MessageCenter from "./Message/index";
import MessageDetail from "./Message/Msglist/messageDetail";
// import OrderList from "./Order/index";
import NoticeDetail from "./Message/Noticelist/noticeDetail";
import OrderDetail from "./Order/OrderDetail/orderDetail";
import Filldata from "./Filldata/index";
import Login from "./Login";
import FindPsd from './Findpsd/index';
// import Mine from './Mine/Home/home';
import Myshop from './Mine/Myshop/myshop';
import Search from './Mine/Search/search';
import SearchDetail from './Mine/SearchDetail/searchDetail';
import ChangePsd from './Mine/ChangePsd/changePsd';
//import Fillpeople from "./Filldata/FillPeople/fillPeople";
import Fillpeople from "./Filldata/FillPeople/fillcontacts";

import Fillsame from "./Filldata/FillSame/fillSame";
import Fillother from "./Filldata/FillOther/fillOther";

import OrganNotice from "./OrganNotice/index"
import OneKey from "./OneKey/index"
import SetStages from "./SetStages/index"
import StageSuccess from "./StageSuccess/index"
import Receivables from "./Receivables/index"
import UploadVoucher from "./UploadVoucher/index"

// import Goods from "./Goods/index"
import AddGood from "./AddGood/index"

// export {
//     Home,
//     MessageCenter,
//     OrderList,
//     Mine,
//     Goods
// }

const titles={
    '/login':'登录',
    '/organNotice':'商户须知',
    '/oneKey':'选择商品',
    '/oneKey/stageSuccess':'客户扫码',
    '/receivables':'收款明细',
    '/upload':'上传收获凭证',
    '/calc':'分期计算器',
    '/orderDetail/orderId':'订单详情',
    '/filldata':'补充资料',

};
const titleDetail=[
    {key:'/setStages',value:'设置分期信息'},
    {key:'/receivables/01',value:'货款明细'},
    {key:'/receivables/02',value:'保证金明细'},
    {key:'/receivables/03',value:'其他付款明细'},
    {key:'/receivables/04',value:'返点明细'},
    {key:'/upload',value:'上传图片'},
    {key:'/orderDetail',value:'订单详情'},
    {key:'/filldata/fillpeople',value:'补充联系人资料'},
    {key:'/filldata/fillsame',value:'补充同业资料'},
    {key:'/filldata/fillother',value:'补充其他资料'},
    {key:'/messageDetail',value:'消息详情'},
    {key:'/noticeDetail',value:'公告详情'},
    {key:'/organNotice',value:'商户须知'},
    // {key:'/messageCenter',value:'消息公告'},

    {key:'/upload',value:'上传图片'},
    {key:'/oneKey/stageSuccess',value:'客户扫码'},
];
const auth=['/login','/findPsd'];
@connect(({organInfo,token,loading})=>({organInfo,token,loading}))
export default class APP extends Component{
    getTile=(pathname)=>{
        let title = pathname==='/'?'首页':'';
        if(titles[pathname]){
            title = titles[pathname];
        }else{
            titleDetail.map((ele,index)=>{
                if(pathname.indexOf(ele.key)!==-1){
                    title = ele.value;
                    return true;
                }else{
                    return false;
                }
            })
        }
        return title;
    }
    checkToken=(token)=>{
        const {history,history:{location:{pathname}}} = this.props;
        const flag = auth.some((value) => {
            return pathname.indexOf(value) !== -1;
        });
        // console.log(flag);
        if(!token && !flag){
            history.replace('/login');
        }
    }
    componentDidMount(){
        const {history} = this.props;
        history.listen(({pathname})=>{
            // console.log(pathname);
            document.title = this.getTile(pathname);
            Toast.hide();
        })
    }
    render(){
        const {history,loading} = this.props;
        let {token} = store.getState();
        // console.log(token);
        const {location:{search}} = history;
        if(search.indexOf('otherToken')!==-1){
            const params = qs.parse(search.split('?')[1]);
            token = params.otherToken;
        }
        // console.log(token);
        this.checkToken(token);
        return(
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/messageDetail/:detail" component={MessageDetail} />
                        <Route path="/filldata/fillother/:orderId" component={Fillother} />
                        <Route path="/filldata/fillsame/:orderId" component={Fillsame} />
                        <Route path="/filldata/fillpeople/:orderId" component={Fillpeople} />
                        <Route path="/filldata" exact component={Filldata} />
                        <Route path="/orderDetail/:orderId" component={OrderDetail} />
                        <Route path="/noticeDetail/:detailId" component={NoticeDetail} />
                        <Route path="/organNotice/:first?/:second?" component={OrganNotice} />
                        <Route path="/oneKey" exact component={OneKey} />
                        <Route path="/oneKey/setStages/:id?" component={SetStages} />
                        <Route path="/oneKey/stageSuccess" component={StageSuccess} />
                        <Route path="/receivables/:item?/:status?" component={Receivables} />
                        <Route path="/upload/:orderId?" component={UploadVoucher} />
                        <Route path="/calc" component={Calc} />
                        <Route path="/login" component={Login} />
                        <Route path="/findPsd" component={FindPsd} />
                        <Route path="/mine/changePsd" component={ChangePsd} />
                        <Route path="/mine/myshop" component={Myshop} />
                        <Route path="/mine/search" component={Search} />
                        <Route path="/mine/searchDetail/:orderId" component={SearchDetail} />
                        <Route path="/addGood/:proId?" component={AddGood} />
                        <Route path="/" component={Main} />
                    </Switch>
                </Router>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    toast={true}
                    text="加载中..."
                />
            </div>
        )
    }
}
