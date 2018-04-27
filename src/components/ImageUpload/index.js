import React,{Component} from 'react';
const ImageUpload = (WrappedComponent)=>
  class extends Component{
    fileChange(e,compress=[]){
      return new Promise((resolve,reject)=>{
        // const compressOption = Object.assign({
        //   //压缩比
        //   quality: 20,
        //   //超过多大进行压缩
        //   size:1048576
        // },compress);
        const compressOption = compress.length>0?compress:[
          {
            //压缩比
            quality: 90,
            //超过多大进行压缩
            size:523288
          },{
            //压缩比
            quality: 80,
            //超过多大进行压缩
            size:1048576
          },{
            //压缩比
            quality: 40,
            //超过多大进行压缩
            size:1048576*2
          },{
            //压缩比
            quality: 20,
            //超过多大进行压缩
            size:1048576*5
          },{
            //压缩比
            quality: 10,
            //超过多大进行压缩
            size:1048576*10
          }
        ];
        const img = new Image();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const file = e.target.files[0];
        const src = window.URL.createObjectURL(file);
        img.onload = function () {
          const originWidth = this.width,
            originHeight = this.height;
          // 最大尺寸限制
          let targetWidth = originWidth,
            targetHeight = originHeight;
          let quality = 100;
          compressOption.map((item,index)=>{
            if(index<compressOption.length-1&&file.size>=item.size && file.size<compressOption[index*1+1].size){
              quality = item.quality;
            }else if(index===compressOption.length-1&&file.size>=item.size){
              quality = item.quality;
            }
            return true;
          })
          // console.log('大小:'+file.size+',比例:'+quality);
          if(quality>1){
            quality= quality/100;
          }
          targetWidth = Math.round(originWidth*quality);
          targetHeight = Math.round(originHeight*quality);
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(img, 0, 0, targetWidth, targetHeight);
          canvas.toBlob((blob)=>{
            return resolve({
              blob,
              src
            })
          }, file.type || 'image/png')
        };
        img.onerror = function() {
          reject(new Error('图片加载失败' ));
        };
        img.src = src;
      })
    }
    render(){
      return (<WrappedComponent {...this.props} fileChange={this.fileChange}/>)
    }
  }

export default ImageUpload
