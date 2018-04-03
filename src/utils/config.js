let  baseURL;
switch (process.env.API_ENV){
  case 'dev':
    baseURL = 'http://192.168.23.10:80/organservice/mobile';
    break;
  case 'test':
    baseURL = 'http://192.168.23.10:80/organservice/mobile';
    break;
  case 'uat':
    baseURL = 'http://192.168.23.10:80/organservice/mobile';
    break;
  default:
    baseURL = 'http://192.168.23.10:80/organservice/mobile';
}
export default baseURL;
