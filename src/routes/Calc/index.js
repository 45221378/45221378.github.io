import React,{Component} from 'react';
import {Button,Toast} from 'antd-mobile';
import {connect} from "dva";
import {withRouter} from "dva/router";
import ajax from '../../utils/ajax';

import ElecForm from './ElecForm';
import EduForm from './EduForm';

import  './calc.less';

@withRouter
@connect(({organInfo})=>({organInfo}))
export default class Calc extends Component{
    constructor(props) {
        super(props);
        const {organInfo:{organType}} = props;
        this.state={
            calcInfo:null,
            graceArray:null,
            periodArray:null,
            graceAmt:null,
            loaded:false,
            animating:false,
            organType,
            disabled:true
        }
    }
    checkValues=()=>{
        setTimeout(()=>{
            for(let item in this.refs){
                this.refs[item].validateFields((err,values)=>{
                    if(!err){
                        if(values.method[0]===1&&(values.discountAmt===undefined||values.discountAmt==='')){
                            this.setState({
                                disabled:true
                            })
                        }else if(values.method[0]===2&&(values.discountScale===undefined||values.discountScale==='')){
                            this.setState({
                                disabled:true
                            })
                        }else{
                            this.setState({
                                disabled:false
                            })
                        }
                    }else{
                        this.setState({
                            disabled:true
                        })
                    }
                })
            }
        },100)
    }
    getValues=()=>{
        const _this = this;
        const {dispatch} = this.props;
        for(let item in this.refs){
            this.refs[item].validateFields((err,values)=>{
                if(!err){
                    const {graceAmt,organType} = _this.state;
                    let sendData = {};
                    Object.assign(sendData,values);
                    sendData.method = sendData.method[0];
                    if(sendData.periodNum){
                        sendData.periodNum = sendData.periodNum[0];
                    }
                    if(sendData.graceNum){
                        sendData.graceNum = sendData.graceNum[0];
                    }
                    if(sendData.guaceDiscountNum){
                        sendData.guaceDiscountNum = sendData.guaceDiscountNum[0];
                    }
                    sendData.graceAmt = graceAmt;
                    sendData.sourceType = 2;
                    sendData.proType = organType*1+1;
                    if(sendData.graceNum&&sendData.guaceDiscountNum&&sendData.graceNum<sendData.guaceDiscountNum){
                        Toast.info('宽限期贴息期数不可大于宽限期期数',2);
                    }else if((sendData.discountAmt===''||sendData.discountAmt===undefined)&&sendData.method===1){
                        Toast.info('请输入贴息金额',2);
                    }else if((sendData.discountScale===''||sendData.discountScale===undefined)&&sendData.method===2){
                        Toast.info('请输入贴息比例',2);
                    }else{
                        dispatch({
                            type:'loading/save',
                            payload:true
                        })
                        if(!sendData.discountScale){
                            delete sendData.discountScale;
                        }
                        if(!sendData.discountAmt){
                            delete sendData.discountAmt;
                        }
                        delete sendData.method;
                        ajax.post('/mobile/calcPeriodic',sendData).then((data)=>{
                            const {discountAmt,discountMonthlyAmt,monAmt} = data.calc;
                            const periodAmt = organType==='0'?sendData.orderAmt-sendData.paymentAmt:sendData.orderAmt;
                            this.setState({
                                calcInfo:{
                                    discountAmt,
                                    discountMonthlyAmt,
                                    monAmt,
                                    periodNum:sendData.periodNum,
                                    periodAmt
                                }
                            })
                        }).catch((err)=>{
                            console.log(err)
                        }).finally(()=>{
                            dispatch({
                                type:'loading/save',
                                payload:false
                            })
                        })
                    }
                }else{
                    Toast.info('请完善信息',1)
                }
            })
        }
    }
    getForm=(num)=>{
        const {method,graceArray,periodArray} = this.state;
        const methodArr = [{value:0,label:'不贴息'},{value:1,label:'按金额贴息'},{value:2,label:'按比例贴息'}];
        const formList={
            0:<ElecForm ref="elec" periodArray={periodArray} methodArr={methodArr} method={method} setMethod={this.setMethod} getMethod={this.getMethod} checkValues={this.checkValues}/>,
            1:<EduForm ref="edu" periodArray={periodArray} graceArray={graceArray} methodArr={methodArr} method={method} setMethod={this.setMethod} getMethod={this.getMethod}  checkValues={this.checkValues}/>
        }
        return formList[num];
    }
    
    componentDidMount(){
        const {organType} =this.state;
        const {dispatch,history} = this.props;
        dispatch({
            type:'loading/save',
            payload:true
        })
        ajax.post('/mobile/selectTeam',{proType:organType*1}).then((data)=>{
            if(data){ 
                let {graceArray,periodArray,graceAmt} = data.resultData;
                graceArray = graceArray.map((ele)=>({value:ele,label:ele}));
                periodArray = periodArray.map((ele)=>({value:ele,label:ele}));
                this.setState({
                    graceArray,
                    periodArray,
                    graceAmt,
                    loaded:true
                })
            }
        }).catch((err)=>{
            console.log(err);
            Toast.info(err.head.msg,2,()=>{history.goBack()});
        }).finally(()=>{
            dispatch({
                type:'loading/save',
                payload:false
            })
        })
    }
    render(){
        const {loaded,organType,disabled} = this.state;
        const {discountAmt='0.00',discountMonthlyAmt='0.00',monAmt='0.00',periodNum=0,periodAmt='0.00'}=this.state.calcInfo || {};
        return (<div className="calc">
            {loaded&&<div>
                <header className="calc-header">
                    <p className="calc-header-sum">
                        <span>分期金额(元)</span>
                        <b>{periodAmt}</b>
                    </p>
                    <ul className="calc-header-list clearfix">
                        <li className="calc-header-list-item">
                            <span>月供(元)</span>
                            <b>{monAmt}*{periodNum}</b>
                        </li>
                        <li className="calc-header-list-item">
                            <span>贴息金额(元)</span>
                            <b>{discountAmt}</b>
                        </li>
                        <li className="calc-header-list-item">
                            <span>贴息后月供(元)</span>
                            <b>{discountMonthlyAmt}*{periodNum}</b>
                        </li>
                    </ul>
                </header>
                <section className="calc-content">
                    {this.getForm(organType*1)}
                </section>
                <footer className="calc-footer">
                    <Button type="primary" className="calc-btn" disabled={disabled} onClick={this.getValues}>计算</Button>
                </footer>
            </div>}
        </div>
        )
    }
}
