import React from 'react';
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { SelectPeople, DashedBtn, Opacitybtn } from './../../../components';
import { reduxForm, Field,FieldArray } from 'redux-form';
import ajax from '../../../utils/ajax'
import {connect} from "react-redux";

const arr=[
  {value:'1',label:'父亲'},
  {value:'2',label:'母亲'},
  {value:'4',label:'朋友'},
  {value:'9',label:'亲属'}
];
function filter_array(array) {
  return array.filter(item=>item);
}
let renderEmails = ({fields,arrLength,idx,destroy})=>(
  <div>
    <ul className="ready-fill" id="ul">
      {
        fields.map((item,index)=>(
          <li key={index} data-id={index}>
            <div className='close'>
              <i onClick={()=>{fields.remove(index)}} className='iconfont icon-roundclosefill'></i>
            </div>
            <div>
              <label className='clearfix label-people'>
                <span>与本人关系</span>
                <Field index={index} title='与本人关系' className='relationship' component={SelectPeople} name={`${item}.contactRelation`} placeholder="请选择" data={arr} type='hidden' cols={1} />
              </label>
              <label  className='clearfix'>
                <span>姓名</span>
                <Field component="input" type="text" name={`${item}.contactName`}  placeholder="请输入姓名" maxLength="15" minLength="2"/>
              </label>
              <label  className='clearfix'>
                <span>手机号</span>
                <Field component="input" type="tel" name={`${item}.contactPhone`}   placeholder="请输入手机号" maxLength="11"/>
              </label>
            </div>
          </li>
        ))
      }
      {arrLength<10&&<DashedBtn onClick={()=>{fields.push()}}>添加联系人</DashedBtn>}
    </ul>
  </div>
)

@reduxForm({
  form: 'emailsForm',
  persistentSubmitErrors: true,
  initialValues: {
    contactInfo:[
      {contactName:"",contactPhone:"",contactRelation:""}
    ]
  },
  validate(values,props){
    const errors = {};
    const nameReg =  /^[\u2E80-\uFE4F\·]{2,15}$/;
    const mobileReg = /^1[0-9]{10}$/;
    const shipReg = /[\w\W]+/;
    const contactsArrayErrors = [];

    // console.log(values);
    values.contactInfo.forEach((contact,contactIndex)=>{
        const contactErrors = {};
        if(!contact || !contact.contactRelation){
          contactErrors.contactRelation = "请选择与本人关系";
          contactsArrayErrors[contactIndex] = contactErrors;
        }else{
          if(!shipReg.test(contact.contactRelation)){
            contactErrors.contactRelation = "";
            contactsArrayErrors[contactIndex] = contactErrors;
          }
        }

        if(!contact || !contact.contactName){
          contactErrors.contactName = "请输入姓名";
          contactsArrayErrors[contactIndex] = contactErrors;
        }else{
          if(!nameReg.test(contact.contactName)){
            contactErrors.contactName = "姓名格式不正确";
            contactsArrayErrors[contactIndex] = contactErrors;
          }
        }

        if(!contact || !contact.contactPhone){
          contactErrors.contactPhone = "请输入手机号";
          contactsArrayErrors[contactIndex] = contactErrors;
        }else{
          if(!mobileReg.test(contact.contactPhone)){
            contactErrors.contactPhone = "手机格式不正确";
            contactsArrayErrors[contactIndex] = contactErrors;
          }
        }
    })

    if(contactsArrayErrors.length){
        errors.contactInfo = contactsArrayErrors;
    }
    return  errors;
  }
})

@connect(
  state=>(
    {
      contactInfo:state.form.emailsForm.values.contactInfo,
    }
  )
)
@withRouter
export default class Fillpeople extends React.Component {
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
    const {validate,dispatch,history} = this.props;
    const {orderId} = this.state;
    // console.log(validate(values).contactInfo);
    const error = validate(values).contactInfo;
    const ul = document.getElementById("ul");
    // console.log(ul.children[0]);
    let errorMsg = error?error.map((item,index)=>{
      // console.log(item);
      return `${item.contactRelation||''}`||`${item.contactName||''}`||`${item.contactPhone||''}`
    }):'';

