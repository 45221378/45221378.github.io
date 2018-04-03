import React from 'react';
import { Link } from 'dva/router';
import { Footer, Btn } from '../../../components';
import { List } from 'antd-mobile';

import './home.less'

const Item = List.Item;
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            hintFlag: 'none'
        }
    }
    quit = () => {
        this.setState({
            hintFlag: 'block'
        })
    }
    quitConfirm = ()=>{
        // console.log(this.props);
        const {history} = this.props;
        history.push('/login');
    }
    closeHint = () => {
        this.setState({
            hintFlag: 'none'
        })
    }
    render() {
        const { history } = this.props;
        const { hintFlag } = this.state;
        return (
            <section className="mine">
                <header>
                    <img className="mine-img" src={require("../../../assets/images/mine-people.png")} alt="" />
                    <p className="text">你好，小灰机</p>
                    <Link className="myShop" to="mine/myshop">我的店铺</Link>
                </header>
                {/* <ul className="list">
                    <li className="list-item">
                        <i className="iconfont icon-mima1"></i>
                        <span>修改密码</span>
                        <i className="iconfont icon-right"></i>
                    </li>
                    <li className="list-item">
                        <i className="iconfont icon-swticontuichu"></i>
                        <span>退出登录</span>
                        <i className="iconfont icon-right"></i>
                    </li>
                    <li className="list-item">
                        <i className="iconfont icon-14"></i>
                        <span>逾期查询</span>
                        <i className="iconfont icon-right"></i>
                    </li>
                </ul> */}

                <List className="mine-list">
                    <Item arrow="horizontal" onClick={() => { history.push('/mine/changePsd') }}> <i className="iconfont icon-mima1 mima"></i>修改密码</Item>
                    <Item arrow="horizontal" onClick={this.quit}><i className="iconfont icon-swticontuichu"></i>退出登录</Item>
                    <Item arrow="horizontal" onClick={() => { history.push('/mine/search') }}><i className="iconfont icon-14"></i>逾期查询</Item>
                </List>

                <section className="commonhint" style={{ display: hintFlag }}>
                    <section className="commonhint-small bounceInDown">
                        <img className="commonhint-small-group" onClick={this.closeHint} src={require("../../../assets/images/group.png")} />
                        <h3 className="commonhint-small-h3">确定要退出登录吗？</h3>
                        <div className="btnBox">
                            <Btn type='default' className="btn cancelBtn" onClick={this.closeHint}>取消</Btn>
                            <Btn className="btn" onClick={this.quitConfirm}>确定</Btn>
                        </div>
                    </section>
                </section>
            </section>
        );
    }
}