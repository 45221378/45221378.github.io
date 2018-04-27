import React from 'react';
import {Link} from 'dva/router'
import SpaceTips from './../../../components/Space'


export default class Noticelist extends React.Component{
  render() {
    const {infoList} = this.props;
    return(
      <div>
        {
          infoList&&<ul className="notice clearfix">
            {infoList&&infoList.length>0?infoList.map((item,idx)=>{
              return(
                <li className="li" key={idx}>
                  <Link to={`/noticeDetail/${item.messageId}`}>
                    <div className="notice-content">
                      <p className="p1">{item.messageTitle}</p>
                      <p className="p2">{item.createTime}</p>
                    </div>
                    <i className="iconfont icon-right"></i>
                  </Link>
                </li>
              )
            }):<SpaceTips imgUrl={require('../../../assets/images/nomessage.png')} tips="暂无公告"/>}
          </ul>
        }
      </div>

      )
  }
}
