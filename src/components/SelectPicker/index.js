import React from 'react';
import {Picker,List} from 'antd-mobile';
import './selectpicker.less'


//该组件接受五个参数
//arr  选择的数据
//title  label的内容
//extra  placeholder的内容
//thisName 对应表单控件的name
//thisForm  这个是rc-form的内置对象，通过@cractForm()生成，提供很多内置方法
//cols  单选还是多选 (数字类型)
//disabled  是否禁用 （可选，默认false，boolean类型）
//cascade  是否联动 （可选，默认true，boolean类型）
//initalValue  默认值  （可选，默认是[]，数组类型）
export default class SelectPicker extends React.Component{
    constructor(props){
        super(props);
        let initValue = '';
        const {initialValue,arr} = props;
        arr.forEach((ele,index)=>{
            if(initialValue&&ele.value === initialValue[0]){
                initValue = ele.label;
            }
        })
        this.state={
            'thisValue':initValue===''?props.extra:initValue
        }
    }
    getLabel=(val,arr)=>{
        let thisLabel = '';
        arr.forEach((ele,index)=>{
            if(val&&ele.value*1 === val*1){
                thisLabel = ele.label;
            }
        })
        // console.log(thisLabel);
        return thisLabel;
    }
    thisChange=(val)=>{
        const {arr,callBack=null} = this.props;
        this.setState({
            'thisValue':this.getLabel(val,arr)
        });
        if(callBack){
            callBack(val)
        }
    }
    render(){
        const {thisValue} = this.state;
        const {arr,title,extra,thisName,thisForm,cols,disabled=false,cascade=true,initialValue=[],required=true} = this.props;
        const {getFieldProps} = thisForm;
        return(
            <div className="select-picker">
                <span className={thisValue===extra?"select-picker-show placeholder":"select-picker-show"}>{thisValue}</span>
                <Picker
                    data={arr}
                    title={title}
                    extra={extra}
                    cols={cols}
                    disabled={disabled}
                    cascade={cascade}
                    {...getFieldProps(thisName, {
                        onChange:this.thisChange, // have to write original onChange here if you need
                        rules: [{required}],
                        initialValue: initialValue
                    })}
                >
                    <List.Item arrow="horizontal">{title}</List.Item>
                </Picker>
            </div>
        )
    }
}