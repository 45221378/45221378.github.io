import axios from 'axios';
import store,{history} from '../index';
import { Toast } from 'antd-mobile';
import qs from 'qs';
import baseURL from '../utils/config';
import md5 from 'md5/md5';
import { shim } from 'promise.prototype.finally';
shim();
const ajax = axios.create({
  baseURL,
  transformRequest: [function (data) {
    const { getState } = store;
    const {token,organInfo:{organId='',phone=''}} = getState();
    const assignData = Object.assign(data,{token,organId,phone});
    const sortArr=Object.keys(assignData).sort()||[];
    const str=sortArr.reduce((prev,current)=>(prev+=assignData[current]),'');
    // console.log(sortArr);
    // console.log(str);
    assignData.sign=md5(str.trim());
    return qs.stringify(assignData);
  }]
});
ajax.interceptors.response.use(function (response) {
  const {auth={},head={}, body}=response.data;
  const {timeout,token=''} = auth;
  const {retcode,msg} = head;
  const {dispatch} = store;
  if (timeout){
    Toast.fail('登录超时',2,function(){
      dispatch({
        type:'token/clean',
      });
      const basePath = location.href.split(history.location.pathname)[0];
      location.href = basePath+'/login';
    });
  }else{
    if(token.length>0){
      dispatch({
        type:'token/save',
        payload:token
      });
    }
    if(retcode==='0000'){
      return body;
    }else{
      Toast.info(msg,3);
      return Promise.reject(head);
    }
  }
}, function (error) {
  const {response,request} = error;
  const {status} = request;
  Toast.hide();
  if(!response){
    Toast.offline(`${status}:网络连接失败`);
  }
  return Promise.reject(error);
});
export {baseURL};
export default ajax;
