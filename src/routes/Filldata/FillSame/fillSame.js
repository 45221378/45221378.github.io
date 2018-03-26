import React,{component} from 'react';
import { connect } from 'dva';
import {DashedBtn,Opacitybtn} from '../../../components/index';


export default class Fillsame extends React.Component {
  render(){
    return(
      <div className="fill-same">
        <p className="fill-tips">账号密码、账单截图至少提交一项</p>
        <ul className="already-fill">
          <li>
            <p>
              平台名称<span>分期乐</span>
            </p>
            <p>
              账号<span>父亲读法律框架</span>
            </p>
            <p>
              密码<span>*******</span>
            </p>
            <div>
              <p>账单截图</p>

            </div>
          </li>
          <li>
            <p>
              平台名称<span>分期乐</span>
            </p>
            <p>
              账号<span>父亲读法律框架</span>
            </p>
            <p>
              密码<span>*******</span>
            </p>
            <div>
              <p>账单截图</p>

            </div>
          </li>
        </ul>
        <ul className="ready-fill">
          <li>
            <div className="close">
              <i className="iconfont icon-roundclosefill"></i>
            </div>
            <form action="">
              <label className="clearfix">
                <span>平台名称</span>
                <input type="text" placeholder="请输入平台名称"/>
              </label>
              <label  className="clearfix">
                <span>账号</span>
                <input type="text" placeholder="请输入账号"/>
              </label>
              <label  className="clearfix">
                <span>密码</span><input type="tel" placeholder="请输入密码"/>
              </label>
              <label  className="clearfix">
                <span>账单截图</span>
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
