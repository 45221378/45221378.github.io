import React from 'react';
import { connect } from 'dva';

import './space.less'
export default class SpaceTips extends React.Component{
  constructor(props){
    super(props)
  }


  render() {
    const {imgUrl,tips}= this.props;
    console.log(this.props);
    return(
      <div className="spaceTips">
        <img src={imgUrl} alt=""/>
        <p>{tips}</p>
      </div>
    )
  }
}
