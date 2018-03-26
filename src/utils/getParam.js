import qs from 'qs';

function getParam() {
  let param={};
  let search = location.search.length>0 && location.search;
  if(location.search){
    param = qs.parse(search.slice(1))
  }
  return param;
}
export  default  getParam;
