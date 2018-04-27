import {Component} from 'react';
import { InputItem, TextareaItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {SelectPicker} from '../../components';

@createForm()
export default class EduForm extends Component{
    changePrice=(val)=>{
        const {goodsInfo,calcMonAmt,form} = this.props;
        setTimeout(()=>{
            if(val <= goodsInfo.proPrice){
                calcMonAmt();
            }else{
                Toast.info(`商品价格不能高于商品标注价格${goodsInfo.proPrice}元`,2,()=>{
                    form.setFieldsValue({proSalePrice:0})
                });
            }
        },500)
    }
    componentDidMount(){
        this.props.calcMonAmt();
    }
    render(){
        const {form:{getFieldProps},goodsInfo,calcMonAmt} = this.props;
        // console.log(goodsInfo.graceNum*1===0);
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
                    disabled
                ></TextareaItem>
            </div>
            <InputItem
                {...getFieldProps('proSalePrice',{
                    onChange:this.changePrice,
                    rules: [{required: true}],
                    initialValue:(goodsInfo.proSalePrice||goodsInfo.proSalePrice*1===0) || ''
                })}
                type="tel"
                clear
                maxLength={6}
                placeholder="请输入价格"
                labelNumber={7}
                className="stages-content-input"
            >商品价格</InputItem>
            <SelectPicker thisName="graceNum" arr={goodsInfo.graceArray?goodsInfo.graceArray:[]} title="宽限期数" extra="请选择宽限期数" thisForm={this.props.form} cols={1} callBack={calcMonAmt} initialValue={(goodsInfo.graceNum!==''&&goodsInfo.graceNum!==undefined)?[goodsInfo.graceNum*1]:[]}/>
            <InputItem
                {...getFieldProps('graceAmt',{
                    onChange:calcMonAmt,
                    rules: [{required: true}],
                    initialValue:goodsInfo.graceAmt || 0
                })}
                type="tel"
                clear
                placeholder="请输入价格"
                labelNumber={7}
                maxLength={6}
                className="stages-content-input"
                disabled
            >宽限金额</InputItem>
            <SelectPicker thisName="periodNum" arr={goodsInfo.periodArray} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1} callBack={calcMonAmt} initialValue={(goodsInfo.periodNum!==''&&goodsInfo.periodNum!==undefined)?[goodsInfo.periodNum*1]:[]} disabled={!goodsInfo.isNum}/>
            <SelectPicker thisName="repaydate" arr={goodsInfo.datesArray} title="首次还款日期" extra="请选择首次还款日期" thisForm={this.props.form} cols={1} initialValue={goodsInfo.repaydate?[goodsInfo.repaydate]:[]}/>
        </section>)
    }
}