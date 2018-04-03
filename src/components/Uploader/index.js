import React from 'react';
import webu from '../../vendor/webuploader.html5only';
import './uploader.less'
//imgWidth  缩略图宽度  default=80
//imgHeight  缩略图高度  default=80
//multiple  是否支持多张上传  default=false
//limit  最大上传数量  default=8
//fileSingleSizeLimit  上传文件大小限制  default=undefined
//fileSizeLimit   验证文件总大小是否超出限制, 超出则不允许加入队列。 default=undefined
//upAuto  是否直接上传  default=false
//prepareNextFile 是否允许在文件上传时准备下一个文件  default=true
//pick 上传按钮的结构
//id  上传按钮的ID   与pick的id对应
//server  文件上传的地址
//method  文件上传的请求方式  default=post
//formData  文件上传请求的参数表，每次发送都会发送此对象中的参数。default={}
//accept  文件上传的类型   default={title: 'Images',extensions: 'jpg,jpeg,bmp,png',mimeTypes: 'image/jpg,image/jpeg,image/png,image/bmp'}
//thumb  生成的缩略图设置  default={width: 80,height: 80,quality: 70,allowMagnify: false,crop: true,type: '' }
    // quality   图片质量，只有type为`image/jpeg`的时候才有效。
    // allowMagnify   是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
    // crop   是否允许裁剪。
    // type   为空的话则保留原有图片格式。  否则强制转换成指定的类型。
//compress  图片上传是否压缩  false 为不压缩  default={quality: 90,allowMagnify: true,crop:false,noCompressIfLarger:false,compressSize:1048576}
    // quality   图片质量，只有type为`image/jpeg`的时候才有效。
    // allowMagnify   是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
    // crop   是否允许裁剪。
    // preserveHeaders   是否保留头部meta信息。
    // noCompressIfLarger   如果发现压缩后文件大小比原来还大，则使用原来图片   此属性可能会影响图片自动纠正功能
    // compressSize   单位字节，如果图片大小小于此值，不会采用压缩。
//duplicate  去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
const picker = <p className="uploader-btn" id="picker"><i className="iconfont icon-xiangji"></i></p>;
export default class Uploader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imgArr:[],
            imgSrcArr:[]
        }
    }
    getPicker=()=>{
        const {pick=picker} = this.props;
        return pick;
    }
    uploadImg=(file)=>{
        const _this = this;
        let {imgArr,imgSrcArr} = this.state;
        const {getNum} = this.props;
        imgArr.push(file);
        // 创建缩略图
        this._uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                imgSrcArr.push('不能预览');
            }else{
                imgSrcArr.push(src);
            }
            getNum(imgArr.length);
            _this.setState({
                imgArr,
                imgSrcArr
            })
        });
    }
    componentDidMount(){
        const {
            thumb={width:80,height:80,quality:70,allowMagnify:false,crop:true,type:''},
            multiple=false,
            limit=8,
            auto=false,
            server='',
            prepareNextFile=true,
            fileSizeLimit=undefined,
            fileSingleSizeLimit=undefined,
            id='#picker',
            accept={title: 'Images',extensions: 'jpg,jpeg,bmp,png',mimeTypes: 'image/jpg,image/jpeg,image/png,image/bmp'},
            compress={quality: 90,allowMagnify: true,crop:false,noCompressIfLarger:false,compressSize:1048576}
        } = this.props;
        this._uploader = webu.create({
            auto,
            pick: {
                id,
                multiple:multiple,
            },
            accept,
            fileNumLimit:limit,
            resize: true,
            duplicate :true,
            prepareNextFile,
            fileSizeLimit,
            fileSingleSizeLimit,
            thumb,
            compress,
            server
        });
        this._uploader.on( 'fileQueued', this.uploadImg);
    }
    render(){
        const {imgArr,imgSrcArr} = this.state;
        return(<section className="uploader">
            <ul className="uploader-list" id="img-list">
                {imgArr.length>0 && imgArr.map((ele,index)=>(
                    <li key={index} id={ele.id} className="file-item thumbnail">
                        {imgSrcArr[index]==="不能预览"?
                        <span>imgSrcArr[index]</span>:
                        <section className="uploader-list-wrapper">
                            <img src={imgSrcArr[index]}/>
                            <i className="iconfont icon-roundclosefill"></i>
                        </section>}
                    </li>
                ))}
                {imgArr.length<8 && <p className="uploader-btn">
                    <b id="picker"></b>
                    {this.getPicker()}
                </p>}
            </ul>
        </section>)
    }
}