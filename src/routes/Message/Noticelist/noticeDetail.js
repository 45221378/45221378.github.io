import React from 'react';
import ajax from '../../../utils/ajax';
import moment from 'moment'

export default class NoticeDetail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      noticeId: props.match.params.detailId,
      noticeContain:[],
      noticemsg:[]
    }
  }
  componentDidMount(){
    ajax({
      method:'post',
      url: '/mobile/messageDetail',
      data:{
        messageId: this.state.noticeId,
        phone: '15175188586',
        type:2
      }
    }).then((response)=>{
      this.setState({
        noticeContain:response.messageInfo,
        noticemsg:response.messageInfo.message.split(/\n/gm)
      })
    })
  }
  render() {
    const {noticeContain,noticemsg} = this.state;
    // console.log(noticemsg);
    return (
      <div className="notice-detail">
        <header>
          <h6>{noticeContain.messageTitle}</h6>
          <p>{moment(noticeContain.createTime).format('YYYY-MM-DD HH:mm')}</p>
        </header>
        <section>
          {
            noticemsg.map((item,idx)=>{
              return(
                <p key={idx}>{item}</p>
              )
            })
          }
        </section>
      </div>
    );
  }
}




