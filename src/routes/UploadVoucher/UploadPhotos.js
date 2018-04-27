import React from 'react';
import axios from 'axios';
import {Button,Toast} from 'antd-mobile';
import {withRouter} from 'dva/router';
import {ImageUpload} from '../../components/index'
import ajax,{baseURL} from '../../utils/ajax'

@withRouter
@ImageUpload
export default class UploadPhotos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgList:[],
            fileList:[]
        };
    }
    upChange=(e)=>{
        const {fileChange} = this.props;
        const {imgList,fileList} = this.state;
        fileChange(e,{
            size:100,
        }).then(({blob,src})=>{
            imgList.push(src);
            const formData = new FormData();
            formData.append(`contractPic${imgList.length}`,blob);
            axios.post(`${baseURL}/wap/uploadPhoto`,formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                // console.log(JSON.parse(res.data[0]).body[`contractPic${imgList.length}`]);
                fileList.push(JSON.parse(res.data[0]).body[`contractPic${imgList.length}`]);
                this.setState({
                    imgList,
                    fileList
                })
            }).finally(()=>{
                if(imgList.length<8){
                    this.refs.files.value = '';
                }
            })
        })
    }
    deleteImg=(index)=>{
        let {imgList,fileList} = this.state;
        imgList = imgList.filter((ele)=>(ele!==imgList[index]));
        fileList = fileList.filter((ele)=>(ele!==fileList[index]));
        this.setState({
            imgList,
            fileList
        })
    }
    upload=()=>{
        const {match:{params:{orderId}},history}=this.props;
        const {fileList} = this.state;
        let recvImg = '';
        fileList.map((ele,index)=>{
            recvImg=!recvImg?`${ele}`:`${recvImg},${ele}`;
            return true;
        })
        ajax.post('/mobile/confirmDetail',{orderId,recvImg}).then((data)=>{
            Toast.info('上传成功',2,()=>{history.goBack()});
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        const {imgList} = this.state;
        return(<div className="upload-photos">
            <p>上传收获凭证（最多可上传八张）</p>
            <div className="upload-photos-wrapper">
                <section className="upload-photos-list clearfix">
                    {imgList.map((ele,index)=>(<div className="upload-photos-list-img" key={index}>
                        <span className="upload-photos-list-img-delete" onClick={()=>this.deleteImg(index)}>
                            <i className="iconfont icon-roundclosefill"></i>
                        </span>
                        <img src={ele} alt=""/>
                    </div>))}
                    {imgList.length<8&&<div className="upload-photos-list-btn">
                        <input ref="files" className="upload-photos-input" type="file" onChange={this.upChange}/>
                        <span><i className="iconfont icon-xiangji"></i><b className="add-btn">{`${imgList.length+1}/8`}</b></span>
                    </div>}
                </section>
            </div>
            <Button type="primary" disabled={imgList.length<1?true:false} onClick={this.upload}>确定上传</Button>
        </div>)
    }
}