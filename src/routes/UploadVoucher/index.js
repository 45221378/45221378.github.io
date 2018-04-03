import React from 'react';
import {Button,SearchBar} from 'antd-mobile';
import {withRouter} from 'dva/router';
import UploadPhotos from './UploadPhotos'

import './UploadVoucher.less';

@withRouter
export default class UploadVoucher extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goodsList:[
                {
                    name:'张昊',
                    phone:'18223565879',
                    price:'1890',
                    goodsName:'java课程培训',
                    date:'2017-12-20',
                    orderId:'20180104153529313491'
                },
                {
                    name:'张昊',
                    phone:'18223565879',
                    price:'1890',
                    goodsName:'java课程培训',
                    date:'2017-12-20',
                    orderId:'20180104153529313492'
                },
                {
                    name:'张昊',
                    phone:'18223565879',
                    price:'1890',
                    goodsName:'java课程培训',
                    date:'2017-12-20',
                    orderId:'20180104153529313493'
                }
            ]
        }
    }
    searchGoods=(val)=>{
        console.log(val);
    }
    getList=()=>{
        const {history} = this.props;
        const {goodsList} = this.state;
        return goodsList.map((ele,index)=>(
            <li className="upload-list-content-item" key={index}>
                <h3><b>{ele.name} {ele.phone}</b><span>￥{ele.price}</span></h3>
                <div className="upload-list-content-item-content">
                    <p>商品名称：{ele.goodsName}</p>
                    <p>{ele.date}</p>
                    <p className="special">订单编号：{ele.orderId}</p>
                    <Button type="primary" onClick={()=>(this.props.history.push(`/upload/${ele.orderId}`))}>上传</Button>
                </div>
            </li>
        ))
    }
    getContent=(index)=>{
        const domList = {
            0:<div className="upload-list">
                <SearchBar placeholder="可输入商品名称" cancelText="搜索" onSubmit={this.searchGoods} onCancel={this.searchGoods} showCancelButton/>
                <ul className="upload-list-content">
                    {this.getList()}
                </ul>
            </div>,
            1:<UploadPhotos/>
        }
        return domList[index];
    }
    render(){
        return(<section className="upload">
            {this.getContent(1)}
        </section>)
    }
}