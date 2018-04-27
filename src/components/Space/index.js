import React from 'react';

import './space.less'
export default class SpaceTips extends React.Component{
  render() {
    const {imgUrl,tips}= this.props;
    // console.log(this.props);
    return(
      <div className="spaceTips">
        <img src={imgUrl} alt=""/>
        <p>{tips}</p>
      </div>
    )
  }
}
