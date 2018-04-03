import React from 'react';
import { List } from 'antd-mobile';

import './searchDetail.less'

const Item = List.Item;
export default class SearchDetail extends React.Component {
    constructor(props, context) {
        console.log(props);
        super(props, context)
    }
    render() {
        return (
            <section className="searchDetail">
                <ul className="searchDetail-list">
                    <li className="searchDetail-list-item">
                        <List renderHeader={() => '基本信息'} className="my-list">
                            <Item extra={'杨阳'}>用户名称</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={'18208872676'}>电话号码</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={'武汉工程大学'}>学校名称</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={'18208872676'}>QQ</Item>
                        </List> 
                        <List className="my-list">
                            <Item extra={'邮科院路88号'}>宿舍</Item>
                        </List> 
                     </li>

                     
                    {/* <li className="title">基本信息</li>
                    <li className="item">
                        <label>用户名称</label>
                        <span>杨阳</span>
                    </li> */}
                </ul>

                <ul className="searchDetail-list">
                    <li className="searchDetail-list-item">
                        <List renderHeader={() => '联系人信息'} className="my-list">
                            <Item extra={'杨好'}>父母姓名</Item>
                        </List>
                        <List className="my-list">
                            <Item extra={'13000000001'}>联系方式</Item>
                        </List>
                        <List className="my-list">
                            <Item extra={'李豪'}>朋友姓名</Item>
                        </List>
                        <List className="my-list">
                            <Item extra={'18208872676'}>联系方式</Item>
                        </List>
                    </li>
                </ul>

                
                <ul className="searchDetail-list">
                    <li className="title">基本信息</li>
                    <li className="item">商品名称：java课程培训</li>
                    <li className="item">商品名称：java课程培训</li>
                    <li className="item">商品名称：java课程培训</li>
                    <li className="item">商品名称：java课程培训</li>
                    <li className="item">商品名称：java课程培训</li>
                    <li className="item">商品名称：java课程培训</li>
                    <li className="item last">商品名称：java课程培训</li>
                </ul>

                <ul className="searchDetail-list plan">
                    <li className="title">还款计划</li>
                    <li className="item head">
                        <span className="left">期数</span>
                        <span className="center">未还金额</span>
                        <span className="right">应还款日</span>
                    </li>
                    <li className="item">
                        <span className="left">1</span>
                        <span className="center">￥1,903.58</span>
                        <span className="right">2018-10-23</span>
                    </li>
                    <li className="item">
                        <span className="left">2</span>
                        <span className="center">￥1,903.58</span>
                        <span className="right">2018-10-23</span>
                    </li>
                    <li className="item">
                        <span className="left">3</span>
                        <span className="center">￥1,903.58</span>
                        <span className="right">2018-10-23</span>
                    </li>
                </ul>
            </section>
        );
    }
}