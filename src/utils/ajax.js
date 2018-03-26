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
  const {token='',version:{appVersion,appType}} = store;
  Toast.loading('正在加载',0);
  if(token){
    config.headers.common['authorization']=`Bearer ${token}`;
  }
  if(appVersion||appType){
    config.headers.common['appVersion']=appVersion;
    config.headers.common['appType']=appType;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  Toast.hide();
  return Promise.reject(error);
});
const goLogin = ()=>{
  setTimeout(()=>{
    if(location.href.indexOf('ninjaTurtleLogin')===-1){
      location.href='ninjaTurtleLogin'
    }
  },4000)
};
ajax.interceptors.response.use(function (response) {
  let {head, body}=response.data;
  if(head.retCode==='success'){
    Toast.hide();
    return body;
  }else{
    const {msg} = head;
    Toast.hide();
    Toast.info(msg);
    if(head.errCode==='1016'){
      goLogin()
    }
    return Promise.reject(head);
  }
}, function (error) {
  const {response,request} = error;
  const {status} = request;
  Toast.hide();
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
