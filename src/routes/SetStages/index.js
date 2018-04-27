import {Component} from 'react';
import { Button, ActivityIndicator, Toast } from 'antd-mobile';
import {connect} from 'dva';
import {withRouter} from 'dva/router';
import ajax from '../../utils/ajax';

import EduForm from './EduForm';
import ElecForm from './ElecForm';

import './SetStages.less';

let numTimer = null;

@connect(({organInfo})=>({organInfo}))
@withRouter
export default class SetStages extends Component{
    constructor(props){
        super(props);
        const {organType} = props.organInfo;
        this.state={
            goodsInfo:null,
            ordering:false,
            organType
        }
    }
    getForm=()=>{
        const {goodsInfo} = this.state;
        const domList = {
            0:<ElecForm wrappedComponentRef={(inst) => this.elec = inst} goodsInfo={goodsInfo} calcMonAmt={this.calcMonAmt}/>,
            1:<EduForm wrappedComponentRef={(inst) => this.edu = inst} goodsInfo={goodsInfo} calcMonAmt={this.calcMonAmt}/>
        }
        return domList[goodsInfo.proType];
    }
    isNum=(num)=>{
        if(isNaN(num*1)){
            Toast.info('请输入正确的数字',1);
            return false;
        }else{
            return true;
        }
    }
    calcMonAmt=()=>{
        clearTimeout(numTimer);
        let {goodsInfo,organType} = this.state;
        const {dispatch} = this.props;
        const _this = this;
        numTimer = setTimeout(function(){
            let values = {};
            let checkFlag = false;
            if(organType === '0' && _this.elec){
                values = _this.elec.props.form.getFieldsValue();
            }else if(organType === '1' && _this.edu){
                values = _this.edu.props.form.getFieldsValue();
            }
            
            let {paymentAmt,periodNum,proSalePrice,graceNum,graceAmt} = values;
            if(organType==='0'&&(periodNum[0] || periodNum[0]===0)&&proSalePrice!==''&&paymentAmt!==''){
                if(_this.isNum(proSalePrice) && _this.isNum(paymentAmt)){
                    if(proSalePrice-paymentAmt>=0){
                        checkFlag=true;
                    }else{
                        Toast.info('首付金额不可大于商品价格',2,_this.elec.props.form.resetFields(['paymentAmt']));
                    }
                }else{
                    checkFlag=false;
                }
            }else if(organType==='1'&&(periodNum[0] || periodNum[0]===0)&&proSalePrice!==''&&(graceNum[0] || graceNum[0]===0)&&graceAmt!==''){
                // console.log(graceAmt);
                if(_this.isNum(proSalePrice) && _this.isNum(graceAmt)){
                    checkFlag=true;
                }else{
                    checkFlag=false;
                }
            }
            if(checkFlag){
                goodsInfo.paymentAmt = paymentAmt || 0;
                goodsInfo.periodNum = periodNum[0];
                goodsInfo.proSalePrice = proSalePrice;
                goodsInfo.periodAmt = proSalePrice - paymentAmt;
                goodsInfo.graceNum = graceNum?graceNum[0]:0;
                goodsInfo.graceAmt = graceAmt || 0;
                _this.setState({
                    goodsInfo
                })
                // dispatch({
                //     type:'loading/save',
                //     payload:true
                // })
                ajax.post('/mobile/calcPeriodic',{
                    discountAmt:goodsInfo.discountAmt || 0,
                    discountScale:goodsInfo.discountScale || 0,
                    graceAmt:goodsInfo.graceAmt || 0,
                    graceNum:goodsInfo.graceNum || 0,
                    guaceDiscountNum:goodsInfo.guaceDiscountNum || 0,
                    orderRate:goodsInfo.orderRate || 0,
                    orderAmt:proSalePrice,
                    paymentAmt:goodsInfo.paymentAmt,
                    periodNum:periodNum[0],
                    proType:organType*1+1,
                    sourceType:1,
                }).then((data)=>{
                    goodsInfo.monAmt = data.calc.discountMonAmt;
                    goodsInfo.discountAmt = data.calc.discountAmt;
                    goodsInfo.graceAmt = data.calc.graceAmt;
                    goodsInfo.periodAmt = data.calc.periodAmt;
                    _this.setState({
                        goodsInfo
                    })
                }).catch((err)=>{
                    console.log(err);
                })
                .finally(()=>{
                    dispatch({
                        type:'loading/save',
                        payload:false
                    })
                })
            }
        },500)
    }
    goSuccess=()=>{
        const {history,match:{params:{id}},dispatch} = this.props;
        const {goodsInfo:{monAmt,discountAmt,periodAmt,graceAmt,paymentAmt,graceNum,periodNum,proSalePrice,proId},organType} = this.state;
        const item = organType==='1'?'edu':'elec';
        this[item].props.form.validateFields((err,values)=>{
            // console.log(values);
            if(!err){
                let sendData = {};
                const {proName,repaydate} = values;
                sendData.proName = proName;
                sendData.paymentAmt = paymentAmt;
                sendData.monAmt = monAmt;
                sendData.subsidyAmount = discountAmt;
                sendData.periodRent = periodAmt;
                sendData.graceNum = graceNum?graceNum:0;
                sendData.graceAmt = graceAmt || 0;
                sendData.proType = organType*1;
                sendData.proAmt = proSalePrice;
                sendData.repaydate = repaydate[0];
                sendData.periodNum = periodNum;
                sendData.proId = id!=='empty'?id:proId;
                if(!sendData.proId){
                    delete sendData.proId;
                }
                dispatch({
                    type:'loading/save',
                    payload:true
                })
                ajax.post('/mobile/submitOrder',sendData).then((data)=>{
                    const codeUrl = `${data.accessPath}/login/${data.creId}`;
                    history.push(`/oneKey/stageSuccess?codeUrl=${codeUrl}`);
                }).catch((err)=>{
                    console.log(err)
                }).finally(()=>{
                    dispatch({
                        type:'loading/save',
                        payload:false
                    })
                })
            }else{
                Toast.info('请完善信息',1)
            }
        })
        // history.push(`/oneKey/stageSuccess/${id}`);
    }
    transDate=(str)=>{
        let date = str.replace('年','').replace('月','').replace('日','');
        return date;
    }
    componentDidMount(){
        const _this = this;
        let goodsInfo = {};
        const {match:{params:{id}},history:{location:{search}},organInfo:{organType},dispatch} = this.props;
        if(id !== 'empty'){
            dispatch({
                type:'loading/save',
                payload:true
            })
            ajax.post('mobile/selectProDetail',{proId:id}).then((data)=>{
                goodsInfo = data.proDetail;
                goodsInfo.periodArray=goodsInfo.resultData.periodArray?goodsInfo.resultData.periodArray.map((ele,index)=>({value:ele,label:ele})):[];
                goodsInfo.graceArray=goodsInfo.resultData.graceArray?goodsInfo.resultData.graceArray.map((ele,index)=>({value:ele,label:ele})):[];
                goodsInfo.datesArray=goodsInfo.dates?goodsInfo.dates.map((ele,index)=>({value:_this.transDate(ele),label:ele})):[];
                goodsInfo.periodAmt=goodsInfo.proSalePrice;
                goodsInfo.graceAmt = goodsInfo.resultData.graceAmt || 0;
                goodsInfo.periodNum = goodsInfo.proPeriodNum;
                goodsInfo.isNum = (goodsInfo.periodNum!==''&&goodsInfo.periodNum!==undefined)?false:true;
                this.setState({
                    goodsInfo
                })
            }).catch((error)=>{
                const {history} = this.props;
                setTimeout(function(){
                    Toast.hide();
                    history.goBack();
                },2000)
            }).finally(()=>{
                if(!goodsInfo.periodNum){
                    dispatch({
                        type:'loading/save',
                        payload:false
                    })
                }
            })
        }else if(search){
            const creId = search.split('?')[1];
            dispatch({
                type:'loading/save',
                payload:true
            })
            ajax.post('/mobile/queryByCreditId',{creId}).then((data)=>{
                // console.log(data);
                let goodsInfo = data.proDetail;
                goodsInfo.periodArray=goodsInfo.resultData.periodArray?goodsInfo.resultData.periodArray.map((ele,index)=>({value:ele,label:ele})):[];
                goodsInfo.graceArray=goodsInfo.resultData.graceArray?goodsInfo.resultData.graceArray.map((ele,index)=>({value:ele,label:ele})):[];
                goodsInfo.datesArray=goodsInfo.dates?goodsInfo.dates.map((ele,index)=>({value:_this.transDate(ele),label:ele})):[];
                goodsInfo.proSalePrice=goodsInfo.proAmt;
                this.setState({
                    goodsInfo
                })
            }).catch((error)=>{
                const {history} = this.props;
                dispatch({
                    type:'loading/save',
                    payload:false
                })
                setTimeout(function(){
                    Toast.hide();
                    history.goBack();
                },2000)
            })
        }else{
            dispatch({
                type:'loading/save',
                payload:true
            })
            ajax.post('/mobile/selectTeam',{proType:organType}).then((data)=>{
                const goodsInfo = {};
                goodsInfo.proType = organType;
                goodsInfo.periodArray=data.resultData.periodArray?data.resultData.periodArray.map((ele,index)=>({value:ele,label:ele})):[];
                goodsInfo.graceArray=data.resultData.graceArray?data.resultData.graceArray.map((ele,index)=>({value:ele,label:ele})):[];
                goodsInfo.datesArray=data.dates?data.dates.map((ele,index)=>({value:_this.transDate(ele),label:ele})):[];
                goodsInfo.isNum = true;
                this.setState({
                    goodsInfo
                })
            }).catch((error)=>{
                const {history} = this.props;
                setTimeout(function(){
                    Toast.hide();
                    history.goBack();
                },2000)
            }).finally(()=>{
                dispatch({
                    type:'loading/save',
                    payload:false
                })
            })
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        clearTimeout(numTimer);
        dispatch({
            type:'loading/save',
            payload:false
        })
    }
    render(){
        const {goodsInfo,ordering} = this.state;
        const {discountAmt,monAmt,periodNum,periodAmt} = goodsInfo || {};
        return(<div>
            {goodsInfo&&<div className="stages">
                {this.getForm()}
                <div className="stages-footer">
                    <ul className="stages-footer-list">
                        <li className="stages-footer-list-item">
                            <label>分期金额：</label>
                            <span>￥{periodAmt?periodAmt:0}</span>
                        </li>
                        <li className="stages-footer-list-item">
                            <label>商品贴息：</label>
                            <span>￥{discountAmt?discountAmt:0}</span>
                        </li>
                        <li className="stages-footer-list-item">
                            <label>月供：</label>
                            <span>￥{monAmt?monAmt:0}*{periodNum?periodNum:0}期</span>
                        </li>
                    </ul>
                </div>
                <Button type="primary" onClick={this.goSuccess}>完成</Button>
            </div>}
            <ActivityIndicator
                animating={ordering}
                size="large"
                toast={true}
                text="正在下单..."
            />
        </div>)
    }
}