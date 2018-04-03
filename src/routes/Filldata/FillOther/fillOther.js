import React from 'react';
import { connect } from 'dva';
import {DashedBtn,Opacitybtn} from '../../../components/index';

export default class Fillother extends React.Component{
  render(){
    return(
      <div>
        <div className="fill-same">
          <ul className="already-fill">
            <li className="fill-other-li">
              <article>备注说明备注说明备注说明备注说明备注说明备注说明备注说明</article>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
                <img src={require('../../../assets/images/xia.png')} alt=""/>
              </div>
            </li>

          </ul>
          <ul className="ready-fill">
            <li>
              <div className="close">
                <i className="iconfont icon-roundclosefill"></i>
              </div>
              <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注说明"></textarea>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
              </div>
            </li>
            <li>
              <div className="close">
                <i className="iconfont icon-roundclosefill"></i>
              </div>
              <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注说明"></textarea>
              <div className="upload-img">
                <i className="iconfont icon-xiangji"></i>
              </div>
            </li>
          </ul>
          <DashedBtn>添加其他信息</DashedBtn>

        </div>
        <Opacitybtn>提交</Opacitybtn>
      </div>
    )
  }
}
