import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import Form from './form';
import Success from './success';

import './findPsd.less'

export default class FindRoute extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/findPsd/form" exact component={Form} />
                <Route path="/findPsd/success" exact component={Success} />
                <Route path="/findPsd" exact component={Form} />
            </Switch>
        );
    }
}