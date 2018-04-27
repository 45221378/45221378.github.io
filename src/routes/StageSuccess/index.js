import React from 'react';
import { Button } from 'antd-mobile';
import {withRouter} from 'dva/router';
import QRCode from 'qrcode.react';

import './StageSuccess.less';

@withRouter
export default class StageSuccess extends React.Component{
    goBack=()=>{
        const {history} = this.props;
        const {location:{search}} = history;
        const url = search.split('=')[1];
        // console.log(url.split('/')[url.split('/').length-1]);
        const id = url.split('/')[url.split('/').length-1];
        history.push(`/oneKey/setStages/empty?${id}`)
    }
    render(){
        const {history} = this.props;
        const {location:{search}} = history;
        const url = search.split('=')[1];
        return(<div className="stages">
            <div className="stages-success">
                <section className="stages-success-code">
                    <span>你好，客户！</span>
                    <p>扫一扫，立刻完成分期。</p>
                    <div className="stages-success-code-wrapper">
                        <QRCode value={url}/>
                    </div>
                </section>
                <p className="stages-success-tip">退出该页面后将无法继续修改商品信息！</p>
                <Button type="primary" onClick={this.goBack}>返回修改</Button>
            </div>
        </div>)
    }
}