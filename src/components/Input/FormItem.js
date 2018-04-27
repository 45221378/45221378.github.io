import React, { Component } from 'react';
import 'antd-mobile/lib/input-item/style/css';
import { Picker, List, InputItem, Modal } from 'antd-mobile';
// import classnames from 'classnames';
import { createForm } from 'rc-form';

// import { change, initialize } from 'redux-form';

@createForm()
export default class FormItem extends Component {
  // constructor(props) {
  //   super(props);
  
  // }

  // selectItem = (value) => {
  //   console.log(this.props, value[0]);
  //   const { meta: { dispatch, form }, arr, input: { name } } = this.props;
  //   arr.forEach((ele, index) => {
  //     if (value && ele.value == value) {
  //       this.setState({
  //         thisValue: ele.label
  //       })
  //     }
  //   })
  //   dispatch(change(form, name, value[0]));
  // }

  // saveValue = (value) => {
  //   console.log(value);
  //   const { meta: { dispatch, form }, arr, input: { name } } = this.props;
  //   dispatch(change(form, name, value));
  // }

  showTips = (tip, e) => {
    // console.log(e.target);
    e.stopPropagation();
    // Toast.info(tip);

    Modal.alert('', tip, [
      { text: '知道了', onPress: () => { } },
    ])
  }

  change = (val) => {
    const { input: { onChange }, show } = this.props;
    onChange(val);
    if (show) {
      show(val);  //显示贴息的输入框
    }
  }

  render() {
    let classNames = require('classnames');
    // const { thisValue } = this.state;
    // console.log(this.props);
    const { tips, className, type, placeholder, maxLength, arr, title, extra, cols, disabled = false, cascade = true, input: { onChange, value, name } } = this.props;
    // console.log(this.props);
    const { getFieldProps } = this.props.form;
    // console.log(className);
    let selectClass = classNames('select-picker', className);
    let text = extra;
    if (arr) {
      arr.map(item => {
        if (item.value === value) {
           text = item.label;
        }
      })
    }
    let itemHtml;
    switch (type) {
      /*case "hidden":
        itemHtml = <input type="hidden" name={name} {...input}/>;
        break;*/
      case "select":
        itemHtml =
          <div className={selectClass}>
            <span className={text == extra ? "select-picker-show placeholder" : "select-picker-show"}>{text}</span>
            <Picker
              data={arr}
              title={title}
              extra={extra}
              cols={cols}
              disabled={disabled}
              cascade={cascade}
              onOk={v => this.change(v[0])}
            >
              <List.Item arrow="horizontal">{title}{tips && <i className="iconfont icon-certificationHelp tips" onClick={e => this.showTips(tips, e)}></i>}</List.Item>
            </Picker>
          </div>
        break;
      default:
        itemHtml =
          <InputItem
            {...getFieldProps(name, {
              initialValue: value,
            })}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            // value={value}
            // clear
            className={className}
            onBlur={(v) => { onChange(v) }}
          // onBlur={(v) => {this.saveValue(v)}}
          >{title}
          </InputItem>
        break;
    }
    return (itemHtml);
  }
}
