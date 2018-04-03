import React, { Component } from 'react';
import 'antd-mobile/lib/input-item/style/css';
import { Toast, Picker, List, InputItem } from 'antd-mobile';
import classnames from 'classnames';
import { change } from 'redux-form';

export default class FormItem extends Component {
  constructor(props) {
    super(props);
    const { initialValue, initialId, meta: { dispatch, form }, input: { name } } = props;
    this.state = {
      'thisValue': initialValue ? initialValue : props.extra
    }
    // console.log(props);
    if(initialValue&&initialId){
      dispatch(change(form, name, initialId));
    }
  }

  selectItem = (value) => {
    // console.log(this.props, value[0]);
    const { meta: { dispatch,form },arr,input:{name} } = this.props;
     arr.forEach((ele, index) => {
      if (value && ele.value == value) {
         this.setState({
           thisValue: ele.label
         })
      }
    })
    dispatch(change(form, name, value[0]));
  }

  showTips = (tip,e) => {
    console.log(e.target);
    e.stopPropagation();
    Toast.info(tip);
  }

  render() {
    let classNames = require('classnames');
    const { thisValue } = this.state;
    // console.log(thisValue);
    const {tips,className, label, type, placeholder, arr, title, extra, cols, disabled = false, cascade = true } = this.props;
    // console.log(className);
    let selectClass = classNames('select-picker',className);
    let itemHtml;
    switch (type) {
      /*case "hidden":
        itemHtml = <input type="hidden" name={name} {...input}/>;
        break;*/
      case "select":
        itemHtml =
          <div className={selectClass}>
            <span className={thisValue == extra ? "select-picker-show placeholder" : "select-picker-show"}>{thisValue}</span>
            <Picker
              data={arr}
              title={title}
              extra={extra}
              cols={cols}
              disabled={disabled}
              cascade={cascade}
              onOk={v => this.selectItem(v)}
            >
             
            <List.Item arrow="horizontal">{title}{tips && <i className="iconfont icon-certificationHelp tips" onClick={e => this.showTips(tips,e)}></i>}</List.Item>
            </Picker>
          </div>
        break;
      default:
        itemHtml =
          <InputItem
            type={type}
            placeholder={placeholder}
            clear
            className={className}
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
          >{title}
          </InputItem>
        break;
    }
    return (itemHtml);
  }
}
