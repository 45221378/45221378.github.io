import React from 'react';
import {connect} from "dva";
import {DashedBtn,Opacitybtn} from '../../../components/index';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field,FieldArray} from 'redux-form';
import {Toast } from 'antd-mobile';
import ajax from '../../../utils/ajax'
import AddPhotos from './../AddPhotos'

function filter_array(array) {
  return array.filter(item=>item);
}
let renderOther = ({fields,arrLength,idx})=>(
  <div>
    <ul className="ready-fill" id="ul">
      {
        fields.map((item,index)=>(
          <li key={index} data-id={index}>
            <div className='close'>
              <i onClick={()=>{fields.remove(index)}} className='iconfont icon-roundclosefill'></i>
            </div>
            <label>
              <Field component="textarea" name={`${item}.otherInfoRemark`} cols="30" rows="10" placeholder="请输入备注说明" maxLength="200"></Field>
            </label>
            <div className="add-img ">
              {/*<Field style={{'display':'none'}} name={`${item}.otherInfoImg`} component='input'></Field>*/}
              <Field name={`${item}.otherInfoImg`}  component={AddPhotos} ></Field>
            </div>
          </li>
        ))
      }
      {arrLength<10&&<DashedBtn onClick={()=> fields.push()}>添加其他信息</DashedBtn>}
    </ul>
  </div>
)


@reduxForm({
  form: 'renderOther',
  persistentSubmitErrors: true,
  initialValues: {
    contactOther:[
      {otherInfoRemark:'',otherInfoImg:''}
    ]
  },
  validate(values,props){
    const errors = {};
    const contactsArrayErrors = [];
    values.contactOther.forEach((contact,contactIndex)=>{
      const contactErrors = {};
      if(!contact||!contact.otherInfoRemark){
        contactErrors.otherInfoRemark = "请添加备注说明";
        contactsArrayErrors[contactIndex] = contactErrors;
      }
      if(!contact||!contact.otherInfoImg){
        contactErrors.otherInfoImg = "请选择说明图片";
        contactsArrayErrors[contactIndex] = contactErrors;
      }
    })

    if(contactsArrayErrors.length){
      errors.contactOther = contactsArrayErrors;
    }
    return  errors;
  }
})

@connect(
  state=>(
    {
      contactOther:state.form.renderOther.values.contactOther,
      imgName:state.imgName,
    }
  )
)
@withRouter
export default class Fillother extends React.Component{
  constructor(props,context){
    super(props,context)
    this.state={
      btnshow:'block',
      orderId:props.match.params.orderId,
      alreadyFill:[],
      alreadyFillLength:0,
      platformImg:'',
      showForm:true
    }
  }
  getValues = (values) => {
    const {validate,history,dispatch} = this.props;
    const {orderId} = this.state;
    const error = validate(values).contactOther;

    const ul = document.getElementById("ul");
    let flag = true;
    for(let i in error){
      // console.log(ul.children[i].querySelectorAll("input")[0].name.split(".")[1])
      for(let j in error[i]){
        if(flag&&j==="otherInfoRemark"){
          // ul.children[i].querySelector(".select-people").focus();
          ul.children[i].querySelectorAll("textarea")[0].focus();
          flag =  false;
        }
        else if(flag&&j==="otherInfoImg"){
          // alert(flag);
          // console.log(ul.children[i].querySelectorAll("input")[0]);
          // console.log(ul.children[i].querySelector(".upload-photos-list-btn"));
          ul.children[i].querySelectorAll("input")[0].focus();
          // ul.children[i].querySelector(".upload-photos-list-btn").click();
          // ul.children[i].querySelector("span").click();
          flag =  false;
        }
      }
    }

    let errorMsg = error?error.map((item,index)=>{
      // console.log(item);
      return `${item.otherInfoRemark||''}`||`${item.otherInfoImg||''}`
    }):'';

    if (errorMsg) {
      let showerrorMsg = filter_array(errorMsg);
      Toast.info(showerrorMsg[0],1);
    }else{
      let subArray={};
      let valuesArray =  values.contactOther;
      for (let i in valuesArray) {
        for (let j in valuesArray[i]) {
          if(valuesArray[i][j]!==''){
            if(j==='otherInfoImg'){
              subArray[j + parseInt(parseInt(i,10)+1,10)] = valuesArray[i][j].join(",");
            }else{
              subArray[j + parseInt(parseInt(i,10)+1,10)] = valuesArray[i][j]
            }
          }
        }
      }
      console.log(subArray);
      subArray.addType=2;
      subArray.orderId=orderId;
      if (values.contactOther.length===0) {
        Toast.info('请输入提交的内容', 1);
      } else {
        dispatch({
          type: 'loading/save',
          payload: true
        })
        ajax.post('/mobile/addAnnex',subArray).then((response)=>{
          Toast.info('提交成功',1);
          setTimeout(()=>{
            history.goBack();
          },1000)
          //   this.getalready();
        }).finally(()=>{
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
    const {dispatch} = this.props;
    dispatch({
      type: 'loading/save',
      payload: true
    })
    ajax.post('/mobile/selectAnnex',{orderId:this.state.orderId}).then((response)=>{
      // console.log(response);
      // console.log(typeof  response.busiAnnex.annexContactList)
      this.setState({
        alreadyFill:response.busiAnnex.annexOtherInfoList,
        alreadyFillLength:response.busiAnnex.annexOtherInfoList.length
      })
      if(response.busiAnnex.annexOtherInfoList.length>=10){
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
    this.props.reset();
  }
  render(){
    const {alreadyFill,alreadyFillLength,showForm}  =this.state;
    const {handleSubmit,contactOther} = this.props;
    return(
      <div>
        <div className="fill-other">
          <div className="contain-ul">
            <ul className="already-fill">
              {
                alreadyFill.map((item,idx)=>{
                  return(
                    <li className="fill-other-li" key={idx}>
                      <article>{item.otherInfoRemark}</article>
                      {item.otherInfoImg1&&<div className="upload-img">
                        <img src={`${item.otherInfoImg1}`} alt=""/>
                      </div>}
                      {item.otherInfoImg2&&<div className="upload-img">
                        <img src={`${item.otherInfoImg2}`} alt=""/>
                      </div>}
                      {item.otherInfoImg3&&<div className="upload-img">
                        <img src={`${item.otherInfoImg3}`} alt=""/>
                      </div>}
                      {item.otherInfoImg4&&<div className="upload-img">
                        <img src={`${item.otherInfoImg4}`} alt=""/>
                      </div>}
                    </li>
                  )
                })
              }
            </ul>
            {showForm&&<form  action="" >
              <FieldArray
                name="contactOther"
                component ={renderOther}
                arrLength={contactOther.length+alreadyFillLength}
              >
              </FieldArray>
            </form>}
          </div>
        </div>
        <Opacitybtn onClick={handleSubmit(this.getValues)}>提交</Opacitybtn>
      </div>
    )
  }
}