      let flag = true;
      for(let i in error){
        // console.log(ul.children[i].querySelectorAll("input")[0].name.split(".")[1])
        for(let j in error[i]){
          // console.log(j);
          if(flag&&j==="contactRelation"){

            ul.children[i].querySelectorAll("input")[0].click();
            ul.children[i].querySelector("p").click();

            flag =  false;
          }
          else if(flag&&j==="contactName"){
            ul.children[i].querySelectorAll("input")[1].focus();
            flag =  false;
          }
          else if(flag&&j==="contactPhone"){
            ul.children[i].querySelectorAll("input")[2].focus();
            flag =  false;
          }
        }
      }

    if (errorMsg) {
      let showerrorMsg = filter_array(errorMsg);
      Toast.info(showerrorMsg[0],1);

    }else{
      let subArray={};
      let valuesArray =  values.contactInfo;
      // console.log(valuesArray);
      for (let i in valuesArray) {
        for (let j in valuesArray[i]) {
          subArray[j + parseInt(parseInt(i,10)+1,10)] = valuesArray[i][j]
        }
      }
      subArray.addType=0;
      subArray.orderId=orderId;
      if(values.contactInfo.length===0){
        Toast.info('请输入提交的内容',1);
      }else{
        dispatch({
          type: 'loading/save',
          payload: true
        })
        ajax.post('/mobile/addAnnex',subArray).then((response)=>{
          Toast.info('提交成功',1);
          setTimeout(()=>{
            history.goBack();
          },1000)
        }).catch((err)=>{
            console.log(err)
          })
          .finally(()=> {
            dispatch({
              type: 'loading/save',
              payload: false
            })
          })
      }

    }

  };
  //获取已经补充的资料
  getalready=()=>{
    const {dispatch}  =this.props;
    dispatch({
      type: 'loading/save',
      payload: true
    })
    ajax.post('/mobile/selectAnnex',{orderId:this.state.orderId}).then((response)=>{
      // console.log(response);
      // console.log(typeof  response.busiAnnex.annexContactList)
      this.setState({
        alreadyFill:response.busiAnnex.annexContactList,
        alreadyFillLength:response.busiAnnex.annexContactList.length
      })
      if(response.busiAnnex.annexContactList.length>=10){
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
        type: 'loading/save',
        payload: false
      })
    })
  };
  componentDidMount(){
    this.getalready();
  }

  componentWillMount(){
    // console.log(this.props);
    // this.props.destroy();
    this.props.reset();

    // const {initialValues} = this.props;
    // initialValues.contactInfo.push({contactName:"",contactPhone:"",contactRelation:""})

  }
  render(){
    const {arr,alreadyFill,alreadyFillLength,showForm} = this.state;
    console.log(alreadyFillLength);
    const {handleSubmit,contactInfo} = this.props;
    const fiterObj = {
      1:'父亲',
      2:'母亲',
      3:'朋友',
      4:'亲属'
    };
    return(

          <div className='fill-people'>
            <div className='contain-ul'>
              <ul className='already-fill'>
                {
                  alreadyFill.map((item,idx)=>{
                    return(
                      <li key={idx}>
                        <p>与本人关系<span>{item.contactRelation&&fiterObj[item.contactRelation]}</span></p>
                        <p>姓名<span>{item.contactName}</span></p>
                        <p>手机号<span>{item.contactPhone}</span></p>
                      </li>
                    )
                  })
                }
                {/*<li>*/}
                  {/*<p>*/}
                    {/*与本人关系<span>父亲</span>*/}
                  {/*</p>*/}
                  {/*<p>*/}
                    {/*姓名<span>父亲</span>*/}
                  {/*</p>*/}
                  {/*<p>*/}
                    {/*手机号<span>18086414933</span>*/}
                  {/*</p>*/}
                {/*</li>*/}
              </ul>
              {showForm&&<form  action="" name="emailsForm">
                <FieldArray
                  name="contactInfo"
                  component ={renderEmails}
                  arr={arr}
                  arrLength={contactInfo.length+alreadyFillLength}
                  destroy={this.props.destroy}
                >
                </FieldArray>
              </form>}
            </div>
            <Opacitybtn  onClick={handleSubmit(this.getValues)}>提交</Opacitybtn>
          </div>


    )
  }
}
