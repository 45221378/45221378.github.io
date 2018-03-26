import React from 'react';
import { Button, InputItem, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import {withRouter} from 'dva/router'
import {SelectPicker} from '../../components';

import './SetStages.less';

@createForm()
@withRouter
export default class SetStages extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id3C:true,
            goodsInfo:{
                name:'',
                price:'',
                firstPay:'',
                peroids:12,
                fisrtBackDate:0,
                total:'0.00',
                discount:'0.00',
                monthAmt:'0.00',
                goodsId:'0*0'
            },
            arr:[
                {value:3,label:'3个月'},
                {value:6,label:'6个月'},
                {value:12,label:'12个月'}
            ],
            arr1:[
                {value:0,label:'2018年02月25日'},
                {value:1,label:'2018年02月26日'},
                {value:2,label:'2018年02月27日'}
            ],
            arr2:[
                {value:0,label:'1'},
                {value:1,label:'2'},
                {value:2,label:'3'}
            ]
        }
    }
    getForm=()=>{
        const {form:{getFieldProps}} = this.props;
        const {id3C,arr,arr1,arr2} = this.state;
        if(id3C){
            return(<section className="stages-content">
                <div className="stages-content-input">
                    <TextareaItem
                        {...getFieldProps('name')}
                        placeholder="请输入名称"
                        labelNumber={4}
                        autoHeight={true}
                        title="商品名称"
                    ></TextareaItem>
                </div>
                <InputItem
                    {...getFieldProps('price')}
                    type="digit"
                    clear
                    placeholder="请输入价格"
                    labelNumber={7}
                    className="stages-content-input"
                >商品价格</InputItem>
                <InputItem
                    {...getFieldProps('firstPay')}
                    type="digit"
                    placeholder="请输入首付金额"
                    clear
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                    labelNumber={7}
                    className="stages-content-input"
                >首付金额(元)</InputItem>
                <SelectPicker thisName="peroids" arr={arr} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1} initialValue={[12]}/>
                <SelectPicker thisName="firstBackDate" arr={arr1} title="首次还款日期" extra="请选择首次还款日期" thisForm={this.props.form} cols={1} initialValue={[2]}/>
            </section>)
        }else{
            return(<section className="stages-content">
                <InputItem
                    {...getFieldProps('name')}
                    type="text"
                    clear
                    placeholder="请输入名称"
                    labelNumber={7}
                    className="stages-content-input"
                >商品名称</InputItem>
                <InputItem
                    {...getFieldProps('price')}
                    type="digit"
                    clear
                    placeholder="请输入价格"
                    labelNumber={7}
                    className="stages-content-input"
                >商品价格</InputItem>
                <SelectPicker thisName="grace" arr={arr2} title="宽限期数" extra="请选择宽限期数" thisForm={this.props.form} cols={1}/>
                <InputItem
                    {...getFieldProps('price')}
                    type="digit"
                    clear
                    placeholder="请输入价格"
                    labelNumber={7}
                    className="stages-content-input"
                >宽限金额</InputItem>
                <SelectPicker thisName="peroids" arr={arr} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1} initialValue={[2]}/>
                <SelectPicker thisName="firstBackDate" arr={arr1} title="首次还款日期" extra="请选择首次还款日期" thisForm={this.props.form} cols={1} initialValue={[0]}/>
            </section>)
        }
    }
    goSuccess=()=>{
        const {history,match:{params:{id}}} = this.props;
        history.push(`/oneKey/stageSuccess/${id}`);
    }
    componentDidMount(){
        const {match:{params:{id}}} = this.props;
        if(id !== 'empty'){
            const goodsInfo = {
                name:'诺基亚 7 (Nokia 7) 6GB+64GB 黑色 全网通 双卡双待 移动联通电信4G手机',
                price:'17800.00',
                firstPay:'3800.00',
                peroids:12,
                firstBackDate:2,
                total:'17800.00',
                discount:'800.00',
                monthAmt:'687.43',
                goodsId:'00001'
            }
            this.setState({
                goodsInfo
            })
            this.props.form.setFieldsValue(goodsInfo);
        }
    }
    render(){
        const {goodsInfo} = this.state;
        return(<div className="stages">
            {this.getForm()}
            <div className="stages-footer">
                <ul className="stages-footer-list">
                    <li className="stages-footer-list-item">
                        <label>分期金额：</label>
                        <span>￥{goodsInfo.total}</span>
                    </li>
                    <li className="stages-footer-list-item">
                        <label>商品贴息：</label>
                        <span>￥{goodsInfo.discount}</span>
                    </li>
                    <li className="stages-footer-list-item">
                        <label>月供：</label>
                        <span>￥{goodsInfo.monthAmt}*{goodsInfo.peroids}期</span>
                    </li>
                </ul>
            </div>
            <Button type="primary" onClick={this.goSuccess}>完成</Button>
        </div>)
    }
}