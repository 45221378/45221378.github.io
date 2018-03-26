import React,{component} from 'react';
import { connect } from 'dva';
import {DashedBtn,Opacitybtn} from '../../../components/index';
export default class Fillpeople extends React.Component {
  render(){
    return(
      <div className="fill-people">
        <ul className="already-fill">
          <li>
            <p>
              与本人关系<span>父亲</span>
            </p>
            <p>
              姓名<span>父亲</span>
            </p>
            <p>
              手机号<span>18086414933</span>
            </p>
          </li>
        </ul>
        <ul className="ready-fill">

          <li>
            <div className="close">
              <i className="iconfont icon-roundclosefill"></i>
            </div>
            <form action="">
              <label className="clearfix">
                  <span>与本人关系</span>
                  <i className="iconfont icon-right"></i>
              </label>
              <label  className="clearfix">
                  <span>姓名</span> <input type="text" placeholder="请输入姓名"/>
              </label>
              <label  className="clearfix">
                <span>手机号</span><input type="tel" placeholder="请输入手机号"/>
              </label>
            </form>
          </li>
        </ul>
        <DashedBtn/>
        <Opacitybtn/>
      </div>
    )
  }
}
