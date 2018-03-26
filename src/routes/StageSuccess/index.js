import React from 'react';
import { Button } from 'antd-mobile';
import {withRouter} from 'dva/router'

import './StageSuccess.less';

@withRouter
export default class StageSuccess extends React.Component{
    constructor(props){
        super(props);
        
    }
    goBack=()=>{
        const {match:{params:{id}}} = this.props;
        const {history} = this.props;
        history.push(`/oneKey/setStages/${id}`)
    }
    componentDidMount(){
        
    }
    render(){
        return(<div className="stages">
            <div className="stages-success">
                <section className="stages-success-code">
                    <span>你好，客户！</span>
                    <p>扫一扫，立刻完成分期。</p>
                    <div className="stages-success-code-wrapper">
                        <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg" alt="二维码"/>
                    </div>
                </section>
                <p className="stages-success-tip">退出该页面后将无法继续修改商品信息！</p>
                <Button type="primary" onClick={this.goBack}>返回修改</Button>
            </div>
        </div>)
    }
}