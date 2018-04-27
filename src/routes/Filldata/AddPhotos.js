import React from 'react';
import axios from 'axios';
import {withRouter} from 'dva/router';
import {ImageUpload} from '../../components/index'
import {baseURL} from '../../utils/ajax'
import {connect} from 'dva';

@connect()
@withRouter
@ImageUpload
export default class AddPhotos extends React.Component{
  constructor(props){
    super(props);
    // const {input:{value}} = this.props;
    // console.log(this.props);
    this.state = {
      imgList:[],
      fileList:[]
    };
  }
  upChange=(e)=>{
    const {fileChange,input: { value, onChange }} = this.props;
    const {imgList} = this.state;
    let newList = value?value:[];
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
        // console.log(res);
        // fileList.push(JSON.parse(res.data[0]).body[`contractPic${imgList.length}`]);
        newList.push(JSON.parse(res.data[0]).body[`contractPic${imgList.length}`]);


        this.setState({
          imgList,
          fileList:newList,
        })

        onChange(newList);   // 非常重要
      }).finally(()=>{
        if(imgList.length<4){
          // console.log(this.refs.files.value);
          this.refs.files.value = '';
        }
      })
    })
  }

  deleteImg=(index)=>{
    let {imgList,fileList} = this.state;
    let {input: { value, onChange }} = this.props;
    let newList = value;
    imgList = imgList.filter((ele)=>(ele!==imgList[index]));
    fileList = fileList.filter((ele)=>(ele!==fileList[index]));
    newList.splice(index,1);
    this.setState({
      imgList,
      fileList:newList
    });
    onChange(newList);   // 非常重要
  }



  render(){
    const {input: { value,name }} = this.props;
    return(<div className="upload-photos">
      <div className="upload-photos-wrapper">
        <section className="upload-photos-list clearfix">
          {value&&value.map((ele,index)=>(<div className="upload-photos-list-img" key={index}>
                        <span className="upload-photos-list-img-delete" onClick={()=>this.deleteImg(index)}>
                            <i className="iconfont icon-roundclosefill"></i>
                        </span>
            <img src={ele} alt=""/>
          </div>))}
          {value.length<4&&<div className="upload-photos-list-btn" >
            <input ref="files" className="upload-photos-input" type="file" onChange={this.upChange}/>
            <span><i className="iconfont icon-xiangji"></i><b className="add-btn">{`${value.length+1}/4`}</b></span>
          </div>}
        </section>

        <input name={name} value={value}  style={{display:"none"}} type="text" onChange={this.upChange} />
      </div>
    </div>)
  }
}
