import {Component} from 'react'
import { Route, Switch, Redirect } from 'dva/router'
import { Footer } from '../../components';
// import {
//     Home,
//     MessageCenter,
//     OrderList,
//     Mine,
//     Goods
// } from '../index';
import Home from '../Home/index';
import MessageCenter from '../Message/index';
import OrderList from '../Order/index';
import Mine from '../Mine/Home/home';
import Goods from '../Goods/index';

import './main.less'

// import dynamic from 'dva/dynamic';

export default class Main extends Component {
    render() {
        return (
            <section className="main">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/messageCenter" exact component={MessageCenter} />
                    <Route path="/orderList" exact component={OrderList} />
                    <Route path="/mine" exact component={Mine} />
                    <Route path="/goods" exact  component={Goods} />
                    <Redirect to="/"/>
                </Switch>
                <Footer/>
            </section>
        );
    }
}
