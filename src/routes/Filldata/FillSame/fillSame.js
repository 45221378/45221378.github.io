import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import {Toast } from 'antd-mobile';
import {DashedBtn,Opacitybtn} from '../../../components/index';
import { reduxForm, Field,FieldArray} from 'redux-form';
import ajax from '../../../utils/ajax'
import AddPhotos from './../AddPhotos'

function filter_array(array) {
  return array.filter(item=>item);
}
let renderSame = ({fields,arrLength,idx})=>(
  <div>
    <ul className="ready-fill" id="ul">
      {
        fields.map((item,index)=>(
          <li key={index} data-id={index}>
            <div className='close'>
              <i onClick={()=>{fields.remove(index)}} className='iconfont icon-roundclosefill'></i>
            </div>
            <div className="form">
              <label className="clearfix">
                <span>平台名称</span>
                <Field type="text" placeholder="请输入平台名称" component="input" name={`${item}.platformName`} maxLength="30"/>
              </label>
              <label  className="clearfix">
                <span>账号</span>
                <Field type="text" placeholder="请输入账号" component="input" name={`${item}.platformAccount`} maxLength="30"/>
              </label>
              <label  className="clearfix">
                <span>密码</span>
                <Field type="text" placeholder="请输入密码" component="input" name={`${item}.platformPwd`} maxLength="30"/>
              </label>
              <div  className="clearfix account-img">
                <span>账单截图</span>
                <Field name={`${item}.platformImg`}  component={AddPhotos} ></Field>
              </div>
            </div>
          </li>
        ))
      }
      {arrLength<10&&<DashedBtn onClick={()=> fields.push()}>添加平台</DashedBtn>}
    </ul>
  </div>
)


@reduxForm({
  form: 'renderSame',
  persistentSubmitErrors: true,
  initialValues: {
    conSame:[
      {platformName:'',platformAccount:'',platformPwd:'',platformImg:''}
    ]
  },
  validate(values,props){
    const errors = {};
    const contactsArrayErrors = [];
    values.conSame.forEach((contact,contactIndex)=>{
      const contactErrors = {};
      if(!contact || !contact.platformName){
        contactErrors.platformName = "请输入平台名称";
        contactsArrayErrors[contactIndex] = contactErrors;
      }
      if(!contact || !contact.platformImg	){
        if(!contact || !contact.platformAccount){
          contactErrors.platformAccount = "请输入账号";
          contactsArrayErrors[contactIndex] = contactErrors;
        }else{
          // if(!shipReg.test(contact.contactRelation)){
          //   contactErrors.platformAccount = "账号格式不对";
          //   contactsArrayErrors[contactIndex] = contactErrors;
          // }
        }

        if(!contact || !contact.platformPwd){
          contactErrors.platformPwd = "请输入密码";
          contactsArrayErrors[contactIndex] = contactErrors;
        }
      }
    });
    if(contactsArrayErrors.length){
      errors.conSame = contactsArrayErrors;
    }
    return  errors;
  }
})

