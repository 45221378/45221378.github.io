import React from 'react';
import { connect } from 'dva';
import { Button, InputItem, TextareaItem,Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field ,destroy} from 'redux-form';
import { Btn, FormItem, DashedBtn, Opacitybtn } from './../../../components';
import validate from '../../../utils/validate';

const baseInfoFormValidate = validate({
  validateType: {
    ships: '*',
    shipsname: 'name',
    shipsmobile: 'm'
  },
  nullTip: {
    ships: '请选择与本人关系',
    shipsname: '请输入姓名',
    shipsmobile: '请输入手机号',
  },
  errorTip: {
    ships: '',
    shipsname: '姓名格式不正确',
    shipsmobile: '手机号格式不正确',
  }
});
@reduxForm({
  form: 'fillpeopleForm',
  persistentSubmitErrors: true,
  initialValues: {
  },
  validate: baseInfoFormValidate,
  warn: (values) => {
    let warn = {};
    let error = baseInfoFormValidate(values);
    return warn;
  }
})
@withRouter
export default class AddForm extends React.Component {
  constructor(props,context){
    super(props,context)
    // console.log(props)
    this.state={
      display:'block'
    }
  }



  render(){
    const {arr,num} = this.props;
    const {display} = this.state;
    // const { handleSubmit } = this.props;
    return(
      <div style={{display:display}} num={num}>

          <form >
            <label className='clearfix'>
              {/*<span>与本人关系</span>*/}
              {/*<i className='iconfont icon-right'></i>*/}
              <Field title='与本人关系' className='relationship' component={FormItem} extra='请选择' name='contactRelation' type='select' cols={1} arr={arr} />
            </label>
            <label  className='clearfix'>
              <span>姓名</span>
              <Field type='text'  placeholder='请输入姓名' name='contactName' component='input' />
              {/*<input  type='text' value={item.peoplename || ''} onChange={this.getUsername.bind(this,idx)}/>*/}
            </label>
            <label  className='clearfix'>
              <span>手机号</span>
              <Field type='tel' placeholder='请输入手机号' name='contactPhone' component='input' />
              {/*<input type='text' value={item.mobile || ''} onChange={this.getMobile.bind(this,idx)}/>*/}
            </label>
          </form>
      </div>
    )
  }
}
