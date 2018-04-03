import React from 'react';
import { TextareaItem,Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { FormItem, DashedBtn, Opacitybtn } from './../../../components';
import validate from '../../../utils/validate';

import AddForm from './fillPeopleForm'

export default class Fillpeople extends React.Component {
  constructor(props,context){
    super(props,context)
    const arr= [
      {value:'父亲',label:'父亲'},
      {value:'母亲',label:'母亲'},
      {value:'兄弟',label:'兄弟'},
      {value:'姐妹',label:'姐妹'},
      {value:'朋友',label:'朋友'},
    ]
    this.state={
      btnshow:'block',
      lis: [<AddForm arr={arr}></AddForm>],
      arr,
      num:'1'
    }
  }

  add=()=>{
    let {arr,lis,btnshow,num} =this.state;
    if(num<10){
      console.log(this.state.lis);
      this.state.lis.push(<AddForm arr={arr}></AddForm>);
      this.setState({
        lis:this.state.lis,
        num:num++
      })
    }
  };

  onDelete=()=>{
    let {arr,lis,btnshow,num} =this.state;
    if(num<10){
      this.state.lis.splice(num,1);
      this.setState({
        lis:this.state.lis,
        num:num--
      })
    }
  }
  getValues = (values) => {
    const { error } = this.props;
    console.log(values);
    if (error) {
      Toast.info(error);
    }
  };
  render(){
    const {arr,btnshow,lis} = this.state;
    // const {handleSubmit} = this.props;
    const oLis = lis.map((item,idx)=>{
      return (
        <li ref={'li'+idx} id={idx} key={idx}  className='fill-people'>
          <div className='close'>
            <i onClick={this.onDelete} className='iconfont icon-roundclosefill'></i>
          </div>
          <AddForm arr={arr} num={idx} ></AddForm>
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
          <ul className='ready-fill'>
            {oLis}
          </ul>
          <DashedBtn onClick={this.add} className={btnshow}>添加联系人</DashedBtn>
        </div>
        <Opacitybtn>提交</Opacitybtn>
      </div>
    )
  }
}