@connect(
  state=>(
    {
      conSame:state.form.renderSame.values.conSame,
    }
  )
)
@withRouter
export default class Fillsame extends React.Component {
  constructor(props,context){
    super(props,context)
    this.state={
      btnshow:'block',
      orderId:props.match.params.orderId,
      alreadyFill:[],
      alreadyFillLength:0,
      showForm:true
    }
  }
  getValues = (values) => {
    const {validate, history, dispatch} = this.props;
    console.log(values);
    const {orderId} = this.state;
    const error = validate(values).conSame;
    console.log(error);

    const ul = document.getElementById("ul");
    let flag = true;
    for (let i in error) {
      // console.log(ul.children[i].querySelectorAll("input")[0].name.split(".")[1])
      for (let j in error[i]) {
        if (flag && j === "platformName") {
          // ul.children[i].querySelector(".select-people").focus();
          ul.children[i].querySelectorAll("input")[0].focus();
          flag = false;
        }
        else if (flag && j === "platformAccount") {
          ul.children[i].querySelectorAll("input")[1].focus();
          flag = false;
        }
        else if (flag && j === "platformPwd") {
          ul.children[i].querySelectorAll("input")[2].focus();
          flag = false;
        }
      }
    }

    let errorMsg = error ? error.map((item, index) => {
      // console.log(item);
      return `${item.platformName || ''}` || `${item.platformAccount || ''}` || `${item.platformPwd || ''}` || `${item.platformImg || ''}`
    }) : '';

    if (errorMsg) {
      let showerrorMsg = filter_array(errorMsg);
      Toast.info(showerrorMsg[0], 1);
    } else {
      let subArray = {};
      let valuesArray = values.conSame;
      console.log(valuesArray);
      for (let i in valuesArray) {
        for (let j in valuesArray[i]) {
          if (valuesArray[i][j] !== '') {
            if (j === 'platformImg') {
              subArray[j + parseInt(parseInt(i,10) + 1,10)] = valuesArray[i][j].join(",");
            } else {
              subArray[j + parseInt(parseInt(i,10) + 1,10)] = valuesArray[i][j]
            }
          }
        }
      }
      subArray.addType = 1;
      subArray.orderId = orderId;
      console.log(subArray);
      if (values.conSame.length===0) {
        Toast.info('请输入提交的内容', 1);
      } else {
        dispatch({
          type: 'loading/save',
          payload: true
        })
        ajax.post('/mobile/addAnnex', subArray).then((response) => {
          Toast.info('提交成功', 1);
          // this.getalready();
          setTimeout(() => {
            history.goBack();
          }, 1000)
        })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            dispatch({
              type: 'loading/save',
              payload: false
            })
          })
      }
    }
  }
  //获取已经补充的资料
  getalready=()=>{
    const {dispatch} =this.props;
    dispatch({
      type:'loading/save',
      payload:true
    })
    ajax.post('/mobile/selectAnnex',{orderId:this.state.orderId}).then((response)=>{
      // console.log(response);
      // console.log(typeof  response.busiAnnex.annexContactList)
      this.setState({
        alreadyFill:response.busiAnnex.annexPlatformList,
        alreadyFillLength:response.busiAnnex.annexPlatformList.length
      })
      if(response.busiAnnex.annexPlatformList.length>=10){
        this.setState({
          showForm:false
        })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      dispatch({
        type:'loading/save',
        payload:false
      })
    })
  };
  componentDidMount(){
    this.getalready();
  }
  componentWillMount(){
    this.props.reset();
  }
  render(){
    const {arr,alreadyFill,alreadyFillLength,showForm} = this.state;
    const {handleSubmit,conSame} = this.props;
    // console.log(conSame);
    return(
      <div className="fill-same">
        <div className="contain-ul">
          <p className="fill-tips">账号密码、账单截图至少提交一项</p>

          <ul className="already-fill">
            {
              alreadyFill.map((item,idx)=>{
                return(
                  <li key={idx}>
                    <p>平台名称<span>{item.platformName}</span></p>
                    <p>账号<span>{item.platformAccount}</span></p>
                    <p>密码<span>{item.platformPwd}</span></p>
                    <div className="account-img clearfix">
                      <span>账单截图</span>
                      {
                        item.platformImg1&&<img  src={`${item.platformImg1}`} alt=""/>
                      }
                      {
                        item.platformImg2&&<img  src={`${item.platformImg2}`} alt=""/>
                      }
                      {
                        item.platformImg3&&<img  src={`${item.platformImg3}`} alt=""/>
                      }
                      {
                        item.platformImg4&&<img  src={`${item.platformImg4}`} alt=""/>
                      }
                    </div>
                </li>
                )
              })
            }
          </ul>
          {showForm&&<form  action="" >
            <FieldArray
              name="conSame"
              component ={renderSame}
              arr={arr}
              arrLength={conSame.length+alreadyFillLength}
            >
            </FieldArray>
          </form>}
        </div>
        <Opacitybtn onClick={handleSubmit(this.getValues)}>提交</Opacitybtn>
      </div>
    )
  }
}
