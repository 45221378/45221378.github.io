import React,{Component} from 'react';
import {InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import {SelectPicker} from '../../components';

@createForm()
export default class ElecForm extends Component{
    constructor(props){
        super(props);
        this.state={
            method:0
        }
    }
    setMethod=(val)=>{
        this.setState({
            method:val
        })
    }
    getMethod=(val)=>{
        const {getFieldProps} = this.props.form;
        const {checkValues} = this.props;
        const methodList = {
            0:'',
            1:<InputItem
                {...getFieldProps('discountAmt',{
                    onChange:checkValues
                })}
                type="tel"
                clear
                placeholder="请输入贴息金额"
                labelNumber={7}
                className="calc-content-input"
            >贴息金额(元)</InputItem>,
            2:<InputItem
                {...getFieldProps('discountScale',{
                    onChange:checkValues
                })}
                type="tel"
                placeholder="请输入百分比"
                clear
                labelNumber={7}
                className="calc-content-input"
                maxLength={3}
            >贴息金额(%)</InputItem>
        }
        return methodList[val]
    }
    render(){
        const {form:{getFieldProps},periodArray,methodArr,checkValues} = this.props;
        const {method} = this.state;
        return(<div>
            <InputItem
                {...getFieldProps('orderAmt',{
                    rules: [{required: true}],
                    onChange:checkValues
                })}
                type="tel"
                clear
                placeholder="请输入商品金额"
                labelNumber={7}
                className="calc-content-input"
                maxLength={6}
            >商品金额(元)</InputItem>
            <InputItem
                {...getFieldProps('orderRate',{
                    rules: [{required: true}],
                    onChange:checkValues
                })}
                type="tel"
                placeholder="请输入百分比"
                clear
                labelNumber={7}
                className="calc-content-input"
            >手续费(%)</InputItem>
            <InputItem
                {...getFieldProps('paymentAmt',{
                    rules: [{required: true}],
                    onChange:checkValues
                })}
                type="tel"
                placeholder="请输入首付金额"
                clear
                labelNumber={7}
                maxLength={6}
                className="calc-content-input"
            >首付金额(元)</InputItem>
            <SelectPicker thisName="periodNum" arr={periodArray} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1} callBack={checkValues}/>
            <SelectPicker thisName="method" arr={methodArr} title="贴息方式" extra="请选择贴息方式" thisForm={this.props.form} cols={1} initialValue={[0]} callBack={(val)=>{this.setMethod(val);checkValues()}}/>
            {this.getMethod(method)}
        </div>)
    }
}