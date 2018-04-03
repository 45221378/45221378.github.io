import React from 'react';
import {Button,InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import {SelectPicker} from '../../components';

import  './calc.less'

@createForm()
export default class Calc extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        method:''
    }
  }
  getValues=()=>{
      this.props.form.validateFields((err,values)=>{
          console.log(err);
          console.log(values);
      })
  }
  getForm=(num)=>{
    const {method} = this.state;
    const { getFieldProps } = this.props.form;
    const arr = [{value:0,label:'1'},{value:1,label:'2'},{value:2,label:'3'}];
    const arr1 = [{value:0,label:'不贴息'},{value:1,label:'按金额贴息'},{value:2,label:'按比例贴息'}];
    const formList={
        0:<div>
        <InputItem
            {...getFieldProps('number')}
            type="digit"
            clear
            placeholder="请输入商品金额"
            labelNumber={7}
            className="calc-content-input"
        >商品金额(元)</InputItem>
        <InputItem
            type="digit"
            placeholder="请输入百分比"
            clear
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            labelNumber={7}
            className="calc-content-input"
            maxLength={3}
        >手续费(%)</InputItem>
        <InputItem
            type="digit"
            placeholder="请输入首付金额"
            clear
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            labelNumber={7}
            className="calc-content-input"
        >首付金额(元)</InputItem>
        <SelectPicker thisName="peroids" arr={arr} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1}/>
        <SelectPicker thisName="method" arr={arr1} title="贴息方式" extra="请选择贴息方式" thisForm={this.props.form} cols={1} initialValue={[0]} callBack={this.setMethod}/>
        {this.getMethod(method)}
        </div>,
        1:<div>
        <InputItem
            {...getFieldProps('number')}
            type="digit"
            clear
            placeholder="请输入商品金额"
            labelNumber={7}
            className="calc-content-input"
        >商品金额(元)</InputItem>
        <SelectPicker thisName="peroids" arr={arr} title="分期期数" extra="请选择分期期数" thisForm={this.props.form} cols={1}/>
        <SelectPicker thisName="grace" arr={arr} title="宽限期数" extra="请选择宽限期数" thisForm={this.props.form} cols={1}/>
        <SelectPicker thisName="discount" arr={arr} title="宽限期贴息" extra="请选择宽限期贴息期数" thisForm={this.props.form} cols={1}/>
        <SelectPicker thisName="method" arr={arr1} title="贴息方式" extra="请选择贴息方式" thisForm={this.props.form} cols={1} initialValue={[0]} callBack={this.setMethod}/>
        {this.getMethod(method)}
    </div>
    }
    return formList[num];
  }
  setMethod=(val)=>{
    this.setState({
        method:val
    })
  }
  getMethod=(val)=>{
    const {getFieldProps} = this.props.form;
    const methodList = {
        0:'',
        1:<InputItem
            {...getFieldProps('discountNum')}
            type="digit"
            clear
            placeholder="请输入贴息金额"
            labelNumber={7}
            className="calc-content-input"
        >贴息金额(元)</InputItem>,
        2:<InputItem
            {...getFieldProps('discountPercent')}
            type="digit"
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
    return (
      <div className="calc">
        <header className="calc-header">
            <p className="calc-header-sum">
                <span>分期金额(元)</span>
                <b>0.00</b>
            </p>
            <ul className="calc-header-list clearfix">
                <li className="calc-header-list-item">
                    <span>月供(元)</span>
                    <b>1002.33*3</b>
                </li>
                <li className="calc-header-list-item">
                    <span>贴息金额(元)</span>
                    <b>100</b>
                </li>
                <li className="calc-header-list-item">
                    <span>贴息后月供(元)</span>
                    <b>1069*3</b>
                </li>
            </ul>
        </header>
        <section className="calc-content">
            {this.getForm(1)}
        </section>
        <footer className="calc-footer">
            <Button type="primary" className="calc-btn" disabled={false} onClick={this.getValues}>计算</Button>
        </footer>
      </div>
    )
  }
}
