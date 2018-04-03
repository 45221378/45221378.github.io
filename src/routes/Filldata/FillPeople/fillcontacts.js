import React from 'react';
import { TextareaItem,Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormItem, DashedBtn, Opacitybtn } from './../../../components';
import { reduxForm, Field,FieldArray } from 'redux-form';
import validate from '../../../utils/validate';

const arr=[
  {value:'父亲',label:'父亲'},
  {value:'母亲',label:'母亲'},
  {value:'兄弟',label:'兄弟'},
  {value:'姐妹',label:'姐妹'},
  {value:'朋友',label:'朋友'},
  ];
let renderEmailFeild = ({username,mobile,label,type,meta:{touch,error}})=>
  (
    <div>
      <label className='clearfix'>
        <Field title='与本人关系' className='relationship' component={FormItem} name="shops" extra='请选择' arr={arr} type='select' cols={1}  />
      </label>
      <label  className='clearfix'>
        <span>姓名</span>
        <input type="text" name="username" {...username} placeholder="请输入姓名"/>
      </label>
      <label  className='clearfix'>
        <span>手机号</span>
        <input type="tel" name="mobile" {...mobile} placeholder="请输入手机号"/>
      </label>
    </div>
  )

let renderEmails = ({fields,btnshow,arr})=>(
  <div>
    <ul>
      {
        fields.map((item,index)=>(
          <li key={index} data-id={index}>
            <div className='close'>
              <i onClick={()=>{fields.remove(index)}} className='iconfont icon-roundclosefill'></i>
            </div>
            <Field
              component={renderEmailFeild}
              name={item}

            >

            </Field>
          </li>
        ))
      }
      <DashedBtn  onClick={() => fields.push({username:123,mobile:1234,shops:2})}>添加联系人</DashedBtn>
    </ul>
  </div>
)

let EmailsForm = ({handleSubmit}) =>(
  <form onSubmit={handleSubmit}>
      <FieldArray
        name="contacts"
        component ={renderEmails}
      >
      </FieldArray>

    <Opacitybtn  type="submit">提交</Opacitybtn>
  </form>
)
const baseInfoFormValidate = validate({
  validateType: {
    contactRelation1: '*',
    contactName1: 'name',
    contactPhone1: 'm'
  },
  nullTip: {
    contactRelation1: '请选择与本人关系',
    contactName1: '请输入姓名',
    contactPhone1: '请输入手机号',
  },
  errorTip: {
    contactRelation1: '',
    contactName1: '姓名格式不正确',
    contactPhone1: '手机号格式不正确',
  }
});
@reduxForm({
  form: 'emailsForm',
  persistentSubmitErrors: true,
  initialValues: {
    contacts:[{username:"1",mobile:1234,shops:2}]
  }
})
@withRouter
export default class Fillpeople extends React.Component {
  constructor(props,context){
    super(props,context)
    this.state={
      lis:[
        {ships:'contactRelation',shipsname:'contactName',shipsmobile:'contactPhone'}
      ],
      btnshow:'block',
      arr:[
        {value:'父亲',label:'父亲'},
        {value:'母亲',label:'母亲'},
        {value:'兄弟',label:'兄弟'},
        {value:'姐妹',label:'姐妹'},
        {value:'朋友',label:'朋友'},
      ]
    }
  }

  add=()=>{
    this.state.lis.push({ships:'contactRelation',shipsname:'contactName',shipsmobile:'contactPhone'});
    this.setState({
      lis:this.state.lis,
      btnshow:this.state.lis.length>9?'hidden':'block'
    })
  }

  onDelete(index,e){
    // console.log(e);
    // console.log(index);
    var dataid=e.target.getAttribute('data-id');
    var newList=this.state.lis;
    console.log(newList);

    newList.splice(dataid,1);
    console.log(newList)
    this.setState({
      lis:newList,
      btnshow:this.state.lis.length>9?'hidden':'block'
    })
  }

  // getUsername(index,e){
  //     console.log(index)
  //     var value =  e.target.value;
  //     var newList = this.state.lis.map((item,idx)=>{
  //        if(idx===index){
  //          item.peoplename = value;
  //        }
  //        return item;
  //     });
  //     this.setState({
  //       lis:newList,
  //     })
  // }
  // getMobile(index,e){
  //   console.log(index);
  //   var mobileValue = e.target.value;
  //   var newList = this.state.lis.map((item,idx)=>{
  //     if(idx===index){
  //       item.mobile = mobileValue;
  //     }
  //     return item;
  //   });
  //   this.setState({
  //     lis:newList,
  //   })
  // }
  getValues = (values) => {
    const { error } = this.props;
    console.log(values);
    if (error) {
      Toast.info(error);
    }
  }

  render(){
    const {lis,btnshow,arr} = this.state;
    const { handleSubmit } = this.props;
    const oLis = lis.map((item,idx)=>{
      return (
        <li ref={'li'+idx} id={idx} key={idx}>
          <div className='close'>
            <i onClick={this.onDelete.bind(this,idx)} data-id={idx} className='iconfont icon-roundclosefill'></i>
          </div>
          <form >
            <label className='clearfix'>
              {/*<span>与本人关系</span>*/}
              {/*<i className='iconfont icon-right'></i>*/}
              <Field title='与本人关系' className='relationship' component={FormItem} extra='请选择' name={`${item.ships}${idx+1}`} type='select' cols={1} arr={arr} />
            </label>
            <label  className='clearfix'>
              <span>姓名</span>
              <Field type='text'  placeholder='请输入姓名' name={`${item.shipsname}${idx+1}`} component='input' />
              {/*<input  type='text' value={item.peoplename || ''} onChange={this.getUsername.bind(this,idx)}/>*/}
            </label>
            <label  className='clearfix'>
              <span>手机号</span>
              <Field type='tel' placeholder='请输入手机号' name={`${item.shipsmobile}${idx+1}`} component='input' />
              {/*<input type='text' value={item.mobile || ''} onChange={this.getMobile.bind(this,idx)}/>*/}
            </label>
          </form>
        </li>
      )
    })
    return(
      <div className='fill-people'>
        <div className='contain-ul'>
          <ul className='already-fill'>
            <li>
              <p>
                与本人关系<span>父亲</span>
              </p>
              <p>
                姓名<span>父亲</span>
              </p>
              <p>
                手机号<span>18086414933</span>
              </p>
            </li>
          </ul>
          <form  action="" >
            <FieldArray
              name="contacts"
              component ={renderEmails}
            >
            </FieldArray>
            <Opacitybtn  onClick={handleSubmit(this.getValues)}>提交</Opacitybtn>

          </form>
        </div>
        {/*<Opacitybtn onClick={handleSubmit(this.getValues)}>提交</Opacitybtn>*/}
      </div>
    )
  }
}
