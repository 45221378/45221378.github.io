import React from 'react';
import {Button } from 'antd-mobile';
import {withRouter} from 'dva/router';
import {Uploader} from '../../components/index'

@withRouter
export default class UploadPhotos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num:0
        };
    }
    upload=()=>{
        this.refs.uploader['_uploader'].upload();
    }
    getNum=(num)=>{
        this.setState({
            num
        })
    }
    render(){
        const {num} = this.state;
        return(<div className="upload-photos">
            <p>上传收获凭证（最多可上传八张）</p>
            <div className="upload-photos-wrapper">
                <Uploader 
                    ref="uploader"
                    pick={<span><i className="iconfont icon-xiangji"></i><b className="add-btn">{`${num+1}/8`}</b></span>}
                    getNum={this.getNum}
                    id='#picker'
                    multiple={true}
                />
            </div>
            <Button type="primary" onClick={this.upload}>确定上传</Button>
        </div>)
    }
}