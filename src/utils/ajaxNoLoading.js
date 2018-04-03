import axios from 'axios';
import { shim } from 'promise.prototype.finally';
import { Toast } from 'antd-mobile';
import store from '../index';
import baseURL from './config';

shim();
const ajax = axios.create({
    baseURL,
});
ajax.interceptors.request.use(function (config) {
  const {token} = store;
  config.headers.common['authorization']=`Bearer ${token}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
const goLogin = ()=>{
  setTimeout(()=>{
    if(location.href.indexOf('login')===-1){
      location.href='login'
    }
  },4000)
};
ajax.interceptors.response.use(function (response) {
  let {head, body}=response.data;
  if(head.retCode==='0000'){
    return body;
  }else{
    const {msg} = head;
    Toast.info(msg);
    if(head.errCode==='1016'){
      goLogin()
    }
    return Promise.reject(head);
  }
}, function (error) {
  const {response,request} = error;
  const {status} = request;
  if(response){
    const {head}=response.data;
    Toast.info(head.msg);
    if(head.errCode==='1002'||head.errCode==='1016'){
      goLogin()
    }
  }else{
    Toast.offline(`${status}:网络连接失败`);
  }
  return Promise.reject(error);
});
export {baseURL};
export default ajax;
