import React,{Component} from 'react';
// import { Field } from 'redux-form';
import { Picker } from 'antd-mobile';
export default class SelectPeople extends Component{
  render(){
    const { input: { value, onChange },title, data,...other} = this.props;
    var label = '请选择';
    data.forEach(item=>{
       if(item.value===value){
         label = item.label;
       }
    })
    return(<Picker data={data} title={title} cols={1}  onChange={(v)=>{
      onChange(v[0])
    }}>
      <div className="select-people">
        <input value={value} {...other}/>
        <p>{label}</p>
      </div>
    </Picker>)
  }
}
