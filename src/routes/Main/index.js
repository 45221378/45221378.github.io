import React from 'react'
import { Route, Switch } from 'dva/router'
import { Footer } from '../../components';
import {
    Home,
    MessageCenter,
    OrderList,
    Mine,
    Goods
} from '../index';

import './main.less'

// import dynamic from 'dva/dynamic';

export default class Main extends React.Component {
    render() {
        return (
            <section className="main">
                <div className="main-wrapper">
                    <Switch>
                        <Route path="/main/home" exact component={Home} />
                        <Route path="/main/messageCenter" exact component={MessageCenter} />
                        <Route path="/main/orderList" exact component={OrderList} />
                        <Route path="/mine" exact component={Mine} />
                        <Route path="/main/goods" exact component={Goods} />
                        <Route component={Home}/>
                    </Switch>
                </div>
                <Footer />
            </section>
        );
    }
}
