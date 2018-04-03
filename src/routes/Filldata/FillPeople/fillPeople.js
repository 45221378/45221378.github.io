import React,{component} from 'react';
import { connect } from 'dva';
import { Button, InputItem, TextareaItem } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { Btn, FormItem, DashedBtn, Opacitybtn } from './../../../components';
import { reduxForm, Field } from 'redux-form';
import validate from '../../../utils/validate';

const baseInfoFormValidate = validate({
  validateType: {
    ships: '*',
    peoplename: 'peoplename',
    mobile: 'm'
  },
  nullTip: {
    ships: '请选择与本人关系',
    peoplename: '请输入姓名',
    mobile: '请输入手机号',
  },
  errorTip: {
    ships: '',
    peoplename: '姓名格式不正确',
    mobile: '手机号格式不正确',
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
export default class Fillpeople extends React.Component {
  constructor(props,context){
    super(props,context)
    this.state={
      lis:[
        {username:'',mobile:'',ships:""}
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
    // console.log('add')
    this.state.lis.push({name:"",mobile:"",ships:""});
    this.setState({
      lis:this.state.lis,
      btnshow:this.state.lis.length>9?'hidden':'block'
    })
  }

  onDelete(index,e){
    // console.log(e);
    // console.log(index);
    // console.log(this);
    var dataid=e.target.getAttribute("data-id");
    console.log(dataid);
    var newList=this.state.lis;
    newList.splice(dataid,1);
    console.log(newList)
    this.setState({
      lis:newList,
      btnshow:this.state.lis.length>9?'hidden':'block'
    })


    // this.setState({
    //   lis:this.state.lis.filter((item,id)=>id!==dataid)
    // });

    // console.log(this.state.lis);
  }
  getShips(index,e){
    var shipsvalue = e.target.value;
    console.log(shipsvalue);

    var newList = this.state.lis.map((item,idx)=>{
      if(idx===index){
        item.ships = shipsvalue;
      }
      return item;
    });
    this.setState({
      lis:newList,
    })
  }
  getUsername(index,e){
      console.log(index)
      var value =  e.target.value;
      var newList = this.state.lis.map((item,idx)=>{
         if(idx===index){
           item.peoplename = value;
         }
         return item;
      });
      this.setState({
        lis:newList,
      })
  }
  getMobile(index,e){
    console.log(index);
    var mobileValue = e.target.value;
    var newList = this.state.lis.map((item,idx)=>{
      if(idx===index){
        item.mobile = mobileValue;
      }
      return item;
    });
    this.setState({
      lis:newList,
    })
  }
  render(){
    const {lis,btnshow,arr} = this.state;
    const { handleSubmit } = this.props;
    const oLis = lis.map((item,idx)=>{
      return (
        <li ref={"li"+idx} id={item} key={idx}>
          <div className="close">
            <i onClick={this.onDelete.bind(this,idx)} data-id={idx} className="iconfont icon-roundclosefill"></i>
          </div>
          <form >
            <label className="clearfix">
              {/*<span>与本人关系</span>*/}
              {/*<i className="iconfont icon-right"></i>*/}
              <Field title="与本人关系" className="relationship" onClick={this.getShips.bind(this,idx)} component={FormItem} extra="请选择" name={item.shops} type="select" cols={1} arr={arr} />
            </label>
            <label  className="clearfix">
              <span>姓名</span>
              {/*<Field type="text"   placeholder="请输入姓名" name="name" component="input" />*/}
              <input  type="text" value={item.peoplename || ""} onChange={this.getUsername.bind(this,idx)}/>
            </label>
            <label  className="clearfix">
              <span>手机号</span>
              {/*<Field type="tel" placeholder="请输入手机号" name="mobile" component="input" />*/}
              <input type="text" value={item.mobile || ""} onChange={this.getMobile.bind(this,idx)}/>
            </label>
          </form>
        </li>
      )
    })
    return(
      <div className="fill-people">
        <div className="contain-ul">
          <ul className="already-fill">
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
          <ul className="ready-fill">
            {oLis}
            {/*<li ref="oli">*/}
            {/*<div className="close">*/}
            {/*<i className="iconfont icon-roundclosefill"></i>*/}
            {/*</div>*/}
            {/*<form action="">*/}
            {/*<label className="clearfix">*/}
            {/*<span>与本人关系</span>*/}
            {/*<i className="iconfont icon-right"></i>*/}
            {/*</label>*/}
            {/*<label  className="clearfix">*/}
            {/*<span>姓名</span> <input type="text" placeholder="请输入姓名"/>*/}
            {/*</label>*/}
            {/*<label  className="clearfix">*/}
            {/*<span>手机号</span><input type="tel" placeholder="请输入手机号"/>*/}
            {/*</label>*/}
            {/*</form>*/}
            {/*</li>*/}
          </ul>
          <DashedBtn onClick={this.add} className={btnshow}>添加联系人</DashedBtn>
        </div>
        <Opacitybtn onClick={handleSubmit}>提交</Opacitybtn>
      </div>
    )
  }
}
