let  baseURL;
switch (process.env.API_ENV){
  case 'dev':
    // baseURL = 'http://192.168.25.27:80/organservice/';
    baseURL = 'http://www.1v1.one:8082/organservice/';
    break;
  case 'test':
    // baseURL = 'http://192.168.2.3:8082/organservice/';
    baseURL = 'http://www.1v1.one:8082/organservice/';
    break;
  case 'uat':
    baseURL = 'http://192.168.2.3:8082/organservice/';
    break;
  default:
    baseURL = 'http://192.168.2.3:8082/organservice/';
}
export default baseURL;
