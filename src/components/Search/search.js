import React,{component} from 'react';
import { connect } from 'dva';
import { SearchBar, Button, WhiteSpace, WingBlank} from 'antd-mobile';

import './search.less'
export default class Search extends React.Component{
  render() {
    return(
      <div className="search">
        <SearchBar
          placeholder="可输入客户姓名、手机号、订单号"
          showCancelButton
        />
      </div>
    )
  }
}
