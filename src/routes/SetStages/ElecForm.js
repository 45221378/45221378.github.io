import React,{Component} from 'react';
import { InputItem, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import {SelectPicker} from '../../components';

@createForm()
export default class ElecForm extends Component{
    componentDidMount(){
        const {form,goodsInfo:{paymentAmt},calcMonAmt} = this.props;
        // console.log(this.props.goodsInfo.periodNum);
        if(paymentAmt){
            form.setFieldsValue({paymentAmt:paymentAmt})
        }
        calcMonAmt();
    }
    render(){
        const {form:{getFieldProps},goodsInfo,calcMonAmt} = this.props;
        // console.log(goodsInfo.repaydate);
        return(<section className="stages-content">
            <div className="stages-content-input">
                <TextareaItem
                    {...getFieldProps('proName',{
                        initialValue:goodsInfo.proName || '',
                        rules: [{required: true}],
                    })}
                    placeholder="请输入名称"
                    labelNumber={4}
                    clear
                    autoHeight={true}
                    title="商品名称"
                ></TextareaItem>
            </div>
            <InputItem
                {...getFieldProps('proSalePrice',{
                    onChange:calcMonAmt,
                    rules: [{required: true}],
                    initialValue:(goodsInfo.proSalePrice || goodsInfo.proSalePrice*1===0)?goodsInfo.proSalePrice*1:''
                })}
                type="tel"
                maxLength={6}
                clear
                placeholder="请输入价格"
                labelNumber={7}
                className="stages-content-input"
            >商品价格</InputItem>
            <InputItem
                {...getFieldProps('paymentAmt',{
                    onChange:calcMonAmt,
                    rules: [{required: true}],
                    initialValue:0
                })}
                type="tel"
                placeholder="请输入首付金额"
                labelNumber={7}
                maxLength={6}
                clear
                className="stages-content-input"
            >首付金额(元)</InputItem>
            <SelectPicker thisName="periodNum" arr={goodsInfo.periodArray} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1} callBack={calcMonAmt} initialValue={(goodsInfo.periodNum!==''&&goodsInfo.periodNum!==undefined)?[goodsInfo.periodNum*1]:[]} disabled={!goodsInfo.isNum}/>
            <SelectPicker thisName="repaydate" arr={goodsInfo.datesArray} title="首次还款日期" extra="请选择首次还款日期" thisForm={this.props.form} cols={1} initialValue={goodsInfo.repaydate?[goodsInfo.repaydate]:[]}/>
        </section>)
    }
}