// import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { Component } from 'react';
import { Button } from 'antd-mobile';
// import { classnames } from 'classnames';

import './button.less'

export default class Btn extends Component {
    // constructor(props, context) {
    //     super(props, context)
    //     // console.log(props);
    // }

    render() {
        let classNames = require('classnames');
        let { type, onClick, className } = this.props;
        if (!type) {
            type = 'primary'
        }
        let btnClass = classNames('common-btn',className);
        return (
            //         <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
            //             <List.Item
            //                 extra={<Button type="ghost" size="small" inline>small</Button>}
            //                 multipleLine
            //             >
            //                 Regional manager
            //   <List.Item.Brief>
            //                     Can be collected, refund, discount management, view data and other operations
            //   </List.Item.Brief>
            //             </List.Item>
            //             <List.Item
            //                 extra={<Button type="primary" size="small" inline>small</Button>}
            //                 multipleLine
            //             >
            //                 Regional manager
            //   <List.Item.Brief>
            //                     Can be collected, refund, discount management, view data and other operations
            //   </List.Item.Brief>
            //             </List.Item>
            //         </List>
            // <WingBlank>
            <Button className={btnClass} type={type} onClick={onClick}>
                {this.props.children}
            </Button>
            // <WhiteSpace />
            // </WingBlank>
        )
    }
}
