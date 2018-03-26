let  baseURL;
switch (process.env.API_ENV){
  case 'dev':
    baseURL = 'http://www.1v1.one:8132/loan_srv/';
    break;
  case 'test':
    baseURL = 'http://www.1v1.one:8132/loan_srv/';
    break;
  case 'uat':
    baseURL = 'http://www.1v1.one:1835/loan_srv/';
    break;
  default:
    baseURL = 'http://c2.hfenq.cn:7001/loan_srv/';
}
export default baseURL;
