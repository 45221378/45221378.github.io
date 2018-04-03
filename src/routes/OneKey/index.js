import React from 'react';
import {Button,SearchBar,WingBlank,WhiteSpace} from 'antd-mobile'
import {Link,withRouter} from 'dva/router'

import './OneKey.less';

@withRouter
export default class OneKey extends React.Component{
    constructor(props){
        super(props);
        this.state={
            is3C:true,
            goodsList:[
                {goodsId:'00001',name:'java课程培训',isDiscount:true,price:'17800',imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522041090008&di=f5ed924b14f1822bc02906382b378481&imgtype=0&src=http%3A%2F%2Fwww.91goodschool.com%2FUpFiles%2Fgp%2F1001%2F201503%2F25%2F162428717179.jpg'},
                {goodsId:'00002',name:'java课程培训 线上半年',isDiscount:false,price:'17800',imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522041090008&di=f5ed924b14f1822bc02906382b378481&imgtype=0&src=http%3A%2F%2Fwww.91goodschool.com%2FUpFiles%2Fgp%2F1001%2F201503%2F25%2F162428717179.jpg'},
                {goodsId:'00003',name:'课程培训 线下48课时',isDiscount:false,price:'17800',imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522041090008&di=f5ed924b14f1822bc02906382b378481&imgtype=0&src=http%3A%2F%2Fwww.91goodschool.com%2FUpFiles%2Fgp%2F1001%2F201503%2F25%2F162428717179.jpg'}]
        }
    }
    getList=()=>{
        const {goodsList} = this.state;
        return goodsList.map((ele,index)=>(<li key={index}>
            <Link to={`/oneKey/setStages/${ele.goodsId}`} className="one-content-list-item">
                <img src={ele.imgUrl} alt={ele.name}/>
                <section>
                    <p>{ele.name}{ele.isDiscount&&<b>贴息</b>}</p>
                    <span>￥{ele.price}</span>
                </section>
            </Link>
        </li>))
    }
    render(){
        const {is3C,goodsList} = this.state;
        const {history} = this.props;
        return(<div className="one">
            {goodsList.length<=0?<div className="one-empty">
                <img src={require('../../assets/images/onkey-empty.png')} alt="商品为空"/>
                <p>商品列表为空</p>
                {is3C&&<Button type="primary" onClick={()=>{history.push('/oneKey/empty')}}>其他商品</Button>}
            </div>:
            <div className="one-content">
                <div className="one-content-wrapper">
                    <SearchBar placeholder="可输入商品名称"/>
                    <ul className="one-content-list">
                        {this.getList()}
                    </ul>
                </div>
                {is3C&&<Button type="primary" onClick={()=>{history.push('/oneKey/empty')}}>其他商品</Button>}
            </div>}
        </div>)
    }
}
