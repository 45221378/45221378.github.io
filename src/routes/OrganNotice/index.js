import React from 'react';
import {withRouter} from 'dva/router';
import {List} from 'antd-mobile';
import {SpaceTips} from '../../components/index'

import './organNotice.less'

import ajax from '../../utils/ajax'

const Item = List.Item;

@withRouter
export default class OrganNotice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            first:'',
            second:'',
            noticeList:null,
            noticeTypes:null,
            secondContent:'',
            thisNum:''
        }
    }
    getContent=()=>{
        const {match:{params:{first,second}},history} = this.props;
        const {noticeTypes,noticeList,secondContent,thisNum}=this.state;
        if(noticeTypes&&noticeTypes.length>0){
            if(first&&second){
                if(thisNum*1!==second*1){
                    this.getSecond(second*1);
                }
                const dom = <div className="organ-detail">
                    <div className="organ-detail-content" dangerouslySetInnerHTML={{__html: secondContent}}></div>
                </div>;
                return dom;
            }else if(first&&!second){
                const dom = this.getFirst(first*1,noticeList);
                return dom;
            }else{
                return(<List className="organ-list">
                    {noticeTypes.map((ele,index)=>(<Item arrow="horizontal" key={index} onClick={() => {history.push(`/organNotice/${ele.id}`)}}>{ele.name}</Item>))}
                </List>)
            }
        }else{
            return(<SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips="暂无消息"/>);
        }
    }
    getFirst=(first,list)=>{
        const {history} = this.props;
        let firstList=[];
        list.map((ele,index)=>{
            if(ele.noticeTypeId*1 === first*1){
                firstList.push(ele);
                return true;
            }else{
                return false;
            }
        })
        const dom = <List className="organ-list">
            {firstList.map((item,index)=>(
                <Item arrow="horizontal" key={index} onClick={() => {history.push(`/organNotice/${first}/${item.noticeId}`)}}>{item.noticeTitle}</Item>
            ))}
        </List>;
        return dom;
    }
    getSecond=(second)=>{
        ajax.post('/mobile/noticeDetail',{noticeId:second}).then((data)=>{
            const content = data.busiNotice.noticeContent;
            this.setState({
                secondContent:content,
                thisNum:second
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    componentDidMount(){
        const _this = this;
        ajax.post('/mobile/listNotice',{}).then((data)=>{
            const {noticeList,noticeTypes} = data;
            // const thisNoticeTypes = noticeTypes.map((item)=>({name:item,id:300021}));
            _this.setState({
                noticeList,
                noticeTypes
            })
        }).catch((err)=>{
            console.log(err);
            _this.setState({
                noticeList:[],
                noticeTypes:[]
            })
        })
        this.getContent();
    }
    render(){
        const {noticeList} = this.state;
        return(
            <div className="organ">
                {noticeList&&this.getContent()}
            </div>
        )
    }
} 